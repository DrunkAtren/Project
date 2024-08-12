// @ts-check

import { test} from '@playwright/test';
import { Message } from '../API/messages';
import { STATUS, POST_PET, PUT_PET, DELETE_PET, POSTImage } from '../test_data.json'
import path from 'path';
import fs from "fs";


test.describe('API GET',() => {

  for (const select of STATUS) {
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
    test('POST Pet (With header) with PetID = ' + data.PetId , async ({ request }) => 
      {

      const message = new Message( request);

      const templatePost = 
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

      await message.POST(templatePost);
      })
    }
    )

    POSTImage.forEach(data => 
    {
    test('POST Image '+ data.filename+' on PetId = '+data.petId, async ({ request }) => 
      {
        
      const message = new Message( request);

      const file = path.resolve("./image/", data.filename);
      const image = fs.readFileSync(file);

      const templatePost =
      {
                petId:data.petId,
                additionalMetadata:data.additionalMetadata,
                file: 
                    {
                    name: file,
                    mimeType: 'image/png',
                    buffer: image
                  }
      }

      await message.POSTImage(templatePost);
      })
    }
    )
})

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
      const templatePost = 
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

      await message.PUT(templatePost);
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
