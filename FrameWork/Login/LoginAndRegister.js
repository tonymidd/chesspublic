/**
 * 功能：登录
 * 作者：tony
 * 时间：2016-12-22
 */

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        
    },    

    onLoad:function(){
        this.platform = 'default';
        this.ip = ConfigGame.getIp();
        this.port =  ConfigGame.getHttpPort();
        this.token = 'dG9ueSZmaXNoZXJAaGFwcHlfdG9fd29ya190b2dldGhlcg=='
    },

    setIp:function(ip){
        this.ip = ip;
    },

    setPort:function(port){
        this.port = port;
    }, 

    setPlatform:function(platform){
        this.platform = platform;
    }, 
    
    setToken:function(token){
        this.token = token;
    },

    doLogin:function( name , password , cb ){
        var self = this;
        var url  ='http://'+this.ip+':'+this.port+'/login/?name='+name+'&pwd='+password+'&token='+''+'&platform='+'';
        cc.log('登录 url : %s ', url );
        var httpRequest = new HttpRequest( url,'GET', function(res){
           if( null != cb )
           {
               if( res.code == 200 ){
                   self.goGame(name,cb);
               }else{
                   //MsgPrompt.create('错误码：'+res.code);
               }
           } 
        });
    },

    doRegister : function( name , password , cb ){  
        var url  ='http://'+this.ip+':'+this.port+'/register/?name='+name+'&pwd='+password+'&token='+''+'&platform='+'';
        var httpRequest = new HttpRequest( url,'GET', function(res){
           if( null != cb )
           {
               if( res.code == 200 ){
                   cb( res.code );
               }else{
                   //MsgPrompt.create('错误码：'+res.code);
               }
           } 
        });
    },

    /***游客登录 */
    authUser : function( name , password  , cb ){ 
        var self = this;
        var url  ='http://'+this.ip+':'+this.port+'/authUser/?name='+name+'&pwd='+password+'&token='+''+'&platform='+'';
        cc.log('authUser url : '+url)
        var httpRequest = new HttpRequest( url,'GET', function(res){
           if( null != cb )
           {
              cc.log('authUser一键登录游戏 res '+JSON.stringify(res)); 
               if( res.code == 200 ){
                   self.goGame(name,cb);  
               }else{
                   //MsgPrompt.create('错误码：'+res.code);
               }
           } 
        });
    },
   
    goGame : function (uid , cb ) { 
        try {
            var _MAC = uid,
                pwd = uid; 
            PomeloClient.connect(this.ip,  ConfigGame.getPomeloPort(), function () {
                PomeloClient.queryEntry(_MAC, function (host, port) {
                    PomeloClient.connectGame(host, port, function () { 
                        PomeloClient.entry(host, port, _MAC, pwd, function (data) {
                            if (data.code !== 200 && data.code !== 1003) {
                                return;
                            }else{
                                PomeloClient.afterLogin(data, _MAC , cb);
                            }                            
                        });
                    });
                });
            });
        } catch (ex) {
            cc.log('err: ' + ex.stack);
        }
    } 
});
