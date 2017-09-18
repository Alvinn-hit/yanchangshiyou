function baseAjax(ajaxObject){
	var urlPath = $api.getStorage("baseURL") + "/" + $api.getStorage("projectName") + "/";
	var url = urlPath + ajaxObject.url;
	var method = "post";
	var tag = "";
	if(ajaxObject.method != ""){
		method = ajaxObject.method;
	}
	if(ajaxObject.tag != ""){
		tag = ajaxObject.tag;
	}
	
	var dataType = "json";
	if(ajaxObject.dataType != ""){
		dataType = ajaxObject.dataType;
	}
	
	var appSessionId = $api.getStorage("appSessionId");
	if(!ajaxObject.params || ajaxObject.params == null){
		ajaxObject.params = new Object();
	}
	
	ajaxObject.params.appSessionId = appSessionId;
	if(!ajaxObject.params.limit){
		ajaxObject.params.limit = $api.getStorage("limit");
	}
	if(!ajaxObject.params.offset){
		ajaxObject.params.offset = $api.getStorage("offset");
	}
	var data = ajaxObject.params;
	var onSuccessFunction = ajaxObject.onSuccessFunction;
	
	if(!ajaxObject.isShowProgress || ajaxObject.isShowProgress == ""){
		api.showProgress({style: 'default', animationType: 'fade', title: '加载中...', text: '',modal: true});
	}
	
    api.ajax({
		url: url,
		tag: tag,
	    method:method,
	    dataType:dataType,
	    data:{values:data},
	    timeout:120,
	    charset:"utf-8"
    },function(ret,err){
   		if(!ajaxObject.isHideProgress || ajaxObject.isHideProgress == ""){
			api.hideProgress();
		}
    	if(err){
    		// android
    		if(err.code == 0){
	    		api.toast({msg:"连接错误",duration:2000,location:'center'});
	    	}else if(err.code == 1){
	    		api.toast({msg:"连接超时",duration:2000,location:'center'});
	    	}else if(err.code == 2){
	    		api.toast({msg:"授权错误",duration:2000,location:'center'});
	    	}else if(err.code == 3){
	    		api.toast({msg:"数据类型错误",duration:2000,location:'center'});
	    	}else if(!ret || !ret.result || ret.result == null || ret.result == ""
	    				|| !ret.data || ret.data == null || ret.data == ""){
	    		api.toast({msg:"数据异常",duration:2000,location:'center'});
	    	}else if(ret.state == ret.login){
	    		api.openWin({
					name : 'login',
					url : 'widget://login.html',
					reload : true,
					slidBackEnabled : false,
				});
			}else if(ret.state != ret.success){
				api.hideProgress();
				api.toast({msg:ret.msg,duration:2000,location:'center'});
			}else{
				if(ret.totalCount){
					$api.setStorage("totalCount", ret.totalCount);
				}
				onSuccessFunction(ret);
			}
    	}else{
    		// ios
    		if(!ret){
    			api.toast({msg:"数据异常",duration:2000,location:'center'});
    		}else if(ret.state == ret.login){
	    		api.openWin({
					name : 'login',
					url : 'widget://login.html',
					reload : true,
					slidBackEnabled : false,
				});
			}else if(ret.state != ret.success){
				api.hideProgress();
				api.toast({msg:ret.msg,duration:2000,location:'center'});
			}else{
				if(ret.totalCount){
					$api.setStorage("totalCount", ret.totalCount);
				}
				onSuccessFunction(ret);
			}
    	}
    });
}

function setLoginInfo(ret){
	// 以防万一先清除手机缓存
	rmLoginInfo();
	// 默认自动登录 保存会员信息
	$api.setStorage("isLogin", "1");
	$api.setStorage("isAutoLogin", "1");
	// 头像路径
	$api.setStorage("operator", ret.operatorViewVo);
	$api.setStorage("member", ret.operatorViewVo.memberViewVo);
}

function rmLoginInfo(){
	// 清除自动登录 、会员信息、车辆信息、发票信息
	if($api.getStorage("isLogin"))$api.rmStorage("isLogin");
	if($api.getStorage("isAutoLogin"))$api.rmStorage("isAutoLogin");
	if($api.getStorage("operator"))$api.rmStorage("operator");
	if($api.getStorage("member"))$api.rmStorage("member");
	if($api.getStorage("invoiceList"))$api.rmStorage("invoiceList");
	if($api.getStorage("basicCarList"))$api.rmStorage("basicCarList");
}

function execScriptFrame(name, frameName){
	var jsfun = 'reloadFrame();';
	api.execScript({
		name: name,
	    frameName: frameName,
	    script: jsfun
	});
}

function execScriptWin(name){
	var jsfun = 'reloadFrame();';
	api.execScript({
		name: name,
	    script: jsfun
	});
}

function reloadFrame(){
	location.reload();
}

/**判断是否为空**/
function isEmpty(value, trim) {
    return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
};

//图片缓存
function imageCache(ele) {
	var imageURL = $api.attr(ele, 'datasrc');
	if(!isEmpty(imageURL) && imageURL.indexOf("baseURL") != -1){
		return;
	}else if(imageURL == $api.getStorage("baseURL")+ "/"){
		return;
	}
	api.imageCache({
		url : imageURL,
		thumbnail : false
	}, function(ret, err) {
		if (ret.status && ret.url && ret.url != imageURL) {
			ele.src = ret.url;
		}
		$api.removeAttr(ele, 'datasrc');
	});
}
