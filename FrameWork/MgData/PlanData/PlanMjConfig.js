var PlanBase = require('./../../Utils/PlanBase'),
util = require('util');

var PlanMjConfig = function () {

	var data = [[1,1,1,"M_character_1"],[2,1,2,"M_character_2"],[3,1,3,"M_character_3"],[4,1,4,"M_character_4"],[5,1,5,"M_character_5"],[6,1,6,"M_character_6"],[7,1,7,"M_character_7"],[8,1,8,"M_character_8"],[9,1,9,"M_character_9"],[10,2,1,"M_bamboo_1"],[11,2,2,"M_bamboo_2"],[12,2,3,"M_bamboo_3"],[13,2,4,"M_bamboo_4"],[14,2,5,"M_bamboo_5"],[15,2,6,"M_bamboo_6"],[16,2,7,"M_bamboo_7"],[17,2,8,"M_bamboo_8"],[18,2,9,"M_bamboo_9"],[19,3,1,"M_dot_1"],[20,3,2,"M_dot_2"],[21,3,3,"M_dot_3"],[22,3,4,"M_dot_4"],[23,3,5,"M_dot_5"],[24,3,6,"M_dot_6"],[25,3,7,"M_dot_7"],[26,3,8,"M_dot_8"],[27,3,9,"M_dot_9"],[28,4,100,"M_wind_east"],[29,5,101,"M_wind_west"],[30,6,102,"M_wind_south"],[31,7,103,"M_wind_north"],[32,8,104,"M_red"],[33,9,105,"M_green"],[34,10,106,"M_white"]];

	var indexs = {"1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22,"24":23,"25":24,"26":25,"27":26,"28":27,"29":28,"30":29,"31":30,"32":31,"33":32,"34":33};

	var indexNames = {"id":0,"cardType":1,"value":2,"frameName":3};

	PlanBase.call( this, data , indexs , indexNames );

};

util.inherits( PlanMjConfig, PlanBase );

var pro = PlanMjConfig.prototype;

pro.getCardtype = function(id)
{
	var data = this.findById(id);
	return data.cardType
};
pro.getFramename = function(id)
{
	var data = this.findById(id);
	return data.frameName
};
pro.getId = function(id)
{
	var data = this.findById(id);
	return data.id
};
pro.getValue = function(id)
{
	var data = this.findById(id);
	return data.value
};
module.exports = PlanMjConfig;

