import { Contact } from "../../../../Models/Contact";

export interface IFormProps{
    add:boolean;
    addContact:((contact:Contact)=>void);
    edit:boolean;
    activeContact:Contact;
    setActCon:((contact:Contact)=>Contact)
    deactivateAddForm:(()=>void);
    deactivateEditForm:(()=>void);
    editContact:((contact:Contact)=>void);
    
}