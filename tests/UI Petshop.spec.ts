import { expect, test } from '@playwright/test';
import { PetShopPage } from '../pages/petshop.page';

const baseUrl = "https://petstore.swagger.io/"

test.beforeEach(async ({ page }) => 
    {
      await page.goto(baseUrl)
  
      const petshopPage = new PetShopPage(page);
  
      await petshopPage.clickCookies();
      await petshopPage.clickAuthorizeButton();
      await petshopPage.enterApiKey('special-key');
      await petshopPage.clickAuthorize();
      await petshopPage.clickCloseAuth();
    });

// test.describe('UI GET',() => {

//     test('GET Select', async({ page }) => {

//     await page.getByLabel('get /pet/findByStatus').click();

//     await page.getByRole('button', { name: 'Try it out' }).click();

//     await page.getByRole('listbox').selectOption({ label: 'sold'});

//     await page.getByRole('button', { name: 'Execute' }).click();

//     await page.waitForTimeout(5000);

//     await page.evaluate(() => {
//         window.scrollBy(0, 200);
//     });

//     await expect(page.getByRole('cell', { name: '200' }).isVisible());

//     });
// });
