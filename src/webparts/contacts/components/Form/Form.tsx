import * as React from "react";

import { IFormProps } from './IFormProps';
import { Contact } from '../../../../Models/Contact';
import { Department } from "../../departments/departments";
import { FormTypes } from "./FormTypes";

interface IFormState {
  inputContact: Contact;
  errors:any;
}

export default class Form extends React.Component<IFormProps, IFormState>{
  formType: FormTypes;
  inputContact: Contact = new Contact();
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
         name:"Field shouldn't be empty",
         num:"Field shouldn't be empty. Accepted input is numbers only",
         department:"Department should be selected",
         address:"Address shouldn't be empty"
       }
     }
     else{
        errors={
         name:"",
         num:"",
         department:"",
         address:"",
         gender:""
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

  public isFormValid(errors){
    for (let error in errors){
      if(errors[error]!=""){
        return false;
      }
    }
    return true;
  }

  public handleValidation(e){
    let errors=this.state.errors;
    let fieldName=e.target.name;
    let fieldValue=e.target.value;
    if(fieldName=="name"){
      if(fieldValue==""){
        errors[fieldName]="Field shouldn't be empty";
      }
      else{
        errors[fieldName]="";
      }
    }
    
    if(fieldName=="num"){
      if(isNaN(fieldValue) || fieldValue==""){
        errors[fieldName]="Field shouldn't be empty. Accepted input is numbers only";
      }
      else{
        errors[fieldName]="";
      }
    }

    if(fieldName=="department"){
      if(fieldValue==""){
        errors[fieldName]="Department should be selected";
      }
      else{
        errors[fieldName]="";
      }
    }

    if(fieldName=="address"){
      if(fieldValue==""){
        errors[fieldName]="Address shouldn't be empty";
      }
      else{
        errors[fieldName]="";
      }
    }
    
    this.setState({errors:errors})

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
        name:<input type="text" name="name" value={this.state.inputContact.name} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }
        } >
        </input>
        <span style={{color: "red"}}>{this.state.errors["name"]}</span>

        </div>
        
        <div>
        number:<input type="text" name="num" value={this.state.inputContact.num} onChange={
          (e) => {
            this.handleChange(e);
            this.handleValidation(e)
          }

        }></input>
        <span style={{color: "red"}}>{this.state.errors["num"]}</span>

          </div>

          <div>
          Department:<select value={this.state.inputContact.department} name="department" onChange={(e) => {
            this.handleChange(e);
            this.handleValidation(e);
          }}>
          <option value="">Select</option>
          <option value={Department.IT}>IT</option>
          <option value={Department.Sales}>Sales</option>
        </select>
          <span style={{color: "red"}}>{this.state.errors["department"]}</span>
          </div>

          <div>
            Address:<textarea value={this.state.inputContact.address} name="address" rows={3} onChange={(e)=>{
              this.handleChange(e);
              this.handleValidation(e);
            }}></textarea>
                    <span style={{color: "red"}}>{this.state.errors["address"]}</span>
          </div>
          
          Gender:<div>
            Male:<input type="radio" name="gender" value="Male" checked={this.state.inputContact.gender=="Male"} onChange={(e)=>{
              this.handleChange(e);
              this.handleValidation(e);
            }}></input>

            Female:<input type="radio" name="gender" value="Female" checked={this.state.inputContact.gender=="Female"} onChange={(e)=>{
              this.handleChange(e);
              this.handleValidation(e);
            }}></input>
            <span style={{color: "red"}}>{this.state.errors["gender"]}</span>

          </div>
        
        {this.sendData()}
      </div>)
    }
  }

  public render(): React.ReactElement<IFormState> {
    return (this.formDOM());
  }
}

