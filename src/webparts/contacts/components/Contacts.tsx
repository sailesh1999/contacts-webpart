import * as React from 'react';
import styles from './Contacts.module.scss';
import { IContactsState } from './IContactsState';
import ContactService from '../../contacts/services/ContactService';


import EditForm from './EditForm/EditForm';
import AddForm from './AddForm/AddForm';
import Detail from './Detail/Detail';
import Header from './Header/Header';
import ContactsList from './ContactsList/ContactsList';
import { Contact } from '../../../Models/Contact';

interface IContactsProps{
  spHttpClient:any;
  currentWebUrl:any;

}


export default class Contacts extends React.Component<IContactsProps, IContactsState> {
  //selectedList: Contact[];
  service:ContactService;
  public constructor(props) {
    super(props); 
  
    this.service=new ContactService(this.props.spHttpClient,this.props.currentWebUrl);
    console.log("Calling service");

    this.state = {
      contactList: this.service.getContacts(),
      selectedList:[],
      activeContact:{id:'',name:'',num:'',department:''}  ,    //this.service.setActiveContact(),
      edit: false, 
      add: false
    };

    //this.selectedList = this.state.contactList;

    //console.log(this.selectedList);
    //this.forceUpdate();

    this.setActiveContact=this.setActiveContact.bind(this);
    this.activateAddForm=this.activateAddForm.bind(this);
    this.deactivateAddForm=this.deactivateAddForm.bind(this);
    this.activateEditForm=this.activateEditForm.bind(this);
    this.deactivateEditForm=this.deactivateEditForm.bind(this);
    this.addContact=this.addContact.bind(this);
    this.setSelectedList=this.setSelectedList.bind(this);
    this.editContact=this.editContact.bind(this);

  }

  public componentDidMount(){
    this.setState({selectedList:this.state.contactList})
    console.log("Updated selected list")
  }

  public setContactList(contactList)
  {
    this.setState({contactList:contactList});
    this.forceUpdate();
  }

  public setSelectedList(contactList){
    //this.selectedList=contactList;
    this.setState({selectedList:contactList});
    this.forceUpdate();
  }
  
  public setActiveContact(contact){
    this.setState({activeContact:contact});
    return this.state.activeContact;
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
    this.setActiveContact({id:'',name:'',num:'',department:''});
    this.service.addContact(contact).then((e)=>this.setState({contactList:this.service.getContacts()}));
    this.setState({ add: false }) 
  }

  public editContact(contact){
    this.service.editContact(contact);
    this.setState({edit:false});
  }
  
  public deleteContact(activeContactId){
    this.setActiveContact({id:'',name:'',num:'',department:''});
    console.log(this.state.activeContact);
    
    this.service.deleteContact(activeContactId).then((e)=>{
                                                          this.setState({contactList:this.service.getContacts()});
                                                          })
    console.log("Deleted contact and updated list");
    
    this.forceUpdate();

  }

  public render(): React.ReactElement<IContactsState> {
      return (
      
      
      <div className={styles.contact}>

        <Header setSelectedList={this.setSelectedList} contactList={this.state.contactList} activateAddForm={this.activateAddForm} deactivateAddForm={this.deactivateAddForm} activateEditForm={this.activateEditForm} deactivateEditForm={this.deactivateEditForm}/>
        {console.log("Sending data to list")}
        <ContactsList activeContact={this.state.activeContact} setActiveContact={this.setActiveContact} selectedList={this.state.selectedList}/>

        <div className={styles["active-contact-details"]}>
          <Detail activeContact={this.state.activeContact}/>
            <div className={styles["edit-options"]}>
                  <button className={styles.edit} onClick={(e) => this.setState({ edit: true, add: false })}>EDIT</button>
                  <button onClick={(e)=>this.deleteContact(this.state.activeContact.id)}   >Delete Contact</button>
            </div>
        </div>

        <EditForm edit={this.state.edit } activeContact={this.state.activeContact} setActCon={this.setActiveContact} deactivateEditForm={this.deactivateEditForm} editContact={this.editContact}/>
        
        <AddForm add={this.state.add} addContact={this.addContact}/>

        <br></br>

      </div>
      )
  }
}
