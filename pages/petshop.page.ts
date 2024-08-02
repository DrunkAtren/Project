import { Page } from '@playwright/test';

export class PetShopPage {
    constructor(private page: Page) {}


    async clickCookies() 
        {
        await this.page.getByRole('button', { name: 'Allow all cookies' }).click()
        }

    async clickAuthorizeButton() {
        await this.page.getByRole('button', { name: 'Authorize', exact: true }).click();
        }
    
    async enterApiKey(Key) {
        await this.page.getByLabel('Value:').fill(Key);
        }
    
    async clickCloseAuth() {
        await this.page.locator('[class="close-modal"]').click();
        }
    
    async clickAuthorize() {
        await this.page.getByLabel('Apply credentials').click();
    }
}
