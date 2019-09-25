export class Contact {
    public id: number ;
    public name: string ;
    public num: string ;
    public department: string ;
    public address:string;
    public gender:string;
    public birthdate:Date;
    public picture:string;
    public userId:number;
    public relation:String[];
    constructor(args) {
            this.id = args.id;
            this.name = args.name;
            this.num = args.num;
            this.department = args.department;
            this.address=args.address;
            this.gender=args.gender;
            this.birthdate=args.birthdate;
            this.picture=args.picture;
            this.userId=args.userId;
            this.relation=args.relation;
        
    }
}