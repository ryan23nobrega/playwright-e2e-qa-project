const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('login com sucesso', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('login inválido', async ({ page }) => {
  const login = new LoginPage(page);

  await login.acessarSite();
  await login.fazerLogin('standard_user', 'senha_errada');

  await expect(login.errorMessage).toBeVisible();
});