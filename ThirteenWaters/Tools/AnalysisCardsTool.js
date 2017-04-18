var AnalysisCardsTool = function(ids){ 
    this.initData(ids);
}

var pro = AnalysisCardsTool.prototype;

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

/**同花顺类型组*/
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

/*
* return [{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]}]
*/
pro.getResult = function (ids) {
    var groupList = [];

    //后-同花顺
    var jData = this.canTHSIdsType();
    if (jData.cnt > 0) {
        var i = 0;
        for (i; i < jData.cnt; ++i) {

        }
    }  
};

/*
*通过数据获取同花顺数据 
*singleTypeIds:单个花色的id集合 如：[1,2,3,4,5,6,7,8]
*return [{type:1,cards[1,2,3,5,6],surplusCard:[1,2,3,4,5,6,7]}]
*/
pro.getHTS = function ( singleTypeIds ) {
    var num = _.size(singleTypeIds);
    //可能组成的种类数
    var mayBeGroupCnt = num - 4;
    var i = 0;
    for (i; i < mayBeGroupCnt; ++i) {
        var a = i + 1;
        var b = i + 4;
        var currTmp = singleTypeIds[i];
        for (a; a < b; ++a) {
            if ( (currTmp + 1) = singleTypeIds[a]) {
                currTmp = singleTypeIds[a];
            } else {
                break;
            }
        }
    }
};

/**
*中5牌组合
**/
pro.getMiddGroup5 = function () {

};

/*
*   做数据分析
*
*/
var DoAnalysisCards = function () {

};

var doPro = DoAnalysisCards.prototype;

/**
*   获取计算结果
*   return [            
                前、中、后顿
                [{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]}],
                [{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]},{type:1,cards[1,2,3,4]}],
           ]
*/
doPro.getResult = function (ids) {
    var result = [];
    
    var i = 9, j = 0;
    for (i ; i > 0 ; --i) {
        var analysisCardsTool = new AnalysisCardsTool(ids);

    }

}