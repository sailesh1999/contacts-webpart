import { Contact } from './../../../Models/Contact';
import { SPHttpClient } from "@microsoft/sp-http";
import { sp, List, ItemAddResult, ItemUpdateResult } from "@pnp/sp";
import { IContactService } from './IContactService';


export default class ContactService implements IContactService {
  private spHttpClient: SPHttpClient;
  private currentWebUrl: string;

  public constructor() {
    
  }

  public getList(): List {
    return sp.web.lists.getByTitle("Contacts");
  }

  // Get using pnp js
  public getContacts(): Promise<Contact[]> {
    return this.getList().items.get()
  }

  //Add list item using pnpjs 
  public addContact(contact: Contact): Promise<ItemAddResult> {
    return this.getList().items.add({
      Id: contact.id,
      Title: contact.name,
      department: contact.department,
      num: contact.num,
      Address:contact.address,
      gender:contact.gender,
      birthdate:contact.birthdate
    })
  }

  //Update list item using pnpjs
  public editContact(contact: Contact): Promise<ItemUpdateResult> {
    return this.getList().items.getById(contact.id).update({
      Title: contact.name,
      department: contact.department,
      num: contact.num,
      Address:contact.address,
      gender:contact.gender,
      birthdate:contact.birthdate

    })
  }

  //Delete list item using pnpjs
  public deleteContact(activeContactId: number): Promise<void> {
    return this.getList().items.getById(activeContactId).delete()
  }
}