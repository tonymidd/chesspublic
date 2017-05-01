/***将逻辑数据转换为视觉数据 */

var pro  = module.exports = {}; 

pro.initSelfSeatIdx = function( serverSeatIdx ){
    this.selfSeatIdx = serverSeatIdx;
    this.seatTotal = 4;
};

/***将服务器seatIndex转换为显示逻辑的seatIndex */
pro.getShowSeatIdx = function( serverSeatIdx ){
    if( serverSeatIdx>=  this.selfSeatIdx  ){
        return serverSeatIdx - this.selfSeatIdx;
    }else{
        return this.seatTotal-this.selfSeatIdx + serverSeatIdx;
    }
};

window.TurnSeatIdxTool = pro;