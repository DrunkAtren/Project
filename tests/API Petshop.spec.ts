// @ts-check

import { test} from '@playwright/test';
import { Message, baseUrl} from '../API/messages';
import { TEST, POST_PET, PUT_PET, DELETE_PET } from '../test_data.json'


test.describe('API GET',() => {

  for (const select of TEST) {
    test('GET Pet by status '+select, async ({ request }) => {

    const message = new Message (request);
    await message.GETPetsBySelect(select);

    });
  };

  test('GET Inventory by status', async ({ request }) => {
    
    const message = new Message( request);
    await message.GETInventoryBySelect();

  })
});

test.describe('API POST',() => 
{

  POST_PET.forEach(data => 
  {
  test('POST Pet ' + data.PetId , async ({ request }) => 
    {
  
    const message = new Message( request);

    const placeholderPost = 
    {
      
        "id": data.PetId,
        "category": 
        {
          "id": data.CategoryId,
          "name": data.CategoryName
        },
        "name": data.Name,
        "photoUrls": [ data.photoUrls ],
        "tags": 
        [{
          "id": data.TagId,
          "name": data.TagName
        }],
        "status": data.Status 
    }

    await message.POST(placeholderPost);
    })
  }
)}
);

test.describe('API DELETE',() => 
  {
  DELETE_PET.forEach(data => 
  {
    
      test('DELETE Pet by ID= '+ data.PetId, async ({ request }) => 
      {
      
        const message = new Message( request);
        await message.DELETE(data.PetId);
      })
  });
});

test.describe('API PUT',() => 
{
  PUT_PET.forEach(data => 
  {
    test('PUT Pet by ID '+ data.PetId , async ({ request }) => 
    {
      const message = new Message( request);
      const placeholderPost = 
      {
        
          "id": data.PetId,
          "category": 
          {
            "id": data.CategoryId,
            "name": data.CategoryName
          },
          "name": data.Name,
          "photoUrls": [ data.photoUrls ],
          "tags": 
          [{
            "id": data.TagId,
            "name": data.TagName
          }],
          "status": data.Status 
      }

      await message.PUT(placeholderPost);
    })
  })
});


  // test.beforeEach(async ({ page }) => 
  //   {
  //     await page.goto(baseUrl)

  //     const petshopPage = new PetShopPage(page);

  //     await petshopPage.clickCookies();
  //     await petshopPage.clickAuthorizeButton();
  //     await petshopPage.enterApiKey('special-key');
  //     await petshopPage.clickAuthorize();
  //     await petshopPage.clickCloseAuth();
  //   });
