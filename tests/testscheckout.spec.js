const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('finalizar compra com sucesso', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'secret_sauce');

  // adiciona produto
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // vai pro carrinho
  await page.locator('.shopping_cart_link').click();

  // checkout
  await page.locator('[data-test="checkout"]').click();

  // preenche dados
  await page.locator('[data-test="firstName"]').fill('Ryan');
  await page.locator('[data-test="lastName"]').fill('Teste');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  // finaliza
  await page.locator('[data-test="finish"]').click();

  // valida sucesso
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('erro ao finalizar checkout sem dados', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});