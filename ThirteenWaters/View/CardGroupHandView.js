/**
 * 手牌显示区
 * 描述：服务器首次发牌时需要处理添加牌动作
 *      拖动此组件管理的卡牌时由卡牌本身处理
 * author:tony
 * time : 2017/03/24
 */ 
var EveViewLister = require('./../EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./../CollisionCheckCtr'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
var EnumCardAreaType = require('./EnumCardAreaType');
var BaseCardGroupViewThirteenWaters = require('./BaseCardGroupViewThirteenWaters');
module.exports =  cc.Class({
    extends: BaseCardGroupViewThirteenWaters,

    properties: {
        mEveLister : {            
            default:null,
            type:EveViewLister
        },
        mCollisionCheckCtr : {            
            default:null,
            type:CollisionCheckCtr
        },      
    },  

    onLoad:function(){ 
        
        this._super(); 

        this.mEveLister.addLister(EnumTouchAction.HAND_PUT_DOWN,this.putDown,this);

        this.mEveLister.addLister(EnumTouchAction.HAND_PICK_UP,this.pickUpCard,this); 

        this.addCards([1,2,3,4,5,6,7]);
    },
    
    /***添加一张牌 */
    addCard: function(cardId){  
         this._super();
         var self = this;
         UtilGameObject.createAddparent( 'prefabs/thirteenWaters/CardDragView' , this.node ,function(tmpObj){ 
             var cardDragView = tmpObj.getComponent('CardDragView');
             cardDragView.refresh( cardId );
         
                cardDragView.setPosition( self.getPosition() )
                cardDragView.setCollisionCheckCtr(self.mCollisionCheckCtr)
                cardDragView.setCardAreaType(self.getCardAreaType())
                cardDragView.setEveLister(self.mEveLister)
                cardDragView.setCardId(cardId)
                cardDragView.setSoltObjectGroup(self.objectGroup)

                self.singleCardSize = tmpObj.getContentSize();             
                var tmp = tmpObj.getComponent(self.getSingeDataComponentName());
                tmp.setCardId(cardId);
                tmp.setCtr(cardDragView);
                self.objectGroup.add(tmp );
         })   
    },

    /***添加多个牌 */
    addCards : function(cards){
        var self = this;
        _.each( cards , function(cardId){
            self.addCard( cardId );
        }) 
    },

    /***第一个位置 */
    getFristPosition : function(){
        this._super();
        return {x:-320,y:150};
    },

    /***单张牌的尺寸 */
    getSingleCardSize: function(){
        this._super();
        return this.singleCardSize;
    },

    /***获得一个新的坐标 */
    getPosition : function(){
        this._super();
        var fristPosition = this.getFristPosition(); 
        return {x:fristPosition.x + this.getCardCnt()*(this.singleCardSize.width+10),y:fristPosition.y};
    },

    /***获取牌所在区域 */
    getCardAreaType:function(){
        this._super();
        return EnumCardAreaType.HAND;
    },

    /***获取单个牌挂载的数据管理组件 */
    getSingeDataComponentName:function(){
        this._super();
        return 'SingleCardViewData';
    },
});
