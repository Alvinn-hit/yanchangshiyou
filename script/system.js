function initConfig(){
	$api.setStorage("baseURL", "http://123.138.17.92:5080/");
	$api.setStorage("projectName", "admin");
	
	var isAutoLogin = $api.getStorage("hz_isAutoLogin");
	if(!isAutoLogin || isAutoLogin == ""){
		$api.setStorage("hz_isAutoLogin", "0");
	}
	//导航距油站多少米关闭导航
	$api.setStorage("navigationParam", "30");
}

 
function getAppInfo(){
	
}

function appNotion(data) {
	api.notification({
		notify : {
			title : '消息',
			content : '这是新消息',
			extra : data
		}
	}, function(ret, err) {
		if( ret ){
		 //alert( JSON.stringify( ret ) );
		}else{
		 //alert( JSON.stringify( err ) );
		}
	});
}

function initListener(){
	var push = api.require('push');

	api.addEventListener({
        name:'noticeclicked'
    },function(ret,err){
        //alert( JSON.stringify( ret ) );
        api.setFrameGroupIndex({
            name: 'group',
            index: 2,
            reload: true
        });
    });
                        
	push.setListener(function( ret, err ){
	appNotion(2);
	if( ret ){
	   //alert( JSON.stringify( ret) );
	}else{
	   //alert( JSON.stringify( err) );
	}
});
}