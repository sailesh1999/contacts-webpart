export default class ContactService{

    contactList=[
        {id:0,name:'Sailesh',num:'8888888888',department:'IT'},
        {id:1,name:'Rishith',num:'9999999999',department:'Sales'},
        {id:2,name:'Sailesh2',num:'8888888888',department:'IT'},
        {id:3,name:'Rishith2',num:'8888888888',department:'Sales'}
        ];

    public constructor(){

    }

    public getContacts(){
        return this.contactList;
    }

    public addContact(contact){
        this.contactList.push(contact);
    }

    public deleteContact(activeContact){
        this.contactList.splice(this.contactList.indexOf(activeContact), 1);  
    }
}