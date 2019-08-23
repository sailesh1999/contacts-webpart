import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";
import { Department } from "../../departments/departments";
import { FormTypes } from "../Form/FormTypes";

interface IHeaderDetailProps {
  setSelectedList: ((contactList: Contact[]) => void);
  contactList: Contact[];
  setFilter: ((filter: string) => void);
  setActiveContact: ((contact: Contact) => Contact);
  setFormType: ((formType:FormTypes)=>void);
}


export default class Header extends React.Component<IHeaderDetailProps, {}>{
  filteredList: Contact[] = [];
  public constructor(props: IHeaderDetailProps) {
    super(props);
  }


  public render(): React.ReactElement<{}> {
    return (
      <div className={styles["header-container"]}>
        <div className={styles.header}>
          <p className={styles.title}>Address Book</p>

        </div>

        <div className={styles.menu}>
          <nav className={styles["menu-nav"]}>
            <ul className={styles["menu-items"]}>
              <li className={styles["menu-item"]} onClick={(e) => {
                this.props.setFormType(FormTypes.Add);
                this.props.setActiveContact(new Contact())

              }} >+add </li>
              <li className={styles["menu-item"]}>
                <select
                  onChange={(e) => {
                    this.props.setActiveContact(new Contact());
                    this.props.setFilter(e.target.value);
                    this.props.setSelectedList([]);
                    this.filteredList = [];

                    if (e.target.value == Department.All) {

                      this.props.setSelectedList(this.props.contactList);

                    }
                    else {
                      this.props.contactList.map((contact, i) => {
                        if (contact.department == e.target.value) {
                          this.filteredList.push(contact);
                        }
                      });
                      this.props.setSelectedList(this.filteredList);
                    }

                  }}
                >
                  <option value={Department.All}>All</option>
                  <option value={Department.IT}>IT</option>
                  <option value={Department.Sales}>Sales</option>
                </select> </li>

            </ul>

          </nav>
        </div>

      </div>
    )
  }
}