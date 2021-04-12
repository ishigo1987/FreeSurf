"use strict";
module.exports = (data)=>{

    return new Promise((resolve)=>{

         const base64 = require('base-64'); 

         const{name, surname, phone, password} = data;

         if([name, surname, phone, password].includes("") === true){

             return resolve({

                 Message: "Veuillez remplir tous les champs."

             });

         }

         if(Number(phone[0]) !== 6 || phone.length !== 9){

             return resolve({

                Message: "Veuillez entrer un numéro de téléphone Camerounais."

             });

         }

         const dataToSend = { 

            requestName: base64.encode(base64.encode(base64.encode("sendVerificationCode"))), 
      
            data: { userPhone: phone } 
      
          };

         require("../helpers/ajax.js")(JSON.stringify(dataToSend)).then((response)=>{

              if(response.Message !== "sms sent"){

                  return require("../helpers/plugins/toast.js")("Votre code de vérification n'a pas été envoyé.", 3000, "bottom");

              }

         });

    });

};