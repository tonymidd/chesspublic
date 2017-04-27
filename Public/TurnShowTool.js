/***逻辑数据转化为视觉数据*/
var TurnShowTool = {};

var pro = TurnShowTool.prototype;

/***初始化我自己的服务器seatIdx */
pro.initMySeatIdx = function(serverSeatIdx){ 
    this.selfServerIdx = serverSeatIdx;
    this.seatTotal = 4; 
};
 
/***将服务器的seatIndex转化为显示座位(为了达到自己座位一直保持为0)
 * serverSeatIdx:服务器的座位号
 */
pro.showSeatIdxBySeatIdx= function( serverSeatIdx ){    
    if( serverSeatIdx >= this.selfServerIdx ){
        return  serverSeatIdx - this.selfServerIdx;
    }else{
        return (this.seatTotal-this.selfServerIdx+1)+serverSeatIdx;
    }
};

window.TurnShowTool = TurnShowTool;