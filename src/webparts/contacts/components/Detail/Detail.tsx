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
    }

    public render(): React.ReactElement<{}> {

        return (
            <div>
                <h1 className={styles["detail-name"]}>Name: {this.props.activeContact.name}</h1>
                <h1 className={styles["detail-value"]}>Number: {this.props.activeContact.num}</h1>
                <h1 className={styles["detail-value"]}>Department: {this.props.activeContact.department}</h1>
                <p>Gender:{this.props.activeContact.gender}</p>
                <p>DOB:{this.props.activeContact.birthdate}</p>
                <pre>Address:{this.props.activeContact.address}</pre>
            </div>
        )
    }
}