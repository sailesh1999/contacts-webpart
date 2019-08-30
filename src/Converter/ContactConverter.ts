import { Contact } from "../Models/Contact";

export default class ContactConverter
{
   
    public contactToSPContact(contact:Contact){
        return({
            Id: contact.id,
            Title: contact.name,
            department: contact.department,
            num: contact.num,
            Address:contact.address,
            gender:contact.gender,
            birthdate:contact.birthdate==undefined?null:new Date(contact.birthdate.getFullYear(),contact.birthdate.getMonth(),contact.birthdate.getDate()+1),
            photo:{
                Description:'',
                Url:contact.picture
            },
            personId:contact.userId,
            // relation:{results:[
            //     true,false
            // ]}
            relation: { "__metadata": { 'type': "Collection(Edm.String)" }, results: (contact.relation==undefined?[]:contact.relation) }
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
            birthdate: this.spDateToJSDate(SPListItem['birthdate'] ),
            picture:SPListItem['photo']?SPListItem['photo'].Url:null,
            userId:SPListItem['personId'],
            relation:SPListItem['relation']
        })
        return(c)
    }

    public spDateToJSDate(d) {
        if (d == null)
          return d;
        var xDate = d.split("T")[0];
        xDate=xDate.split("-");
        var date=new Date(parseInt(xDate[0]),parseInt(xDate[1])-1,parseInt(xDate[2]));
        return date;
      }
}