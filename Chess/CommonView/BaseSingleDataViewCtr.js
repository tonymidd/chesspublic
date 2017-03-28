var BaseSingleDataViewCtr = function(){

};

var pro = BaseSingleDataViewCtr.prototype;

pro.setObj = function(obj){
    this.obj = obj;
     return this;
}

pro.setCtr = function(ctr){
    this.ctr = ctr;
    return this;
}


pro.setData = function(data){
     this.data = data;
     return this;
}

pro.getPos = function(){
    return this.data.pos;
}
module.exports = BaseSingleDataViewCtr;