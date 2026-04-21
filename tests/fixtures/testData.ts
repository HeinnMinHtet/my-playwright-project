// Test data fixtures for Playwright tests

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
};

type Product = {
  id: string;
  name: string;
  price: number;
};

export const products: Product[] = [
  {
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: 29.99
  },
  {
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: 9.99
  },
  {
    id: 'sauce-labs-bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99
  },
  {
    id: 'sauce-labs-fleece-jacket',
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99
  },
  {
    id: 'sauce-labs-onesie',
    name: 'Sauce Labs Onesie',
    price: 7.99
  },
  {
    id: 'test.allthethings()-t-shirt-(red)',
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.98
  }
];

export const checkoutInfo = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  invalid: {
    firstName: '',
    lastName: '',
    postalCode: ''
  },
  longNames: {
    firstName: 'VeryLongFirstNameThatMightCauseIssues',
    lastName: 'VeryLongLastNameThatMightCauseIssues',
    postalCode: '1234567890'
  }
};

export const urls = {
  base: 'https://www.saucedemo.com',
  inventory: 'https://www.saucedemo.com/inventory.html',
  cart: 'https://www.saucedemo.com/cart.html',
  checkoutStepOne: 'https://www.saucedemo.com/checkout-step-one.html',
  checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
  checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
};