import { Contact } from "../Models/Contact";

export default class ContactConverter
{
   
    public contactToSPContact(contact:Contact){
        console.log(contact.birthdate)
        return({
            Id: contact.id,
            Title: contact.name,
            department: contact.department,
            num: contact.num,
            Address:contact.address,
            gender:contact.gender,
            birthdate:contact.birthdate,
            photo:{
                Description:'',
                Url:contact.picture
            },
            personId:contact.userId
        })
    }

    public spContactToContact(SPListItem){
        let c= new Contact({ 
            id: SPListItem['ID'],
            name: SPListItem['Title'], 
            num: SPListItem['num'], 
            department: SPListItem['department'], 
            address: SPListItem['Address'], 
            gender: SPListItem['gender'], 
            birthdate: this.spDateToJSDate(SPListItem['birthdate']) ,
            picture:SPListItem['photo']?SPListItem['photo'].Url:null,
            userId:SPListItem['personId']
        })
        return(c)
    }

    public spDateToJSDate(d) {
        if (d == null)
          return d;
        var xDate = d.split("T")[0];
        return xDate;
      }
}