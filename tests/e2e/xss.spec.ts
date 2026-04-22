import {test, expect} from '@playwright/test';

test('XSS test - reflected input should not execute script', async ({page}) => {
    const payload = `<script>window.xssExecuted = true</script>`;

    await page.goto(`data:text/html,
        <html>
            <body>
                <div id="output">${payload.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </body>
        </html>`);

    const isExecuted = await page.evaluate(() => {
        return (window as any).xssExecuted === true;
    });
    expect(isExecuted).toBeFalsy();
});


/*
import {test, expect} from '@playwright/test';

test('XSS test -should not execute script in text input', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    const payload = '<script>alert("XSS")</script>';

    await page.fill('#username', payload);
    await page.fill('#password', 'test');
    await page.click('button[type="submit"]');

    //Check script is NOT executed and treated as text
    await expect(page.locator('#flash')).toBeVisible();
});
*/