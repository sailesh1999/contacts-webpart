import { Contact } from "../../../Models/Contact";

export interface IContactsState  {
  loading:boolean;
  contactList:Contact[];
  activeContact:Contact;
 selectedList:Contact[];
  edit:boolean;
  add:boolean;
}
