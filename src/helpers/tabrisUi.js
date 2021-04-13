"use strict";

module.exports = (themeString, themeBgHex,dpMode = "default") =>{

  const {statusBar, navigationBar} = require('tabris');

  // Cette fonction initialise l'ui de l'application pour les vues
  statusBar.set({

     theme:themeString,

     background:themeBgHex,

     displayMode:dpMode
     
   });
   
   navigationBar.theme = "dark";
 };
