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
import { SPHttpClient } from '@microsoft/sp-http';
import { Department } from '../departments/departments';

interface IContactsProps {
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
}

export default class Contacts extends React.Component<IContactsProps, IContactsState> {
  private service: ContactService;
  contactList: Contact[] = [];

  public constructor(props:IContactsProps) {
    super(props);
    this.service = new ContactService(this.props.spHttpClient, this.props.currentWebUrl);
    this.state = {
      contactList: [],
      selectedList: [],
      activeContact: new Contact(),
      filter: Department.All,
      formType: FormTypes.None
    };

    this.setActiveContact = this.setActiveContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.setSelectedList = this.setSelectedList.bind(this);
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.activeContactExist = this.activeContactExist.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setFormType = this.setFormType.bind(this);
    this.detailDOM = this.detailDOM.bind(this);
  }

  public componentDidMount() {
    this.service.getContacts()
      .then((ListItems: Contact[]) => {
        ListItems.map((list) => {
          let cont = new Contact({ id: list['ID'], name: list['Title'], num: list['num'], department: list['department'] })
          this.contactList.push(cont);
        })
        this.setState({ contactList: this.contactList })
      })
    this.setState({ selectedList: this.contactList })
    console.log("Contacts loaded");
  }

  public setFilter(filter: Department) {
    this.setState({ filter: filter });
  }

  public setContactList(contactList: Contact[]) {
    this.setState({ contactList: contactList });
  }

  public setSelectedList(contactList: Contact[]) {
    this.setState({ selectedList: contactList });
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
    this.setActiveContact({ id: -1, name: '', num: '', department: '' });
    if (this.state.contactList.length != 0) {
      contact.id = this.state.contactList[this.state.contactList.length - 1].id + 1
    }
    else {
      contact.id = 0;
    }
    this.service.addContact(contact)
      .then((e) => {
        let contactListCopy = this.state.contactList.slice();
        contactListCopy.push({ id: contact.id, name: contact.name, num: contact.num, department: contact.department });
        if (this.state.filter == contact.department || this.state.filter == Department.All) {
          let selectedListCopy = this.state.selectedList.slice();
          selectedListCopy.push({ id: contact.id, name: contact.name, num: contact.num, department: contact.department });
          this.setState({ selectedList: selectedListCopy })
        }
        this.setState({ contactList: contactListCopy })
      })
  }

  public editContact(contact: Contact) {
    this.service.editContact(contact)
      .then((e) => {
        this.state.selectedList[this.state.selectedList.indexOf(this.state.activeContact)] = contact;
        this.state.contactList[this.state.contactList.indexOf(this.state.activeContact)] = contact;
        this.setActiveContact(contact);
        if (this.state.activeContact.department != this.state.filter && this.state.filter != Department.All) {
          let selectedListCopy = this.state.selectedList.slice();
          selectedListCopy = selectedListCopy.filter((contact) => { return contact.department == this.state.filter });
          this.setState({ selectedList: selectedListCopy })
        }
      })
  }

  public deleteContact(activeContactId: number) {
    this.setFormType(FormTypes.None);
    this.setActiveContact({ id: -1, name: '', num: '', department: '' });
    this.service.deleteContact(activeContactId)
      .then((e) => {
        let contactListCopy = this.state.contactList.slice();
        let selectedListCopy = this.state.selectedList.slice();
        contactListCopy = contactListCopy.filter((contact) => { return contact.id != activeContactId })
        selectedListCopy = selectedListCopy.filter((contact) => { return contact.id != activeContactId })
        this.setState({ contactList: contactListCopy });
        this.setState({ selectedList: selectedListCopy })
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
          setSelectedList={this.setSelectedList}
          contactList={this.state.contactList}
          setFilter={this.setFilter}
          setActiveContact={this.setActiveContact}
          setFormType={this.setFormType}
        />

        <ContactsList
          setActiveContact={this.setActiveContact}
          selectedList={this.state.selectedList}
        />

        {this.detailDOM()}

        <Form
          addContact={this.addContact}
          editContact={this.editContact}
          activeContact={this.state.activeContact}
          formType={this.state.formType}
          setFormType={this.setFormType}
        />

        <br></br>

      </div>
    )
  }
}
