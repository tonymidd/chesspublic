var codeLog = module.exports = {
	200:"成功",
	500:"未知错误",
	501:"数据库错误",
	503:"钻石不足",
	1000:"账号已被注册",
	1001:"账号密码错误",
	1002:"帐号不存在",
	1003:"账号密码错误",
	1004:"帐号不存在"
};

codeLog.info = function( code ){
	code = parseInt(code);
	console.log('code : %s  注释 ：%s ',code,this[code] );
};
window.codeLog = codeLog