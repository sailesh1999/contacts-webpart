import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";

interface IContactsListProps{
   selectedList:Contact[];
   setActiveContact:((contact:Contact)=>Contact);
   activeContact:Contact;
}

export default class ContactsList extends React.Component<IContactsListProps,{}>{
   contactsListDOM;
public constructor(props:IContactsListProps){
    super(props);

    this.generateContactsListDOM=this.generateContactsListDOM.bind(this);

    this.generateContactsListDOM();
}



public generateContactsListDOM()
{
    if(this.props.selectedList.length==0)
    {
        this.contactsListDOM=<div>
            
            <small>No contacts to display. Click +Add to add a contact</small>
        </div>
    }
    else
    {
        this.contactsListDOM= <div className={styles["contacts-container"]}>
        <h3 className={styles["contacts-header"]}>CONTACTS</h3>
        <ul className={styles["contacts-list"]}>
          {this.props.selectedList.map(
              (contact, i) => 
              <li onClick={(e) => { 
                  this.props.setActiveContact(contact);
              
                    }
                    }   > 
                    <h1 className={styles["list-contact-name"]}>{contact.name}</h1> 
                    </li>
                    )}

        </ul>

      </div>
    }
}

    public render():React.ReactElement<{}>{
        this.generateContactsListDOM();
        return( this.contactsListDOM );
    }
}