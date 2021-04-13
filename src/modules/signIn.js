"use strict";
module.exports = (login, password)=>{

    return new Promise((resolve)=>{
  
          if([login, password].includes("") === true){

              return resolve({

                 Message:"Veuillez remplir tous les champs."

              });

          } 

          if(Number(login[0]) !== 6 || login.length !== 9){

            return resolve({

               Message: "Veuillez entrer un numéro de téléphone Camerounais."

            });

        }

    });

}