"use strict";
module.exports = (data)=>{

    return new Promise((resolve)=>{

        const{TextInput, contentView, Composite, TextView, ImageView} = require("tabris");

        const{message, placeholder, typeOfKeyboard, maxChars, buttonMessage} = data;

        const themeColor = require("../helpers/themeColor.js")();

        const highlightOnTouchValue = require("../helpers/highlightOnTouchValue.js")();

        const popupMask = new Composite({ layoutData: 'stretch', background: 'rgba(0,0,0,0.30)', id: "popupMask", class: 'activeView' })
        .onTap(() => {

            // This is useful to render the modalMask not transparent and disallow the action with the ui view
            return false;

        }).appendTo(contentView);

        new Composite({ left: 30, right: 30, centerY: 0, background: "#ffffff", elevation: 2, padding: 15, cornerRadius: 5, id:'compositePopup' })
        .append(

            new TextView({left:0, right:0, alignment:"centerX", text:message, font:"16px slabo"}),

            new Composite({ top: ["prev()", 15], left:0, right: 0, height: 50, cornerRadius:25, background: "#f4f6fa" })
            .append(

                new ImageView({ left: 10, centerY: 0, width: 18, height: 18, image: { src: "src/icons/code.png", width: 18, height: 18 }, tintColor: "#757575" }),
            
                new TextInput({ centerY: 0, left: ["prev()", 0], right: 0, maxChars: maxChars, style: 'none', floatMessage: false, textColor: "#757575", cursorColor: themeColor, messageColor: "#757575", background: 'transparent', keyboard: typeOfKeyboard, message: placeholder , font: "14px slabo", id:"userCode" })

            ),

            new Composite({ top:["prev()", 15], left:0, right:0, height:50, cornerRadius:25, highlightOnTouch:highlightOnTouchValue, background: themeColor})
            .append(

                new TextView({alignment:"centerX", centerX:0, centerY:0, text:buttonMessage, textColor:"#ffffff", font:"16px slabo"})

            ).onTap(({target})=>{

                  const userInputValue = popupMask.find("#userCode").only().text;

                  if(userInputValue !== ""){

                     resolve({

                          Data: userInputValue

                     });

                     return popupMask.dispose();

                  }

            }),

            new TextView({top:["prev()", 20],left:0, right:0, alignment:"centerX", text:"Annuler", font:"16px slabo"})
            .onTap(({target})=>{

                 popupMask.dispose();

            })

        ).appendTo(popupMask);

    });


}