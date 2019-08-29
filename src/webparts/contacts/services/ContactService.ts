import { Contact } from './../../../Models/Contact';
import { sp, List, ItemAddResult, ItemUpdateResult } from "@pnp/sp";
import { IContactService } from './IContactService';
import ContactConverter from '../../../Converter/ContactConverter'

export default class ContactService implements IContactService {
  converter:ContactConverter=new ContactConverter(this); 
  public constructor() {
    //this.converter== new ContactConverter();
  }

  public getList(): List {
    return sp.web.lists.getByTitle("Contacts");
  }

  // Get using pnp js
  public getContacts(): Promise<any[]> {
    return this.getList().items.get()
  }

  //Add list item using pnpjs 
  public addContact(contact: Contact): Promise<ItemAddResult> {
    let spContact=this.converter.contactToSPContact(contact);
    return this.getList().items.add(spContact)
  }

  //Update list item using pnpjs
  public editContact(contact: Contact): Promise<ItemUpdateResult> {
    let spContact=this.converter.contactToSPContact(contact)
    return this.getList().items.getById(contact.id).update(spContact)
  }

  //Delete list item using pnpjs
  public deleteContact(activeContactId: number): Promise<void> {
    return this.getList().items.getById(activeContactId).delete()
  }

  public getUser(userId:number){
    if(userId==null)
    return null
    let user;
    return sp.web.siteUsers.getById(userId).get()
    .then((result)=>{
      return result;
    })
  }
}