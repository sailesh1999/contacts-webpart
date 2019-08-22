import { Contact } from './../../../Models/Contact';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import * as React from "react";


export default class ContactService {



    spHttpClient:SPHttpClient;
    currentWebUrl:string;

    public constructor(spHttpClient:SPHttpClient,currentWebUrl:string){  

      this.spHttpClient=spHttpClient;
      this.currentWebUrl=currentWebUrl;

 

    }

    public getContacts(){
        return this.spHttpClient.get(`${this.currentWebUrl}/_api/web/lists/GetByTitle('Contacts')/items`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

            return response.json();
            
          });
    }

    public addContact(contact:Contact){
        let postString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items"
        const spOpts: ISPHttpClientOptions = {
          headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "OData-Version": "" //Really important to specify
          },
          body:JSON.stringify({
            __metadata:{type:'SP.Data.ContactsListItem'},
            Id:contact.id,
            Title:contact.name,
            department:contact.department,
            num:contact.num

          })
        }

        return this.spHttpClient.post(postString,SPHttpClient.configurations.v1,spOpts)
    }

    public editContact(contact:Contact){
      
      let editString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items("+contact.id+")"
      const spOpts:ISPHttpClientOptions={
        headers:{
          'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': '',
              'IF-MATCH': '*',
              'X-HTTP-Method': 'MERGE'
        },
        body:JSON.stringify({
          '__metadata':{type:'SP.Data.ContactsListItem'},
          Title:contact.name,
          department:contact.department,
          num:contact.num

        })

        
      }
      this.spHttpClient.post(editString,SPHttpClient.configurations.v1,spOpts).then((e)=>console.log("Updated list item"))
    }

    public deleteContact(activeContactId:number){
      const spOpts: ISPHttpClientOptions = {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          "IF-MATCH": "*",
          'X-HTTP-Method': 'DELETE'
        }      };
        let deleteString=this.currentWebUrl+"/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items("+activeContactId+")"
        return this.spHttpClient.post(deleteString,SPHttpClient.configurations.v1,spOpts);

    }
}
