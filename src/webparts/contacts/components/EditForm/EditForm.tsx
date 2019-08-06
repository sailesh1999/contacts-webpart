import * as React from "react";
import {IEditFormProps} from './IEditFormProps';
import {IEditFormState} from './IEditFormState';


export default class EditForm extends React.Component<IEditFormProps,IEditFormState>{
    editForm:any;
    public constructor(props:IEditFormProps){
        super(props);
    }

    
    public render():React.ReactElement<IEditFormState>{
        if(this.props.edit){
            this.editForm=    <div>
            <h3>Edit selected contact:</h3>
            name:<input type="text" onChange={
                                              (e)=> 
                                              {
                                              this.props.activeContact.name=e.target.value;
                                              this.forceUpdate();
                                              }
                                              } >
      
                                              </input>
            number:<input type="text" onChange={ (e)=> 
                                              {
                                              this.props.activeContact.num=e.target.value;
                                              this.forceUpdate();
      
                                              }
                                              }></input>
            
            <select onChange={(e)=>{this.props.activeContact.department=e.target.value;this.forceUpdate()}}>
                <option value="NotSpecified">Select</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
            </select>
              <button onClick={(e)=>
                {
                    this.props.setActCon(this.props.activeContact);
                    this.props.deactivateEditForm();
                    this.forceUpdate();
                }}
                >Done</button>
            </div>
          }
          else{
            this.editForm=null;
          }
        return(this.editForm);
           
            
        
    }
       
    }
