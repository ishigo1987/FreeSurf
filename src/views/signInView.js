"use strict";
module.exports = ()=>{

    const {contentView, Composite, TextView, ScrollView, ImageView, TextInput} = require("tabris");

    const highlightOnTouchValue = require("../helpers/highlightOnTouchValue.js")();

    const themeColor = require("../helpers/themeColor.js")();

    const view = new Composite({ layoutData: 'stretch', background: "#ffffff", id: 'signInView', class:"activeView"}).appendTo(contentView);

    const scrollView = new ScrollView({layoutData: 'stretch', background: "#ffffff"}).appendTo(view);

    new TextView({top:100, left:15, right:15, textColor:themeColor, text:"FreeSurf", alignment:"centerX", font:"32px bold"}).appendTo(scrollView);

    new TextView({ top:["prev()", 30], left:15, right:15, text:"Veuillez vous connecter pour pouvoir accéder à votre compte et souscrire à un forfait internet.", font:"16px", alignment:"centerX"}).appendTo(scrollView);

    new Composite({ top: ["prev()", 30], left: 15, right: 15, height: 50, cornerRadius:25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 10, centerY: 0, width: 18, height: 18, image: { src: "src/icons/phone.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', floatMessage: false, textColor: "#757575", cursorColor: themeColor, messageColor: "#757575", background: 'transparent', keyboard: 'phone', message: "Entrez votre numéro de téléphone" , font: "14px" })

    ).appendTo(scrollView);

    new Composite({ top: ["prev()", 10], left: 15, right: 15, height: 50, cornerRadius:25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 10, centerY: 0, width: 18, height: 18, image: { src: "src/icons/password.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', floatMessage: false, textColor: "#757575", cursorColor: themeColor, messageColor: "#757575", background: 'transparent', keyboard: 'phone', type:"password",  message: "Entrez votre mot de passe" , font: "14px", id:"passwordInput" }),

        new ImageView({ right:10, centerY:0, width: 18, height: 18, image: { src: "src/icons/show-password.png", width: 18, height: 18 }, tintColor: "#757575" })
        .onTap(({target})=>{


            if(target.parent().find("#passwordInput").only().revealPassword === false){

                target.parent().find("#passwordInput").only().revealPassword = true;

                return target.image = {src: "src/icons/hide-password.png"};

            }

            if(target.parent().find("#passwordInput").only().revealPassword === true){

                target.parent().find("#passwordInput").only().revealPassword = false;

                return target.image = {src: "src/icons/show-password.png"};

            }

        })

    ).appendTo(scrollView);

    new Composite({ top:["prev()", 30], left:15, right:15, height:50, cornerRadius:25, highlightOnTouch:highlightOnTouchValue, background: themeColor})
    .append(

        new TextView({alignment:"centerX", centerX:0, centerY:0, text:"Connexion", textColor:"#ffffff", font:"16px"})

    ).onTap(({target})=>{


    }).appendTo(scrollView);

    new TextView({alignment:"centerX", top:['prev()', 50], left:15, right:15, highlightOnTouch:highlightOnTouchValue, text:"Inscription", font:"16px bold"})
    .onTap(()=>{

         require("./signUpView.js")();

    }).appendTo(scrollView);
    
    
};