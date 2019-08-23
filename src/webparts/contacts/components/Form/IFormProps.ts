import { Contact } from "../../../../Models/Contact";
import { FormTypes } from "./FormTypes";

export interface IFormProps{
    addContact:((contact:Contact)=>void);
    activeContact:Contact;
    editContact:((contact:Contact)=>void);
    formType:FormTypes;
    setFormType:((formType:FormTypes)=>void);
}