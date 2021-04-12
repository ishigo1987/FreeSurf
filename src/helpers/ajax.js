"use strict";
module.exports = (userData) =>{

    return new Promise((resolve)=>{

      const serverUrl = require("./configApp.js")().httpUrl;

      // responseTypeValue can be text or blob
      let response;

      const xhr = new XMLHttpRequest();

      // 90 seconds for the timeout
      xhr.timeout = 90000;

      xhr.addEventListener("load", () => {

         response = JSON.parse(xhr?.responseText);
         
         // subtle error rawResponse is not the json formated response but the Data key
         return resolve({ Message: response.Message,  Data:response.Data});
         
      });

      xhr.addEventListener("error", () => {

         resolve({ Message: "Pas de connexion internet, veuillez réessayer." });

      });

      xhr.addEventListener("timeout", ()=>{

         resolve({ Message: "Pas de connexion internet, veuillez réessayer." });

      });

      // timeout a voir
      xhr.responseType = "text";

      xhr.open("POST", serverUrl, true);

      xhr.send(userData);


    });
};