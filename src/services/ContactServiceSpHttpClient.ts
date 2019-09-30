import { Contact } from '../Models/Contact';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import ContactConverter from '../Converter/ContactConverter';
import { SPWeb } from "@microsoft/sp-page-context";

export default class ContactServiceSpHttpClient{
    private spHttpClient:SPHttpClient;
    public converter:ContactConverter;

    public constructor(spHttpClient:SPHttpClient,web:SPWeb){
        this.spHttpClient=spHttpClient;
        this.converter=new ContactConverter();
    }

    public getContact(){
        this.spHttpClient.get("https://lesh99.sharepoint.com/sites/feature-testing/_api/web/lists/getbytitle('tempList')/items(1)",SPHttpClient.configurations.v1,
        {
            headers:{
                'Accept': 'application/json;odata=nometadata',  
                'Content-type': 'application/json;odata=nometadata',  
                'odata-version': ''  
            }
        })
        .then((response:SPHttpClientResponse)=>{
            console.log(response.json());
        });
    }

    public editContact(contact:Contact){
        let spContact=this.converter.contactToSPContact(contact);
        const body=JSON.stringify({
            'Title':'ssEdited2',
            'number':'10'
        });
        console.log(body);

        this.spHttpClient.post("https://lesh99.sharepoint.com/sites/feature-testing/_api/web/lists/getbytitle('tempList')/items(1)",SPHttpClient.configurations.v1,
        {
            headers: {  
                'Accept': 'application/json;odata=nometadata',  
                'Content-type': 'application/json;odata=nometadata',  
                'odata-version':'',
                'IF-MATCH': '*',  
                'X-HTTP-Method': 'MERGE'  
              },
              body:body             
        })
        .then((response:SPHttpClientResponse)=>{
            console.log(response);
            console.log(response.json());
        },
        (error:any)=>{
            console.log(error);
        }
        );
    }

    public createContact(){
        this.spHttpClient.post("https://lesh99.sharepoint.com/sites/feature-testing/_api/web/lists/getbytitle('TestingList2')/items",SPHttpClient.configurations.v1,
        {
            body:JSON.stringify({
                'Title':'thro spfx'
            })
        })
        .then((response)=>{
            console.log(response);
        });
    }

    public breakPermissionInheritance(){
        this.spHttpClient.post("https://lesh99.sharepoint.com/sites/feature-testing/_api/lists/getbytitle('TestingList2')/items(5)/breakroleinheritance(true)",SPHttpClient.configurations.v1,{})
        .then((response)=>{
            console.log(response);
        });
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