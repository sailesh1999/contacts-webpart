import * as React from 'react';
import styles from './Contacts.module.scss';
import { IContactsProps } from './IContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {getMockContacts} from './MockContacts';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

export default class Contacts extends React.Component< {} , IContactsProps> {
  selectedList:any;
  edit:any=null;
  add:any=null;
  public constructor(props)
  {
    super(props);

   this.state= {contactList:getMockContacts(),activeContact:getMockContacts()[0],tempName:'',tempNum:'1',tempDepartment:'IT',editForm:false,addForm:false};
   console.log(this.state.activeContact);
   this.selectedList=this.state.contactList;
  }

  
  public render(): React.ReactElement<IContactsProps> {
    if(this.state.editForm){
      this.edit=    <div>
      <h3>Edit selected contact:</h3>
      name:<input type="text" onChange={
                                        (e)=> 
                                        {
                                        this.state.activeContact.name=e.target.value;
                                        this.forceUpdate();
                                        }
                                        } >

                                        </input>
      number:<input type="text" onChange={ (e)=> 
                                        {
                                        this.state.activeContact.num=e.target.value;
                                        this.forceUpdate();

                                        }
                                        }></input>
      
      <select onChange={(e)=>{this.state.activeContact.department=e.target.value;this.forceUpdate()}}>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
      </select>
        <button onClick={(e)=>
          {
            this.setState({editForm:false});
          }}
          >Done</button>
      </div>
    }
    else{
      this.edit=null;
    }


    if(this.state.addForm){
      this.add=   <div>
      <h3>Addcontact:</h3>
     name:<input type="text" onChange={ (e)=>this.setState({tempName:e.target.value}) } ></input>
      number:<input type="text"  onChange={ (e)=>this.setState({tempNum:e.target.value}) }></input>
      department: 
     <select onChange={(e)=>this.setState({tempDepartment:e.target.value})}>
         <option value="IT">IT</option>
         <option value="Sales">Sales</option>
     </select>
      <button onClick={ (e)=>{
                        this.state.contactList.push( {name:this.state.tempName,num:this.state.tempNum,department:this.state.tempDepartment} );  
                        this.setState({addForm:false})
                        this.forceUpdate() } }> Done</button>

      </div>
     
    }
    else{
      this.add=null;
    }


    return (
      <div className={styles.contact}>




<div className={styles["header-container"]}>
  <div className={styles.header}>
      <p className={styles.title}>Address Book</p>
  </div>

<div className={styles.menu}>  
  <nav className={styles["menu-nav"]}>
    <ul className={styles["menu-items"]}>
      <li className={styles["menu-item"]} onClick={(e)=>this.setState({addForm:true,editForm:false})} >+add </li>
      <li className={styles["menu-item"]}>
      <select  
      onChange={ (e)=>{
        this.selectedList=[];
      
        if(e.target.value=="All")
        {
          this.selectedList=this.state.contactList;
     
        }
        else
        {
          
          this.state.contactList.map( (contact,i)=>{ 
            if(contact.department==e.target.value)
            {
              this.selectedList.push(contact);
            } 
          } );
        }
        this.forceUpdate();
      } } 
      >
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
        </select> </li>
      
    </ul>
	
  </nav>
  </div>
  
</div>




     
        <div className={styles["contacts-container"]}>
          <h3 className={styles["contacts-header"]}>CONTACTS</h3>
          <ul className={styles["contacts-list"]}>
          {this.selectedList.map( (contact,i) => <li onClick={ (e)=>{this.setState( { activeContact:contact } );this.forceUpdate()} }   > <h1 className={styles["list-contact-name"]}>{contact.name}</h1> </li> )}

          </ul>
        
        </div>
        
        <div className={styles["active-contact-details"]}>
        
        <h1 className={styles["detail-name"]}>{this.state.activeContact.name}</h1>
        <h1 className={styles["detail-value"]}>{this.state.activeContact.num}</h1>
        <h1 className={styles["detail-value"]}>{this.state.activeContact.department}</h1>

        <div className={styles["edit-options"]}>
        <button className={styles.edit} onClick={(e)=>this.setState({editForm:true,addForm:false})}>EDIT</button>
        <button onClick={ (e)=> {
          
          this.state.contactList.splice(this.state.contactList.indexOf(this.state.activeContact),1);
          
            this.setState({activeContact:this.state.contactList[0]});
 
          
          this.forceUpdate();
         } }    >Delete Contact</button>
         </div>

        </div>
        
        {this.edit}

         {this.add}

        
        <br></br>

       
           
         
     
        
                                                                               
        
      
      </div>
    );
  }
}
