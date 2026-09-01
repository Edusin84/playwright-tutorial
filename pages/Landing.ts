import { Page, Locator, expect } from "@playwright/test";

export default class LoginPage {

    //Variable de tipo Page de solo lectura. Se usará para comprobar que la página se ha cargado correctamente y para interactuar con los elementos de la página.
    readonly page: Page;

    readonly consentButton: Locator;
    readonly loginButton: Locator;


    // 
    constructor(page: Page) {
        this.page = page;
        this.consentButton = page.getByRole('button', { name: 'Consent' })
        this.loginButton = page.getByRole('link', { name: ' Signup / Login' })
    }

    async closeCookiesModal() {
        await this.consentButton.click();
        await expect(this.consentButton).not.toBeVisible();
    }

    async goToLoginPage() {
        await this.loginButton.click();
        await expect(this.page).toHaveURL(/login/);
    }
}