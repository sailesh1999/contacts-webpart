import * as React from "react";

import { IFormProps } from './IFormProps';
import { Contact } from '../../../../Models/Contact';
import { Department } from "../../departments/departments";
import { FormTypes } from "./FormTypes";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DatePicker, DefaultButton } from 'office-ui-fabric-react';

interface IFormState {
  inputContact: Contact;
  errors:{};
}

export default class Form extends React.Component<IFormProps, IFormState>{
  public formType: FormTypes;
  public inputContact: Contact = new Contact({});
  public errorList={
    name:"Field shouldn't be empty",
    num:"Field shouldn't be empty. Accepted input is numbers only",
    department:"Department should be selected",
    address:"Address shouldn't be empty"
  };
  public constructor(props: IFormProps) {
    super(props);
    this.state = { inputContact: this.props.activeContact ,errors:{}};
    this.formDOM = this.formDOM.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.processInputData = this.processInputData.bind(this);
    this.handleValidation=this.handleValidation.bind(this);
    this.isChecked=this.isChecked.bind(this);
  }

  public componentWillReceiveProps() {   
    this.setState({ inputContact: this.props.activeContact });
  }

  public componentDidUpdate(prevProps:IFormProps){
    if(this.props.formType!=prevProps.formType){
      let errors;
      if(this.props.formType==FormTypes.Add){
        errors={
         name:true,
         num:true,
         department:true,
         address:true
       };
     }
     else{
        errors={
         name:false,
         num:false,
         department:false,
         address:false,
       };
     }
     this.setState({errors:errors});
    }
    if(this.props.activeContact!=prevProps.activeContact)
    {
      this.setState({ inputContact: this.props.activeContact });
    }
  }

  public handleChange(e) {
    let fieldName;
    let contact: Contact = new Contact(this.state.inputContact);
    if(e.target.name!=undefined){
      fieldName=e.target.name;
    }
    else{
      fieldName=e.target.title;
    }
    contact[fieldName] = e.target.value;
    this.setState({ inputContact: contact });
    console.log(contact);
  }

  // public handleChange(e) {
  //   let contact: Contact = new Contact(this.state.inputContact)
  //   contact[e.target.name] = e.target.value;
  //   this.setState({ 
  //     inputContact:{
  //     ...this.state.inputContact,[e.target.name]:[e.target.value]
  //     }
  //   })
  // }

  public handleChange2(e,item,name){
    let contact: Contact = new Contact(this.state.inputContact);
    contact[name]=item.key;
    this.setState({inputContact:contact});
    let errors=this.state.errors;
    errors[name]=false;
    this.setState({errors:errors});
    
  }

  public handleCheckBox(e,isChecked,name){
    let fieldName="relation";
    let fieldValue=name;
    let checked=e.target.checked;
    let contact: Contact = new Contact(this.state.inputContact);
    if(contact[fieldName]==undefined){
      contact[fieldName]=[];
    }
    if(isChecked){
      contact[fieldName].push(fieldValue);
    }
    else{
      contact[fieldName].splice(contact[fieldName].indexOf(fieldValue),1);
    }
    this.setState({ inputContact: contact });
  }

  public handleCalendar(date){
    let contact: Contact = new Contact(this.state.inputContact);
    contact.birthdate=date;
    this.setState({inputContact:contact});
  }

  public isFormValid(errors){
    for (let error in errors){
      if(errors[error]==true){
        return false;
      }
    }
    return true;
  }

  public handleValidation(e){
    let errors=this.state.errors;
    let fieldName=e.target.name;
    let fieldValue=e.target.value;
    let classNames=e.target.className.split(" ");
    errors[fieldName]=false;
    if(classNames.indexOf("required")>-1){
      if(fieldValue==""){
        errors[fieldName]=errors[fieldName]||true;
      }
      else{
        errors[fieldName]=errors[fieldName]||false;
      }
    }
    
    if(classNames.indexOf("number")>-1){
      if(isNaN(fieldValue)){
        errors[fieldName]=errors[fieldName]||true;
      }
      else{
        errors[fieldName]=errors[fieldName]||false;
      }
    }  
    this.setState({errors:errors});
  }

  public isChecked(checkBoxName:String){
    if(this.state.inputContact.relation==undefined){
      return false;
    }
    if(this.state.inputContact.relation.indexOf(checkBoxName)>-1){
      return true;
    }
    return false;
  }

  public getErrorDialog(name){
    if(this.state.errors[name]){
      return(this.errorList[name]);
    }
    return "";
  }

  public processInputData() {
    let actionDOM;
    if(this.isFormValid(this.state.errors)){
      if (this.props.formType == FormTypes.Edit) {      
          actionDOM=<div>
            <DefaultButton onClick={(e) => {
              this.props.setFormType(FormTypes.None);
              this.props.editContact(this.state.inputContact);
              this.props.setContactListVisibility(true);
            }}
            >Edit</DefaultButton>           
          </div>;       
      }
      else {
        
          actionDOM=<div>
            <DefaultButton onClick={(e) => {
              this.props.addContact(this.state.inputContact);
              this.props.setFormType(FormTypes.None);
              this.props.setContactListVisibility(true);
            }}> Add</DefaultButton>            
          </div>;
        
      }
    }
    else{
      actionDOM=<div></div>;
    }
    return(
      <div>
        {actionDOM}
        <DefaultButton onClick={(e) => {
              this.props.setFormType(FormTypes.None);
              this.props.setContactListVisibility(true);

            }}> Cancel</DefaultButton>
      </div>
    );
    
  }

  public formDOM() {
    if (this.props.formType == FormTypes.None) {
      return null;
    }
    else {
      return (<div>
        <h3>{FormTypes[this.props.formType]} contact:</h3>

        <div>
        <TextField inputClassName="required" name="name" value={this.state.inputContact.name} label="Name" errorMessage={this.getErrorDialog("name")} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } />
        </div>
        
        <div>
        <TextField inputClassName="required number" name="num" value={this.state.inputContact.num} label="Number" errorMessage={this.getErrorDialog("num")} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } />
          </div>

          <div>
          <Dropdown 
          label="Department"
          title="department"
          errorMessage={this.getErrorDialog("department")}
          selectedKey={this.inputContact.department}
          options={[
            {key:Department.IT,text:Department.IT},
            {key:Department.Sales,text:Department.Sales}
          ]}
          onChange={(e,item)=>{
            this.handleChange2(e,item,"department");
          }}>            
          </Dropdown>
          </div>

          <div>
          <TextField inputClassName="required" name="address" value={this.state.inputContact.address} label="Address" errorMessage={this.getErrorDialog("address")} multiline={true} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } />          
          </div>

          <div>
            <ChoiceGroup
            name="gender"
            label="Gender"
            selectedKey={this.state.inputContact.gender==undefined?"Male":this.state.inputContact.gender}
            options={[
              {key:'Male',text:"Male"},
              {key:'Female',text:"Female"}
            ]}
            onChange={(e,option)=>{
              this.handleChange2(e,option,"gender");
            }}
            >
            </ChoiceGroup>
          </div>

          <DatePicker value={this.state.inputContact.birthdate} label="Date of Birth" onSelectDate={(e)=>{
            this.handleCalendar(e);
          }}></DatePicker>

          <TextField name="picture" value={this.state.inputContact.picture} label="Picture" onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } />

          Relation<div>
              <Checkbox
               label="Friend"
               checked={this.isChecked("Friend")}
               onChange={(e,isChecked)=>{
                this.handleCheckBox(e,isChecked,"Friend");
              }}></Checkbox>

               <Checkbox label="Colleague"
                checked={this.isChecked("Colleague")}
                onChange={(e,isChecked)=>{
                this.handleCheckBox(e,isChecked,"Colleague");
              }}></Checkbox>
          </div> 
        {this.processInputData()}
      </div>);
    }
  }

  public render(): React.ReactElement<IFormState> {
    return (this.formDOM());
  }
}

