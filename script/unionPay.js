//银联支付
function unionPay(obj){
	var onSuccessFunction = obj.payFunction;
	var onFailFunction = obj.failFunction;
	var tn = obj.tn;
	
	var cnPay = api.require('constructionPay');
	cnPay.pay({
		tn: tn,
		mode: '01'
	}, function(ret){
	    if(ret.result == "Y"){
	    	onSuccessFunction();
	    }
	    if(ret.result == "N"){
	    	onFailFunction();
	    }
	    if(ret.result == "C"){
	    	onFailFunction();
	    }
	});
}