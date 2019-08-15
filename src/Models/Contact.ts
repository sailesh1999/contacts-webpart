export class Contact{
    id:number;
    name:string;
    num:string;
    department:string;
    constructor(private _id:number=0,private _name:string='',private _num:string='',private _department:string='')
    {
        this.id=_id;
        this.name=_name;
        this.num=_num;
        this.department=_department;
    }
}