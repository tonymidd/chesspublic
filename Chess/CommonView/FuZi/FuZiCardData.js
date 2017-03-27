/**
 * 附子数据
 * author:tony
 * time : 2017/03/24
 */

/**
 * type:牌组类型 ConstsClient.CARD_GROUP_TYPE
 * cards：数据组[{pos:2,card:2},{pos:1,card:2},{pos:3,card:2}]
 * seatDirection:座位方向SEAT_DIRECTION 
 */
var FuZiCardData = function( type , cards , seatDirection ){
    this.type = type;
    this.cards = cards;
    this.seatDirection = seatDirection;
};

var pro = FuZiCardData.prototype;

/***碰变杠 */
pro.pengToGang = function( card ){
    this.type = ConstsClient.CARD_GROUP_TYPE.MING_GANG;
    this.cards.push( card );
};

module.exports = FuZiCardData;