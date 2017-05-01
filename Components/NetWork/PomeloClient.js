/**
 * 封装pomelo网络协议库
 * 时间：2016-12-15
 * 作者：tony
 */ 

/***网络请求基类 */
var BasePomeloClient = function(){

};

var pro = BasePomeloClient.prototype;

/***发生数据请求包
 * 
 */
pro.send = function( rote , dataPage , cb  ){
    MsgNetWait.create();
    pomelo.request(rote, dataPage, function (data) {
           MsgNetWait.close();
           cb(data);           
    });
}

var exp = module.exports = {};
var PomeloNotify = require('./PomeloNotify');

/*
 *   连接服务器
 * */
exp.connect = function (host, port, cb) {
    MsgNetWait.create();
    pomelo.init({host: host, port: port, log: true}, function(){
        MsgNetWait.close();
        cb();
    }); 
};

/*
 *   连接服务器
 * */
exp.connectGame = function (host, port, cb) {
    MsgNetWait.create();
    pomelo.init({host: host, port: port, log: true}, function(){
        MsgNetWait.close();
        cb();
    }); 
    this.pomeloNotify = new PomeloNotify();
    this.pomeloNotify.registerNotifys();
};

/*
 *   查询入口服务器
 *   @param {String} uid client user id.
 *   @param {Function} callback, signature: function callback(connectorServer, connectorServerPort){}
 * */
exp.queryEntry = function (uid, callback) {
    var netCtr = new BasePomeloClient();
    netCtr.send('gate.gateHandler.queryEntry', {uid: uid}, function (data) {
        pomelo.disconnect();
        if (data.code !== 200) {
            console.error('queryEntry failed!');
            callback();
            return;
        }
        callback(data.host, data.port);
    });
};

/*
 *   从connector server登录
 *   @param {String} host connector server ip.
 *   @param {Number} port connector server port.
 *   @param {String} MAC client MAC.
 *   @param {Function} callback signature: function callback(data){}
 * */
exp.entry = function (host, port, MAC, pwd, callback) {
    var netCtr = new BasePomeloClient();
    netCtr.send('connector.entryHandler.entry', {MAC: MAC, password: pwd,platform:"default",playerName:MAC}, function (data) {
        callback(data);
    });
};
 

exp.createPlayer = function (MAC, cb) {
    var netCtr = new BasePomeloClient();
    netCtr.send('connector.roleHandler.createPlayer', {MAC: MAC, name: MAC, pwd: MAC, picId: 1},
        function (res) {
            var success = (res.code === 200);
            cb(success);
        });
};


exp.enterScene= function (cb){ 
    cc.log('area.playerHandler.enterScene');
    var netCtr = new BasePomeloClient();
    netCtr.send("area.playerHandler.enterScene", {}, function(jData){
        cc.log('进入游戏 %s',JSON.stringify(jData));
        g_GameData.createPlayer(jData.curPlayer);
        cb();
    });
};

//创建房间
exp.createRoom= function (cb){   
    cc.log('area.playerHandler.createRoom');
    var netCtr = new BasePomeloClient();     
    netCtr.send("area.playerHandler.createRoom", {}, function(jData){
        cc.log(JSON.stringify(jData));
        if( jData.code == 200 ){
            cc.log('创建房间 %s',JSON.stringify(jData));
            g_GameData.createRoom( jData.room );
            cb(jData.room)
        }
    });
};

//加入一个房间
exp.joinRoom= function (roomId,cb){ 
    cc.log('area.playerHandler.joinRoom');
    var netCtr = new BasePomeloClient();     
    netCtr.send("area.playerHandler.joinRoom", {id:roomId}, function(jData){
        cc.log(JSON.stringify(jData));
        if(jData.code == 200 ){
            cc.log('加入一个房间 %s',JSON.stringify(jData)); 
            g_GameData.createRoom( jData.room );
            cb(jData.room)
        }
    });
};

//准备
exp.ready= function (cb){ 
    cc.log('area.playerHandler.ready');
    var netCtr = new BasePomeloClient();     
    netCtr.send("area.playerHandler.ready", {}, function(jData){
        cc.log(JSON.stringify(jData));
        if(jData.code == 200 ){
            cc.log('准备 %s',JSON.stringify(jData));
            cb(); 
        }
    });
};

//出牌
exp.outCard= function (outCardInfo,cb){ 
    cc.log('area.playerHandler.play');
     cc.log('出牌的信息 %s',JSON.stringify(outCardInfo)); 
    var netCtr = new BasePomeloClient();     
    netCtr.send("area.playerHandler.play", outCardInfo , function(jData){
        cc.log(JSON.stringify(jData));
        if(jData.code == 200 ){
            cc.log('出牌 %s',JSON.stringify(jData)); 
            cb();
        }
    });
};

//完成本局
exp.finish= function (isReady,cb){ 
    cc.log('area.playerHandler.finish');
    var netCtr = new BasePomeloClient();     
    netCtr.send("area.playerHandler.finish", {isReady:isReady}, function(jData){
        cc.log(JSON.stringify(jData));
        if(jData.code == 200 ){
            cc.log('准备 %s',JSON.stringify(jData));
            cb(); 
        }
    });
};

exp.afterLogin = function(data, MAC , cb) {
    cc.log('after login begin enter scene...%s',MAC);  
    /**
     * 处理登录请求
     */
    function login(data) {
        if (data.code === 1003) { 
            exp.createPlayer(MAC, function (success) {
                if (!success) {
                    cc.log('createPlayer create failed!');
                    return;
                }
                exp.enterScene(cb);
            });
            return;
        }
        cc.log('entry ok!already has player.try enter scene...');
        exp.enterScene(cb);
    } 
    login(data); 
}


window.PomeloClient = exp;