import BasePage from './page.js';

const SCREEN_SELECTOR = '.inventory_list';

class SwagOverviewPage extends BasePage {
    constructor() {
        super(SCREEN_SELECTOR);
    }

    // Make it private so people can't mess with it
    // Source: https://github.com/tc39/proposal-class-fields#private-fields
    get screen() {
        return $(SCREEN_SELECTOR);
    }

    get swagItems() {
        return $$('.inventory_item');
    }

    /**
     * Get the amount of swag items listed on the page
     * @returns {number}
     */
    async getAmount() {
        return this.swagItems.length;
    }

    /**
     * Get a swag Item based on a search string or a number of the visible items
     *
     * @param {number|string} needle
     *
     * @return {Element[]} the selected swag
     */
    swag(needle) {
        if (typeof needle === 'string') {
            return this.swagItems.find(swagItem => (swagItem.getText()).includes(needle));
        }

        return this.swagItems[needle];
    }

    /**
     * Get the text of the swag swag text
     *
     * @param {number|string} needle
     *
     * @return {string}
     */
    async getSwagText(needle) {
        return (await this.swag(needle)).getText();
    }

    /**
     * Add a swag items to the cart
     *
     * @param {number|string} needle
     */
    async addSwagToCart(needle) {
         ((await this.swag(needle)).$('.btn_primary.btn_inventory')).click();
    }

    /**
     * Remove swag items from the cart
     *
     * @param {number|string} needle
     */
    async removeSwagFromCart(needle) {
         ((await this.swag(needle)).$('.btn_secondary.btn_inventory')).click();
    }

    /**
     * Open the details of a swag swag
     *
     * @param {number|string} needle
     */
    async openSwagDetails(needle) {

        var myList = await this.swagItems;
        var myEl;
         for (let i = 0; i < myList.length; i++) {
             if (String(await myList[i].getText()).includes(needle)) {
                myEl = myList[i];
            }  
         }
        await myEl.$('.inventory_item_name').click();

    }
}

export default new SwagOverviewPage();
