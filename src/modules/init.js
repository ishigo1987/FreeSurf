"use strict";
module.exports = ()=>{

    const { app} = require('tabris');

    app.idleTimeoutEnabled = false;

    require('../helpers/tabrisUi.js')('light', '#ffffff');

    require("../modules/backButtonNavigation.js")();

     // We set the font app
     app.registerFont('slabo',"src/fonts/Slabo27px-Regular.ttf");

    if(secureStorage.getItem("freeSurfUserInfo") === null){

        return require("../views/signInView.js")();

    }

    return require("../views/homeView.js")();

};