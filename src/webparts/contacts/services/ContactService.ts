import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";


export default class ContactService{

    contactList=[
       
        ];

    public constructor(client,webUrl){  
        

    }

    public getContact(spHttpClient,currentWebUrl){
        let contact;
        spHttpClient.get(`${currentWebUrl}/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items(1)`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

            response.json().then((ListItems: any) => {
            //  console.log(ListItems);
            //  console.log(ListItems.value[0]);
            contact= {name:ListItems.value['Title'],num:ListItems.value['num'],department:ListItems.value['department']}
            console.log(contact);
            return contact;
    //           ListItems.value.map((list)=>{
    //             //  console.log(list['Title'])
    //               this.contactList.push({name:list['Title'],num:list['num'],department:list['department']})
    //             })

    //           //  console.log(this.contactList);
                
              
    //          // console.log(ListItems.value[0]['Title']);
             });
           });
    //    // console.log(this.contactList);
    //     return this.contactList;
    }

    public getContacts(spHttpClient,currentWebUrl){
        spHttpClient.get(`${currentWebUrl}/sites/feature-testing/_api/web/lists/GetByTitle('Contacts')/items`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

            response.json().then((ListItems: any) => {
            //  console.log(ListItems);
            //  console.log(ListItems.value[0]);
              ListItems.value.map((list)=>{
                //  console.log(list['Title'])
                  this.contactList.push({name:list['Title'],num:list['num'],department:list['department']})
                })

              //  console.log(this.contactList);
                
              
             // console.log(ListItems.value[0]['Title']);
            });
          });
       // console.log(this.contactList);
        return this.contactList;
    }

    public addContact(contact){
        this.contactList.push(contact);
    }

    public deleteContact(activeContact){
        this.contactList.splice(this.contactList.indexOf(activeContact), 1);  
    }
}