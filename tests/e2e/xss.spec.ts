import {test, expect} from '@playwright/test';

declare global {
  interface Window {
    xssExecuted?: boolean;
  }
}

type XSSPayload = string;

test('XSS test - reflected input should not execute script', async ({page}) => {
    const payload: XSSPayload = `<script>window.xssExecuted = true</script>`;

    await page.goto(`data:text/html,
        <html>
            <body>
                <div id="output">${payload.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </body>
        </html>`);

    const isExecuted: boolean = await page.evaluate(() => {
        return window.xssExecuted === true;
    });
    expect(isExecuted).toBeFalsy();
});