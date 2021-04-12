"use strict";
module.exports = ()=>{
  const {app,contentView} = require("tabris");

    app.onBackNavigation((event)=>{

      event.preventDefault();

      const kindOfAnimation = {};

      const activeView = contentView.find('.activeView').last();
      
      if(activeView !== undefined){

         if(["signUpView"].includes(activeView.id) === true){

            kindOfAnimation.transform = { translationX: 100};

            kindOfAnimation.opacity = 0;

         }

        // This is a precaution i want to be sure that the animation happen only if the view need to be animated
        if(Object.keys(kindOfAnimation).length !== 0){

            require('../helpers/widgetAnimation.js')(activeView, kindOfAnimation, null, 150).then((animation) => {

                if (animation.Message === 'Animation terminée') {

                    return activeView.dispose();
                }
            });
        }

      }else{

         return false;
      }
    });
};
