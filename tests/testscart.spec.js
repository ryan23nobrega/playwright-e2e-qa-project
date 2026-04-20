const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('adicionar produto ao carrinho', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('remover produto do carrinho', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('.shopping_cart_link').click();

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(0);
});