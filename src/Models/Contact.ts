export class Contact{
    id:number=-1;
    name:string="";
    num:string="";
    department:string="";
    constructor(args?)
    {
        if(args!=undefined){
            this.id=args[0];
            this.name=args[1];
            this.num=args[2];
            this.department=args[3];
        }
        
    }
}