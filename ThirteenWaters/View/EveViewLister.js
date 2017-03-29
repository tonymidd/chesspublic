/**
 * 各个模块间的消息传播
 * author:tony
 * time : 2017/03/24
 */
module.exports =  cc.Class({
    extends: cc.Component,

    //新增监听
    addLister : function( actionTypeLister,cb ,self ){ 
        this.cbList = this.cbList || {};
        this.cbList[actionTypeLister] = {};
        this.cbList[actionTypeLister].self  = self;
        this.cbList[actionTypeLister].cb  = cb;
    },

    /***通过监听类型移除监听 */
    removeLister : function( actionTypeLister ){
        if( null == this.cbList ){
            return;
        }
        this.cbList[actionTypeLister]  = null;
    }, 

    /***清空监听 */
    removeAllLister : function(  ){
        if( null == this.cbList ){
            return;
        }
        this.cbList = null;
    }, 

    //数据传输
    doDataToLister : function( actionTypeLister , data ){
        console.log(' -- doDataToLister -- ');
        if( null == this.cbList ){
            console.error('this.cbList is null ');
            return;
        }
        if( null == this.cbList[actionTypeLister] ){
            console.error('this.cbList[actionTypeLister] is null ');
            return;
        } 
        this.cbList[actionTypeLister].cb(data,this.cbList[actionTypeLister].self );
    }
});
