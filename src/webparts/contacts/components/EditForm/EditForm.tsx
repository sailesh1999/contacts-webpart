import * as React from "react";
import {IEditFormProps} from './IEditFormProps';
import {IEditFormState} from './IEditFormState';
import { Department } from "../../departments/departments";


export default class EditForm extends React.Component<IEditFormProps,IEditFormState>{
    editForm:any;
    public constructor(props:IEditFormProps){
        super(props);

        this.editFormDOM=this.editFormDOM.bind(this);
    }

    public editFormDOM()
    {
      if(this.props.edit){
        this.editForm=    <div>
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
      else{
        this.editForm=null;
      }
    }

    
    public render():React.ReactElement<IEditFormState>{
        {this.editFormDOM()}
        return(this.editForm);
           
            
        
    }
       
    }
