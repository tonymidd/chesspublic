var exp = module.exports = {};

/***new RoomData() */
exp.registerRoom = function( room ){
    this.room = room;
    this.listerList = {}; 
};

exp.getRoom = function(){
    return this.room;
};

exp.addListerToView = function( cb ){
    this.viewListerCb = cb;
};

exp.rmListerToView = function(){
    this.viewListerCb = null;
}

/**
 * 推送数据
 */
exp.doNotifyData = function(data){
    Utils.callBack(this.viewListerCb,data);
};

window.GameDataCtr = exp;