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
        this.contactList.push(contact);
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
        this.spHttpClient.post(deleteString,SPHttpClient.configurations.v1,spOpts);
        //this.contactList.splice(activeContactId, 1);  
    }
}










// public setActiveContact(){
    //     this.spHttpClient.get(`${this.currentWebUrl}/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items(2)`, SPHttpClient.configurations.v1,
    //   {
    //     headers: {
    //       accept: "application/json"
    //     }
    //   }).then((response: SPHttpClientResponse) => {

    //     response.json().then((item:any)=>{

    //       this.activeContact={name:item.d.Title,num:item.d.num,department:item.d.department}
    //       console.log(this.activeContact);
    //       //return(this.activeContact);
    //     })
    //   })
    //   console.log(this.activeContact)

    //   //return this.activeContact;    
    // }
