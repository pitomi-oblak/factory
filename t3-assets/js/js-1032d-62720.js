

/*===============================
/administrator/components/com_sppagebuilder/assets/js/jquery.minicolors.min.js
================================================================================*/;
/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright: Cory LaViska for A Beautiful Site, LLC: http://www.abeautifulsite.net/
 *
 * Contribute: https://github.com/claviska/jquery-minicolors
 *
 * @license: http://opensource.org/licenses/MIT
 *
 */
!function(i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function($){"use strict";function i(i,t){var o=$('<div class="minicolors" />'),s=$.minicolors.defaults,a,n,r,c,l;if(!i.data("minicolors-initialized")){if(t=$.extend(!0,{},s,t),o.addClass("minicolors-theme-"+t.theme).toggleClass("minicolors-with-opacity",t.opacity).toggleClass("minicolors-no-data-uris",t.dataUris!==!0),void 0!==t.position&&$.each(t.position.split(" "),function(){o.addClass("minicolors-position-"+this)}),a="rgb"===t.format?t.opacity?"25":"20":t.keywords?"11":"7",i.addClass("minicolors-input").data("minicolors-initialized",!1).data("minicolors-settings",t).prop("size",a).wrap(o).after('<div class="minicolors-panel minicolors-slider-'+t.control+'"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'),t.inline||(i.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'),i.next(".minicolors-input-swatch").on("click",function(t){t.preventDefault(),i.focus()})),c=i.parent().find(".minicolors-panel"),c.on("selectstart",function(){return!1}).end(),t.swatches&&0!==t.swatches.length)for(t.swatches.length>7&&(t.swatches.length=7),c.addClass("minicolors-with-swatches"),n=$('<ul class="minicolors-swatches"></ul>').appendTo(c),l=0;l<t.swatches.length;++l)r=t.swatches[l],r=f(r)?u(r,!0):x(p(r,!0)),$('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').appendTo(n).data("swatch-color",t.swatches[l]).find(".minicolors-swatch-color").css({backgroundColor:y(r),opacity:r.a}),t.swatches[l]=r;t.inline&&i.parent().addClass("minicolors-inline"),e(i,!1),i.data("minicolors-initialized",!0)}}function t(i){var t=i.parent();i.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input"),t.before(i).remove()}function o(i){var t=i.parent(),o=t.find(".minicolors-panel"),a=i.data("minicolors-settings");!i.data("minicolors-initialized")||i.prop("disabled")||t.hasClass("minicolors-inline")||t.hasClass("minicolors-focus")||(s(),t.addClass("minicolors-focus"),o.stop(!0,!0).fadeIn(a.showSpeed,function(){a.show&&a.show.call(i.get(0))}))}function s(){$(".minicolors-focus").each(function(){var i=$(this),t=i.find(".minicolors-input"),o=i.find(".minicolors-panel"),s=t.data("minicolors-settings");o.fadeOut(s.hideSpeed,function(){s.hide&&s.hide.call(t.get(0)),i.removeClass("minicolors-focus")})})}function a(i,t,o){var s=i.parents(".minicolors").find(".minicolors-input"),a=s.data("minicolors-settings"),r=i.find("[class$=-picker]"),e=i.offset().left,c=i.offset().top,l=Math.round(t.pageX-e),h=Math.round(t.pageY-c),d=o?a.animationSpeed:0,p,u,g,m;t.originalEvent.changedTouches&&(l=t.originalEvent.changedTouches[0].pageX-e,h=t.originalEvent.changedTouches[0].pageY-c),0>l&&(l=0),0>h&&(h=0),l>i.width()&&(l=i.width()),h>i.height()&&(h=i.height()),i.parent().is(".minicolors-slider-wheel")&&r.parent().is(".minicolors-grid")&&(p=75-l,u=75-h,g=Math.sqrt(p*p+u*u),m=Math.atan2(u,p),0>m&&(m+=2*Math.PI),g>75&&(g=75,l=75-75*Math.cos(m),h=75-75*Math.sin(m)),l=Math.round(l),h=Math.round(h)),i.is(".minicolors-grid")?r.stop(!0).animate({top:h+"px",left:l+"px"},d,a.animationEasing,function(){n(s,i)}):r.stop(!0).animate({top:h+"px"},d,a.animationEasing,function(){n(s,i)})}function n(i,t){function o(i,t){var o,s;return i.length&&t?(o=i.offset().left,s=i.offset().top,{x:o-t.offset().left+i.outerWidth()/2,y:s-t.offset().top+i.outerHeight()/2}):null}var s,a,n,e,l,h,d,p=i.val(),u=i.attr("data-opacity"),g=i.parent(),f=i.data("minicolors-settings"),v=g.find(".minicolors-input-swatch"),b=g.find(".minicolors-grid"),w=g.find(".minicolors-slider"),y=g.find(".minicolors-opacity-slider"),k=b.find("[class$=-picker]"),M=w.find("[class$=-picker]"),x=y.find("[class$=-picker]"),I=o(k,b),S=o(M,w),z=o(x,y);if(t.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")){switch(f.control){case"wheel":e=b.width()/2-I.x,l=b.height()/2-I.y,h=Math.sqrt(e*e+l*l),d=Math.atan2(l,e),0>d&&(d+=2*Math.PI),h>75&&(h=75,I.x=69-75*Math.cos(d),I.y=69-75*Math.sin(d)),a=m(h/.75,0,100),s=m(180*d/Math.PI,0,360),n=m(100-Math.floor(S.y*(100/w.height())),0,100),p=C({h:s,s:a,b:n}),w.css("backgroundColor",C({h:s,s:a,b:100}));break;case"saturation":s=m(parseInt(I.x*(360/b.width()),10),0,360),a=m(100-Math.floor(S.y*(100/w.height())),0,100),n=m(100-Math.floor(I.y*(100/b.height())),0,100),p=C({h:s,s:a,b:n}),w.css("backgroundColor",C({h:s,s:100,b:n})),g.find(".minicolors-grid-inner").css("opacity",a/100);break;case"brightness":s=m(parseInt(I.x*(360/b.width()),10),0,360),a=m(100-Math.floor(I.y*(100/b.height())),0,100),n=m(100-Math.floor(S.y*(100/w.height())),0,100),p=C({h:s,s:a,b:n}),w.css("backgroundColor",C({h:s,s:a,b:100})),g.find(".minicolors-grid-inner").css("opacity",1-n/100);break;default:s=m(360-parseInt(S.y*(360/w.height()),10),0,360),a=m(Math.floor(I.x*(100/b.width())),0,100),n=m(100-Math.floor(I.y*(100/b.height())),0,100),p=C({h:s,s:a,b:n}),b.css("backgroundColor",C({h:s,s:100,b:100}))}u=f.opacity?parseFloat(1-z.y/y.height()).toFixed(2):1,r(i,p,u)}else v.find("span").css({backgroundColor:p,opacity:u}),c(i,p,u)}function r(i,t,o){var s,a=i.parent(),n=i.data("minicolors-settings"),r=a.find(".minicolors-input-swatch");n.opacity&&i.attr("data-opacity",o),"rgb"===n.format?(s=f(t)?u(t,!0):x(p(t,!0)),o=""===i.attr("data-opacity")?1:m(parseFloat(i.attr("data-opacity")).toFixed(2),0,1),(isNaN(o)||!n.opacity)&&(o=1),t=i.minicolors("rgbObject").a<=1&&s&&n.opacity?"rgba("+s.r+", "+s.g+", "+s.b+", "+parseFloat(o)+")":"rgb("+s.r+", "+s.g+", "+s.b+")"):(f(t)&&(t=w(t)),t=d(t,n.letterCase)),i.val(t),r.find("span").css({backgroundColor:t,opacity:o}),c(i,t,o)}function e(i,t){var o,s,a,n,r,e,l,h,b,y,M=i.parent(),x=i.data("minicolors-settings"),I=M.find(".minicolors-input-swatch"),S=M.find(".minicolors-grid"),z=M.find(".minicolors-slider"),F=M.find(".minicolors-opacity-slider"),D=S.find("[class$=-picker]"),T=z.find("[class$=-picker]"),j=F.find("[class$=-picker]");switch(f(i.val())?(o=w(i.val()),r=m(parseFloat(v(i.val())).toFixed(2),0,1),r&&i.attr("data-opacity",r)):o=d(p(i.val(),!0),x.letterCase),o||(o=d(g(x.defaultValue,!0),x.letterCase)),s=k(o),n=x.keywords?$.map(x.keywords.split(","),function(i){return $.trim(i.toLowerCase())}):[],e=""!==i.val()&&$.inArray(i.val().toLowerCase(),n)>-1?d(i.val()):f(i.val())?u(i.val()):o,t||i.val(e),x.opacity&&(a=""===i.attr("data-opacity")?1:m(parseFloat(i.attr("data-opacity")).toFixed(2),0,1),isNaN(a)&&(a=1),i.attr("data-opacity",a),I.find("span").css("opacity",a),h=m(F.height()-F.height()*a,0,F.height()),j.css("top",h+"px")),"transparent"===i.val().toLowerCase()&&I.find("span").css("opacity",0),I.find("span").css("backgroundColor",o),x.control){case"wheel":b=m(Math.ceil(.75*s.s),0,S.height()/2),y=s.h*Math.PI/180,l=m(75-Math.cos(y)*b,0,S.width()),h=m(75-Math.sin(y)*b,0,S.height()),D.css({top:h+"px",left:l+"px"}),h=150-s.b/(100/S.height()),""===o&&(h=0),T.css("top",h+"px"),z.css("backgroundColor",C({h:s.h,s:s.s,b:100}));break;case"saturation":l=m(5*s.h/12,0,150),h=m(S.height()-Math.ceil(s.b/(100/S.height())),0,S.height()),D.css({top:h+"px",left:l+"px"}),h=m(z.height()-s.s*(z.height()/100),0,z.height()),T.css("top",h+"px"),z.css("backgroundColor",C({h:s.h,s:100,b:s.b})),M.find(".minicolors-grid-inner").css("opacity",s.s/100);break;case"brightness":l=m(5*s.h/12,0,150),h=m(S.height()-Math.ceil(s.s/(100/S.height())),0,S.height()),D.css({top:h+"px",left:l+"px"}),h=m(z.height()-s.b*(z.height()/100),0,z.height()),T.css("top",h+"px"),z.css("backgroundColor",C({h:s.h,s:s.s,b:100})),M.find(".minicolors-grid-inner").css("opacity",1-s.b/100);break;default:l=m(Math.ceil(s.s/(100/S.width())),0,S.width()),h=m(S.height()-Math.ceil(s.b/(100/S.height())),0,S.height()),D.css({top:h+"px",left:l+"px"}),h=m(z.height()-s.h/(360/z.height()),0,z.height()),T.css("top",h+"px"),S.css("backgroundColor",C({h:s.h,s:100,b:100}))}i.data("minicolors-initialized")&&c(i,e,a)}function c(i,t,o){var s=i.data("minicolors-settings"),a=i.data("minicolors-lastChange"),n,r,e;if(!a||a.value!==t||a.opacity!==o){if(i.data("minicolors-lastChange",{value:t,opacity:o}),s.swatches&&0!==s.swatches.length){for(n=f(t)?u(t,!0):x(t),r=-1,e=0;e<s.swatches.length;++e)if(n.r===s.swatches[e].r&&n.g===s.swatches[e].g&&n.b===s.swatches[e].b&&n.a===s.swatches[e].a){r=e;break}i.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected"),-1!==e&&i.parent().find(".minicolors-swatches .minicolors-swatch").eq(e).addClass("selected")}s.change&&(s.changeDelay?(clearTimeout(i.data("minicolors-changeTimeout")),i.data("minicolors-changeTimeout",setTimeout(function(){s.change.call(i.get(0),t,o)},s.changeDelay))):s.change.call(i.get(0),t,o)),i.trigger("change").trigger("input")}}function l(i){var t=p($(i).val(),!0),o=x(t),s=$(i).attr("data-opacity");return o?(void 0!==s&&$.extend(o,{a:parseFloat(s)}),o):null}function h(i,t){var o=p($(i).val(),!0),s=x(o),a=$(i).attr("data-opacity");return s?(void 0===a&&(a=1),t?"rgba("+s.r+", "+s.g+", "+s.b+", "+parseFloat(a)+")":"rgb("+s.r+", "+s.g+", "+s.b+")"):null}function d(i,t){return"uppercase"===t?i.toUpperCase():i.toLowerCase()}function p(i,t){return i=i.replace(/^#/g,""),i.match(/^[A-F0-9]{3,6}/gi)?3!==i.length&&6!==i.length?"":(3===i.length&&t&&(i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2]),"#"+i):""}function u(i,t){var o=i.replace(/[^\d,.]/g,""),s=o.split(",");return s[0]=m(parseInt(s[0],10),0,255),s[1]=m(parseInt(s[1],10),0,255),s[2]=m(parseInt(s[2],10),0,255),s[3]&&(s[3]=m(parseFloat(s[3],10),0,1)),t?{r:s[0],g:s[1],b:s[2],a:s[3]?s[3]:null}:"undefined"!=typeof s[3]&&s[3]<=1?"rgba("+s[0]+", "+s[1]+", "+s[2]+", "+s[3]+")":"rgb("+s[0]+", "+s[1]+", "+s[2]+")"}function g(i,t){return f(i)?u(i):p(i,t)}function m(i,t,o){return t>i&&(i=t),i>o&&(i=o),i}function f(i){var t=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return t&&4===t.length?!0:!1}function v(i){return i=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i),i&&6===i.length?i[4]:"1"}function b(i){var t={},o=Math.round(i.h),s=Math.round(255*i.s/100),a=Math.round(255*i.b/100);if(0===s)t.r=t.g=t.b=a;else{var n=a,r=(255-s)*a/255,e=(n-r)*(o%60)/60;360===o&&(o=0),60>o?(t.r=n,t.b=r,t.g=r+e):120>o?(t.g=n,t.b=r,t.r=n-e):180>o?(t.g=n,t.r=r,t.b=r+e):240>o?(t.b=n,t.r=r,t.g=n-e):300>o?(t.b=n,t.g=r,t.r=r+e):360>o?(t.r=n,t.g=r,t.b=n-e):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b)}}function w(i){return i=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i),i&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):""}function y(i){var t=[i.r.toString(16),i.g.toString(16),i.b.toString(16)];return $.each(t,function(i,o){1===o.length&&(t[i]="0"+o)}),"#"+t.join("")}function C(i){return y(b(i))}function k(i){var t=M(x(i));return 0===t.s&&(t.h=360),t}function M(i){var t={h:0,s:0,b:0},o=Math.min(i.r,i.g,i.b),s=Math.max(i.r,i.g,i.b),a=s-o;return t.b=s,t.s=0!==s?255*a/s:0,0!==t.s?i.r===s?t.h=(i.g-i.b)/a:i.g===s?t.h=2+(i.b-i.r)/a:t.h=4+(i.r-i.g)/a:t.h=-1,t.h*=60,t.h<0&&(t.h+=360),t.s*=100/255,t.b*=100/255,t}function x(i){return i=parseInt(i.indexOf("#")>-1?i.substring(1):i,16),{r:i>>16,g:(65280&i)>>8,b:255&i}}$.minicolors={defaults:{animationSpeed:50,animationEasing:"swing",change:null,changeDelay:0,control:"hue",dataUris:!0,defaultValue:"",format:"hex",hide:null,hideSpeed:100,inline:!1,keywords:"",letterCase:"lowercase",opacity:!1,position:"bottom left",show:null,showSpeed:100,theme:"default",swatches:[]}},$.extend($.fn,{minicolors:function(a,n){switch(a){case"destroy":return $(this).each(function(){t($(this))}),$(this);case"hide":return s(),$(this);case"opacity":return void 0===n?$(this).attr("data-opacity"):($(this).each(function(){e($(this).attr("data-opacity",n))}),$(this));case"rgbObject":return l($(this),"rgbaObject"===a);case"rgbString":case"rgbaString":return h($(this),"rgbaString"===a);case"settings":return void 0===n?$(this).data("minicolors-settings"):($(this).each(function(){var i=$(this).data("minicolors-settings")||{};t($(this)),$(this).minicolors($.extend(!0,i,n))}),$(this));case"show":return o($(this).eq(0)),$(this);case"value":return void 0===n?$(this).val():($(this).each(function(){"object"==typeof n&&null!==typeof n?(n.opacity&&$(this).attr("data-opacity",m(n.opacity,0,1)),n.color&&$(this).val(n.color)):$(this).val(n),e($(this))}),$(this));default:return"create"!==a&&(n=a),$(this).each(function(){i($(this),n)}),$(this)}}}),$(document).on("mousedown.minicolors touchstart.minicolors",function(i){$(i.target).parents().add(i.target).hasClass("minicolors")||s()}).on("mousedown.minicolors touchstart.minicolors",".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider",function(i){var t=$(this);i.preventDefault(),$(document).data("minicolors-target",t),a(t,i,!0)}).on("mousemove.minicolors touchmove.minicolors",function(i){var t=$(document).data("minicolors-target");t&&a(t,i)}).on("mouseup.minicolors touchend.minicolors",function(){$(this).removeData("minicolors-target")}).on("click.minicolors",".minicolors-swatches li",function(i){i.preventDefault();var t=$(this),o=t.parents(".minicolors").find(".minicolors-input"),s=t.data("swatch-color");r(o,s,v(s)),e(o)}).on("mousedown.minicolors touchstart.minicolors",".minicolors-input-swatch",function(i){var t=$(this).parent().find(".minicolors-input");i.preventDefault(),o(t)}).on("focus.minicolors",".minicolors-input",function(){var i=$(this);i.data("minicolors-initialized")&&o(i)}).on("blur.minicolors",".minicolors-input",function(){var i=$(this),t=i.data("minicolors-settings"),o,s,a,n,r;i.data("minicolors-initialized")&&(o=t.keywords?$.map(t.keywords.split(","),function(i){return $.trim(i.toLowerCase())}):[],""!==i.val()&&$.inArray(i.val().toLowerCase(),o)>-1?r=i.val():(f(i.val())?a=u(i.val(),!0):(s=p(i.val(),!0),a=s?x(s):null),r=null===a?t.defaultValue:"rgb"===t.format?u(t.opacity?"rgba("+a.r+","+a.g+","+a.b+","+i.attr("data-opacity")+")":"rgb("+a.r+","+a.g+","+a.b+")"):y(a)),n=t.opacity?i.attr("data-opacity"):1,"transparent"===r.toLowerCase()&&(n=0),i.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity",n),i.val(r),""===i.val()&&i.val(g(t.defaultValue,!0)),i.val(d(i.val(),t.letterCase)))}).on("keydown.minicolors",".minicolors-input",function(i){var t=$(this);if(t.data("minicolors-initialized"))switch(i.keyCode){case 9:s();break;case 13:case 27:s(),t.blur()}}).on("keyup.minicolors",".minicolors-input",function(){var i=$(this);i.data("minicolors-initialized")&&e(i,!0)}).on("paste.minicolors",".minicolors-input",function(){var i=$(this);i.data("minicolors-initialized")&&setTimeout(function(){e(i,!0)},1)})});


/*===============================
/administrator/components/com_sppagebuilder/assets/js/media.js
================================================================================*/;
(function($){$(document).on('click','.sp-pagebuilder-btn-media-manager',function(event){event.preventDefault()
$this=$(this);$.ajax({type:'POST',url:'index.php?option=com_sppagebuilder&view=media&layout=modal&format=json',data:{support:$this.attr('data-support'),type:$this.attr('data-support'),target:$this.prev().attr('id')},beforeSend:function(){$this.find('.fa').show();},success:function(modal){$this.find('.fa').hide();$(modal).show().appendTo($('body').addClass('sp-pagebuilder-media-modal-open'));$('.sp-pagebuilder-media-toolbar select').chosen();}})})
$(document).on('click','.sp-pagebuilder-btn-close-modal',function(event){event.preventDefault();$('.sp-pagebuilder-media-modal-overlay').remove();$('body').removeClass('sp-pagebuilder-media-modal-open');});$.fn.browseMedia=function(options){var options=$.extend({type:'*',search:'',date:'',start:0,filter:true,categories:false,support:'image'},options)
$.ajax({type:'POST',url:'index.php?option=com_sppagebuilder&view=media&layout=browse&format=json',data:{type:options.type,date:options.date,start:options.start,search:options.search,categories:options.categories,support:options.support},beforeSend:function(){$('#sp-pagebuilder-media-loadmore').hide()
$('.sp-pagebuilder-media').remove()
$('#sp-pagebuilder-cancel-media').parent().hide()
$('.sp-pagebuilder-media-wrapper').addClass('sp-pagebuilder-media-pre-loading').prepend($('<div class="sp-pagebuilder-loading"><i class="pbfont pbfont-pagebuilder"></i></div>'))},success:function(response){$('.sp-pagebuilder-media-wrapper').removeClass('sp-pagebuilder-media-pre-loading')
$('.sp-pagebuilder-loading').remove();var data=$.parseJSON(response)
$('#sp-pagebuilder-media-types').find('.active').find('.fa').removeClass('fa-spin fa-spinner');if(options.filter){$('#sp-pagebuilder-media-filter').html(data.date_filter).trigger("liszt:updated").removeAttr().attr('data-type','browse');}
if(options.categories){$('#sp-pagebuilder-media-types').html(data.media_categories);if(options.support){$('#sp-pagebuilder-media-types').find('>li').removeClass('active');$('#sp-pagebuilder-media-types').find('.sp-pagebuilder-media-type-'+options.support).addClass('active');}}
if(data.count){$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');}else{$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');}
$('.sp-pagebuilder-media-wrapper').prepend(data.output)
if(data.loadmore){$('#sp-pagebuilder-media-loadmore').removeAttr('style')}else{$('#sp-pagebuilder-media-loadmore').hide();}}})}
$.fn.browseFolders=function(options){var options=$.extend({path:'/images',filter:true},options);return this.each(function(){$.ajax({url:'index.php?option=com_sppagebuilder&view=media&layout=folders&format=json',type:'POST',data:{path:options.path},beforeSend:function(){if(options.filter){$('#sp-pagebuilder-media-filter').removeAttr().attr('data-type','folders').val(options.path).parent().show()}
$('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
$('#sp-pagebuilder-media-loadmore').hide()
$('.sp-pagebuilder-media').remove()
$('.sp-pagebuilder-media-wrapper').addClass('sp-pagebuilder-media-pre-loading').prepend($('<div class="sp-pagebuilder-loading"><i class="pbfont pbfont-pagebuilder"></i></div>'))},success:function(response){$('.sp-pagebuilder-media-wrapper').removeClass('sp-pagebuilder-media-pre-loading')
$('.sp-pagebuilder-loading').remove();var data=$.parseJSON(response)
if(data.count){$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');}else{$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');}
$('#sp-pagebuilder-media-types').find('.active').find('.fa').removeClass('fa-spin fa-spinner');if(options.filter){$('#sp-pagebuilder-media-filter').html(data.folders_tree).trigger("liszt:updated").removeAttr().attr('data-type','folders');}
$('.sp-pagebuilder-media-wrapper').prepend(data.output)}})})}
$(document).on('click','.sp-pagebuilder-media-to-folder-back',function(event){event.preventDefault()
$('.sp-pagebuilder-media-btn-tools').hide()
$(this).browseFolders({path:$(this).data('path')})})
$(document).on('click','.sp-pagebuilder-media-to-folder',function(event){event.preventDefault()
$('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-item').removeClass('selected')
$('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-folder').removeClass('folder-selected')
$(this).closest('li.sp-pagebuilder-media-folder').addClass('folder-selected')})
$(document).on('dblclick','.sp-pagebuilder-media-to-folder',function(event){event.preventDefault()
$('.sp-pagebuilder-media-btn-tools').hide()
$(this).browseFolders({path:$(this).attr('data-path')})})
$.fn.uploadMedia=function(options){var options=$.extend({index:'',data:''},options)
$.ajax({type:"POST",url:'index.php?option=com_sppagebuilder&task=media.upload_media',data:options.data,contentType:false,cache:false,processData:false,beforeSend:function(){var folders=$('.sp-pagebuilder-media').find('.sp-pagebuilder-media-folder:not(.sp-pagebuilder-media-to-folder-back)');var toback=$('.sp-pagebuilder-media').find('.sp-pagebuilder-media-to-folder-back');var placeholder=$('<li id="'+options.index+'" class="sp-pagebuilder-media-file-loader"><div><div><div><div><div class="sp-pagebuilder-media-upload-progress"><div><div class="sp-pagebuilder-progress"><div class="sp-pagebuilder-progress-bar" style="width: 0%;"></div></div></div></div></div></div></div><span class="sp-pagebuilder-media-title"><i class="fa fa-circle-o-notch fa-spin"></i> '+Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_MEDIA_UPLOADING')+'...</span></div></li>');if(folders.length){folders.last().after(placeholder)}else if(toback.length){toback.first().after(placeholder)}else{$('.sp-pagebuilder-media').prepend(placeholder);}
$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');},success:function(response){var data=$.parseJSON(response)
if(data.status){$('.sp-pagebuilder-media').find('#'+options.index).removeAttr('id').removeClass('sp-pagebuilder-media-file-loader"').addClass('sp-pagebuilder-media-item').attr('data-id',data.id).attr('data-src',data.src).attr('data-path',data.path).empty().html(data.output);}else{$('.sp-pagebuilder-media').find('#'+options.index).remove();alert(data.output);}
if($('.sp-pagebuilder-media').find('>li').length){$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');}else{$('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');}},xhr:function(){myXhr=$.ajaxSettings.xhr();if(myXhr.upload){myXhr.upload.addEventListener('progress',function(evt){$('.sp-pagebuilder-media').find('#'+options.index).find('.sp-pagebuilder-progress-bar').css('width',Math.floor(evt.loaded/evt.total*100)+'%').text(Math.floor(evt.loaded/evt.total*100)+'%');},false);}
return myXhr;}})}
var searchPreviousValue,liveSearchTimer
$(document).on('keyup','#sp-pagebuilder-media-search-input',function(event){event.preventDefault()
if($(this).val()!=''){$('.sp-pagebuilder-clear-search').show()}else{$('.sp-pagebuilder-clear-search').hide()}
if($(this).val()!=searchPreviousValue){var query=$(this).val().trim();if(liveSearchTimer){clearTimeout(liveSearchTimer);}
liveSearchTimer=setTimeout(function(){if(query){$(this).browseMedia({search:query,filter:true,date:$('#sp-pagebuilder-media-filter').val(),type:$('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),support:'all'})}
else{$(this).browseMedia({filter:true,date:$('#sp-pagebuilder-media-filter').val(),type:$('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),support:'all'})}},300);searchPreviousValue=$(this).val()}})
$(document).on('click','.sp-pagebuilder-clear-search',function(event){event.preventDefault()
$('#sp-pagebuilder-media-search-input').val('').focus().keyup()})
$(document).on('click','#sp-pagebuilder-media-search-input',function(event){event.preventDefault()})
$(document).on('click','.sp-pagebuilder-browse-media',function(event){event.preventDefault()
var $this=$(this);$(this).closest('#sp-pagebuilder-media-types').children().removeClass('active');$(this).parent().addClass('active')
$(this).find('.fa').addClass('fa-spinner fa-spin');$('#sp-pagebuilder-upload-media').parent().show();if($this.attr('data-type')=='folders'){$('.sp-pagebuilder-media-search').parent().hide();$('#sp-pagebuilder-media-create-folder').parent().show();$(this).browseFolders();}else{$('.sp-pagebuilder-media-search').parent().show();$('#sp-pagebuilder-media-create-folder').parent().hide();var support='all';if($('#sp-pagebuilder-media-modal').length){support=$('#sp-pagebuilder-media-modal').data('support');}
$(this).browseMedia({type:$this.data('type'),support:support,element:$this})}})
$(document).on('click','#sp-pagebuilder-media-loadmore',function(event){event.preventDefault()
var $this=$(this)
var query=$('#sp-pagebuilder-media-search-input').val().trim();var support='all';if($('#sp-pagebuilder-media-modal').length){support=$('#sp-pagebuilder-media-modal').data('support');}
$.ajax({type:'POST',url:'index.php?option=com_sppagebuilder&view=media&layout=browse&format=json',data:{search:query,type:$('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),support:support,date:$('#sp-pagebuilder-media-filter').val(),start:$('.sp-pagebuilder-media').find('>li').length},beforeSend:function(){$this.find('.fa').removeClass('fa-refresh').addClass('fa-spinner fa-spin')},success:function(response){try{var data=$.parseJSON(response)
$this.find('.fa').removeClass('fa-spinner fa-spin').addClass('fa-refresh')
$('.sp-pagebuilder-media').append(data.output)
if(data.loadmore){$('#sp-pagebuilder-media-loadmore').parent().removeAttr('style')}else{$('#sp-pagebuilder-media-loadmore').parent().hide();}}catch(e){$('.sp-pagebuilder-media-body-inner').html(response)}}})})
$(document).on('change','#sp-pagebuilder-media-filter',function(event){event.preventDefault()
if($(this).attr('data-type')=='folders'){$(this).browseFolders({path:$(this).val()})}else{$(this).browseMedia({filter:false,date:$(this).val(),type:$('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),support:'all'})}})
$(document).on('click','.sp-pagebuilder-media > li.sp-pagebuilder-media-item',function(event){event.preventDefault();var $this=$(this);$('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-folder').removeClass('folder-selected')
if($this.hasClass('sp-pagebuilder-media-unsupported'))return;if($('#sp-pagebuilder-media-modal')!=undefined){$('#sp-pagebuilder-media-modal .sp-pagebuilder-media > li.sp-pagebuilder-media-item').not(this).each(function(){$(this).removeClass('selected')});}
if($(this).hasClass('selected')){$(this).removeClass('selected')}else{$(this).addClass('selected')}
if($('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').length){$('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().hide();$('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().show()}else{$('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
$('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();}})
$(document).on('click','#sp-pagebuilder-insert-media',function(event){event.preventDefault()
var support=$('#sp-pagebuilder-media-modal').attr('data-support');var $target=$('#'+$('#sp-pagebuilder-media-modal').attr('data-target'));if(support=='image'){$target.prev('.sp-pagebuilder-media-preview').removeClass('sp-pagebuilder-media-no-image').attr('src',$('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').data('src'))}
$target.val($('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').data('path'))
$target.trigger('change');$('.sp-pagebuilder-media-modal-overlay').remove();$('body').removeClass('sp-pagebuilder-media-modal-open');})
$(document).on('click','.sp-pagebuilder-btn-clear-media',function(event){event.preventDefault();var $this=$(this);$this.siblings('.sp-pagebuilder-media-preview').addClass('sp-pagebuilder-media-no-image').removeAttr('src');$this.siblings('input').val('');$this.siblings('input').trigger('change');})
$(document).on('click','#sp-pagebuilder-cancel-media',function(event){event.preventDefault()
$('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').removeClass('selected')
$('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
$('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();if($('#sp-pagebuilder-media-filter').attr('data-type')=='browse'){$('.sp-pagebuilder-media-search').parent().show();}else{$('.sp-pagebuilder-media-search').parent().hide();}})
$(document).on('click','#sp-pagebuilder-upload-media, #sp-pagebuilder-upload-media-empty',function(event){event.preventDefault()
$('#sp-pagebuilder-media-input-file').click()});$(document).on('change','#sp-pagebuilder-media-input-file',function(event){event.preventDefault()
var $this=$(this)
var files=$(this).prop('files');var formdata=new FormData();for(i=0;i<files.length;i++){formdata.append('file',files[i]);if(($('#sp-pagebuilder-media-filter').attr('data-type')=='folders')&&($('#sp-pagebuilder-media-filter').val()!=undefined)){formdata.append('folder',$('#sp-pagebuilder-media-filter').val())}
$(this).uploadMedia({data:formdata,index:'media-id-'+Math.floor(Math.random()*(1e6-1+1)+1)})}
$this.val('')})
$(document).on('dragenter','#sp-pagebuilder-media-manager',function(event){event.preventDefault();event.stopPropagation();$(this).addClass('sp-pagebuilder-media-drop')})
$(document).on('mouseleave','#sp-pagebuilder-media-manager',function(event){event.preventDefault();event.stopPropagation();$(this).removeClass('sp-pagebuilder-media-drop')})
$(document).on('dragover','#sp-pagebuilder-media-manager',function(event){event.preventDefault();})
$(document).on('drop','#sp-pagebuilder-media-manager',function(event){event.preventDefault();event.stopPropagation();$(this).removeClass('sp-pagebuilder-media-drop');var files=event.originalEvent.dataTransfer.files
for(i=0;i<files.length;i++){var formdata=new FormData();formdata.append('file',files[i])
if(($('#sp-pagebuilder-media-filter').attr('data-type')=='folders')&&($('#sp-pagebuilder-media-filter').val()!=undefined)){formdata.append('folder',$('#sp-pagebuilder-media-filter').val())}
$(this).uploadMedia({data:formdata,index:'media-id-'+Math.floor(Math.random()*(1e6-1+1)+1)})}})
$(document).on('click','#sp-pagebuilder-delete-media',function(event){event.preventDefault()
var $this=$(this)
var $target=$('.sp-pagebuilder-media').find('li.sp-pagebuilder-media-item.selected');if(confirm(Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_CONFIRM_DELETE'))==true){$target.each(function(index,el){$.ajax({type:"POST",url:'index.php?option=com_sppagebuilder&task=media.delete_media',data:{id:$(el).data('id')},success:function(response){var data=$.parseJSON(response)
if(data.status){$target.remove()
$('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
$('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();}else{alert(data.output)}}})});}})
$(document).on('click','#sp-pagebuilder-media-create-folder',function(event){event.preventDefault();var $this=$(this);var directory='/images';if(($('#sp-pagebuilder-media-filter').val()!=undefined)&&($('#sp-pagebuilder-media-filter').attr('data-type')=='folders')){directory=$('#sp-pagebuilder-media-filter').val();}
var folder_name=prompt(Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_ENTER_DIRECTORY_NAME'));if(folder_name!=null){$.ajax({type:"POST",url:'index.php?option=com_sppagebuilder&task=media.create_folder',data:{folder:directory+'/'+folder_name},success:function(response){try{var data=$.parseJSON(response)
if(data.status){var folders=$('.sp-pagebuilder-media').find('.sp-pagebuilder-media-folder:not(.sp-pagebuilder-media-to-folder-back)');if(folders.length){folders.first().before(data.output)}else{$('.sp-pagebuilder-media').append(data.output);}}else{alert(data.output)}}catch(e){$('.sp-pagebuilder-media-body-inner').html(response)}}})}});})(jQuery)


/*===============================
/administrator/components/com_sppagebuilder/assets/js/script.js
================================================================================*/;
jQuery(function($){$(document).on('change','.sp-pagebuilder-control-padding',function(event){var padding='';var $self=$(this);$(this).closest('.sp-pagebuilder-paddings-list').find('>div').each(function(event){padding+=$(this).find('.sp-pagebuilder-control-padding').val()+' ';});$self.closest('.sp-pagebuilder-paddings-list').prev().val($.trim(padding));});$(document).on('change','.sp-pagebuilder-control-margin',function(event){var margin='';var $self=$(this);$(this).closest('.sp-pagebuilder-margins-list').find('>div').each(function(event){margin+=$(this).find('.sp-pagebuilder-control-margin').val()+' ';});$self.closest('.sp-pagebuilder-margins-list').prev().val($.trim(margin));});var arrval={};$.fn.openPopupAlt=function(){$('#page-options').addClass('sp-pagebuilder-modal-overlay-after-open');$('#page-options').find('.sp-pagebuilder-modal-content').addClass('sp-pagebuilder-modal-content-after-open');$('body').addClass('sp-pagebuilder-modal-open');$('.sp-pagebuilder-modal-alt .form-group').find('>input,>textarea,>select').each(function(){arrval[$(this).attr('id')]=$(this).val();});};$.fn.closePopupAlt=function(options){var settings=$.extend({reset:false},options);$('#page-options').addClass('sp-pagebuilder-modal-overlay-before-close');$('#page-options').find('.sp-pagebuilder-modal-content').addClass('sp-pagebuilder-modal-content-before-close');$('#page-options').removeClass('sp-pagebuilder-modal-overlay-before-close sp-pagebuilder-modal-overlay-after-open');$('#page-options').find('.sp-pagebuilder-modal-content').removeClass('sp-pagebuilder-modal-content-before-close sp-pagebuilder-modal-content-after-open');$('body').removeClass('sp-pagebuilder-modal-open');if(settings.reset){$('.sp-pagebuilder-modal-alt .form-group').find('>input,>textarea,>select').each(function(){$(this).val(arrval[$(this).attr('id')]);if(($(this).attr('id')=='jform_og_image')&&(arrval[$(this).attr('id')]!='')){$(this).prev('.sppb-media-preview').removeClass('no-image').attr('src',pagebuilder_base+arrval[$(this).attr('id')]);}});}
return this;};$('#btn-page-options').on('click',function(event){event.preventDefault();$().openPopupAlt();});$(document).on('click','.sp-pagebuilder-modal-alt .sp-pagebuilder-modal-content-after-open',function(event){if(event.target!==this)
return;$().closePopupAlt({reset:true});});$(document).on('click','#btn-cancel-page-options',function(event){event.preventDefault();$().closePopupAlt({reset:true});});$(document).on('click','#btn-apply-page-options',function(event){$().closePopupAlt();});$(document).on('click','.sp-pagebuilder-fontawesome-icon-input',function(event){event.preventDefault();$(this).closest('.sp-pagebuilder-fontawesome-icon-chooser').toggleClass('open');if($(this).closest('.sp-pagebuilder-fontawesome-icon-chooser').hasClass('open')){$(this).closest('.sp-pagebuilder-fontawesome-icon-chooser').find('input[type="text"]').focus();}});$(document).on('click','.sp-pagebuilder-fa-list-icon',function(event){event.preventDefault();var $this=$(this);var parent=$this.closest('.sp-pagebuilder-fontawesome-icon-chooser')
var fa_icons=$(this).closest('ul').find('>li');fa_icons.removeClass('active');$this.addClass('active');parent.find('.sp-pagebuilder-fontawesome-icon-input>span').html('<i class="fa '+$this.data('fontawesome_icon')+'"></i> '+$this.data('fontawesome_icon_name'));parent.find('.sp-pagebuilder-addon-input-fa').val($this.data('fontawesome_icon_name'));parent.addClass('sp-pagebuilder-has-fa-icon').removeClass('open');});$(document).on('keyup','.sp-pagebuilder-fontawesome-dropdown input[type="text"]',function(){var value=$(this).val();var exp=new RegExp('.*?'+value+'.*?','i');$(this).next('.sp-pagebuilder-fontawesome-icons').children().each(function(){var isMatch=exp.test($('span',this).text());$(this).toggle(isMatch);});});$(document).on('click','.sp-pagebuilder-remove-fa-icon',function(event){event.stopPropagation();event.preventDefault();var $this=$(this);var parent=$this.closest('.sp-pagebuilder-fontawesome-icon-chooser');parent.removeClass('sp-pagebuilder-has-fa-icon');parent.find('.sp-pagebuilder-fontawesome-icon-input>span').html('--'+Joomla.JText._('COM_SPPAGEBUILDER_ADDON_ICON_SELECT')+'--');parent.find('.sp-pagebuilder-fontawesome-icons>li').removeClass('active');parent.find('.sp-pagebuilder-addon-input-fa').val('');});if($(".com_sppagebuilder #sp-pagebuilder-page-tools").length>0){$(window).on('scroll',function(){if($(window).scrollTop()>220){$(".com_sppagebuilder #sp-pagebuilder-page-tools").addClass('fixed-sp-page-tools');}else{$(".com_sppagebuilder #sp-pagebuilder-page-tools").removeClass('fixed-sp-page-tools');}});}});


/*===============================
/components/com_sppagebuilder/assets/js/actions.js
================================================================================*/;
jQuery(function($){$('#btn-save-page').on('click',function(event){event.preventDefault();var $this=$(this);var pageData=$.parseJSON($('#jform_sptext').val());pageData.filter(function(row){return row.columns.filter(function(column){return column.addons.filter(function(addon){if(addon.type==='sp_row'){return addon.columns.filter(function(column){return column.addons.filter(function(addon){if(typeof addon.htmlContent!=undefined){delete addon.htmlContent;}
if(typeof addon.assets!=undefined){delete addon.assets;}
return addon;})})}else{if(typeof addon.htmlContent!=undefined){delete addon.htmlContent;}
if(typeof addon.assets!=undefined){delete addon.assets;}
return addon;}});})});$('#jform_sptext').val(JSON.stringify(pageData))
var form=$('#adminForm');$.ajax({type:'POST',url:'index.php?option=com_sppagebuilder&task=page.apply',data:form.serialize(),beforeSend:function(){$this.find('.fa-save').removeClass('fa-save').addClass('fa-spinner fa-spin');},success:function(response){try{var data=$.parseJSON(response);$this.find('.fa').removeClass('fa-spinner fa-spin').addClass('fa-save');if($('.sp-pagebuilder-notifications').length===0){$('<div class="sp-pagebuilder-notifications"></div>').appendTo('body')}
var msg_class='success';if(!data.status){var msg_class='error';}
if(data.title){$('#jform_title').val(data.title);}
if(data.id){$('#jform_id').val(data.id)}
$('<div class="notify-'+msg_class+'">'+data.message+'</div>').css({opacity:0,'margin-top':-15,'margin-bottom':0}).animate({opacity:1,'margin-top':0,'margin-bottom':15},200).prependTo('.sp-pagebuilder-notifications');$('.sp-pagebuilder-notifications').find('>div').each(function(){var $this=$(this);setTimeout(function(){$this.animate({opacity:0,'margin-top':-15,'margin-bottom':0},200,function(){$this.remove();});},3000);});if(!data.status){return;}
window.history.replaceState("","",data.redirect);if(data.preview_url){if($('#btn-page-preview').length===0){$('#btn-page-options').parent().before('<div class="sp-pagebuilder-btn-group"><a id="btn-page-preview" target="_blank" href="'+data.preview_url+'" class="sp-pagebuilder-btn sp-pagebuilder-btn-primary"><i class="fa fa-eye"></i> Preview</a></div>');}}
if(event.target.id=='btn-save-new'){window.location.href="index.php?option=com_sppagebuilder&view=page&layout=edit";}
if(event.target.id=='btn-save-close'){window.location.href="index.php?option=com_sppagebuilder&view=pages";}}catch(e){window.location.href="index.php?option=com_sppagebuilder&view=pages";}}})});});


/*===============================
/components/com_sppagebuilder/assets/js/sppagebuilder.js
================================================================================*/;
+function($){'use strict';var dismiss='[data-dismiss="sppb-alert"]'
var SPPBAlert=function(el){$(el).on('click',dismiss,this.close)}
SPPBAlert.VERSION='3.2.0'
SPPBAlert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.hasClass('sppb-alert')?$this:$this.parent()}
$parent.trigger(e=$.Event('close.sppb.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.sppb.alert').remove()}
$.support.transition&&$parent.hasClass('sppb-fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(150):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('sppb.alert')
if(!data)$this.data('sppb.alert',(data=new SPPBAlert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.spbalert
$.fn.spbalert=Plugin
$.fn.spbalert.Constructor=SPPBAlert
$.fn.spbalert.noConflict=function(){$.fn.spbalert=old
return this}
$(document).on('click.sppb.alert.data-api',dismiss,SPPBAlert.prototype.close)}(jQuery);+function($){'use strict';var SPPBCarousel=function(element,options){this.$element=$(element).on('keydown.sppb.carousel',$.proxy(this.keydown,this))
this.$indicators=this.$element.find('.sppb-carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.pause=='hover'&&this.$element.on('mouseenter.sppb.carousel',$.proxy(this.pause,this)).on('mouseleave.sppb.carousel',$.proxy(this.cycle,this))}
SPPBCarousel.VERSION='3.2.0'
SPPBCarousel.DEFAULTS={interval:5000,pause:'hover',wrap:true}
SPPBCarousel.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
SPPBCarousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
SPPBCarousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.sppb-item')
return this.$items.index(item||this.$active)}
SPPBCarousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.sppb-item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.sppb.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))}
SPPBCarousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
SPPBCarousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
SPPBCarousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
SPPBCarousel.prototype.slide=function(type,next){var $active=this.$element.find('.sppb-item.active')
var $next=next||$active[type]()
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.sppb-item')[fallback]()}
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.sppb.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.sppb.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('sppb-slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd($active.css('transition-duration').slice(0,-1)*1000)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('sppb.carousel')
var options=$.extend({},SPPBCarousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('sppb.carousel',(data=new SPPBCarousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.sppbcarousel
$.fn.sppbcarousel=Plugin
$.fn.sppbcarousel.Constructor=SPPBCarousel
$.fn.sppbcarousel.noConflict=function(){$.fn.sppbcarousel=old
return this}
$(document).ready(function(){$('.sppb-carousel').each(function(index){var items=$(this).find('.sppb-item');var id='sppb-carousel'+(index+1);var controller_items='';$(this).attr('id',id);for(var i=0;i<items.length;i++){if(i==0){controller_items+='<li data-sppb-target="#'+id+'" class="active" data-sppb-slide-to="0"></li>';}else{controller_items+='\n<li data-sppb-target="#'+id+'" data-sppb-slide-to="'+i+'"></li>';}};$(this).find('>.sppb-carousel-indicators').html(controller_items);$(this).find('.sppb-carousel-control').attr('href','#'+id);$(this).find('.sppb-item').first().addClass('active');});})
$(document).on('click.sppb.carousel.data-api','[data-slide], [data-sppb-slide-to]',function(e){var href
var $this=$(this)
var $target=$($this.attr('data-sppb-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('sppb-carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-sppb-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('sppb.carousel').to(slideIndex)}
e.preventDefault()})
$(window).on('load',function(){$('[data-sppb-ride="sppb-carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';$(document).on('click','.sppb-panel-heading',function(event){event.preventDefault();var $this=$(this);var $items=$this.closest('.sppb-panel-group').find('>div');var $handlers=$items.find('.sppb-panel-heading');var $panels=$items.find('.sppb-panel-collapse');if($(this).hasClass('active'))
{$(this).removeClass('active');$panels.slideUp();}
else
{$handlers.removeClass('active');$panels.slideUp();$(this).addClass('active').next().slideDown();}});}(jQuery);+function($){'use strict';var SPPBTab=function(element){this.element=$(element)}
SPPBTab.VERSION='3.2.0'
SPPBTab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var previous=$ul.find('.active:last a')[0]
var e=$.Event('show.sppb.tab',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown.sppb.tab',relatedTarget:previous})})}
SPPBTab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&$active.hasClass('sppb-fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('sppb-fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(150):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('sppb.tab')
if(!data)$this.data('sppb.tab',(data=new SPPBTab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.sppbtab
$.fn.sppbtab=Plugin
$.fn.sppbtab.Constructor=SPPBTab
$.fn.sppbtab.noConflict=function(){$.fn.sppbtab=old
return this}
$(document).ready(function(){$('.sppb-tab').each(function(index){var id='sppb-tab'+(index+1);$(this).find('>.sppb-nav').children().each(function(index){$(this).find('>a').attr('href','#'+id+'-'+(index+1))});$(this).find('>.sppb-tab-content').children().each(function(index){$(this).attr('id',id+'-'+(index+1))});});});$(document).on('click.sppb.tab.data-api','[data-toggle="sppb-tab"], [data-toggle="sppb-pill"]',function(e){e.preventDefault()
Plugin.call($(this),'show')})}(jQuery);+function($){'use strict';var SPPBTooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('sppbtooltip',element,options)}
SPPBTooltip.VERSION='3.2.0'
SPPBTooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="sppb-tooltip" role="tooltip"><div class="sppb-tooltip-arrow"></div><div class="sppb-tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
SPPBTooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
SPPBTooltip.prototype.getDefaults=function(){return SPPBTooltip.DEFAULTS}
SPPBTooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
SPPBTooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
SPPBTooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('sppb.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('sppb.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
SPPBTooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('sppb.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('sppb.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
SPPBTooltip.prototype.show=function(){var e=$.Event('show.sppb.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(document.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('sppb-fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('sppb.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $parent=this.$element.parent()
var parentDim=this.getPosition($parent)
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-parentDim.scroll>parentDim.height?'top':placement=='top'&&pos.top-parentDim.scroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentDim.width?'left':placement=='left'&&pos.left-actualWidth<parentDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){that.$element.trigger('shown.sppb.'+that.type)
that.hoverState=null}
$.support.transition&&this.$tip.hasClass('sppb-')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()}}
SPPBTooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var arrowDelta=delta.left?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowPosition=delta.left?'left':'top'
var arrowOffsetPosition=delta.left?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],arrowPosition)}
SPPBTooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+'%'):'')}
SPPBTooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.sppb-tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('sppb-fade in top bottom left right')}
SPPBTooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.sppb.'+this.type)
this.$element.removeAttr('aria-describedby')
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.trigger('hidden.sppb.'+that.type)}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('sppb-fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()
this.hoverState=null
return this}
SPPBTooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
SPPBTooltip.prototype.hasContent=function(){return this.getTitle()}
SPPBTooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():null,{scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop(),width:isBody?$(window).width():$element.outerWidth(),height:isBody?$(window).height():$element.outerHeight()},isBody?{top:0,left:0}:$element.offset())}
SPPBTooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
SPPBTooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
SPPBTooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
SPPBTooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
SPPBTooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
SPPBTooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.sppb-tooltip-arrow'))}
SPPBTooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
SPPBTooltip.prototype.enable=function(){this.enabled=true}
SPPBTooltip.prototype.disable=function(){this.enabled=false}
SPPBTooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
SPPBTooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('sppb.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('sppb.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
SPPBTooltip.prototype.destroy=function(){clearTimeout(this.timeout)
this.hide().$element.off('.'+this.type).removeData('sppb.'+this.type)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('sppb.tooltip')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('sppb.tooltip',(data=new SPPBTooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.sppbtooltip
$.fn.sppbtooltip=Plugin
$.fn.sppbtooltip.Constructor=SPPBTooltip
$.fn.sppbtooltip.noConflict=function(){$.fn.sppbtooltip=old
return this}}(jQuery);+function($){'use strict';var SPPBPopover=function(element,options){this.init('sppbpopover',element,options)}
if(!$.fn.sppbtooltip)throw new Error('Popover requires tooltip.js')
SPPBPopover.VERSION='3.2.0'
SPPBPopover.DEFAULTS=$.extend({},$.fn.sppbtooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="sppb-popover" role="tooltip"><div class="arrow"></div><h3 class="sppb-popover-title"></h3><div class="sppb-popover-content"></div></div>'})
SPPBPopover.prototype=$.extend({},$.fn.sppbtooltip.Constructor.prototype)
SPPBPopover.prototype.constructor=SPPBPopover
SPPBPopover.prototype.getDefaults=function(){return SPPBPopover.DEFAULTS}
SPPBPopover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.sppb-popover-title')[this.options.html?'html':'text'](title)
$tip.find('.sppb-popover-content').empty()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('sppb-fade top bottom left right in')
if(!$tip.find('.sppb-popover-title').html())$tip.find('.sppb-popover-title').hide()}
SPPBPopover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
SPPBPopover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
SPPBPopover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
SPPBPopover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('sppb.popover')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('sppb.popover',(data=new SPPBPopover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.sppbpopover
$.fn.sppbpopover=Plugin
$.fn.sppbpopover.Constructor=SPPBPopover
$.fn.sppbpopover.noConflict=function(){$.fn.sppbpopover=old
return this}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);if(typeof jQuery!='undefined'&&typeof MooTools!='undefined'){(function($){$(document).ready(function(){$('.sppb-carousel').each(function(index,element){$(this)[index].slide=null;});});})(jQuery);};(function($,window,document,navigator){"use strict";var pluginName="vide",defaults={volume:1,playbackRate:1,muted:true,loop:true,autoplay:true,position:"50% 50%"};var iOS=/iPad|iPhone|iPod/i.test(navigator.userAgent),android=/Android/i.test(navigator.userAgent);$[pluginName]={lookup:[]};var parseOptions=function(str){var obj={},clearedStr,arr;clearedStr=str.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",");arr=clearedStr.split(",");var i,len,val;for(i=0,len=arr.length;i<len;i++){arr[i]=arr[i].split(":");val=arr[i][1];if(!val){val=undefined;}
if(typeof val==="string"||val instanceof String){val=val==="true"||(val==="false"?false:val);}
if(typeof val==="string"||val instanceof String){val=!isNaN(val)?+val:val;}
obj[arr[i][0]]=val;}
return obj;};var parsePosition=function(str){str=""+str;var args=str.split(/\s+/),x="50%",y="50%";for(var i=0,len=args.length,arg;i<len;i++){arg=args[i];if(arg==="left"){x="0%";}else if(arg==="right"){x="100%";}else if(arg==="top"){y="0%";}else if(arg==="bottom"){y="100%";}else if(arg==="center"){if(i===0){x="50%";}else{y="50%";}}else{if(i===0){x=arg;}else{y=arg;}}}
return{x:x,y:y};};function Vide(element,path,options){this.element=$(element);this._defaults=defaults;this._name=pluginName;path=path.replace(/\.\w*$/,"");this.settings=$.extend({},defaults,options);this.path=path;this.init();}
Vide.prototype.init=function(){var that=this;this.wrapper=$("<div>");var position=parsePosition(this.settings.position);this.wrapper.css({"position":"absolute","z-index":-1,"top":0,"left":0,"bottom":0,"right":0,"overflow":"hidden","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover","background-repeat":"no-repeat","background-position":position.x+" "+position.y});if($(this.element).data('vide-image')){this.wrapper.css("background-image","url("+$(this.element).data('vide-image')+")");}
if(this.element.css("position")==="static"){this.element.css("position","relative");}
this.element.prepend(this.wrapper);if(!iOS&&!android){var video_src='';if($(this.element).data('vide-mp4')){video_src+="<source src='"+$(this.element).data('vide-mp4')+"' type='video/mp4'>";}
if($(this.element).data('vide-ogv')){video_src+="<source src='"+$(this.element).data('vide-ogv')+"' type='video/ogg'>";}
this.video=$("<video>"+video_src+"</video>");this.video.css("visibility","hidden");this.video.prop({autoplay:this.settings.autoplay,loop:this.settings.loop,volume:this.settings.volume,muted:this.settings.muted,playbackRate:this.settings.playbackRate});this.wrapper.append(this.video);this.video.css({"margin":"auto","position":"absolute","z-index":-1,"top":position.y,"left":position.x,"-webkit-transform":"translate(-"+position.x+", -"+position.y+")","-ms-transform":"translate(-"+position.x+", -"+position.y+")","transform":"translate(-"+position.x+", -"+position.y+")"});this.video.bind("loadedmetadata."+pluginName,function(){that.video.css("visibility","visible");that.resize();});$(this.element).bind("resize."+pluginName,function(){that.resize();});}};Vide.prototype.getVideoObject=function(){return this.video?this.video[0]:null;};Vide.prototype.resize=function(){if(!this.video){return;}
var videoHeight=this.video[0].videoHeight,videoWidth=this.video[0].videoWidth;var wrapperHeight=this.wrapper.height(),wrapperWidth=this.wrapper.width();if(wrapperWidth/videoWidth>wrapperHeight/videoHeight){this.video.css({"width":wrapperWidth+2,"height":"auto"});}else{this.video.css({"width":"auto","height":wrapperHeight+2});}};Vide.prototype.destroy=function(){this.element.unbind(pluginName);if(this.video){this.video.unbind(pluginName);}
delete $[pluginName].lookup[this.index];this.element.removeData(pluginName);this.wrapper.remove();};$.fn[pluginName]=function(path,options){var instance;this.each(function(){instance=$.data(this,pluginName);if(instance){instance.destroy();}
instance=new Vide(this,path,options);instance.index=$[pluginName].lookup.push(instance)-1;$.data(this,pluginName,instance);});return this;};$(document).ready(function(){$(window).bind("resize."+pluginName,function(){for(var len=$[pluginName].lookup.length,instance,i=0;i<len;i++){instance=$[pluginName].lookup[i];if(instance){instance.resize();}}});$(document).find("[data-"+pluginName+"-bg]").each(function(i,element){var $element=$(element),options=$element.data(pluginName+"-options"),path='';if(!options){options={};}else{options=parseOptions(options);}
$element[pluginName](path,options);});});})(window.jQuery,window,document,navigator);
/*! WOW - v1.0.1 - 2014-08-15
 * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
;(function(){var a,b,c,d=function(a,b){return function(){return a.apply(b,arguments)}},e=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)
if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}
return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}
return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)
if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)
if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}
return a.notSupported=!0,a.prototype.observe=function(){},a}()),this.SPPBWOW=function(){function f(a){null==a&&(a={}),this.scrollCallback=d(this.scrollCallback,this),this.scrollHandler=d(this.scrollHandler,this),this.start=d(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}
return f.prototype.defaults={boxClass:"sppb-wow",animateClass:"sppb-animated",offset:0,mobile:!0,live:!0},f.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():document.addEventListener("DOMContentLoaded",this.start),this.finished=[]},f.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)
if(this.disabled())this.resetStyle();else{for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);window.addEventListener("scroll",this.scrollHandler,!1),window.addEventListener("resize",this.scrollHandler,!1),this.interval=setInterval(this.scrollCallback,50)}
return this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},f.prototype.stop=function(){return this.stopped=!0,window.removeEventListener("scroll",this.scrollHandler,!1),window.removeEventListener("resize",this.scrollHandler,!1),null!=this.interval?clearInterval(this.interval):void 0},f.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},f.prototype.doSync=function(a){var b,c,d,f,g;if(!this.stopped){if(null==a&&(a=this.element),1!==a.nodeType)return;for(a=a.parentNode||a,f=a.querySelectorAll("."+this.config.boxClass),g=[],c=0,d=f.length;d>c;c++)b=f[c],e.call(this.all,b)<0?(this.applyStyle(b,!0),this.boxes.push(b),this.all.push(b),g.push(this.scrolled=!0)):g.push(void 0);return g}},f.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass},f.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-sppb-wow-duration"),c=a.getAttribute("data-sppb-wow-delay"),e=a.getAttribute("data-sppb-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},f.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),f.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.setAttribute("style","visibility: visible;"));return e},f.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},f.prototype.vendors=["moz","webkit"],f.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},f.prototype.vendorCSS=function(a,b){var c,d,e,f,g,h;for(d=window.getComputedStyle(a),c=d.getPropertyCSSValue(b),h=this.vendors,f=0,g=h.length;g>f;f++)e=h[f],c=c||d.getPropertyCSSValue("-"+e+"-"+b);return c},f.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=window.getComputedStyle(a).getPropertyValue("animation-name")}
return"none"===b?"":b},f.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},f.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},f.prototype.scrollHandler=function(){return this.scrolled=!0},f.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},f.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},f.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-sppb-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,innerHeight)-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},f.prototype.util=function(){return null!=this._util?this._util:this._util=new b},f.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},f}()}).call(this);jQuery(function($){new SPPBWOW().init();});(function($){var inviewObjects={},viewportSize,viewportOffset,d=document,w=window,documentElement=d.documentElement,expando=$.expando,timer;$.event.special.inview={add:function(data){inviewObjects[data.guid+"-"+this[expando]]={data:data,$element:$(this)};if(!timer&&!$.isEmptyObject(inviewObjects)){timer=setInterval(checkInView,250);}},remove:function(data){try{delete inviewObjects[data.guid+"-"+this[expando]];}catch(e){}
if($.isEmptyObject(inviewObjects)){clearInterval(timer);timer=null;}}};function getViewportSize(){var mode,domObject,size={height:w.innerHeight,width:w.innerWidth};if(!size.height){mode=d.compatMode;if(mode||!$.support.boxModel){domObject=mode==='CSS1Compat'?documentElement:d.body;size={height:domObject.clientHeight,width:domObject.clientWidth};}}
return size;}
function getViewportOffset(){return{top:w.pageYOffset||documentElement.scrollTop||d.body.scrollTop,left:w.pageXOffset||documentElement.scrollLeft||d.body.scrollLeft};}
function checkInView(){var $elements=$(),elementsLength,i=0;$.each(inviewObjects,function(i,inviewObject){var selector=inviewObject.data.selector,$element=inviewObject.$element;$elements=$elements.add(selector?$element.find(selector):$element);});elementsLength=$elements.length;if(elementsLength){viewportSize=viewportSize||getViewportSize();viewportOffset=viewportOffset||getViewportOffset();for(;i<elementsLength;i++){if(!$.contains(documentElement,$elements[i])){continue;}
var $element=$($elements[i]),elementSize={height:$element.height(),width:$element.width()},elementOffset=$element.offset(),inView=$element.data('inview'),visiblePartX,visiblePartY,visiblePartsMerged;if(!viewportOffset||!viewportSize){return;}
if(elementOffset.top+elementSize.height>viewportOffset.top&&elementOffset.top<viewportOffset.top+viewportSize.height&&elementOffset.left+elementSize.width>viewportOffset.left&&elementOffset.left<viewportOffset.left+viewportSize.width){visiblePartX=(viewportOffset.left>elementOffset.left?'right':(viewportOffset.left+viewportSize.width)<(elementOffset.left+elementSize.width)?'left':'both');visiblePartY=(viewportOffset.top>elementOffset.top?'bottom':(viewportOffset.top+viewportSize.height)<(elementOffset.top+elementSize.height)?'top':'both');visiblePartsMerged=visiblePartX+"-"+visiblePartY;if(!inView||inView!==visiblePartsMerged){$element.data('inview',visiblePartsMerged).trigger('inview',[true,visiblePartX,visiblePartY]);}}else if(inView){$element.data('inview',false).trigger('inview',[false]);}}}}
$(w).bind("scroll resize scrollstop",function(){viewportSize=viewportOffset=null;});if(!documentElement.addEventListener&&documentElement.attachEvent){documentElement.attachEvent("onfocusin",function(){viewportOffset=null;});}
$(document).on('inview','.sppb-progress',function(event,visible,visiblePartX,visiblePartY){var $bar=$(this).find('.sppb-progress-bar');if(visible){$bar.css('width',$bar.data('width'));$(this).unbind('inview');}});$.fn.sppbanimateNumbers=function(stop,commas,duration,ease){return this.each(function(){var $this=$(this);var start=parseInt($this.text().replace(/,/g,""));commas=(commas===undefined)?true:commas;$({value:start}).animate({value:stop},{duration:duration==undefined?1000:duration,easing:ease==undefined?"swing":ease,step:function(){$this.text(Math.floor(this.value));if(commas){$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));}},complete:function(){if(parseInt($this.text())!==stop){$this.text(stop);if(commas){$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));}}}});});};$(document).on('inview','.sppb-animated-number',function(event,visible,visiblePartX,visiblePartY){var $this=$(this);if(visible){$this.sppbanimateNumbers($this.data('digit'),false,$this.data('duration'));$this.unbind('inview');}});$(document).on('inview','.sppb-pie-chart',function(event,visible,visiblePartX,visiblePartY){var $this=$(this);if(visible){$this.easyPieChart({barColor:$this.data('barcolor'),trackColor:$this.data('trackcolor'),scaleColor:false,lineWidth:$this.data('width'),size:$this.data('size'),onStep:function(from,to,percent){$this.find('.sppb-chart-percent > span').text(Math.round(percent)+'%');}});$this.unbind('inview');}});})(jQuery);jQuery(function($){$(document).on('submit','.sppb-ajaxt-contact-form',function(event){event.preventDefault();var $self=$(this);var value=$(this).serializeArray();var request={'option':'com_sppagebuilder','task':'ajax','addon':'ajax_contact','g-recaptcha-response':$self.find('#g-recaptcha-response').val(),'data':value};$.ajax({type:'POST',data:request,beforeSend:function(){$self.find('.fa').addClass('fa-spinner fa-spin');},success:function(response){var results=$.parseJSON(response);var data=$.parseJSON(results.data);if(data.status){$self.trigger('reset');}
$self.find('.fa-spin').removeClass('fa-spinner fa-spin');$self.next('.sppb-ajax-contact-status').html(data.content).fadeIn().delay(4000).fadeOut(500);;}});return false;});});jQuery(function($){$(document).on('click','.sppb-magnific-popup',function(event){event.preventDefault();var $this=$(this);$this.magnificPopup({type:$this.data('popup_type'),mainClass:$this.data('mainclass')}).magnificPopup('open');});});jQuery(function($){if($('.sppb-addon-sppb-flibox.flipon-click, .threeD-flipbox.flipon-click').length>0){$('.sppb-addon-sppb-flibox.flipon-click .sppb-flipbox-panel, .threeD-flipbox.flipon-click .threeD-content-wrap').on('click',function(event){$(this).toggleClass('flip');});}
if($('.sppb-addon-sppb-flibox.flipon-hover, .threeD-flipbox.flipon-hover').length>0){$('.sppb-addon-sppb-flibox.flipon-hover .sppb-flipbox-panel, .threeD-flipbox.flipon-hover .threeD-content-wrap').on({mouseenter:function(){$(this).addClass('flip');},mouseleave:function(){$(this).removeClass('flip');}});}});


/*===============================
/components/com_sppagebuilder/assets/js/jquery.vide.js
================================================================================*/;
!(function(root,factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else if(typeof exports==='object'){factory(require('jquery'));}else{factory(root.jQuery);}})(this,function($){'use strict';var PLUGIN_NAME='vide';var DEFAULTS={volume:1,playbackRate:1,muted:true,loop:true,autoplay:true,position:'50% 50%',posterType:'detect',resizing:true,bgColor:'transparent',className:''};var NOT_IMPLEMENTED_MSG='Not implemented';function parseOptions(str){var obj={};var delimiterIndex;var option;var prop;var val;var arr;var len;var i;arr=str.replace(/\s*:\s*/g,':').replace(/\s*,\s*/g,',').split(',');for(i=0,len=arr.length;i<len;i++){option=arr[i];if(option.search(/^(http|https|ftp):\/\//)!==-1||option.search(':')===-1){break;}
delimiterIndex=option.indexOf(':');prop=option.substring(0,delimiterIndex);val=option.substring(delimiterIndex+1);if(!val){val=undefined;}
if(typeof val==='string'){val=val==='true'||(val==='false'?false:val);}
if(typeof val==='string'){val=!isNaN(val)?+val:val;}
obj[prop]=val;}
if(prop==null&&val==null){return str;}
return obj;}
function parsePosition(str){str=''+str;var args=str.split(/\s+/);var x='50%';var y='50%';var len;var arg;var i;for(i=0,len=args.length;i<len;i++){arg=args[i];if(arg==='left'){x='0%';}else if(arg==='right'){x='100%';}else if(arg==='top'){y='0%';}else if(arg==='bottom'){y='100%';}else if(arg==='center'){if(i===0){x='50%';}else{y='50%';}}else{if(i===0){x=arg;}else{y=arg;}}}
return{x:x,y:y};}
function findPoster(path,callback){var onLoad=function(){callback(this.src);};$('<img src="'+path+'.gif">').on('load',onLoad);$('<img src="'+path+'.jpg">').on('load',onLoad);$('<img src="'+path+'.jpeg">').on('load',onLoad);$('<img src="'+path+'.png">').on('load',onLoad);}
function Vide(element,path,options){this.$element=$(element);if(typeof path==='string'){path=parseOptions(path);}
if(!options){options={};}else if(typeof options==='string'){options=parseOptions(options);}
if(typeof path==='string'){path=path.replace(/\.\w*$/,'');}else if(typeof path==='object'){for(var i in path){if(path.hasOwnProperty(i)){path[i]=path[i].replace(/\.\w*$/,'');}}}
this.settings=$.extend({},DEFAULTS,options);this.path=path;try{this.init();}catch(e){if(e.message!==NOT_IMPLEMENTED_MSG){throw e;}}}
Vide.prototype.init=function(){var vide=this;var path=vide.path;var poster=path;var sources='';var $element=vide.$element;var settings=vide.settings;var position=parsePosition(settings.position);var posterType=settings.posterType;var $video;var $wrapper;$wrapper=vide.$wrapper=$('<div>').addClass(settings.className).css({position:'absolute','z-index':-1,top:0,left:0,bottom:0,right:0,overflow:'hidden','-webkit-background-size':'cover','-moz-background-size':'cover','-o-background-size':'cover','background-size':'cover','background-color':settings.bgColor,'background-repeat':'no-repeat','background-position':position.x+' '+position.y});if(typeof path==='object'){if(path.poster){poster=path.poster;}else{if(path.mp4){poster=path.mp4;}else if(path.webm){poster=path.webm;}else if(path.ogv){poster=path.ogv;}}}
if(posterType==='detect'){findPoster(poster,function(url){$wrapper.css('background-image','url('+url+')');});}else if(posterType!=='none'){$wrapper.css('background-image','url('+poster+'.'+posterType+')');}
if($element.css('position')==='static'){$element.css('position','relative');}
$element.prepend($wrapper);if(typeof path==='object'){if(path.mp4){sources+='<source src="'+path.mp4+'.mp4" type="video/mp4">';}
if(path.webm){sources+='<source src="'+path.webm+'.webm" type="video/webm">';}
if(path.ogv){sources+='<source src="'+path.ogv+'.ogv" type="video/ogg">';}
$video=vide.$video=$('<video>'+sources+'</video>');}else{$video=vide.$video=$('<video>'+'<source src="'+path+'.mp4" type="video/mp4">'+'<source src="'+path+'.webm" type="video/webm">'+'<source src="'+path+'.ogv" type="video/ogg">'+'</video>');}
try{$video.prop({autoplay:settings.autoplay,loop:settings.loop,volume:settings.volume,muted:settings.muted,defaultMuted:settings.muted,playbackRate:settings.playbackRate,defaultPlaybackRate:settings.playbackRate});}catch(e){throw new Error(NOT_IMPLEMENTED_MSG);}
$video.css({margin:'auto',position:'absolute','z-index':-1,top:position.y,left:position.x,'-webkit-transform':'translate(-'+position.x+', -'+position.y+')','-ms-transform':'translate(-'+position.x+', -'+position.y+')','-moz-transform':'translate(-'+position.x+', -'+position.y+')',transform:'translate(-'+position.x+', -'+position.y+')',visibility:'hidden',opacity:0}).one('canplaythrough.'+PLUGIN_NAME,function(){vide.resize();}).one('playing.'+PLUGIN_NAME,function(){$video.css({visibility:'visible',opacity:1});$wrapper.css('background-image','none');});$element.on('resize.'+PLUGIN_NAME,function(){if(settings.resizing){vide.resize();}});$wrapper.append($video);};Vide.prototype.getVideoObject=function(){return this.$video[0];};Vide.prototype.resize=function(){if(!this.$video){return;}
var $wrapper=this.$wrapper;var $video=this.$video;var video=$video[0];var videoHeight=video.videoHeight;var videoWidth=video.videoWidth;var wrapperHeight=$wrapper.height();var wrapperWidth=$wrapper.width();if(wrapperWidth/videoWidth>wrapperHeight/videoHeight){$video.css({width:wrapperWidth+2,height:'auto'});}else{$video.css({width:'auto',height:wrapperHeight+2});}};Vide.prototype.destroy=function(){delete $[PLUGIN_NAME].lookup[this.index];this.$video&&this.$video.off(PLUGIN_NAME);this.$element.off(PLUGIN_NAME).removeData(PLUGIN_NAME);this.$wrapper.remove();};$[PLUGIN_NAME]={lookup:[]};$.fn[PLUGIN_NAME]=function(path,options){var instance;this.each(function(){instance=$.data(this,PLUGIN_NAME);instance&&instance.destroy();instance=new Vide(this,path,options);instance.index=$[PLUGIN_NAME].lookup.push(instance)-1;$.data(this,PLUGIN_NAME,instance);});return this;};$(document).ready(function(){var $window=$(window);$window.on('resize.'+PLUGIN_NAME,function(){for(var len=$[PLUGIN_NAME].lookup.length,i=0,instance;i<len;i++){instance=$[PLUGIN_NAME].lookup[i];if(instance&&instance.settings.resizing){instance.resize();}}});$window.on('unload.'+PLUGIN_NAME,function(){return false;});$(document).find('[data-'+PLUGIN_NAME+'-bg]').each(function(i,element){var $element=$(element);var options=$element.data(PLUGIN_NAME+'-options');var path=$element.data(PLUGIN_NAME+'-bg');$element[PLUGIN_NAME](path,options);});});});


/*===============================
/components/com_sppagebuilder/assets/js/jquery.countdown.min.js
================================================================================*/;
/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&b<0?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});


/*===============================
/components/com_sppagebuilder/assets/js/jquery.magnific-popup.min.js
================================================================================*/;
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});