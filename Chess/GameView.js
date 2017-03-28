var BaseRoomView = require('./CommonView/BaseRoomView');
cc.Class({
    extends: BaseRoomView,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        GameDataCtr.addListerToView( this.Lister );
    }, 
 
    Lister:function( data ){

    },

    /***重置数据 */
    ReSet:function(){

    }
});
