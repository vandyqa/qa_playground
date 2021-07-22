class employee{
    id:number ;
    name:string;
    phonenumber:string;
    email:string;

    constructor (

        id:number,
        name:string,
        phonenumber:string,
        email:string
    )
    {

        this.id=id;
        this.name=name;
        this.phonenumber=phonenumber;
        this.email=email;
        
    }

    toString(): string 
    {
        
        let output =
         `employee record-----id: ${this.id}` 
            `name: ${this.name}\n`  
             `phonenumber= ${this.phonenumber}\n`  
            ` email= ${this.email}\n`

            return output;

    }

var firstemployee = new employee(
1,
"vandy",
"123456",
"test@gmail.com"


);
console.log(firstemployee.toString());     
            
       
         
        
    








