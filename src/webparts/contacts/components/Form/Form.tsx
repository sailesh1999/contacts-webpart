import * as React from "react";

import { IFormProps } from './IFormProps';
import { Contact } from '../../../../Models/Contact';
import { Department } from "../../departments/departments";
import { FormTypes } from "./FormTypes";

interface IFormState {
  inputContact: Contact;
}

export default class Form extends React.Component<IFormProps, IFormState>{
  formType: FormTypes;
  inputContact: Contact = new Contact();
  public constructor(props: IFormProps) {
    super(props);
    this.state = { inputContact: this.props.activeContact };
    this.formDOM = this.formDOM.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  public componentWillReceiveProps() {
    this.setState({ inputContact: this.props.activeContact }, () => { console.log(this.state.inputContact) })
  }

  public handleChange(e) {
    let contact: Contact = new Contact(this.state.inputContact)
    contact[e.target.name] = e.target.value;
    console.log(this.state.inputContact)
    this.setState({ inputContact: contact })
  }

  public sendData() {
    if (this.props.formType == FormTypes.Edit) {
      return (
        <div>
          <button onClick={(e) => {
            this.props.setFormType(FormTypes.None);
            this.props.editContact(this.state.inputContact);
          }}
          >Edit</button>
          <button onClick={(e) => {
            this.props.setFormType(FormTypes.None);
          }}> Cancel</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={(e) => {
            this.props.addContact(this.state.inputContact);
            this.props.setFormType(FormTypes.None);
          }}> Add</button>
          <button onClick={(e) => {
            this.props.setFormType(FormTypes.None);
          }}> Cancel</button>
        </div>
      )
    }
  }

  public formDOM() {
    if (this.props.formType == FormTypes.None) {
      return null;
    }
    else {
      return (<div>
        <h3>{FormTypes[this.props.formType]} contact:</h3>
        name:<input type="text" name="name" value={this.state.inputContact.name} onChange={
          (e) => this.handleChange(e)
        } >
        </input>
        number:<input type="text" name="num" value={this.state.inputContact.num} onChange={
          (e) => this.handleChange(e)
        }></input>
        <select value={this.state.inputContact.department} name="department" onChange={(e) => this.handleChange(e)}>
          <option value="NotSpecified">Select</option>
          <option value={Department.IT}>IT</option>
          <option value={Department.Sales}>Sales</option>
        </select>

        {this.sendData()}
      </div>)
    }
  }

  public render(): React.ReactElement<IFormState> {
    return (this.formDOM());
  }
}

