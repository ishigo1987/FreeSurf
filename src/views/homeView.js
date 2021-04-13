"use strict";
module.exports = ()=>{

    const {ImageView, TextView, Composite, contentView, CollectionView,navigationBar} = require('tabris');  
    
    navigationBar.background = '#f5f5f5';
   
    const highlightOnTouchValue = require("../helpers/highlightOnTouchValue.js")();
    
    const themeColor = require('../helpers/themeColor.js')();
    
    const arrayOfMenuItems = [{title:'Acheter un forfait', description:"Simplement et rapidement en moins d'une minute.", picture:'src/img/buy-forfait.png'}, {title:'Voir votre solde', description:'Vous pouvez voir combien il vous reste de données mobile sur votre compte.', picture:'src/img/solde.png'}, {title:'Hotspot dans ma ville', description:"Découvrez et connectez vous aux hotspots presents dans votre ville.", picture:'src/img/hotspot.png'}, {title:'Mon historique', description:"Consulter tous les achats que vous avez déjà eu à faire.", picture:'src/img/calendar.png'}, {title:'Mes paramétres', description:"Mettez à jour votre profil et modifiez vos informations de bases.", picture:'src/img/reglages.png'}, {title:'Partager', description:"Faites découvrir FreeSurf à vos amis et proches pour qu'ils en profitent.", picture:'src/img/share.png'}];
    
    const areaComposite = new Composite({ layoutData: 'stretch', background:"#ffffff", id: 'homeView', class: 'activeView' }).appendTo(contentView);
    
    const headerComposite = new Composite({ top: 0, left: 0, right: 0, height: 70, background:"#ffffff", id: 'headerComposite' }).appendTo(areaComposite);
    
    const appName = new TextView({ left: ["prev()",10], top:10, textColor:themeColor, text: "FreeSurf", font:"bold 24px slabo"}).appendTo(headerComposite);
    
    new TextView({left:10, top:['prev()',0], textColor:'#757575', text:'Accueil', font:'18px slabo'}).appendTo(headerComposite);
    
    const notification = new Composite({ centerY: 0, right: 10, width: 36, height: 36, cornerRadius: 18, background: 'rgba(255,255,255,0)', highlightOnTouch: highlightOnTouchValue })
    .onTap(({ target }) => {
    
    }).appendTo(headerComposite);
    
    new ImageView({ centerY: 0, centerX: 0, tintColor:"#424242", image: { src: 'src/icons/notification.png', width: 24, height: 24 } }).appendTo(notification);
    
    const notificationbubble = new Composite({right:13, top:20, width:16, height:16, cornerRadius:8, background:themeColor}).appendTo(headerComposite);
    new TextView({centerX:0, centerY:0, text:10, textColor:"#ffffff", font:'bold 9px slabo'}).appendTo(notificationbubble);
    
    const menu = new CollectionView({top:["prev()",0], left:0, right:0, bottom:0, itemCount:arrayOfMenuItems.length, scrollbarVisible:false,  columnCount:2, cellHeight:Number(screen.width / 2) , 
      createCell: () => {
        const cell = new Composite({ width:(screen.width / 2), height:(screen.width / 2), highlightOnTouch:highlightOnTouchValue, class:'cell'});
        new Composite({bottom:0,left:0,right:0,height:1,background:'#f5f5f5'}).appendTo(cell);
        new Composite({left:0,top:0,bottom:0,width:1,background:'#f5f5f5'}).appendTo(cell);
        new Composite({bottom:0,top:0,right:0,width:1,background:'#f5f5f5'}).appendTo(cell);
        new Composite({top:0,left:0,right:0,height:1,background:'#f5f5f5'}).appendTo(cell);
        new ImageView({centerX:0, top:15, width:60, height:60, id:'cellPicture'}).appendTo(cell);
        new TextView({top:['prev()',10], left:15,right:15,alignment:'centerX', textColor:'#424242',font:'bold 17px slabo', id:'cellTitle'}).appendTo(cell);
        new TextView({top:['prev()', 3], maxLines:3, left:15, right: 15, alignment:'centerX', textColor:'#757575', font:'15px slabo', id:'cellDescription'}).appendTo(cell);
        return cell;
      },
      updateCell: (cell, index)=>{
        cell.children('#cellPicture').only().image = {src:arrayOfMenuItems[index].picture};
        cell.children('#cellTitle').only().text = arrayOfMenuItems[index].title;
        cell.children('#cellDescription').only().text = arrayOfMenuItems[index].description;
      }
   
    }).appendTo(areaComposite);
    

};