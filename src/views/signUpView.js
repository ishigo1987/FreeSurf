"use strict";
module.exports = ()=>{

    const {contentView, Composite, TextView, ScrollView, ImageView, TextInput} = require("tabris");

    const highlightOnTouchValue = require("../helpers/highlightOnTouchValue.js")();

    const themeColor = require("../helpers/themeColor.js")();

    const widgetAnimation = require("../helpers/widgetAnimation.js");

    const snackbar = require("../widgets/snackbar.js");

    const loader = require("../widgets/loader.js");

    const view = new Composite({ layoutData: 'stretch', background: "#ffffff", opacity: 0, transform: { translationX: 100 }, id: 'signUpView', class:"activeView authentificationView"})
    .onTap(()=>{});

    const headerComposite = new Composite({ top: 0, left: 0, right: 0, height: 57, background: "#ffffff", elevation: 1, id: 'headerComposite' }).appendTo(view);
    
    new ImageView({ centerY: 0, left: 5, width: 38, height: 36, cornerRadius: 18, background: 'rgba(255,255,255,0)', highlightOnTouch: highlightOnTouchValue, id:"closeView", tintColor: "#424242", image: { src: 'src/icons/back.png', width: 24, height: 24 }})
    .onTap(({target})=>{
      
      target.enabled = false;
      
      widgetAnimation(view, { transform: { translationX: 100 }, opacity: 0 }, null, 100).then((responseAnimation) => {
        
        if (responseAnimation.Message === "Animation terminée") {
            
          return view.dispose();
        }
      });
      
    }).appendTo(headerComposite);

    new TextView({  centerY:0, left: ['#closeView', 5], right: 30, textColor: "#424242", maxLines: 1, text: "Inscription", font: 'bold 18px slabo' }).appendTo(headerComposite);

    const scrollView = new ScrollView({top:['prev()',0], left:0, right:0, bottom:0, background: "#ffffff"}).appendTo(view);

    new TextView({ top:30, left:15, right:15, text:"Veuillez vous inscrire pour pouvoir bénéficier de nos services, cela ne prendra qu'une minute.", font:"16px slabo", alignment:"centerX"}).appendTo(scrollView);

    new Composite({ top: ['prev()', 25], left: 15, right: 15, height: 50, cornerRadius: 25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 5, top:13, width: 20, height: 20, image: { src: "src/icons/no-profile.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', maxChars:100, floatMessage: false, textColor: "#757575", cursorColor: themeColor, background: 'transparent', message: "Veuillez entrer votre nom", messageColor: "#757575", font: "14px slabo", id:"name" })

    ).appendTo(scrollView);

    new Composite({ top: ['prev()', 10], left: 15, right: 15, height: 50, cornerRadius: 25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 5, top:13, width: 20, height: 20, image: { src: "src/icons/no-profile.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', maxChars:100, floatMessage: false, textColor: "#757575", cursorColor: themeColor, background: 'transparent', message: "Veuillez entrer votre prénom", messageColor: "#757575", font: "14px slabo", id:"surname" })

    ).appendTo(scrollView);

    new Composite({ top: ["prev()", 10], left: 15, right: 15, height: 50, cornerRadius:25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 10, top:13, width: 18, height: 18, image: { src: "src/icons/phone.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', floatMessage: false, textColor: "#757575", cursorColor: themeColor, messageColor: "#757575", background: 'transparent', maxChars:9, keyboard: 'phone', message: "Entrez votre numéro de téléphone" , font: "14px slabo", id:"phone" })

    ).appendTo(scrollView);

    new Composite({ top: ["prev()", 10], left: 15, right: 15, height: 50, cornerRadius:25, background: "#f4f6fa" })
    .append(

        new ImageView({ left: 10, top:13, width: 18, height: 18, image: { src: "src/icons/password.png", width: 18, height: 18 }, tintColor: "#757575" }),
    
        new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, style: 'none', floatMessage: false, textColor: "#757575", cursorColor: themeColor, messageColor: "#757575", background: 'transparent', keyboard: 'phone', type:"password",  message: "Entrez votre mot de passe" , font: "14px slabo", id:"password" }),

        new ImageView({ right:10, centerY:0, width: 18, height: 18, image: { src: "src/icons/show-password.png", width: 18, height: 18 }, tintColor: "#757575" })
        .onTap(({target})=>{


            if(target.parent().find("#[asswordInscriptionInput]").only().revealPassword === false){

                target.parent().find("#[asswordInscriptionInput]").only().revealPassword = true;

                return target.image = {src: "src/icons/hide-password.png"};

            }

            if(target.parent().find("#[asswordInscriptionInput]").only().revealPassword === true){

                target.parent().find("#[asswordInscriptionInput]").only().revealPassword = false;

                return target.image = {src: "src/icons/show-password.png"};

            }

        })

    ).appendTo(scrollView);

    new Composite({ top:["prev()", 30], left:15, right:15, height:50, cornerRadius:25, highlightOnTouch:highlightOnTouchValue, background: themeColor})
    .append(

        new TextView({alignment:"centerX", centerX:0, centerY:0, text:"Inscription", textColor:"#ffffff", font:"16px slabo"})

    ).onTap(({target})=>{

         const userData = {

             name: view.find("#name").only().text,

             surname: view.find("#surname").only().text,

             phone: view.find("#phone").only().text,

             password: view.find("#password").only().text

         };

         function sendVerificationCode(userParams){

            loader(true, "Vérification de vos informations en cours...");

            require("../helpers/sendVerificationCode.js")(userParams).then((response)=>{

                loader(false);
   
                if(response.Message === "Veuillez remplir tous les champs." || response.Message === "Veuillez entrer un numéro de téléphone Camerounais."){
   
                    return snackbar(view, response.Message);
   
                }
   
                if(response.Message === "Code de vérification non envoyé"){
   
                   return snackbar(view, "Le code de vérification n'a pas été envoyé", "infinite", "réessayer").then((responseSnackbar)=>{
   
                         return sendVerificationCode(userData);
   
                   });
   
                }

                const popupData = {

                     message: `Veuillez entrer le code qui vous a été envoyé par SMS au numéro ${userParams.phone}`,

                     placeholder: "Votre code",

                     typeOfKeyboard: "number",

                     maxChars: 6,

                     buttonMessage: "Vérifier"

                };

                return require("../widgets/popupWIthForm.js")(popupData).then((responsePopup)=>{

                      const codeChecking = require("../helpers/checkVerificationCode.js")(responsePopup.Data, response.Data);

                      if(codeChecking === "Code entré incorrect"){

                            return snackbar(view, "Le code que vous avez entré est incorrect.");

                      }

                      secureStorage.setItem("freeSurfUserInfo", "userInfos");

                      require("./homeView.js")();

                      return contentView.children(".authentificationView").dispose();
                });
   
            });


         }

         sendVerificationCode(userData);

    }).appendTo(scrollView);

    new TextView({top:["prev()", 20], left:15, right:15, alignment:"centerX", markupEnabled:true, text:`En cliquant sur inscription vous acceptez nos <a textColor:${themeColor} href='#'>Conditions d'utilisation</a> et notre <a textColor:${themeColor} href="#">Politique de confidentialité</a>`, font:"14px slabo"}).appendTo(scrollView);
    

    setTimeout(()=>{
      
        view.appendTo(contentView);
        
        widgetAnimation(view, { transform: { translationX: 0 }, opacity: 1 }, null, 150).then((responseAnimation) => {
        
        });

    },0);

};