import * as React from "react";

import {IAddFormProps} from './IAddFormProps';
import {Contact} from '../../../../Models/Contact';
import { Department } from "../../departments/departments";

export default class AddForm extends React.Component<IAddFormProps,{}>{
    addForm:any;
    inputContact:Contact=new Contact();//{id:0,name:'',num:'',department:''};
    public constructor(props){
        super(props);
        this.state={inputContact:Contact};

        this.addFormDOM=this.addFormDOM.bind(this);


    }

    public addFormDOM(){
      if (this.props.add) {
        this.addForm = <div>
          <h3>Addcontact:</h3>
          name:<input type="text" onChange={(e) =>  this.inputContact.name= e.target.value }></input>
          number:<input type="text" onChange={(e) => this.inputContact.num= e.target.value}></input>
          department:
       <select onChange={(e) => this.inputContact.department= e.target.value}>
            <option value="NotSpecified">Select</option>
            <option value={Department.IT}>IT</option>
            <option value={Department.Sales}>Sales</option>
          </select>
          <button onClick={(e)=>this.props.addContact(this.inputContact)}> Done</button>
  
        </div>
  
      }
      else {
        this.addForm = null;
      }

    }

    public render():React.ReactElement<IAddFormProps>{
      { this.addFormDOM()}
      return(this.addForm);


    }

    
}

