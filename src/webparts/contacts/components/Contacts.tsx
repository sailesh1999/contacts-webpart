import * as React from 'react';
import styles from './Contacts.module.scss';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { IContactsState } from './IContactsState';
import ContactService from '../../contacts/services/ContactService';
import Form from './Form/Form';
import { FormTypes } from './Form/FormTypes';
import Detail from './Detail/Detail';
import Header from './Header/Header';
import ContactsList from './ContactsList/ContactsList';
import { Contact } from '../../../Models/Contact';
import { Department } from '../departments/departments';
import ContactConverter from '../../../Converter/ContactConverter';


export default class Contacts extends React.Component<{}, IContactsState> {
  private service: ContactService;
  converter:ContactConverter=new ContactConverter();
  contactList: Contact[] = [];

  public constructor(props) {
    super(props);
    this.service = new ContactService();
    this.state = {
      contactList: [],
      activeContact: new Contact(),
      filter: Department.All,
      formType: FormTypes.None
    };

    this.setActiveContact = this.setActiveContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.activeContactExist = this.activeContactExist.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setFormType = this.setFormType.bind(this);
    this.detailDOM = this.detailDOM.bind(this);
  }

  public componentDidMount() {
    this.service.getContacts()
      .then((ListItems: any[]) => {
        ListItems.map((list) => {
          let cont = this.converter.spContactToContact(list)
          this.contactList.push(cont);
        })
        this.setState({ contactList: this.contactList })
      })
    console.log("Contacts loaded");
  }

  public convertSPDate(d) {
    if (d == null)
      return d;
    var xDate = d.split("T")[0];
    return xDate;
  }


  public setFilter(filter: Department) {
    this.setState({ filter: filter });
  }

  public setContactList(contactList: Contact[]) {
    this.setState({ contactList: contactList });
  }


  public setActiveContact(contact: Contact): Contact {
    this.setState({ activeContact: contact });
    return this.state.activeContact;
  }

  public setFormType(formType: FormTypes) {
    this.setState({
      formType: formType
    })
  }

  public addContact(contact: Contact) {
    this.setActiveContact(new Contact());
    if (this.state.contactList.length != 0) {
      contact.id = this.state.contactList[this.state.contactList.length - 1].id + 1
    }
    else {
      contact.id = 0;
    }
    console.log(contact)
    this.service.addContact(contact)
      .then((e) => {
        let contactListCopy = this.state.contactList.slice();
        contactListCopy.push(new Contact(contact));
        this.setState({ contactList: contactListCopy })
      })
  }

  public editContact(contact: Contact) {
    this.service.editContact(contact)
      .then((e) => {
        this.state.contactList[this.state.contactList.indexOf(this.state.activeContact)] = contact;
        this.setActiveContact(contact);
      })
  }

  public deleteContact(activeContactId: number) {
    this.setFormType(FormTypes.None);
    this.setActiveContact(new Contact());
    this.service.deleteContact(activeContactId)
      .then((e) => {
        let contactListCopy = this.state.contactList.slice();
        contactListCopy = contactListCopy.filter((contact) => { return contact.id != activeContactId })
        this.setState({ contactList: contactListCopy });
        console.log("Deleted contact and updated list");
      })
  }

  public activeContactExist(): boolean {
    if (this.state.activeContact.name != "") {
      return true;
    }
    return false;
  }

  public detailDOM() {
    if (this.activeContactExist()) {
      return (
        <div className={styles["active-contact-details"]}>
          <Detail activeContact={this.state.activeContact} />
          <div className={styles["edit-options"]}>

            <PrimaryButton className={styles.edit} onClick={(e) => {
              this.setState({ formType: FormTypes.Edit })
            }}>EDIT</PrimaryButton>

            <DefaultButton onClick={(e) => {
              this.deleteContact(this.state.activeContact.id);
            }
            }   >Delete Contact</DefaultButton>
          </div>
        </div>
      )

    }
    else {
      return null;
    }
  }


  public render(): React.ReactElement<IContactsState> {
    return (
      <div className={styles.contact}>
        <Header
          contactList={this.state.contactList}
          setFilter={this.setFilter}
          setActiveContact={this.setActiveContact}
          setFormType={this.setFormType}
        />

        <ContactsList
          setActiveContact={this.setActiveContact}
          contactList={this.state.contactList}
          setFormType={this.setFormType}
          filter={this.state.filter}
        />

        {this.detailDOM()}

        <Form
          addContact={this.addContact}
          editContact={this.editContact}
          activeContact={this.state.activeContact}
          formType={this.state.formType}
          setFormType={this.setFormType}
        />
        <br />
      </div>
    )
  }
}
