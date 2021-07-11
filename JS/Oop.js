
const  a=10;
console.log(a)

const Card=function(PlayerName,Country,Rating){
    this.PlayerName= PlayerName;
    this.country=Country;
    this.Rating=Rating;
}


const obj1=new Card("Akhil","India",4);

//Card.prototype.check=100;
Card.prototype.myName=function(){
    console.log("efa")
    return this.PlayerName
}
console.log(obj1,obj1.hasOwnProperty('Rating'),obj1.myName()) 
console.log(obj1.__proto__)



class ClassCard{
    constructor(PlayerName,Country,Rating){
    
    this.PlayerName= PlayerName;
    this.country=Country;
    this.Rating=Rating;
    }
    static i=10;
    static getI(){
        return  i;
    }
    getCountry(){
        return this.country;
    }
}
let obj2=new ClassCard("Sai","India",4);
console.log(obj2);



const itemProto={
    sendNumber:()=>{
        this.n=100;
        console.log("this keyword",this)
        return 3580+20;
    },
    sendN:()=>{
        return this.n;
    }
}

const obj3=Object.create(itemProto);
console.log(obj3.__proto__);
console.log(obj3.sendNumber(),obj3.sendN())




const HighScore=function(PlayerName,Country,Ratingscore,score){
    Card.call(this,PlayerName,Country,Ratingscore)
    this.score=score
}
HighScore.prototype=Object.create(Card.prototype);
HighScore.prototype.constructor=HighScore;
const akhil=new HighScore("Akhil","India",4,200);
console.log(akhil)



class HighScoreClass extends Card{
    constructor(PlayerName,Country,Ratingscore,score){
        super(PlayerName,Country,Ratingscore)
        this.score=score;
    }
}

const akhil1 =new HighScoreClass("Akhil","India",4,200);
console.log(akhil1)


const CardObjectWay={
    init:function(PlayerName,Country,Rating ){
        this.PlayerName= PlayerName;
        this.Country=Country;
        this.Rating=Rating;
    },
    sendName:function(){
        return this.PlayerName;
    }
}


const  HighScoreObjectWay=Object.create(CardObjectWay);
HighScoreObjectWay.init=function(PlayerName,Country,Ratingscore,score){
    CardObjectWay.init.call(this,PlayerName,Country,Ratingscore)
    this.score=score;
}

const akhil2=Object.create(HighScoreObjectWay);
akhil2.init("Akhil","India",4,200)
console.log(akhil2)

class Bank{
    constructor(){
        this.amount=100;
    }
    _getAmount(){
        return this.amount;
    }
}

const bank=new Bank();
const res=bank._getAmount();
console.log(res)