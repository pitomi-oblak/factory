

/*===============================
/plugins/content/jw_sigpro/jw_sigpro/includes/js/behaviour.js
================================================================================*/;
var SIGProHelper={ieBrowserDetect:function(){if(!document.getElementsByTagName)return false;if(!document.getElementById)return false;var bodyClass=document.getElementsByTagName("body")[0].className;var isIE6=navigator.userAgent.toLowerCase().indexOf('msie 6')!=-1;var isIE7=navigator.userAgent.toLowerCase().indexOf('msie 7')!=-1;var isIE8=navigator.userAgent.toLowerCase().indexOf('msie 8')!=-1;if(isIE6)document.getElementsByTagName("body")[0].className=bodyClass+' sigProIsIE6';if(isIE7)document.getElementsByTagName("body")[0].className=bodyClass+' sigProIsIE7';if(isIE8)document.getElementsByTagName("body")[0].className=bodyClass+' sigProIsIE8';},loader:function(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}}};SIGProHelper.loader(SIGProHelper.ieBrowserDetect);


/*===============================
http://www.template.dev/modules/mod_jb_responsive_testimonals/assets/js/jbrt.js
================================================================================*/;
function showDefaultTestimonalInfo(elem){var $=jQuery.noConflict();$('.jbt-avatar').removeClass('active');$('.jbt-quote-info').hide();var current_li=$(elem).data('li_id');var current_item=$(elem).data('quote_id');$('#'+current_li).addClass('active');$('#'+current_item).show();}