import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";

interface IDetailProps {
    activeContact: Contact;
}

export default class Detail extends React.Component<IDetailProps, {}>
{
    public constructor(props: IDetailProps) {
        super(props);

        this.getRelationsString=this.getRelationsString.bind(this);
    }

    public getRelationsString(){
        let relations=this.props.activeContact.relation;
        if(relations==undefined){
            return ""
        }
        return relations.join()
    }

    public getDOBString(){
        if(this.props.activeContact.birthdate==undefined)
        {
            return ""
        }
        let bdate=this.props.activeContact.birthdate;
        return(bdate.getDate().toString()+"/"+(bdate.getMonth()+1).toString()+"/"+bdate.getFullYear().toString())
    }

    public render(): React.ReactElement<{}> {
        console.log(this.props.activeContact)

        return (
            <div>
                <div>
                <h1 className={styles["detail-name"]}>Name: {this.props.activeContact.name}</h1>
                <h1 className={styles["detail-value"]}>Number: {this.props.activeContact.num}</h1>
                <h1 className={styles["detail-value"]}>Department: {this.props.activeContact.department}</h1>
                <p>Gender:{this.props.activeContact.gender}</p>
                <p>DOB:{this.getDOBString()}</p>
                <pre>Address:{this.props.activeContact.address}</pre>
                <p>Relation:{this.getRelationsString()}</p>
                </div>

                <div>
                    <img src={this.props.activeContact.picture} height="42" width="42" alt="No Profile photo"></img>
                </div>
                
            </div>
        )
    }
}