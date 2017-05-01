var PomeloNotify = function(){
    this.notifys = [ 
        ["player.updateProp",this.player_updateProp],
        ["seatData.push",this.seatData_push],
        ["room.updateProp",this.room_updateProp],
        ["seat.ready",this.seat_ready], 
        ["seat.getHandCards",this.seat_getHandCards],
        ["showCardData",this.showCardData],
        ["shotData",this.shotData],
        ["thirtyCards.result",this.thirtyCards_result],
    ]
}

var pro = PomeloNotify.prototype;

pro.registerNotifys = function(){      
    var i = 0 , j = _.size(this.notifys);
    for( i ; i < j ; ++i){
        var tmp = this.notifys[i]; 
        pomelo.on( tmp[0] ,tmp[1]);
    } 
};

/***刷新玩家属性 */
pro.player_updateProp = function(data){
    cc.log( '刷新玩家属性 : '+ JSON.stringify( data ) );
};

/***更新房间属性 */
pro.room_updateProp = function(data){
    cc.log( '更新房间属性 : '+ JSON.stringify( data ) );
}; 

/***座位的公开信息 */
pro.seatData_push = function(seatJDataList){
    cc.log( '座位的公开信息 : '+ JSON.stringify( seatJDataList ) );
    g_GameData.getRoom().refreshSeatDataList(seatJDataList);
};

/***座位已准备的通知 */
pro.seat_ready = function( data ){
    cc.log( '座位准备的通知 : '+ JSON.stringify( data.seatId ) );
    EveDelegate.doDataToLister(EveDelegateType.SINGLE_SEAT_READY,data.seatId);
};

/***获得手牌 */
pro.seat_getHandCards = function(data){
    cc.log( 'notify 获得手牌 : '+ JSON.stringify( data ) ); 
    g_GameData.getRoom().getMySeate().setHandData(data.cards);
};

/***出牌数据 */
pro.showCardData = function(data){
    cc.log( '出牌数据 : '+ JSON.stringify( data ) );
};

/***打枪数据 */
pro.shotData = function(data){
    cc.log( '打枪数据 : '+ JSON.stringify( data ) );
};

/***十三水结果 */
pro.thirtyCards_result = function(data){
    cc.log( '十三水结果 : '+ JSON.stringify( data ) );
    EveDelegate.doDataToLister(EveDelegateType.COMPARE_CARD_RESULT,data);
    
}; 
module.exports = PomeloNotify;

 


