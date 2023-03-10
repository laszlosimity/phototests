import AppHeaderPage from '../page-objects/AppHeaderPage.js';
import SwagOverviewPage from '../page-objects/SwagOverviewPage.js';
import SwagDetailsPage from '../page-objects/SwagDetailsPage.js';
import CartSummaryPage from '../page-objects/CartSummaryPage.js';
import {setTestContext} from '../helpers/index.js';
import {LOGIN_USERS, PAGES, PRODUCTS} from "../configs/e2eConstants.js";

describe('Swag items list', () => {
    it('should validate that all products are present', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        await expect(await SwagOverviewPage.getAmount()).toEqual(
            6,
            'Amount of items was not equal to 6',
        );
    });

    it('should be able to sort the items', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        await expect(await SwagOverviewPage.getSwagText(0)).toContain(
          'Sauce Labs Backpack',
          'Initial order is not correct',
        );

        await AppHeaderPage.selectProductOrder('Price (high to low)');

        await expect(await SwagOverviewPage.getSwagText(0)).toContain(
          'Sauce Labs Fleece Jacket',
          'Sorted order is not correct',
        );

    });

    it('should validate that the details of a product can be opened', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        const product = 'Sauce Labs Backpack';

        await SwagOverviewPage.openSwagDetails(product);

        await expect(await SwagDetailsPage.waitForIsShown()).toEqual(
            true,
            'Swag Item detail page was not shown',
        );

        await expect(await SwagDetailsPage.getText()).toContain(
            product,
            'Swag Item detail page did not show the right text',
        );
    });

    it('should validate that a product can be added to the cart', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        await expect(await AppHeaderPage.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to nothing',
        );

        await SwagOverviewPage.addSwagToCart(0);

        await expect(await AppHeaderPage.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );
    });

    it('should validate that a product can be removed from the cart', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
            products: [PRODUCTS.BACKPACK]
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        await expect(await AppHeaderPage.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );

        await SwagOverviewPage.removeSwagFromCart(0);

        await expect(await AppHeaderPage.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to 0',
        );
    });

    it('should be able to open the cart summary page', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.SWAG_ITEMS,
        });
        await SwagOverviewPage.waitForIsShown();

        // Actual test starts here
        await AppHeaderPage.openCart();

        await expect(await CartSummaryPage.waitForIsShown()).toEqual(
            true,
            'Cart Summary page was not shown',
        );
    });
});
