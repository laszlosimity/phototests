import {DEFAULT_TIMEOUT} from '../configs/e2eConstants.js';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */

    constructor(selector) {
        this.selector = selector;
    }

    open (path) {

        return browser.url(path);
    }

    async waitForIsShown(isShown = true) {

            return ( await $(this.selector).waitForDisplayed({
                timeout: DEFAULT_TIMEOUT,
                reverse: !isShown
            }));
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
