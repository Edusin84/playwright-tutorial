import { Page, Locator, expect } from "@playwright/test";

export default class LandingPage {

    //Variable de tipo Page de solo lectura. Se usará para comprobar que la página se ha cargado correctamente y para interactuar con los elementos de la página.
    readonly page: Page;

    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly signupButton: Locator;
    readonly errorMessage: Locator;


    // 
    constructor(page: Page) {
        this.page = page;
        this.nameField = page.getByRole('textbox', { name: 'Name' });
        this.emailField = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.errorMessage = page.getByText('Email Address already exist!')
    }

    async completeSignupError(users: any) {
          await this.nameField.fill(users.name);
          expect(await this.nameField.inputValue()).toBe(users.name);
          await this.emailField.fill(users.email);
          expect(await this.emailField.inputValue()).toBe(users.email);
          await this.signupButton.click();
          await expect(this.errorMessage).toBeVisible();
    }

    async completeSignup(users: any) {
          const uniqueEmail = users.email.replace('@', "+" +Date.now() +'@');
          await this.nameField.fill(users.name);
          expect(await this.nameField.inputValue()).toBe(users.name);
          await this.emailField.fill(uniqueEmail);
          expect(await this.emailField.inputValue()).toBe(uniqueEmail);
          await this.signupButton.click();
    }

}