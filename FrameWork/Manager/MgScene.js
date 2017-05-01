/*
* 游戏场景管理器
* 作者：tony
*/
var MgScene = (function () {
    var instantiated;
    
    var currSceneName = ""; 
    function init() {
        /*这里定义单例代码*/
        return { 
            gotoScene : function( EnumScene ){     
                var data = PlanApi.PlanScene.findById( Number(EnumScene) ); 
                currSceneName = data.sceneName;  
                this.gotoSceneByName(currSceneName);           
            }, 

            gotoSceneByName : function(name){
                MsgGotoScene.create();
                cc.director.loadScene( name ); 
            },

            getCurrScene :function(){
                 return currSceneName;
            },
        };
    }

    return {
        Inst: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})(); 

window.MgScene=MgScene;