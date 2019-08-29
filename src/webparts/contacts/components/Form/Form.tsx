import * as React from "react";

import { IFormProps } from './IFormProps';
import { Contact } from '../../../../Models/Contact';
import { Department } from "../../departments/departments";
import { FormTypes } from "./FormTypes";

interface IFormState {
  inputContact: Contact;
  errors:{};
}

export default class Form extends React.Component<IFormProps, IFormState>{
  formType: FormTypes;
  inputContact: Contact = new Contact();
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
    let contact: Contact = new Contact(this.state.inputContact)
    contact[e.target.name] = e.target.value;
    this.setState({ inputContact: contact })
  }

  public handleCheckBox(e){
    let fieldName=e.target.name;
    let fieldValue=e.target.value;
    let checked=e.target.checked;
    let contact: Contact = new Contact(this.state.inputContact)

    if(checked){
      contact[fieldName].push(fieldValue)
    }
    else{
      contact[fieldName].splice(contact[fieldName].indexOf(fieldValue),1);
    }
    console.log(contact)
    this.setState({ inputContact: contact })
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

    this.setState({errors:errors})
    console.log(errors)

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
        name:<input className="" type="text" name="name" value={this.state.inputContact.name} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } >
        </input>
        <span style={{color: "red"}}>{this.getErrorDialog("name")}</span>

        </div>
        
        <div>
        number:<input className=" number" type="text" name="num" value={this.state.inputContact.num} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e)
          }

        }></input>
        <span style={{color: "red"}}>{this.getErrorDialog("num")}</span>

          </div>

          <div>
          Department:<select className="" value={this.state.inputContact.department} name="department" onChange={(e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }}>
          <option value="">Select</option>
          <option value={Department.IT}>IT</option>
          <option value={Department.Sales}>Sales</option>
        </select>
        <span style={{color: "red"}}>{this.getErrorDialog("department")}</span>
          </div>

          <div>
            Address:<textarea className="" value={this.state.inputContact.address} name="address" rows={3} onChange={(e)=>{
              this.handleChange(e);
              this.handleValidation(e);
            }}></textarea>
        <span style={{color: "red"}}>{this.getErrorDialog("address")}</span>
          </div>
          
          Gender:<div>
            Male:<input type="radio" name="gender" value="Male" checked={this.state.inputContact.gender=="Male"} onChange={(e)=>{
              this.handleChange(e);
              this.handleValidation(e);
            }}></input>

            Female:<input type="radio" name="gender" value="Female" checked={this.state.inputContact.gender=="Female"} onChange={(e)=>{
              this.handleChange(e);
            }}></input>
        <span style={{color: "red"}}>{this.getErrorDialog("gender")}</span>

          </div>

          DOB:<input type="date" name="birthdate" value={this.state.inputContact.birthdate} onChange={(e)=>{
            this.handleChange(e);
          }} >
          </input>
        
          Picture(URL):<input type="text" name="picture" value={this.state.inputContact.picture} onChange={(e)=>{
            this.handleChange(e);
            this.handleValidation(e);
          }} >
          </input>

          Relation:
          <div>
          Friend: <input type="checkbox" value="Friend" name="relation" checked={this.state.inputContact.relation.indexOf("Friend")>-1} onChange={(e)=>{
            this.handleCheckBox(e);
          }}>
          </input>

          Colleague: <input type="checkbox" value="Colleague" name="relation" checked={this.state.inputContact.relation.indexOf("Colleague")>-1} onChange={(e)=>{
            this.handleCheckBox(e);
          }}>
          </input>  
          </div>
       
        {this.sendData()}
      </div>)
    }
  }

  public render(): React.ReactElement<IFormState> {
    return (this.formDOM());
  }
}

