export class Contact {
    id: number ;
    name: string ;
    num: string ;
    department: string ;
    address:string;
    gender:string;
    birthdate:Date;
    picture:string;
    userId:number;
    relation:String[];
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