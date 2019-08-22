import { Contact } from './../../../Models/Contact';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import * as React from "react";
import { sp, List, ItemAddResult, ItemUpdateResult } from "@pnp/sp";
import { IContactService } from './IContactService';


export default class ContactService implements IContactService {



    spHttpClient:SPHttpClient;
    currentWebUrl:string;

    public constructor(spHttpClient:SPHttpClient,currentWebUrl:string){  

      this.spHttpClient=spHttpClient;
      this.currentWebUrl=currentWebUrl;
    }

    public getList():List
    {
      return sp.web.lists.getByTitle("Contacts");
    }

    

   // Get using pnp js
    public getContacts():Promise<any[]>{
      return this.getList().items.get()
    }

    
   

    //Add list item using pnpjs 

    public addContact(contact:Contact):Promise<ItemAddResult>{
      return this.getList().items.add({
        Id:contact.id,
        Title:contact.name,
        department:contact.department,
        num:contact.num
      })
      

    }


    

    //Update list item using pnpjs
    public editContact(contact:Contact):Promise<ItemUpdateResult>{
      return this.getList().items.getById(contact.id).update({
        Title:contact.name,
        department:contact.department,
        num:contact.num
      })
    }



 

    //Delete list item using pnpjs
    public deleteContact(activeContactId:number):Promise<void>{
      return this.getList().items.getById(activeContactId).delete()
    }
}





//Get List item using SpHttpClient

    // public getContacts(){
    //     return this.spHttpClient.get(`${this.currentWebUrl}/_api/web/lists/GetByTitle('Contacts')/items`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

    //         return response.json();
            
    //       });
    // }


     // Add list item using SphttpClient

    // public addContact(contact:Contact){
    //     let postString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items"
    //     const spOpts: ISPHttpClientOptions = {
    //       headers: {
    //         "Accept": "application/json;odata=verbose",
    //         "Content-Type": "application/json;odata=verbose",
    //         "OData-Version": "" //Really important to specify
    //       },
    //       body:JSON.stringify({
    //         __metadata:{type:'SP.Data.ContactsListItem'},
    //         Id:contact.id,
    //         Title:contact.name,
    //         department:contact.department,
    //         num:contact.num

    //       })
    //     }

    //     return this.spHttpClient.post(postString,SPHttpClient.configurations.v1,spOpts)
    // }

    //Update list item using SpHttlpClient

    // public editContact(contact:Contact){
      
    //   let editString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items("+contact.id+")"
    //   const spOpts:ISPHttpClientOptions={
    //     headers:{
    //       'Accept': 'application/json;odata=nometadata',
    //           'Content-type': 'application/json;odata=verbose',
    //           'odata-version': '',
    //           'IF-MATCH': '*',
    //           'X-HTTP-Method': 'MERGE'
    //     },
    //     body:JSON.stringify({
    //       '__metadata':{type:'SP.Data.ContactsListItem'},
    //       Title:contact.name,
    //       department:contact.department,
    //       num:contact.num

    //     })

        
    //   }
    //   this.spHttpClient.post(editString,SPHttpClient.configurations.v1,spOpts).then((e)=>console.log("Updated list item"))
    // }

       //Delete list item using SpHttpClient

    // public deleteContact(activeContactId:number){
    //   const spOpts: ISPHttpClientOptions = {
    //     headers: {
    //       'Accept': 'application/json;odata=nometadata',
    //       'Content-type': 'application/json;odata=verbose',
    //       'odata-version': '',
    //       "IF-MATCH": "*",
    //       'X-HTTP-Method': 'DELETE'
    //     }      };
    //     let deleteString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items("+activeContactId+")"
    //     return this.spHttpClient.post(deleteString,SPHttpClient.configurations.v1,spOpts);

    // }
