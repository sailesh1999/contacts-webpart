import * as React from "react";

import {IAddFormProps} from './IAddFormProps';
import {Contact} from '../../../../Models/Contact';

export default class AddForm extends React.Component<IAddFormProps,{}>{
    addForm:any;
    tempName:any;
    tempNum:any;
    tempDepartment:any;
    public constructor(props){
        super(props);
        this.state={inputContact:Contact};
    }

    public render():React.ReactElement<IAddFormProps>{

        if (this.props.add) {
            this.addForm = <div>
              <h3>Addcontact:</h3>
              name:<input type="text" onChange={(e) =>  this.tempName= e.target.value }></input>
              number:<input type="text" onChange={(e) => this.tempNum= e.target.value}></input>
              department:
           <select onChange={(e) => this.tempDepartment= e.target.value}>
                <option value="NotSpecified">Select</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
              </select>
              <button onClick={(e)=>this.props.addContact(this.tempName,this.tempNum,this.tempDepartment)}> Done</button>
      
            </div>
      
          }
          else {
            this.addForm = null;
          }

          return(this.addForm);


    }

    
}

