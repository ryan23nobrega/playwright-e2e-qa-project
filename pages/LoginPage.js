class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async acessarSite() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fazerLogin(usuario, senha) {
    await this.username.fill(usuario);
    await this.password.fill(senha);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };