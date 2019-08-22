import { Contact } from "../../../Models/Contact";

export interface IContactsState  {
  contactList:Contact[];
  activeContact:Contact;
 selectedList:Contact[];
  edit:boolean;
  add:boolean;
  filter:string;
}
