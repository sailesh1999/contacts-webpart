import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";


interface IDetailState{

}

interface IDetailProps{
    activeContact:Contact;
}

export default class Detail extends React.Component<IDetailProps,IDetailState>
{
    public constructor(props:IDetailProps){
        super(props);
    }

    public render():React.ReactElement<IDetailState>{

        return(
            <div>
            <h1 className={styles["detail-name"]}>{this.props.activeContact.name}</h1>
            <h1 className={styles["detail-value"]}>{this.props.activeContact.num}</h1>
            <h1 className={styles["detail-value"]}>{this.props.activeContact.department}</h1> 
          </div>    
        )
    }
}