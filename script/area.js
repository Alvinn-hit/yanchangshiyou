 //地区选择
function area(areaValueId,areaShowId) {
	var UIActionSelector = api.require('UIActionSelector');
	UIActionSelector.open({
    datas: 'widget://script/city.json',
	    layout: {
	        row: 5, 
	        col: 3,
	        height: 30, 
	        size: 14,
	        sizeActive: 16,
	        rowSpacing: 5,
	        colSpacing: 10,
	        maskBg: 'rgba(0,0,0,0.2)',
	        bg: '#fff',
	        color: '#888',
	        colorActive: '#F13D3E', 
	        colorSelected: '#f00'
	    },
	    animation: true,
	    cancel: {
	        text: '取消', 
	        size: 14,
	        w: 90,  
	        h: 35,
	        bg: '#F13D3E',
	        bgActive: '#F13D3E',
	        color: '#fff',
	        colorActive: '#fff'
	    },
	    ok: {
	        text: '确定',
	        size: 14,
	        w: 90,
	        h: 35,
	        bg: '#F13D3E',
	        bgActive: '#F13D3E',
	        color: '#fff',
	        colorActive: '#fff'
	    },
	    title: {
	        text: '请选择',
	        size: 14,
	        h: 44,
	        bg: '#eee',
	        color: '#888'
	    },
	    fixedOn: api.frameName
	}, function(ret, err) {
		if(ret.eventType == "ok"){
		    var areaName="";
		  	areaName+=ret.level1 == "请选择" ? "" : ret.level1;
		  	areaName+=ret.level2 == "请选择" ? "" : ret.level2;
		  	//areaName+=ret.level3 == "请选择" ? "" : ret.level3;
		  	if(!ret.level3 || ret.level3 == "请选择"){
		  		areaName += "";
		  	}else{
		  		areaName += ret.level3;
		  	}
			$api.val($api.dom("#" + areaValueId), areaName);
			$api.html($api.dom("#" + areaShowId), areaName);	
			var ajaxObject = new Object();		
			ajaxObject.url = "/appMemberAjax!updateMyUserInfo.htm";		
			ajaxObject.params = new Object();	
			ajaxObject.params={
				"memberViewVo.areaName":areaName
			}
			ajaxObject.onSuccessFunction = function(ret) {
				if(ret.state=="3"){
					api.sendEvent({
					name : "flushMyFrameEvent"
					});
		            api.toast({
						msg : "保存成功",
						duration : 2000,
						location : 'center'
					});
				}else{
					api.alert({
						title:"提示",
						msg:ret.msg
		            });
				}		
			}
			baseAjax(ajaxObject, 1);
		}
	});
}