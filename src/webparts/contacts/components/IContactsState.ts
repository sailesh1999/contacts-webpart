import { Contact } from "../../../Models/Contact";
import { FormTypes } from "./Form/FormTypes";
import { Department } from "../departments/departments";

export interface IContactsState  {
  contactList:Contact[];
  activeContact:Contact;
 selectedList:Contact[];
  filter:Department;
  formType:FormTypes;
}
