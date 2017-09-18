function wxPay(resourceMgpriceViewVo) {
	//购买汽油
	var ajaxObject = new Object();
	ajaxObject.url = "/appGasStoreOrderAjax!saveGasStoreOrder.htm";
	ajaxObject.params = new Object();
	ajaxObject.params['resourceMgpriceViewVo.memberBcode'] = resourceMgpriceViewVo.memberBcode;//加油站编号
	ajaxObject.params['resourceMgpriceViewVo.pricesetPrice'] = resourceMgpriceViewVo.pricesetPrice;//实付金额
	ajaxObject.params['resourceMgpriceViewVo.dataCallurl'] = resourceMgpriceViewVo.dataCallurl;//优惠金额
	ajaxObject.params['resourceMgpriceViewVo.dataParam'] = resourceMgpriceViewVo.dataParam;//应付金额
	ajaxObject.params['resourceMgpriceViewVo.payType'] = resourceMgpriceViewVo.payType;//支付方式
	ajaxObject.params['resourceMgpriceViewVo.ginfoBillno'] = resourceMgpriceViewVo.ginfoBillno;//支付关联业务号(团购预购和油卡的业务号)
	ajaxObject.params['resourceMgpriceViewVo.mgpriceDescription'] = resourceMgpriceViewVo.mgpriceDescription;//油号
	ajaxObject.params['resourceMgpriceViewVo.mgpriceTechnicalDeviation'] = resourceMgpriceViewVo.mgpriceTechnicalDeviation;//油枪号
	ajaxObject.params['resourceMgpriceViewVo.mgpriceBusinessDeviation'] = resourceMgpriceViewVo.mgpriceBusinessDeviation;//加油数量
	ajaxObject.params['resourceMgpriceViewVo.dataCalltype'] = resourceMgpriceViewVo.dataCalltype;//油价
	ajaxObject.params['resourceMgpriceViewVo.mgpriceContactname'] = resourceMgpriceViewVo.mgpriceContactname;//车牌号码
	ajaxObject.params['resourceMgpriceViewVo.dataStr1'] = resourceMgpriceViewVo.dataStr1;//优惠方式（优惠券或折扣卡业务号）
	ajaxObject.params['resourceMgpriceViewVo.dataStr2'] = resourceMgpriceViewVo.dataStr2;//优惠业务号
	ajaxObject.params['resourceMgpriceViewVo.dataStr3'] = resourceMgpriceViewVo.dataStr3;//是否开票
	ajaxObject.params['resourceMgpriceViewVo.dataStr4'] = resourceMgpriceViewVo.dataStr4;//开票抬头
	ajaxObject.onSuccessFunction = function(data) {
		api.openWin({
			name : 'my-balance-success',
			url : 'widget://html/my-balance-success.html',
			pageParam : {
				'price' : resourceMgpriceViewVo.pricesetPrice,
				'payType' : resourceMgpriceViewVo.payType,
				'memberCode' : resourceMgpriceViewVo.memberBcode,
			}
		});
		api.closeFrame({
			name : 'my-key-dialog1'
		});
	}
	baseAjax(ajaxObject);
}