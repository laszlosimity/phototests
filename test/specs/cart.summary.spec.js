import AppHeaderPage from '../pageobjects/AppHeaderPage.js';
import SwagOverviewPage from '../pageobjects/SwagOverviewPage.js';
import CartSummaryPage from '../pageobjects/CartSummaryPage.js';
import CheckoutPersonalInfoPage from '../pageobjects/CheckoutPersonalInfoPage.js';
import {setTestContext} from '../helpers/index.js';
import {LOGIN_USERS, PAGES, PRODUCTS} from "../configs/e2eConstants.js";

describe('Cart Summary page', () => {
    it('should validate that we can continue shopping', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
        });

        await expect(CartSummaryPage.screen).toBeDisplayed();

        // Actual test starts here
        await CartSummaryPage.continueShopping();

        await expect(SwagOverviewPage.screen).toBeDisplayed();
    });

    it('should validate that we can go from the cart to the checkout page', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
        });

        await expect(await CartSummaryPage.screen).toBeDisplayed();

        // Actual test starts here
        await CartSummaryPage.goToCheckout();

        await expect(CheckoutPersonalInfoPage.screen).toBeDisplayed();

    });

    it('should validate that a product can be removed from the cart', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
            products: [PRODUCTS.BACKPACK],
        });

        await expect(CartSummaryPage.screen).toBeDisplayed();

        // Actual test starts here
        await expect(await AppHeaderPage.cart).toHaveText('1');


        await expect(await CartSummaryPage.getSwagAmount()).toEqual(1);


        await CartSummaryPage.removeSwag(0);

        await expect(await AppHeaderPage.cart).toHaveText('');

        
        await expect(await CartSummaryPage.getSwagAmount()).toEqual(
            0,
            'The amount of items in the cart overview is not equal to 1',
        );
    });
});
