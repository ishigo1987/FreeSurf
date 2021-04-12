"use strict";
module.exports = ()=>{

    const { app} = require('tabris');

    app.idleTimeoutEnabled = false;

    require('../helpers/tabrisUi.js')('light', '#ffffff');

    if(secureStorage.getItem("freeSurfUserInfo") === null){

        require("../views/signInView.js")();

    }

};