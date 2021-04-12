"use strict";
module.exports = (widgetToAnim, animationObject, propertiesAnimationObject, animationDuration = 250)=>{
   
  return new Promise((resolve, reject)=>{

     setTimeout(()=>{

       propertiesAnimationObject = propertiesAnimationObject ?? { repeatValue: 0, reverseValue: false, easingValue: "ease-out"}; 

       const{repeatValue, reverseValue, easingValue} = propertiesAnimationObject;

       widgetToAnim.animate(animationObject,
         {

           delay: 0, duration: animationDuration, repeat: repeatValue, reverse: reverseValue, easing: easingValue

         }).then(() => {

           resolve({ Message: "Animation terminée" });

         });
         
     },0);
   });
};
