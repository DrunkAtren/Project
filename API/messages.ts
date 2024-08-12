import { APIRequestContext, expect } from '@playwright/test';
import fs from "fs";
import path from "path";

export const api_key = "special-key"
export const baseUrl = 'https://petstore.swagger.io/'
export class Message 
{
    constructor(private request: APIRequestContext) {}

    async ResponseConsole(temp) 
    {
        if (temp.status()== 200)
        {
        console.log(await temp.json());
        }
        else if (temp.status() == 201)
        {
        console.log(await temp.json());
        }
        else
        {
        console.log('Error status: ' + await temp.status());
        }
    }

    async GETPetsBySelect(select)
    {
        const response = await this.request.get(baseUrl+'v2/pet/findByStatus?status='+select);
        
        await this.ResponseConsole(response);
    }

    async GETInventoryBySelect()
    {
        const response = await this.request.get(baseUrl+'v2/store/inventory');

        await this.ResponseConsole(response);
    }

    async POST(body: any, )
    {
        const response = await this.request.post(baseUrl+'v2/pet', 
        {
            headers: {
                'api_key': `(${api_key})`,
            },
            data:body
        });
        expect(response.json)
        await this.ResponseConsole(response);
    }

    async POSTImage(multipart:any)
    {   
 
        const response = await this.request.post(baseUrl+'v2/pet/1/uploadImage', 
            {
                multipart:multipart
            }
        );

        await this.ResponseConsole(response);
    }

    async DELETE(id)
    {
        const response = await this.request.delete(baseUrl+'v2/pet/'+id);

        await this.ResponseConsole(response);
    }

    async PUT(body: any, )
    {
        const response = await this.request.put(baseUrl+'v2/pet', 
        {
            data:body
        });

        await this.ResponseConsole(response);
    }
}