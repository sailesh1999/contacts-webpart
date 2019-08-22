import { Contact } from "../../../Models/Contact";
import { ItemAddResult, ItemUpdateResult } from "@pnp/sp";

export interface IContactService{
    /**
     * getContacts
     * Returns list items json format promise
     */
     getContacts():Promise<any>;
    
     addContact(contact:Contact):Promise<ItemAddResult>

     editContact(contact:Contact):Promise<ItemUpdateResult>

     deleteContact(activeContactId:number):Promise<void>


}