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