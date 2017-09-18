 //单行数据选择
function row(type,valueName,valueShowName) {
		if(type == 1){
			data = "row.json";			
		}
		if(type == 2){
			data = "row1.json";
		}
		if(type == 3){
			data = "row2.json";
		}
		if(type == 4){
			data = "row3.json";
		}
//		var dateq='[{"name":"suv"},{"name":"7人车"}]';
//		var da=JSON.parse(dateq);
			var UIActionSelector = api.require('UIActionSelector');
   UIActionSelector.open({
    datas: 'widget://script/' + data,
    layout: {
        row: 5, 
        col: 1,
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
			if(!isEmpty(valueName)){
					$api.val($api.dom("#" + valueName), ret.level1 == "请选择" ? "" : ret.level1);
			}
			if(!isEmpty(valueShowName)){			
		   		$api.html($api.dom("#" + valueShowName), ret.level1 == "请选择" ? "" : ret.level1);
			}
		   
		}
	});
}