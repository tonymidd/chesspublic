var PrefabsToPos = cc.Class({
    extends: cc.Component,

    properties: {
        nodePos:{
            default:null,
            type:cc.Node,
            displayName:'实例化出来的对象绑定的位置'
        },

        prefabs:{
            default:null,
            type:cc.Prefab,
            displayName:'预设体'
        }
    }, 
});

module.exports = PrefabsToPos;
window.PrefabsToPos = PrefabsToPos;