import { format } from 'date-fns';

const isBrowser = ()=>{
    return typeof window !== 'undefined';
}

const l = (...args) =>{ 
    console.log(...args);
};


const shortenStr = (str,len)=>{
    if(len<=0){
        return str;
    }
    if(str.length > len){
        //check if nice spaces at end
        for(let i = 1;i<3;i++){
            if(str.charAt(len-i) == ' '){
                return str.substr(0,len-i-1);
            }
        }
        return str.substr(0,len-3)+"...";
    }else{
        return str;
    }
}

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const formatDate =(dateTxt)=>{
    let d = new Date(dateTxt);
    let now = new Date();
    let minsAgo = Math.round((now.getTime()-d.getTime())/(1000*60));
    minsAgo = Math.max(0,minsAgo);//in case
    let hoursAgo = Math.round(minsAgo/60);
    hoursAgo = Math.max(0,hoursAgo);//in case
    let m = monthNames[d.getMonth()];

    if(minsAgo<60){
      return minsAgo +"m";
    }else if(hoursAgo<24){
        return hoursAgo +"h";
    }else if(now.getFullYear() != d.getFullYear()){
      let str = m + " "+format(d,'dd yyyy');
      return str;
    }else{
      let str = m + " "+format(d,'dd');
      return str;
    }
}

const dateToUSformat = (date) =>{
    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = String(date.getDate()).padStart(2, '0');;
    return month+" "+day +", "+year;
}

const isValidDate = dateObject => new Date(dateObject)
    .toString() !== 'Invalid Date';



export {l,shortenStr, formatDate, monthNames,dateToUSformat};