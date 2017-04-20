
var AnalysisCards = function (ids) {
    this.initData(ids);
}

var pro = AnalysisCards.prototype;

/**
* ids:[1,2,3,4,5,6,8,10]
*/
pro.initData = function ( ids ) {
    //从小到大排序
    this.ids = _.sortBy(ids, function (num) {
        return num;
    })

    //如[{id:1,number:1,cardType:1}]
    this.cards = [];

  

    //key: type
    //value:cnt
    //如{1:3,2:5,3:5}
    this.cntByTypeList = {};
    
    //同花色的集合在一起
    //key: type
    //value:[1,2,3,4]
    //如{1:3,2:5,3:5}
    this.idsByTypeList = {};

    //key: type
    //value:
    //如
    this.cardsByTypeList = {};

    //key: number
    //value:[1,2,3,4] id集合
    //如
    this.sameCardsByNumList = {};


    
    _.each(this.ids, function (id) {
        var data = {};
        data.id = id;
        data.number = 1;
        data.cardType = 1;
        self.cards.push(data);

        if (null == self.cntByTypeList[data.cardType]) {
            self.cntByTypeList[data.cardType] = 0;
        }
        self.cntByTypeList[data.cardType]++;

        if (null == self.idsByTypeList[data.cardType]) {
            self.idsByTypeList[data.cardType] = [];
        }
        self.idsByTypeList[data.cardType].push(id);

        if (null == self.cardsByTypeList[data.cardType]) {
            self.cardsByTypeList[data.cardType] = [];
        }
        self.cardsByTypeList[data.cardType].push(data);

        if (null == self.sameCardsByNumList[data.number]) {
            self.sameCardsByNumList[data.number] = []; 
        }
        self.sameCardsByNumList[data.number].push(id);
    })
};

/**
* 通过类型获取此类型的总数量
* _type : 0-3
*/
pro.getNumByType = function (_type) {
    var ids = this.getIdsByType(_type);
    return _.size(ids);
};

/**
* 通过类型获取此类型的总数量
* _type : 0-3
* return [1,2,3,4,5]
*/
pro.getIdsByType = function (_type) {
    return this.idsByTypeList[_type];
};

/**
* 通过类型获取此类型的总数量
* _type : 0-3
* return [{id:1,number:1,cardType:1}]
*/
pro.getCardsByType = function (_type) {
    return this.idsByTypeList[_type];
};

/**
 * 获取数据
 */
pro.getIds = function(){
    return this.ids;
};

//----------------------------------------------------------------------------------------------------------------------------

/**可组合出【同花顺】的数据*/
pro.canTHSIdsType = function () {
    var singleTypeGroupList = [];
    var i = 1, j = 4; 
    for (i; i <= j; ++i) {
        var singleTypeIds = this.getIdsByType(i);
        if (_.size(singleTypeIds) >= 5) { 
            var num = _.size(singleTypeIds);
            //可能组成的种类数
            var mayBeGroupCnt = num - 4;
            for (var k = 0; k < mayBeGroupCnt; ++k) {
                var find = true;
                //最小牌
                var currTmp = singleTypeIds[i];

                //表示从第二个数字比
                var a = k + 1;
                var b = k + 4;
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
                    singleTypeGroupList.push(cards);
                }
            }
        }
    }
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};


/**可组合出【铁支】4+1比如[1,1,1,1,2]的数据*/
pro.canTZIdsType = function () {
    var singleTypeGroupList = [];  
    _.each( this.sameCardsByNumList,function(tmpIds){
        var size =_.size(tmpIds);
        if( size == 4 ){
            singleTypeGroupList.push(tmpIds); 
        }
    } )    
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

/**可组合出【葫芦】3+2比如[1,1,1,2,2]的数据*/
pro.canHLIdsType = function () {
    var singleTypeGroupList = []; 
    _.each(this.sameCardsByNumList, function (tmpIds) {
        var size = _.size(tmpIds);
        if (size == 3) {
            singleTypeGroupList.push(tmpIds);            
        }
    })
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

/**可组合出【同花】的数据*/
pro.canTHIdsType = function () {
    var singleTypeGroupList = [];
    var i = 1, j = 4;
    for (i; i <= j; ++i) {
        var singleTypeIds = this.getIdsByType(i);
        var num = _.size(singleTypeIds);

        if ( num >= 5) {             
            //可能组成的种类数
            var mayBeGroupCnt = num - 4;
            for (var k = 0; k < mayBeGroupCnt; ++k) {
                var cards = [singleTypeIds[k], singleTypeIds[k + 1], singleTypeIds[k + 2], singleTypeIds[k + 3], singleTypeIds[k + 4]]
                singleTypeGroupList.push(cards);
            }

        }
    }
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

/**可组合出【顺子】的数据*/
pro.canSZIdsType = function () {
    var singleTypeGroupList = [];  
    for (var i = 1; i <= 9 ; ++i) {
        var isFind = true;
        var findData = [];
        for (var j = i; j < (i + 5) ; ++j) {
            if (null == this.sameCardsByNumList[j]) {
                isFind = false;
                break;
            }
            findData.push(this.sameCardsByNumList[j][0]);
        }

        if (false==isFind) {
            continue;
        }

        singleTypeGroupList.push(findData);
    }
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

/**可组合出【三条】的数据*/
pro.canSTIdsType = function () {
    return this.canHLIdsType();
};

/**可组合出【两对】的数据*/
pro.canLDIdsType = function () {
    var singleTypeGroupList = [];

    var tmpGroup = [];
    _.each(this.sameCardsByNumList, function ( num ,cards ) {
        if (_.size(cards) >= 2) {
            tmpGroup.push(cards);
        }
    })

    var size = _.size(tmpGroup);
    if (size >= 2) {
        var tmpSize = size-1
        for (var i = 0; i < tmpSize; ++i) {
            var okData = [];
            okData.push(tmpGroup[i][0])
            okData.push(tmpGroup[i][1])
            for (var j = i + 1; j < size ; ++j) {
                okData.push(tmpGroup[j][0]);
                okData.push(tmpGroup[j][1]);
            }
            singleTypeGroupList.push(okData);
        }
    }

    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

/**可组合出【一对】的数据*/
pro.canYDIdsType = function () {
    var singleTypeGroupList = []; 
    return { cnt: _.size(singleTypeGroupList), singleTypeGroupList: singleTypeGroupList };
};

module.exports = AnalysisCards;
