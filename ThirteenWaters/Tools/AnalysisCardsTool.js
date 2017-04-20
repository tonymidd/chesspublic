var AnalysisCards = require( './AnalysisCards' );
var consts = require( './consts' );
/*
* 删除myDataList中rmDataList的数据
**/
function removeData(myDataList, rmDataList) {
    var cloneData = JSON.parse(JSON.stringify(myDataList));

    var i = 0; size = _.size(rmDataList);
    for (i; i < size; ++i) {
        cloneData = _.without(cloneData, rmDataList[i]);
    } 
    return cloneData;
}

var AnalysisCardsTool = function (ids) {
    this.initData(ids);
}

var pro = AnalysisCardsTool.prototype;
 
/*
a,b,c：前中后 、type组合类型 cards组合的牌
return
[ 
    {a:{type:1,cards:[1,2,3,4,5]},b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]}},
    {a:{type:1,cards:[1,2,3,4,5]},b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]}},
    {a:{type:1,cards:[1,2,3,4,5]},b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]}},
    {a:{type:1,cards:[1,2,3,4,5]},b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]}},
]
*/
pro.getAllResult = function(ids){

};

/*
a,b,c：前中后 、type组合类型 cards组合的牌
return
[ 
    {a:{type:1,cards:[1,2,3,4,5]},bcList:[ [b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]],[b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]]   },
    {a:{type:1,cards:[1,2,3,4,5]},bcList:[ [b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]],[b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]]   },
]
*/

pro.get3Data = function( groupList , cardType , analysisCards ){
    var jData = null;
    var ids = analysisCards.getIds();
    if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUASHUN){ 
        jData = analysisCards.canTHSIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.TIEZHI){
        jData = analysisCards.canTZIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.HULU){
        jData = analysisCards.canHLIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUA){
        jData = analysisCards.canTHIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.SHUNZI){
        jData = analysisCards.canSZIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.SANTIAO){
        jData = analysisCards.canSTIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.LIANGDUI){
        jData = analysisCards.canLDIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.YIDUI){
        jData = analysisCards.canYDIdsType();
    }

    if (jData.cnt > 0) {
        var i = 0;        
        for (i; i < jData.cnt; ++i) {
            var thsList = this.getSingleTypeTHS( cardType, ids, jData.singleTypeGroupList[i]);
            if( _.size(thsList) > 0 ){
                for(var k = 0; k < _.size(thsList) ; ++k){                    
                    var tmpGroup = {};
                    groupList.push(tmpGroup);
                    
                    //后咚
                    tmpGroup.a =  thsList[k].cards;
 
                    //中咚前咚 组合 
                    tmpGroup.bcList = this.getBCList(thsList[k].surplusCard);
                } 
            }
        }
    }  
}

pro.getResult = function (ids) {
    var groupList = [];

    var analysisCards = new AnalysisCards(ids);

    //同花顺   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.TONGHUASHUN,analysisCards);

    //铁支   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.TIEZHI,analysisCards); 

    //葫芦   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.HULU,analysisCards);

    //同花   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.TONGHUA,analysisCards);

    //顺子   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.SHUNZI,analysisCards);

    //三条   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.SANTIAO,analysisCards);

    //两对   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.LIANGDUI,analysisCards);

    //一对   为最大情况
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.YIDUI,analysisCards);

    //散牌
    this.get3Data(groupList,consts.SHISANSHUI_ORDINARY.SANPAI,analysisCards);

    return  groupList;
};


/***获取中、前咚数据
 * return [ [b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]],[b:{type:2,cards:[1,2,3,4,5]},c:{type:3,cards:[1,2,3]} ]] 
 */
pro.getBCList = function( ids ){
    var groupList = [];
    var analysisCards = new AnalysisCards(ids);
    //同花顺
    var jData = analysisCards.canTHSIdsType();
    if (jData.cnt > 0) {
        var i = 0;
        for (i; i < jData.cnt; ++i) {
            var thsList = this.getSingleTypeTHS( jData.singleTypeGroupList[i] );
            if( _.size(thsList) > 0 ){
                for(var k = 0; k < _.size(thsList) ; ++k){                    
                    var tmpGroup = {};
                    groupList.push(tmpGroup);
                    
                    //中咚
                    tmpGroup.b =  thsList[k].cards;
 
                    //前咚
                    tmpGroup.c = thsList[k].surplusCard;
                } 
            }
        }
    } 


    //铁支   

    //葫芦   

    //葫芦   

    //顺子   

    //三条   

    //两对   

    //一对   
    return  groupList;
};

pro.getSingleData = function ( type , ids, singleTypeIds) {
    var canData = [];
    var surplusCard = removeData(ids, singleTypeIds);
    var jsData = {
        type:type,
        //组合成功的牌
        cards: singleTypeIds,
        //剩余的牌
        surplusCard: surplusCard
    }
    canData.push(jsData);
    return canData;
}
 