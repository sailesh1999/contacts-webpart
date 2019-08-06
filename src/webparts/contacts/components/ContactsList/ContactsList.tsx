import * as React from "react";
import styles from '../Contacts.module.scss';

interface IContactsListProps{
   selectedList:any;
   setActiveContact:any;
   activeContact:any;
}

export default class ContactsList extends React.Component<IContactsListProps,{}>{
    filteredList:any=[];
public constructor(props:IContactsListProps){
    super(props);
}

    public render():React.ReactElement<{}>{
        return(
            <div className={styles["contacts-container"]}>
          <h3 className={styles["contacts-header"]}>CONTACTS</h3>
          <ul className={styles["contacts-list"]}>
            {this.props.selectedList.map(
                (contact, i) => 
                <li onClick={(e) => { 
                    this.props.setActiveContact(contact);
                 //   this.setState({ activeContact: contact });
                     this.forceUpdate()
                      }
                      }   > 
                      <h1 className={styles["list-contact-name"]}>{contact.name}</h1> 
                      </li>
                      )}

          </ul>

        </div>

        )
    }
}