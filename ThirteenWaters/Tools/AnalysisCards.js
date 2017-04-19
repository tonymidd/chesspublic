
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

/**可能组合出【同花顺】的数据*/
pro.canTHSIdsType = function () {
    var singleTypeGroupList = [];
    var i = 1, j = 4;
    var cnt = 0;
    for (i; i <= j; ++i) {
        var singleTypeGroup = this.getIdsByType(i);
        if (_.size(singleTypeGroup) >= 5) {
            singleTypeGroupList.push(singleTypeGroup);
            cnt++;
        }
    }
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};


/**可能组合出【铁支】的数据*/
pro.canTZIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【葫芦】的数据*/
pro.canHLIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【同花】的数据*/
pro.canTHIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【顺子】的数据*/
pro.canSZIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【三条】的数据*/
pro.canSTIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【两对】的数据*/
pro.canLDIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

/**可能组合出【一对】的数据*/
pro.canYDIdsType = function () {
    var singleTypeGroupList = []; 
    var cnt = 0; 
    return { cnt: cnt, singleTypeGroupList: singleTypeGroupList };
};

module.exports = AnalysisCards;
