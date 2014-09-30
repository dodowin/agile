﻿/*
 * 初始化exmobi事件
 * */
document.addEventListener("backmonitor", function() {
	if(A.hasAsideMenuOpen){
        A.AsideMenu.hide();
    }else if(A.hasPopupOpen){
        A.closePopup();
    }else{
    	if(A.Router.history().length<2){
    		$native.close();
    	}else{
    		window.history.go(-1);
    	}
    }
},false);
/*
 * 初始化settings
 * */
//重置跨域请求的函数
A.settings.crossDomainHandler = $util.ajax;
A.showMask = $native.showMask;
A.hideMask = $native.hideMask;
/*
 * 扩展Element
 */
//扩展file在ExMobi中调用本地能力
A.Element.addFormSelector('file','[data-role="file"]',function(el){
	var $el = $(el);
	var $label = $el.find('label');
	var $input = $el.find('input');
	var placeholder = $label.html();
	$el.tap(function(e){
		$native.openFileSelector(function(path){
			if(path&&($input.val()!=path)&&$el.data('change')){
				eval($el.data('change'));
			}
			var p = path.split('/');
			$label.html(path?p[p.length-1]:placeholder);
			$input.val(path);    
		});
	});	
	$label.html($input.val()||placeholder);
});
//扩展date和time在ExMobi中调用本地能力
A.Element.addFormSelector('datetime','[data-role="date"],[data-role="time"]',function(el){
	var $el = $(el);
	var $label = $el.find('label');
	var $input = $el.find('input');
	var placeholder = $label.html();
	$el.tap(function(e){
		$native.openDateTimeSelector($el.data('role'),$input.val(),function(str){
			if(str&&($input.val()!=str)&&$el.data('change')){
				eval($el.data('change'));
			}
			$label.html(str?str:placeholder);
			$input.val(str);
		});
	});
	$label.html($input.val()||placeholder);
});
//扩展barcode在ExMobi中调用本地能力
A.Element.addFormSelector('scanning','[data-role="barcode"],[data-role="qrcode"]',function(el){
	var $el = $(el);
	var $label = $el.find('label');
	var $input = $el.find('input');
	var placeholder = $label.html();
	$el.tap(function(e){
		$native.decode(function(encode){
			var result = encode?encode.result:'';
			if(result&&($input.val()!=result)&&$el.data('change')){
				eval($el.data('change'));
			}
			$label.html(result||placeholder);
			$input.val(result);
		});
	});
	$label.html($input.val()||placeholder);
});
/*
 * 扩展Router
*/
//扩展data-target="native"
A.Router.add('native', function(href, el){
	$native.openWebView(href, el);
});
//扩展data-target="exit"
A.Router.add('exit', function(){ $native.exit('是否退出程序？'); });
//扩展data-target="close"
A.Router.add('close', function(){ $native.close(); });
//扩展data-target="exmobi"
A.Router.add('exmobi', function(href, el){
	$native.openExMobiPage(href, el);
});
/*
 * 初始化默认ajax
 * */
//A.ajax = $util.server;