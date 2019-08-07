import * as React from 'react';
import styles from './Contacts.module.scss';
import { IContactsState } from './IContactsState';
import { getMockContacts } from './MockContacts';
import ContactService from '../../contacts/services/ContactService';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

import EditForm from './EditForm/EditForm';
import AddForm from './AddForm/AddForm';
import Detail from './Detail/Detail';
import Header from './Header/Header';
import ContactsList from './ContactsList/ContactsList';
import { Contact } from '../../../Models/Contact';


export default class Contacts extends React.Component<{}, IContactsState> {
  selectedList: Contact[];
  service:ContactService;
  public constructor(props) {
    super(props); 

    this.service=new ContactService();

    this.state = {
      contactList: this.service.getContacts(),
      activeContact: this.service.getContacts()[0],
      edit: false, 
      add: false
    };
    this.selectedList = this.state.contactList;

    this.setActiveContact=this.setActiveContact.bind(this);
    this.activateAddForm=this.activateAddForm.bind(this);
    this.deactivateAddForm=this.deactivateAddForm.bind(this);
    this.activateEditForm=this.activateEditForm.bind(this);
    this.deactivateEditForm=this.deactivateEditForm.bind(this);
    this.addContact=this.addContact.bind(this);
    this.setSelectedList=this.setSelectedList.bind(this);

  }

  public setSelectedList(contactList){
    this.selectedList=contactList;
    this.forceUpdate();
  }
  
  public setActiveContact(contact){
    this.setState({activeContact:contact});
  }

  public activateAddForm()
  {
    this.setState({add:true});
    this.forceUpdate();
  }

  public deactivateAddForm()
  {
    this.setState({add:false});
    this.forceUpdate();
  }

  public activateEditForm()
  {
    this.setState({edit:true});
    this.forceUpdate();
  }

  public deactivateEditForm()
  {
    this.setState({edit:false});
    this.forceUpdate();
  }

  public addContact(contact){
    this.service.addContact(contact);
    this.setState({ add: false }) 
  }
  
  public deleteContact(activeContact){
    this.service.deleteContact(activeContact);
    this.setState({ activeContact: this.state.contactList[0] });
    this.forceUpdate();

  }

  public render(): React.ReactElement<IContactsState> {

      return (
      <div className={styles.contact}>

        <Header setSelectedList={this.setSelectedList} contactList={this.state.contactList} activateAddForm={this.activateAddForm} deactivateAddForm={this.deactivateAddForm} activateEditForm={this.activateEditForm} deactivateEditForm={this.deactivateEditForm}/>
        <ContactsList activeContact={this.state.activeContact} setActiveContact={this.setActiveContact} selectedList={this.selectedList}/>

        <div className={styles["active-contact-details"]}>
          <Detail activeContact={this.state.activeContact}/>
            <div className={styles["edit-options"]}>
                  <button className={styles.edit} onClick={(e) => this.setState({ edit: true, add: false })}>EDIT</button>
                  <button onClick={(e)=>this.deleteContact(this.state.activeContact)}   >Delete Contact</button>
            </div>
        </div>

        <EditForm edit={this.state.edit } activeContact={this.state.activeContact} setActCon={this.setActiveContact} deactivateEditForm={this.deactivateEditForm}/>
        
        <AddForm add={this.state.add} addContact={this.addContact}/>

        <br></br>

      </div>
    );
  }
}
