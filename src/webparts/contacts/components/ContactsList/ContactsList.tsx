import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";
import { FormTypes } from "../Form/FormTypes";
import { Department } from "../../departments/departments";

interface IContactsListProps {
    contactList: Contact[];
    setActiveContact: ((contact: Contact) => Contact);
    setFormType: ((formType: FormTypes) => void);
    filter: Department;
}

export default class ContactsList extends React.Component<IContactsListProps, {}>{
    selectedList: Contact[] = []

    public constructor(props: IContactsListProps) {
        super(props);
        this.generateContactsListDOM = this.generateContactsListDOM.bind(this);
        this.filterList = this.filterList.bind(this);
        this.generateContactsListDOM();
    }

    public filterList() {
        if (this.props.filter == Department.All) {
            this.selectedList = this.props.contactList
        }
        else {
            this.selectedList = this.props.contactList.filter(
                (contact) => {
                    return (contact.department == this.props.filter)
                })
        }
    }

    public generateContactsListDOM() {
        this.filterList();
        if (this.selectedList.length == 0) {
            return (<div>
                <small>No contacts to display. Click +Add to add a contact</small>
            </div>)
        }
        else {
            return (<div className={styles["contacts-container"]}>
                <h3 className={styles["contacts-header"]}>CONTACTS</h3>
                <ul className={styles["contacts-list"]}>

                    {this.selectedList.map(
                        (contact, i) =>
                            <li onClick={(e) => {
                                this.props.setFormType(FormTypes.None);
                                this.props.setActiveContact(contact);
                            }
                            }   >
                                <h1 className={styles["list-contact-name"]}>{contact.name}</h1>
                            </li>
                    )}
                </ul>
            </div>)
        }
    }

    public render(): React.ReactElement<{}> {
        return (this.generateContactsListDOM());
    }
}