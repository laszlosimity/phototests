import {DEFAULT_TIMEOUT} from '../configs/e2eConstants.js';

export default class BasePage {
    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Wait for the element to be displayed
     *
     * @return {boolean}
     */
    async waitForIsShown(isShown = true) {
        try{
            return (await $(this.selector).waitForDisplayed({
                timeout: DEFAULT_TIMEOUT,
                reverse: !isShown
            })).then();
        } catch (e) {
            //return !isShown;
        }
    }

    /**
     * Give back if the element is displayed
     *
     * @return {boolean}
     */
    async isDisplayed() {
        return $(this.selector).isDisplayed();
    }
}
