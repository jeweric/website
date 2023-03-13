/**
 * H5 微信传播
 *
 * Created by zhouhai on 2015-04-18
 * Update  by zhouhai on 2015-04-18
 */
seajs.use(['jquery','blockUI'], function($,blockUI) {
    var download = {
    	init:function(){
    		this.bindEvent();
    	},
    	bindEvent:function(){
            var width = document.documentElement.clientWidth;
            var marginLeft = (width - 390)/2;
    		$('.weixin').click(function(e) {
                $.blockUI({ 
                    message: $('#pop'),
                    css:{
                        marginLeft:'-195px',
                        width:'390px',
                        boxShadow:'0px 2px 10px 5px rgba(0,0,0,0.4)'
                    }
                 });
    		});
            $('#closePop').click(function(e) {
                $.unblockUI();
            });
    	}
    };
    download.init();
});