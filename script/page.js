$api.setStorage("offset", "0");
$api.setStorage("limit", "10");
$api.setStorage("totalCount", "10");

// 初始化页面参数
function initPage(){
	$api.setStorage("offset", "0");
	$api.setStorage("limit", "10");
}

// 下一页(flag: 0-需要加载前面所有页的记录,1-只加载当前页记录)
function nextPage(flag){
	var offset = parseInt($api.getStorage("offset"));
	var limit = parseInt($api.getStorage("limit"));
	var totalCount = parseInt($api.getStorage("totalCount"));
	
	if(!flag || flag == "" || flag == 0){
		$api.setStorage("limit", limit + 10);
		$api.setStorage("offset", "0");		
	}else{
		if(offset * limit >= totalCount){
			$api.setStorage("offset", offset);
		}else{
			$api.setStorage("offset", offset + 10);
		}
	}
}

// 上一页
function prevPage(){
	var offset = 0;
	if($api.getStorage("offset") != "0"){
		var limit = parseInt($api.getStorage("limit"));
		offset = parseInt($api.getStorage("offset")) - limit;
	}
	$api.setStorage("offset", offset);
}