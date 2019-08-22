import * as React from 'react';
import styles from './Contacts.module.scss';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';


import { IContactsState } from './IContactsState';
import ContactService from '../../contacts/services/ContactService';


import Form from './Form/Form';
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
  filteredList:Contact[]=[];

  public constructor(props) {
    super(props); 
    
    this.service=new ContactService(this.props.spHttpClient,this.props.currentWebUrl);

    this.state = {
      contactList: [],
      selectedList:[],
      activeContact:new Contact(),
      edit: false, 
      add: false,
      filter:"All"
    };

    this.setActiveContact=this.setActiveContact.bind(this);
    this.activateAddForm=this.activateAddForm.bind(this);
    this.deactivateAddForm=this.deactivateAddForm.bind(this);
    this.activateEditForm=this.activateEditForm.bind(this);
    this.deactivateEditForm=this.deactivateEditForm.bind(this);
    this.addContact=this.addContact.bind(this);
    this.setSelectedList=this.setSelectedList.bind(this);
    this.editContact=this.editContact.bind(this);
    this.deleteContact=this.deleteContact.bind(this);
    this.activeContactExist=this.activeContactExist.bind(this);
    this.setFilter=this.setFilter.bind(this);

  }

  public componentDidMount(){
    
    this.service.getContacts()
                    .then((ListItems: any) => {
                                              ListItems.map((list)=>{
                                                let cont = new Contact([list['ID'],list['Title'],list['num'],list['department']])
                                                this.state.contactList.push(cont);
                                              })
                          this.forceUpdate();
                       })
                     

    this.setState({selectedList:this.state.contactList})
    console.log("Contacts loaded");
  }

 public setFilter(filter:string){
   this.setState({filter:filter});
 }

  public setContactList(contactList:Contact[])
  {
    this.setState({contactList:contactList});
  }

  public setSelectedList(contactList:Contact[]){
    this.setState({selectedList:contactList});
  }
  
  public setActiveContact(contact:Contact):Contact{
    this.setState({activeContact:contact});
    return this.state.activeContact;
  }

  public activateAddForm()
  {
    this.setState({add:true});
    this.setActiveContact(new Contact())
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
    this.setActiveContact({id:-1,name:'',num:'',department:''});
    if(this.state.contactList.length!=0)
    {
      contact.id=this.state.contactList[this.state.contactList.length-1].id+1
    }
    else
    {
      contact.id=0;
    }
    
    this.service.addContact(contact)
    .then((e)=>{

      let contactListCopy=this.state.contactList.slice();
     contactListCopy.push({id:contact.id,name:contact.name,num:contact.num,department:contact.department});
     if(this.state.filter==contact.department || this.state.filter=="All"){
      let selectedListCopy=this.state.selectedList.slice();
      selectedListCopy.push({id:contact.id,name:contact.name,num:contact.num,department:contact.department});
      this.setState({selectedList:selectedListCopy})
 
     }
     
     this.setState({contactList:contactListCopy})


  
    })
   
    this.setState({ add: false }) 
  }

  public editContact(contact:Contact){
    this.service.editContact(contact)
    .then((e)=>{
      this.setActiveContact(contact);
      if(this.state.activeContact.department!=this.state.filter && this.state.filter!="All"){
        let selectedListCopy=this.state.selectedList.slice();
        selectedListCopy=selectedListCopy.filter((contact)=>{return contact.department==this.state.filter});
        this.setState({selectedList:selectedListCopy})


      }
    })
    this.setState({edit:false});
  }

 
  public deleteContact(activeContactId:number){
    this.setState({edit:false,add:false})
    this.setActiveContact({id:-1,name:'',num:'',department:''});
    this.service.deleteContact(activeContactId)
    .then((e)=>{
      let contactListCopy=this.state.contactList.slice();
      let selectedListCopy=this.state.selectedList.slice();
              contactListCopy=contactListCopy.filter((contact)=>{return  contact.id!=activeContactId})
              selectedListCopy=selectedListCopy.filter((contact)=>{return  contact.id!=activeContactId})


    
        this.setState({contactList:contactListCopy});
        this.setState({selectedList:selectedListCopy})

       
      console.log("Deleted contact and updated list");    
    })
  }

  public activeContactExist():boolean
  {
    if(this.state.activeContact.name!="")
    {
      return true;
    }
    return false;
  }

  public render(): React.ReactElement<IContactsState> {
      return (
      
      
      <div className={styles.contact}>

        <Header setSelectedList={this.setSelectedList} contactList={this.state.contactList} activateAddForm={this.activateAddForm} deactivateAddForm={this.deactivateAddForm} activateEditForm={this.activateEditForm} deactivateEditForm={this.deactivateEditForm} setFilter={this.setFilter} setActiveContact={this.setActiveContact}/>
        <ContactsList activeContact={this.state.activeContact} setActiveContact={this.setActiveContact} selectedList={this.state.selectedList}/>

        <div className={styles["active-contact-details"]}>
          <Detail activeContact={this.state.activeContact}/>
            <div className={styles["edit-options"]}>
                  <PrimaryButton className={styles.edit} onClick={(e) =>{
                                                                      if(this.activeContactExist())
                                                                      {
                                                                        this.setState({ edit: true, add: false })
                                                                      }
                                                                      else{
                                                                        window.alert("Select a contact first");
                                                                      } 
                                                                      
                                                                      }}>EDIT</PrimaryButton>
                  <DefaultButton onClick={(e)=>{
                    if(this.activeContactExist()){
                      this.deleteContact(this.state.activeContact.id);
                      
                    }
                    else{
                      window.alert("Select a contact first");
                    }
                                        }
                    }   >Delete Contact</DefaultButton>
            </div>
        </div>

        
        <Form add={this.state.add}  addContact={this.addContact} edit={this.state.edit } activeContact={this.state.activeContact} setActCon={this.setActiveContact} deactivateAddForm={this.deactivateAddForm} deactivateEditForm={this.deactivateEditForm} editContact={this.editContact}/>

        <br></br>

      </div>
      )
  }
}
