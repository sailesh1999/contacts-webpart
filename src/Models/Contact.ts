export class Contact {
    id: number = -1;
    name: string = "";
    num: string = "";
    department: string = "";
    address:string="";
    gender:string="Male";
    constructor(args?) {
        if (args != undefined) {
            this.id = args.id;
            this.name = args.name;
            this.num = args.num;
            this.department = args.department;
            this.address=args.address;
            this.gender=args.gender;
        }

    }
}