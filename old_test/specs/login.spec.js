import { LOGIN_USERS } from '../configs/e2eConstants.js';
import LoginPage from '../page-objects/LoginPage.js';
import SwagOverviewPage from '../page-objects/SwagOverviewPage.js';

describe('LoginPage', () => {
    beforeEach(async () => {
        // Load url to be able to clear cookies and storage
        await browser.url('');
        // Clear the cookies and storage
        await browser.deleteAllCookies();
        await browser.execute('localStorage.clear();');

        // Load again in a fresh state
        await browser.url('');
        await LoginPage.waitForIsShown();
    });

    it('should be able to test loading of login page', async () => {
        
        
        await expect(LoginPage).toBeDisplayed();

        /*await expect(await LoginPage.waitForIsShown()).toEqual(
            true,
            'LoginPage page was not shown',
        );*/
    });

    it('should be able to login with a standard user', async () => {
        await LoginPage.signIn(LOGIN_USERS.STANDARD);

        // Wait for the inventory screen and check it
        await expect(await SwagOverviewPage.waitForIsShown()).toEqual(
            true,
            'Inventory List screen was not shown',
        );
    });

    it('should not be able to login with a locked user', async () => {
        // It doesn't matter which error we check, all errors should be checked in a UT
        // With this UT we just check that A failure is triggered
        await LoginPage.signIn(LOGIN_USERS.LOCKED);

        await expect(await LoginPage.isErrorMessageDisplayed()).toEqual(true, 'Error message is shown');
        await expect(await LoginPage.getErrorMessage()).toContain(
            'Epic sadface: Sorry, this user has been locked out.',
            'The error message is not as expected',
        );
    });
});
