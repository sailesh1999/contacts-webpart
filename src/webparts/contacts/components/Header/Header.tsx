import * as React from "react";
import styles from '../Contacts.module.scss';

interface IHeaderDetailProps{
    setSelectedList:any;
    contactList:any;
    activateAddForm:any;
    deactivateAddForm:any;
    activateEditForm:any;
    deactivateEditForm:any;
}

export default class Header extends React.Component<IHeaderDetailProps,{}>{
    filteredList:any=[];
public constructor(props:IHeaderDetailProps){
    super(props);
}

    public render():React.ReactElement<{}>{
        return(
            <div className={styles["header-container"]}>
            <div className={styles.header}>
              <p className={styles.title}>Address Book</p>
  
            </div>
  
            <div className={styles.menu}>
              <nav className={styles["menu-nav"]}>
                <ul className={styles["menu-items"]}>
                  <li className={styles["menu-item"]} onClick={(e) => {
                      this.props.activateAddForm();
                      this.props.deactivateEditForm();
                  }} >+add </li>
                  <li className={styles["menu-item"]}>
                    <select
                      onChange={(e) => {
                        this.props.setSelectedList([]);
  
                        if (e.target.value == "All") {
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
                        this.forceUpdate();
                      }}
                    >
                      <option value="All">All</option>
                      <option value="IT">IT</option>
                      <option value="Sales">Sales</option>
                    </select> </li>
  
                </ul>
  
              </nav>
            </div>
  
          </div>
        )
    }
}