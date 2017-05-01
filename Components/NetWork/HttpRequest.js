/**
 * @param {*} url 
 * @param {*} method POST or GET
 * @param {*} cb 
 */
var HttpRequest = function(url,method,cb){ 
    MsgNetWait.create();
    this.url = url;
    this.cb = cb;
    var self = this; 
   
    this.xhr = cc.loader.getXMLHttpRequest();
    this.xhr.timeout = 5000;
    this.xhr.onreadystatechange = function () { 
        self.callBack();
    }; 

    this.xhr.onerror =function(err){ 
        MsgNetWait.close();
        //MsgPrompt.create('连接超时请重试');   
    };
    this.xhr.ontimeout=function(){
        this.close(this.xhr);
        MsgNetWait.close();
        //MsgPrompt.create('连接超时请重试');   
    };

    this.xhr.open("GET", encodeURI(this.url), true); 

    if (cc.sys.isNative) {
       this.xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8","Access-Control-Allow-Origin");
    }  
    self.xhr.send();
};  

HttpRequest.prototype.callBack = function()
{    
     if (this.xhr.readyState == 4 && (this.xhr.status >= 200 && this.xhr.status < 400)) { 
            MsgNetWait.close();
            var res = JSON.parse(this.xhr.responseText);
            cc.log('http 回包数据：'+this.xhr.responseText);
            if( null != this.cb)
            {
                this.cb(res);
            } 
     }
};