"use strict";
module.exports = (smsCode, code)=>{

    console.log(smsCode)

    console.log(code)

    if(smsCode !== code){

        return "Code entré incorrect";    
           
    }

    return  "Code entré correct";
};