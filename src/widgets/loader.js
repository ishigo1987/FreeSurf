module.exports = (show = true, message)=>{

  const {Composite,contentView,ImageView,TextView, ActivityIndicator} = require('tabris');

  const themeColor = require("../helpers/themeColor.js")();
  
  const modalMask = new Composite({top:0, right:0, left:0, bottom:0, background:'rgba(255,255,255,0.9)', id:"modalMask", class:'activeView'});
  
  const compositeModal = new Composite({left:20, right:20, centerY:0, background:"#eeeeee", elevation:1, padding:15, cornerRadius:2}).appendTo(modalMask);
  
  new ActivityIndicator({ width:46, height:46, centerY:0}).appendTo(compositeModal);
  
  new TextView({left:60,right:0, centerY:0, font:"15px slabo", textColor:"#424242", text:message}).appendTo(compositeModal);
  
  modalMask.onTap(()=>{
    // This is useful to render the modalMask not transparent
    return false;
  });

  if(show === true){

    modalMask.appendTo(contentView);

  }else{

    contentView.find("#modalMask").dispose();
    
  }
};
