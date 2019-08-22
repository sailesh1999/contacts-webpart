import * as React from "react";

import {IFormProps} from './IFormProps';
import {Contact} from '../../../../Models/Contact';
import { Department } from "../../departments/departments";

export default class Form extends React.Component<IFormProps,{}>{
    form:any;
    inputContact:Contact=new Contact();//{id:0,name:'',num:'',department:''};
    public constructor(props){
        super(props);
        this.state={inputContact:Contact};

        this.addFormDOM=this.addFormDOM.bind(this);


    }

    public addFormDOM(){
      if (this.props.add) {
        this.form = <div>
          <h3>Addcontact:</h3>
          name:<input type="text" onChange={(e) =>  this.inputContact.name= e.target.value }></input>
          number:<input type="text" onChange={(e) => this.inputContact.num= e.target.value}></input>
          department:
       <select onChange={(e) => this.inputContact.department= e.target.value}>
            <option value="NotSpecified">Select</option>
            <option value={Department.IT}>IT</option>
            <option value={Department.Sales}>Sales</option>
          </select>
          <button onClick={(e)=>this.props.deactivateAddForm()}> Cancel</button>
          <button onClick={(e)=>this.props.addContact(this.inputContact)}> Done</button>
  
        </div>
  
      }
      else if(this.props.edit){
        this.form=    <div>
        <h3>Edit selected contact:</h3>
        name:<input type="text" value={this.props.activeContact.name} onChange={
                                          (e)=> 
                                          {
                                          this.props.activeContact.name=e.target.value;
                                          this.forceUpdate();
                                          }
                                          } >
  
                                          </input>
        number:<input type="text" value={this.props.activeContact.num} onChange={ (e)=> 
                                          {
                                          this.props.activeContact.num=e.target.value;
                                          this.forceUpdate();
  
                                          }
                                          }></input>
        
        <select value={this.props.activeContact.department} onChange={(e)=>{this.props.activeContact.department=e.target.value;this.forceUpdate()}}>
            <option value="NotSpecified">Select</option>
            <option value={Department.IT}>IT</option>
            <option value={Department.Sales}>Sales</option>
        </select>

          <button onClick={(e)=>
            {
                this.props.editContact(this.props.activeContact);
                this.props.deactivateEditForm();
                this.forceUpdate();
            }}
            >Done</button>
        </div>
      }
      else {
        this.form = null;
      }

    }

    public render():React.ReactElement<IFormProps>{
      { this.addFormDOM()}
      return(this.form);


    }

    
}

