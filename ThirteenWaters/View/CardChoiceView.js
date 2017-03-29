/**
 * 十三水
 * author:tony
 * time : 2017/03/24
 */

var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        eveLister : {            
            default:null,
            type:EveViewLister
        }    
    },  

    onLoad:function(){
        this.eveLister.addLister(EnumTouchAction.PICK_UP,this.pickUpCard,self);
        this.eveLister.addLister(EnumTouchAction.PUT_DOWN,this.putDown,self);
    },

    /**拾起 */
    pickUpCard:function( data,self ){

    },

    /**放下 */
    putDown:function( data , self ){

    }
});
