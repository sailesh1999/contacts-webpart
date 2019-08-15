import { Contact } from "../../../../Models/Contact";

export interface IEditFormProps{
    edit:boolean;
    activeContact:Contact;
    setActCon:any;
    deactivateEditForm:any;
    editContact:any;
}