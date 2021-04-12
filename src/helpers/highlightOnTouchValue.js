"use strict";
module.exports = ()=>{

  const {device} = require("tabris");

  if(device.version <= 22){

    return false;

  }else{

    return true;
    
  }
};
