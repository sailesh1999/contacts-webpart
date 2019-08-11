import { Contact } from './../../../Models/Contact';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import * as React from "react";

// interface IContactServiceState{
//   activeContact:any;
// }

// interface IContactServiceProps{

// }

export default class ContactService {

    contactList=[
       
        ];


    spHttpClient:SPHttpClient;
    currentWebUrl:string;

    public constructor(spHttpClient:SPHttpClient,currentWebUrl:string){  

      this.spHttpClient=spHttpClient;
      this.currentWebUrl=currentWebUrl;

 

    }

    // public getContactsPromise()
    // {
    //   this.contactList=[]
    //     this.spHttpClient.get(`${this.currentWebUrl}/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

    //         response.json().then((ListItems: any) => {
      
    //           ListItems.value.map((list)=>{
    //               this.contactList.push({id:list['ID'],name:list['Title'],num:list['num'],department:list['department']})
    //             })
    //         });
    //       });
    //      //this.contactList;

    //      let promise = new Promise(function(resolve,reject){

    //      })

    // }


    public getContacts(){
      this.contactList=[]
        this.spHttpClient.get(`${this.currentWebUrl}/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

            response.json().then((ListItems: any) => {
      
              ListItems.value.map((list)=>{
                  this.contactList.push({id:list['ID'],name:list['Title'],num:list['num'],department:list['department']})
                })
            });
          });
        return this.contactList;
    }

    public addContact(contact){
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

    public editContact(contact){
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

    public deleteContact(activeContactId){
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
