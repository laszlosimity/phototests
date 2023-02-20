import BasePage from './page.js';
import {DEFAULT_TIMEOUT} from '../configs/e2eConstants.js';

const SCREEN_SELECTOR = '#login_button_container';

class LoginPage extends BasePage {
   constructor() {
        super(SCREEN_SELECTOR);
    }

    // Make it private so people can't mess with it
    // Source: https://github.com/tc39/proposal-class-fields#private-fields
    
    open() {
        return super.open('http://www.saucedemo.com/');
    }

    get screen() {
        return $(SCREEN_SELECTOR);
    }

    get username() {
        return $('#user-name');
    }

    get password() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get errorMessage() {
        return $('[data-test="error"]');
    }

    /**
     * Sign in
     *
     * @param {object} userDetails
     * @param {string} userDetails.username
     * @param {string} userDetails.password
     */
    async signIn(userDetails) {
        const {password, username} = userDetails;

         await this.waitForIsShown();
         await this.username.setValue(username);
         await this.password.setValue(password);
        if (browser.isAndroid) {
            return browser.execute('document.querySelector(\'.btn_action\').click()');
        }

         await this.loginButton.click();
    }

    /**
     * Get the text or the error message container
     *
     * @return {string}
     */
    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({timeout: DEFAULT_TIMEOUT});

        return this.errorMessage.getText();
    }

    /**
     * Check if the error message is displayed
     *
     * @return {boolean}
     */
    async isErrorMessageDisplayed() {
        return this.errorMessage.isDisplayed();
    }
}

export default new LoginPage();
