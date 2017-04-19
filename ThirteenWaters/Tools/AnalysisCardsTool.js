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
    if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUASHUN){ 
        jData = analysisCards.canTHSIdsType();
    }else if( cardType==consts.SHISANSHUI_ORDINARY.TIEZHI){

    }else if( cardType==consts.SHISANSHUI_ORDINARY.HULU){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUA){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.SHUNZI){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.SANTIAO){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.LIANGDUI){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.YIDUI){
        
    }else if( cardType==consts.SHISANSHUI_ORDINARY.SANPAI){
        
    }

    if (jData.cnt > 0) {
        var i = 0;
        for (i; i < jData.cnt; ++i) {
            var thsList = null;           
            if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUASHUN){ 
                thsList = this.getSingleTypeTHS( jData.singleTypeGroupList[i] );
            }else if( cardType==consts.SHISANSHUI_ORDINARY.TIEZHI){

            }else if( cardType==consts.SHISANSHUI_ORDINARY.HULU){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.TONGHUA){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.SHUNZI){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.SANTIAO){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.LIANGDUI){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.YIDUI){
                
            }else if( cardType==consts.SHISANSHUI_ORDINARY.SANPAI){
                
            }

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

/*
*单个花色可能组合出的同花顺   (计算  ---后咚----)
*singleTypeIds:单个花色的id集合 如：[1,2,3,4,5,6,7,8]
*return [{type:1,cards[1,2,3,5,6],surplusCard:[1,2,3,4,5,6,7]}]
*/
pro.getSingleTypeTHS = function (singleTypeIds) {
    var num = _.size(singleTypeIds);
    //可能组成的种类数
    var mayBeGroupCnt = num - 4;
    var i = 0;
    var canData = [];
    for (i; i < mayBeGroupCnt; ++i) {
        var find = true;
        //最小牌
        var currTmp = singleTypeIds[i];

        //表示从第二个数字比
        var a = i + 1;
        var b = i + 4;
        for (a; a < b; ++a) {
            //与后面的数组是否相连
            if ((currTmp + 1) = singleTypeIds[a]) {
                currTmp = singleTypeIds[a];
            } else {
                find = false;
                break;
            }
        }

        if (find) {
            var cards = [currTmp, currTmp + 1, currTmp + 2, currTmp + 3, currTmp + 4];
            var surplusCard = removeData(this.ids, singleFind);
            var jsData = {
                //组合成功的牌
                cards: cards,
                //剩余的牌
                surplusCard: surplusCard
            }
            canData.push(jsData);
        }
    }
    return canData;
};
 

/*
*单个花色可能组合出的【铁支】   (计算  ---后咚----)
*singleTypeIds:单个花色的id集合 如：[1,2,3,4,5,6,7,8]
*return [{type:1,cards[1,2,3,5,6],surplusCard:[1,2,3,4,5,6,7]}]
*/
pro.getSingleTypeTZ = function (singleTypeIds) { 
    var canData = []; 
    return canData;
};

/*
*单个花色可能组合出的【葫芦】   (计算  ---后咚----)
*singleTypeIds:单个花色的id集合 如：[1,2,3,4,5,6,7,8]
*return [{type:1,cards[1,2,3,5,6],surplusCard:[1,2,3,4,5,6,7]}]
*/
pro.getSingleTypeHL = function (singleTypeIds) { 
    var canData = []; 
    return canData;
};

/*
*单个花色可能组合出的【同花】   (计算  ---后咚----)
*singleTypeIds:单个花色的id集合 如：[1,2,3,4,5,6,7,8]
*return [{type:1,cards[1,2,3,5,6],surplusCard:[1,2,3,4,5,6,7]}]
*/
pro.getSingleTypeTH = function (singleTypeIds) { 
    var canData = []; 
    return canData;
};