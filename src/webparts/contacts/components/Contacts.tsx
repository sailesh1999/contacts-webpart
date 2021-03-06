import * as React from 'react';
import styles from './Contacts.module.scss';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';


import { IContactsState } from './IContactsState';
import ContactService from '../../contacts/services/ContactService';


import EditForm from './EditForm/EditForm';
import AddForm from './AddForm/AddForm';
import Detail from './Detail/Detail';
import Header from './Header/Header';
import ContactsList from './ContactsList/ContactsList';
import { Contact } from '../../../Models/Contact';
import { SPHttpClient } from '@microsoft/sp-http';

interface IContactsProps{
  spHttpClient:SPHttpClient;
  currentWebUrl:string;

}


export default class Contacts extends React.Component<IContactsProps, IContactsState> {
  service:ContactService;
  public constructor(props) {
    super(props); 
    
    this.service=new ContactService(this.props.spHttpClient,this.props.currentWebUrl);
    console.log("Calling service");

    this.state = {
      loading:true,
      contactList: [],
      selectedList:[],
      activeContact:new Contact(),
      edit: false, 
      add: false
    };

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
    
    this.service.getContacts()
                    .then((ListItems: any) => {
                                              ListItems.value.map((list)=>{
                                                let cont = new Contact(list['ID'],list['Title'],list['num'],list['department'])
                                              this.state.contactList.push(cont);
                          })
                          return true;
                       })
                       .then((e)=>{
                         this.setState({loading:false});
                         this.forceUpdate()
                            });


    this.setState({selectedList:this.state.contactList})
    console.log("Contacts loaded");
  }

  public setContactList(contactList)
  {
    this.setState({contactList:contactList});
  }

  public setSelectedList(contactList){
    this.setState({selectedList:contactList});
  }
  
  public setActiveContact(contact){
    this.setState({activeContact:contact});
  //  console.log(this.state.activeContact)
    return this.state.activeContact;
  }

  public activateAddForm()
  {
    this.setState({add:true});
  }

  public deactivateAddForm()
  {
    this.setState({add:false});
  }

  public activateEditForm()
  {
    this.setState({edit:true});
  }

  public deactivateEditForm()
  {
    this.setState({edit:false});
  }

  public addContact(contact:Contact){
    this.setActiveContact({id:'',name:'',num:'',department:''});
    this.service.addContact(contact).then((response)=>{
      return response.json()
      .then((addedContact)=>{
        contact.id=addedContact.d.Id
      })
      
    });
    this.state.contactList.push(contact);
    this.setState({ add: false }) 
  }

  public editContact(contact){
    this.service.editContact(contact);
    this.setState({edit:false});
  }

  public findContactIndex(contactId:number)
  {
    let ind,i=0;
    /*this.state.contactList.map((contact:Contact)=>{
        if(contact.id==contactId)
        {
          ind=i;
        }
        i++;
    })*/
    for(i=0;i<this.state.contactList.length;i++)
    {
      if(this.state.contactList[i].id==contactId)
      {
        ind=i;
        break;
      }
    }
    return ind;
    
  }
  
  public deleteContact(activeContactId:number){
    this.setActiveContact({id:'',name:'',num:'',department:''});
    let ind:number=this.findContactIndex(activeContactId);
    this.service.deleteContact(activeContactId);
    this.state.contactList.splice(ind,1);
    this.forceUpdate();
    console.log("Deleted contact and updated list");    
  }

  public render(): React.ReactElement<IContactsState> {
      return (
      
      
      <div className={styles.contact}>

        <Header setSelectedList={this.setSelectedList} contactList={this.state.contactList} activateAddForm={this.activateAddForm} deactivateAddForm={this.deactivateAddForm} activateEditForm={this.activateEditForm} deactivateEditForm={this.deactivateEditForm}/>
        <ContactsList activeContact={this.state.activeContact} setActiveContact={this.setActiveContact} selectedList={this.state.selectedList}/>

        <div className={styles["active-contact-details"]}>
          <Detail activeContact={this.state.activeContact}/>
            <div className={styles["edit-options"]}>
                  <PrimaryButton className={styles.edit} onClick={(e) => this.setState({ edit: true, add: false })}>EDIT</PrimaryButton>
                  <DefaultButton onClick={(e)=>this.deleteContact(this.state.activeContact.id)}   >Delete Contact</DefaultButton>
            </div>
        </div>

        <EditForm edit={this.state.edit } activeContact={this.state.activeContact} setActCon={this.setActiveContact} deactivateEditForm={this.deactivateEditForm} editContact={this.editContact}/>
        
        <AddForm add={this.state.add} addContact={this.addContact}/>

        <br></br>

      </div>
      )
  }
}
