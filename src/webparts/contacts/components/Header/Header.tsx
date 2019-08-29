import * as React from "react";
import styles from '../Contacts.module.scss';
import { Contact } from "../../../../Models/Contact";
import { Department } from "../../departments/departments";
import { FormTypes } from "../Form/FormTypes";

interface IHeaderDetailProps {
  contactList: Contact[];
  setFilter: ((filter: string) => void);
  setActiveContact: ((contact: Contact) => Contact);
  setFormType: ((formType: FormTypes) => void);
}

export default class Header extends React.Component<IHeaderDetailProps, {}>{
  filteredList: Contact[] = [];
  public constructor(props: IHeaderDetailProps) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
  }

  public changeFilter(e) {
    this.props.setActiveContact(new Contact());
    this.props.setFilter(e.target.value);   
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
                this.props.setActiveContact(new Contact())
                this.props.setFormType(FormTypes.Add);
              }} >+add </li>

              <li className={styles["menu-item"]}>
                <select
                  onChange={(e) => this.changeFilter(e)}
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