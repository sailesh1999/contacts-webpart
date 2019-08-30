import * as React from "react";

import { IFormProps } from './IFormProps';
import { Contact } from '../../../../Models/Contact';
import { Department } from "../../departments/departments";
import { FormTypes } from "./FormTypes";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react';





interface IFormState {
  inputContact: Contact;
  errors:{};
}

export default class Form extends React.Component<IFormProps, IFormState>{
  formType: FormTypes;
  inputContact: Contact = new Contact({});
  errorList={
    name:"Field shouldn't be empty",
    num:"Field shouldn't be empty. Accepted input is numbers only",
    department:"Department should be selected",
    address:"Address shouldn't be empty"
  }
  public constructor(props: IFormProps) {
    super(props);
    this.state = { inputContact: this.props.activeContact ,errors:{}};
    this.formDOM = this.formDOM.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleValidation=this.handleValidation.bind(this);
    this.isChecked=this.isChecked.bind(this);
  }

  public componentWillReceiveProps() {   
    this.setState({ inputContact: this.props.activeContact })
  }

  public componentDidUpdate(prevProps:IFormProps){
    if(this.props.formType!=prevProps.formType){
      let errors
      if(this.props.formType==FormTypes.Add){
        errors={
         name:true,
         num:true,
         department:true,
         address:true
       }
     }
     else{
        errors={
         name:false,
         num:false,
         department:false,
         address:false,
       }
     }
     this.setState({errors:errors})
    }
    if(this.props.activeContact!=prevProps.activeContact)
    {
      this.setState({ inputContact: this.props.activeContact })
    }
  }

  public handleChange(e) {
    console.log(e.target.key)
    let fieldName;
    let contact: Contact = new Contact(this.state.inputContact)
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
    // let fieldName=e.target.title;
    console.log(item,e.target.title);
    let contact: Contact = new Contact(this.state.inputContact)
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
    let contact: Contact = new Contact(this.state.inputContact)

    if(contact[fieldName]==undefined){
      contact[fieldName]=[];
    }

    if(isChecked){
      contact[fieldName].push(fieldValue)
    }
    else{
      contact[fieldName].splice(contact[fieldName].indexOf(fieldValue),1);
    }
    // console.log(contact)
    this.setState({ inputContact: contact })
  }

  public handleCalendar(date){
    let contact: Contact = new Contact(this.state.inputContact)
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
    //console.log(e.target.className)
    errors[fieldName]=false;
    // console.log(typeof(fieldValue))
    // console.log(fieldValue=="")
     console.log(classNames);
    // console.log(e.target.className)
     console.log(classNames.indexOf("required"))

    if(classNames.indexOf("required")>-1){
      console.log(fieldValue)
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

    this.setState({errors:errors})
    console.log(errors)

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
      return(this.errorList[name])
    }
    return "";
  }

  public sendData() {
    let actionDOM;
    if(this.isFormValid(this.state.errors)){
      if (this.props.formType == FormTypes.Edit) {
        
          actionDOM=<div>
            <button onClick={(e) => {
              this.props.setFormType(FormTypes.None);
              this.props.editContact(this.state.inputContact);
            }}
            >Edit</button>
            
          </div>
        
      }
      else {
        
          actionDOM=<div>
            <button onClick={(e) => {
              this.props.addContact(this.state.inputContact);
              this.props.setFormType(FormTypes.None);
            }}> Add</button>
            
          </div>
        
      }
    }
    else{
      actionDOM=<div></div>
    }
    return(
      <div>
        {actionDOM}
        <button onClick={(e) => {
              this.props.setFormType(FormTypes.None);
            }}> Cancel</button>
      </div>
    )
    
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
        <TextField inputClassName="required" name="num" value={this.state.inputContact.num} label="Number" errorMessage={this.getErrorDialog("num")} onChange={
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
            options={[
              {key:'Male',text:"Male"},
              {key:'Female',text:"Female"}
            ]}
            onChange={(e,option)=>{
              this.handleChange2(e,option,"gender")
            }}
            >
            </ChoiceGroup>
          </div>


          <DatePicker value={this.state.inputContact.birthdate} onChange={(e)=>{
            this.handleCalendar(e);
          }}></DatePicker>

            

          {/* DOB:<input type="date" name="birthdate" value={this.state.inputContact.birthdate} onChange={(e)=>{
            this.handleChange(e);
          }} >
          </input>
         */}
          <TextField name="picture" value={this.state.inputContact.picture} label="Picture" onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } />

          Relation<div>
              <Checkbox label="Friend" onChange={(e,isChecked)=>{
                this.handleCheckBox(e,isChecked,"Friend");
              }}></Checkbox>

               <Checkbox label="Colleague" onChange={(e,isChecked)=>{
                this.handleCheckBox(e,isChecked,"Colleague");
              }}></Checkbox>
          </div>  



          
       
        {this.sendData()}
      </div>)
    }
  }

  public render(): React.ReactElement<IFormState> {
    return (this.formDOM());
  }
}

