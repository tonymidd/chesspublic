var _ = require('underscore');
var AnalysisCardsTool = require('./Tools/AnalysisCardsTool');
var AnalysisCards = require('./Tools/AnalysisCards');
var doMain=function(){ 
 
	var myData = [1, 2, 3, 4, 5, 10, 11,15,18,20,28,29,40];  
	

	var analysisCardsTool = new AnalysisCardsTool(myData);
	var allData = analysisCardsTool.getAllResult();
	console.log( JSON.stringify(allData) );

};

doMain();