//上传start-------------------------------------------------------------------------
//选择图片并获取图片并上传 （文件路径）
/*参数说明
 * ajaxObject.isCompress 是否压缩  不传为不压缩
 * ajaxObject.size       压缩比例  1-10；不传默认是10
 * 
 */
function baseUploadPicUrl(ajaxObject) { 
	api.actionSheet({
		title : '选择图片来源',
		buttons : ['立即拍照', '浏览相册']
	}, function(ret, err) {
		var index = ret.buttonIndex;
		switch(index) {
			// 拍照
			case 1:
				// 打开拍照
				api.getPicture({
					sourceType : "camera",
					encodingType : "jpg",
					destinationType : "base64",
					mediaValue : "pic",
					quality : 90,
					saveToPhotoAlbum : true
				}, function(ret, err) {
					if (ret && ret.data) {
						layer.open({
							content:"确定上传吗",
							btn:["确定","取消"],
							yes:function(index){
								layer.closeAll();
								//先判断图片大小
								//如果大于规定值则终止上传并提示
								if (compareSize(ret.base64Data, 6)) { 
									api.toast({msg:"上传图片不能大于5M",duration:2000,location:'center'});
									return;
								}
						       	api.showProgress({style : 'default',animationType : 'fade',title : '上传中...',text : '',modal : false});
								var pathList = new Array();
								pathList.push(ret.data);
								if(ajaxObject.isCompress){
									var size = ajaxObject.size == undefined ? 10 : ajaxObject.size;
									if(api.systemType == 'ios'){
										size = getCompressSize(ret.base64Data);
									}
									//压缩方法
									var compactPicture = api.require('compactPicture');
									compactPicture.HittingPic({
									    picpatharray: pathList,
									    size: size
									}, function(ret) {
										baseUploadPicUrlAjax(ajaxObject, ret.states);
									});
								}else{
									baseUploadPicUrlAjax(ajaxObject, pathList);
								}	
							}
						})
					}
				});
			break;
			// 打开相册
			case 2:
				api.getPicture({
					sourceType : "album",
					encodingType : "jpg",
					destinationType : "base64",
					mediaValue : "pic",
					quality : 90,
				}, function(ret, err) {
					if (ret && ret.data) {
						layer.open({
							content:"确定上传吗",
							btn:["确定","取消"],
							yes:function(index){
						    	layer.closeAll();
						    	//先判断图片大小
								//如果大于规定值则终止上传并提示
								if (compareSize(ret.base64Data, 6)) { 
									api.toast({msg:"上传图片不能大于5M",duration:2000,location:'center'});
									return;
								}
						       	api.showProgress({style : 'default',animationType : 'fade',title : '上传中...',text : '',modal : false});
								var pathList = new Array();
								pathList.push(ret.data);	
								if(ajaxObject.isCompress){
									var size = ajaxObject.size == undefined ? 10 : ajaxObject.size;
									size = getCompressSize(ret.base64Data);
									//压缩方法
									var compactPicture = api.require('compactPicture');
									compactPicture.HittingPic({
									    picpatharray: pathList,
									    size: size
									}, function(ret) {
										baseUploadPicUrlAjax(ajaxObject, ret.states);
									});
								}else{
									baseUploadPicUrlAjax(ajaxObject, pathList);
								}
							}	
						});
					} 
				});
			break;
		}
	});
}

//上传图片方法2.0
function baseUploadPicUrlAjax(ajaxObject, ret){
	var urlPath = $api.getStorage("baseURL") + "/" + $api.getStorage("projectName") + "/";
	var url = urlPath + ajaxObject.url;

	if (!ajaxObject.params || ajaxObject.params == null) {
		ajaxObject.params = new Object();
	}

	var onSuccessFunction = ajaxObject.onSuccessFunction;
	api.ajax({
		url : url,
		method: 'post',
        dataType: 'json',
	    data:{
	    	values:{"appSessionId": $api.getStorage("appSessionId")}, 
	    	files:{"file": ret}
	    },
	    timeout:120,
	    charset:"utf-8",
    },function(ret,err){
   		api.hideProgress();
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
					url : 'widget://login.html'
				});
			}else if(ret.state != ret.success){
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
					url : 'widget://login.html'
				});
			}else if(ret.state != ret.success){
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
	
//上传end-------------------------------------------------------------------------

//获取base64图片大小并判断
function compareSize(picData, size) {
	var picSize = picData.length * 0.8;
	picSize = (picSize / 1024 / 1024);
	if (picSize > size) {
		return true;
	} else {
		return false;
	}
}
function getCompressSize(picData) {
	var picSize = picData.length * 0.8;
	picSize = (picSize / 1024 );
	//返回大小单位为kb
	if(picSize > 600){
		return 1;
	}else if(picSize <= 600 && picSize > 400){
		return 2;
	}else if(picSize <= 400 && picSize > 200){
		return 3;
	}
}