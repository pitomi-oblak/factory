

/*===============================
http://www.factory2.dev/modules/mod_bt_googlemaps/tmpl/js/btbase64.min.js
================================================================================*/;
var BT = BT || {};
(function() {
	BT.Base64 = 
			{
				keyString : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				UTF8Encode : function(b) {
					b = b.replace(/\x0d\x0a/g, "\x0a");
					var a = "";
					for ( var e = 0; e < b.length; e++) {
						var d = b.charCodeAt(e);
						if (d < 128) {
							a += String.fromCharCode(d)
						} else {
							if ((d > 127) && (d < 2048)) {
								a += String.fromCharCode((d >> 6) | 192);
								a += String.fromCharCode((d & 63) | 128)
							} else {
								a += String.fromCharCode((d >> 12) | 224);
								a += String.fromCharCode(((d >> 6) & 63) | 128);
								a += String.fromCharCode((d & 63) | 128)
							}
						}
					}
					return a
				},
				UTF8Decode : function(a) {
					var b = "";
					var d = 0;
					var e = c1 = c2 = 0;
					while (d < a.length) {
						e = a.charCodeAt(d);
						if (e < 128) {
							b += String.fromCharCode(e);
							d++
						} else {
							if ((e > 191) && (e < 224)) {
								c2 = a.charCodeAt(d + 1);
								b += String.fromCharCode(((e & 31) << 6)
										| (c2 & 63));
								d += 2
							} else {
								c2 = a.charCodeAt(d + 1);
								c3 = a.charCodeAt(d + 2);
								b += String.fromCharCode(((e & 15) << 12)
										| ((c2 & 63) << 6) | (c3 & 63));
								d += 3
							}
						}
					}
					return b
				},
				base64Encode : function(c) {
					var a = "";
					var k, h, f, j, g, e, d;
					var b = 0;
					c = this.UTF8Encode(c);
					while (b < c.length) {
						k = c.charCodeAt(b++);
						h = c.charCodeAt(b++);
						f = c.charCodeAt(b++);
						j = k >> 2;
						g = ((k & 3) << 4) | (h >> 4);
						e = ((h & 15) << 2) | (f >> 6);
						d = f & 63;
						if (isNaN(h)) {
							e = d = 64
						} else {
							if (isNaN(f)) {
								d = 64
							}
						}
						a = a + this.keyString.charAt(j)
								+ this.keyString.charAt(g)
								+ this.keyString.charAt(e)
								+ this.keyString.charAt(d)
					}
					return a
				},
				base64Decode : function(c) {
					var a = "";
					var k, h, f;
					var j, g, e, d;
					var b = 0;
					c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
					while (b < c.length) {
						j = this.keyString.indexOf(c.charAt(b++));
						g = this.keyString.indexOf(c.charAt(b++));
						e = this.keyString.indexOf(c.charAt(b++));
						d = this.keyString.indexOf(c.charAt(b++));
						k = (j << 2) | (g >> 4);
						h = ((g & 15) << 4) | (e >> 2);
						f = ((e & 3) << 6) | d;
						a = a + String.fromCharCode(k);
						if (e != 64) {
							a = a + String.fromCharCode(h)
						}
						if (d != 64) {
							a = a + String.fromCharCode(f)
						}
					}
					a = this.UTF8Decode(a);
					return a
				}
			}
})();


/*===============================
http://www.factory2.dev/modules/mod_bt_googlemaps/tmpl/js/default.js
================================================================================*/;
var currentMapCenter;function initializeMap(configs,markersCode,stylesCode,boxStyles){var myLatlng;configs.width=configs.width=='auto'||configs.width=='100%'?"100%":configs.width+'px';configs.height=configs.height=='auto'||configs.height=='100%'?"100%":configs.height+'px';document.getElementById(configs.cavas_id).style.width=configs.width;document.getElementById(configs.cavas_id).style.height=configs.height;if(configs.owm_api==''){configs.weather=false;}
var markersJson=BT.Base64.base64Decode(markersCode);var markers=JSON.parse(markersJson);var max=markers.length;var stylesJson=BT.Base64.base64Decode(stylesCode);var styles=JSON.parse(stylesJson);var infowindowData=Array();createMapCenter(configs,markers,styles,boxStyles);function createMapCenter(configs,markers,styles,boxStyles){if(configs.mapCenterType=='address'&&configs.mapCenterAddress==''||configs.mapCenterType=='coordinate'&&configs.mapCenterCoordinate==''){if(markers.length==0){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':'A2DN3 Nguyen Khanh Toan, Cau Giay, Ha Noi'},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode map center was not successful for the following reason: "+status);}});}else{if(markers[0].markerType=='address'){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':markers[0].markerValue},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode was not successful for the following reason: "+status+'! Map address: '+markers[0].markerValue);}})}else{mapCenterCoordinate=markers[0].markerValue.split(',');mapCenter=new google.maps.LatLng(mapCenterCoordinate[0],mapCenterCoordinate[1]);return createMap(configs,styles,markers,mapCenter,boxStyles);}}}else{if(configs.mapCenterType=='address'){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':configs.mapCenterAddress},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode was not successful for the following reason: "+status+'! Map address: '+configs.mapCenterAddress);}})}else{mapCenterCoordinate=configs.mapCenterCoordinate.split(',');mapCenter=new google.maps.LatLng(mapCenterCoordinate[0],mapCenterCoordinate[1]);return createMap(configs,styles,markers,mapCenter,boxStyles);}}}
function createMap(configs,styles,markers,mapCenter,boxStyles){if(configs.enableStyle==1||configs.enableStyle=='1'){var stylesArr=[];for(var j=0;j<styles.length;j++)
{var style={};style.stylers=[];if(styles[j].featureType!='all'){style.featureType=styles[j].featureType;}
if(styles[j].elementType!='all'){style.elementType=styles[j].elementType;}
if(styles[j].invertLightness=='true'){style.stylers.push({"invert_lightness":true});}
if(styles[j].visibility){style.stylers.push({"visibility":styles[j].visibility});}
if(styles[j].mapColor){style.stylers.push({"color":styles[j].mapColor});}
if(styles[j].weight){style.stylers.push({"weight":styles[j].weight});}
if(styles[j].hue){style.stylers.push({"hue":styles[j].hue});}
if(styles[j].saturation){style.stylers.push({"saturation":styles[j].saturation});}
if(styles[j].lightness){style.stylers.push({"lightness":styles[j].lightness});}
if(styles[j].gamma){style.stylers.push({"gamma":styles[j].gamma});}
stylesArr.push(style);}
if(configs.createNewOrDefault=="applyDefault"){if(stylesArr.length!=0){var mapOptions={zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,draggable:configs.draggable,disableDoubleClickZoom:configs.disableDoubleClickZoom,scrollwheel:configs.scrollwheel,center:mapCenter,mapTypeId:configs.mapType,styles:stylesArr}}else{var mapOptions={zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,draggable:configs.draggable,disableDoubleClickZoom:configs.disableDoubleClickZoom,scrollwheel:configs.scrollwheel,center:mapCenter,mapTypeId:configs.mapType}}}else{var mapOptions={zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,draggable:configs.draggable,disableDoubleClickZoom:configs.disableDoubleClickZoom,scrollwheel:configs.scrollwheel,center:mapCenter,mapTypeControlOptions:{mapTypeIds:[configs.mapType,'map_style']}}
var styledMap=new google.maps.StyledMapType(stylesArr,{name:configs.styleTitle});}}else{var mapOptions={zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,draggable:configs.draggable,disableDoubleClickZoom:configs.disableDoubleClickZoom,scrollwheel:configs.scrollwheel,center:mapCenter,mapTypeId:configs.mapType}}
var map=new google.maps.Map(document.getElementById(configs.cavas_id),mapOptions);if((configs.enableStyle==1||configs.enableStyle=='1')&&configs.createNewOrDefault=="createNew"){map.mapTypes.set('map_style',styledMap);map.setMapTypeId('map_style');}
for(i=0;i<markers.length;i++){getMarker(configs,markers[i],map,boxStyles,i);}
currentMapCenter=map.getCenter();google.maps.event.addDomListener(map,'idle',function(){currentMapCenter=map.getCenter();});google.maps.event.addDomListener(window,'resize',function(){map.setCenter(currentMapCenter);});}
function getMarker(configs,markerSource,map,boxStyles,i){if(markerSource.markerType=='coordinate'){coordinate=markerSource.markerValue.split(',');var pos=new google.maps.LatLng(coordinate[0],coordinate[1]);if(configs.weather){createMakerWithWeather(configs,markerSource,map,pos,boxStyles,i);}else{createMarker(configs,markerSource,map,pos,boxStyles,i);}}else{var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':markerSource.markerValue},function(results,status){if(status==google.maps.GeocoderStatus.OK){var pos=results[0].geometry.location;if(configs.weather){createMakerWithWeather(configs,markerSource,map,pos,boxStyles,i);}else{createMarker(configs,markerSource,map,pos,boxStyles,i);}}else{if(status==google.maps.GeocoderStatus.OVER_QUERY_LIMIT){setTimeout(function(){getMarker(configs,markerSource,map,boxStyles,i);},3000);}}})}}
function createMarker(configs,markerSource,map,pos,boxStyles,i){var marker,image;if(configs.weather&&markerSource.weatherInfo&&configs.replaceMarkerIcon){image=new google.maps.MarkerImage('http://openweathermap.org/img/w/'+markerSource.weatherInfo.weather[0].icon+'.png');}else{if(markerSource.markerIcon==''){image='';}else{markerSource.markerIcon=configs.url+markerSource.markerIcon;image={url:markerSource.markerIcon};}}
if(configs.weather&&markerSource.weatherInfo){marker=new google.maps.Marker({position:pos,map:map,icon:image,title:markerSource.markerTitle,zIndex:i*10});}else{marker=new google.maps.Marker({position:pos,map:map,icon:image,title:markerSource.markerTitle,zIndex:i*10});}
if(configs.weather&&configs.displayWeatherInfo&&markerSource.weatherInfo){markerSource.markerInfoWindow+='<p class="weather-info">'
+'<img src="'+'http://openweathermap.org/img/w/'+markerSource.weatherInfo.weather[0].icon+'.png'+'" alt=""/><br/>'
+markerSource.weatherInfo.main.temp+'&deg;'+(configs.temperatureUnit=='c'?'C':'F')+'<br/>'
+markerSource.weatherInfo.weather[0].main
+'</p>';}
if(markerSource.markerInfoWindow){if(configs.enableCustomInfoBox==1||configs.enableCustomInfoBox=='1'){var pixelOffset=configs.boxPosition.split(',');if(configs.closeBoxImage==''){configs.closeBoxImage='modules/mod_bt_googlemaps/tmpl/images/close.gif';}
var infoBoxOption={content:markerSource.markerInfoWindow,disableAutoPan:false,maxWidth:0,pixelOffset:new google.maps.Size(Number(pixelOffset[0]),Number(pixelOffset[1])),zIndex:i*10,boxStyle:boxStyles,closeBoxMargin:configs.closeBoxMargin,closeBoxURL:configs.url+'/'+configs.closeBoxImage,infoBoxClearance:new google.maps.Size(1,1),isHidden:false,pane:"floatPane",enableEventPropagation:false}
var infowindow=new InfoBox(infoBoxOption);}else{var infowindow=new google.maps.InfoWindow({content:markerSource.markerInfoWindow});}
infowindowData.push(infowindow);if(markerSource.markerShowInfoWindow==1){infowindow.open(map,marker);}
google.maps.event.addListener(marker,'click',function(){for(var i=0;i<infowindowData.length;i++){infowindowData[i].close();}
infowindow.open(map,marker);});}}
function createMakerWithWeather(configs,markerSource,map,pos,boxStyles,i){var requestString="http://api.openweathermap.org/data/2.5/weather?lat="+pos.lat()+'&lon='+pos.lng()
+"&cluster=yes&format=json"
+(configs.temperatureUnit=='c'?'&units=metric':'')
+"&APPID="+configs.owm_api;var request=new XMLHttpRequest();request.onload=function(){var results=JSON.parse(this.responseText);if(results.cod==200){markerSource.weatherInfo=results;}else{markerSource.weatherInfo=false;}
createMarker(configs,markerSource,map,pos,boxStyles,i);};request.open("get",requestString,true);request.send();}}


/*===============================
/modules/mod_sp_quickcontact/assets/js/script.js
================================================================================*/;
(function($){$(document).ready(function(){$('#sp-quickcontact-form').submit(function(){var value=$(this).serializeArray(),request={'option':'com_ajax','module':'sp_quickcontact','data':value,'format':'jsonp'};$.ajax({type:'POST',data:request,beforeSend:function(){$('#sp_qc_submit').before('<p class="sp_qc_loading"></p>');},success:function(response){$('#sp_qc_status').hide().html(response).fadeIn().delay(2000).fadeOut(500);$('.sp_qc_loading').fadeOut(function(){$(this).remove();});}});return false;});});})(jQuery);


/*===============================
/media/system/js/html5fallback.js
================================================================================*/;
!function(a,b,c){"use strict";"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b});var d=function(a,b){for(var c=["required","pattern","placeholder","autofocus","formnovalidate"],d=["email","url","number","range"],e={attributes:{},types:{}};b=c.pop();)e.attributes[b]=!!(b in a);for(;b=d.pop();)a.setAttribute("type",b),e.types[b]=a.type==b;return e}(b.createElement("input")),e={init:function(b,c){var d=this;d.elem=c,d.$elem=a(c),c.H5Form=d,d.options=a.extend({},a.fn.h5f.options,b),"form"===c.nodeName.toLowerCase()&&d.bindWithForm(d.elem,d.$elem)},bindWithForm:function(a,b){var i,e=this,f=!!b.attr("novalidate"),g=a.elements,h=g.length;for("onSubmit"===e.options.formValidationEvent&&b.on("submit",function(a){i=this.H5Form.donotValidate!==c&&this.H5Form.donotValidate,i||f||e.validateForm(e)?b.find(":input").each(function(){e.placeholder(e,this,"submit")}):(a.preventDefault(),this.donotValidate=!1)}),b.on("focusout focusin",function(a){e.placeholder(e,a.target,a.type)}),b.on("focusout change",e.validateField),b.find("fieldset").on("change",function(){e.validateField(this)}),d.attributes.formnovalidate||b.find(":submit[formnovalidate]").on("click",function(){e.donotValidate=!0});h--;)e.polyfill(g[h]),e.autofocus(e,g[h])},polyfill:function(a){if("form"===a.nodeName.toLowerCase())return!0;var b=a.form.H5Form;b.placeholder(b,a),b.numberType(b,a)},validateForm:function(){var f,g,a=this,b=a.elem,c=b.elements,d=c.length,e=!0;for(b.isValid=!0,f=0;f<d;f++)g=c[f],g.isRequired=!!g.required,g.isDisabled&&(g.isDisabled=!!g.disabled),g.isDisabled||(e=a.validateField(g),b.isValid&&!e&&a.setFocusOn(g),b.isValid=e&&b.isValid);return a.options.doRenderMessage&&a.renderErrorMessages(a,b),b.isValid},validateField:function(b){var j,k,l,e=b.target||b,f=!1,g=!1,h=!1,i=!1;return e.form===c?null:(j=e.form.H5Form,k=a(e),g=!!k.attr("required"),h=!!k.attr("disabled"),e.isDisabled||(f=!d.attributes.required&&g&&j.isValueMissing(j,e),i=!d.attributes.pattern&&j.matchPattern(j,e)),e.validityState={valueMissing:f,patternMismatch:i,valid:e.isDisabled||!(f||i)},d.attributes.required||(e.validityState.valueMissing?k.addClass(j.options.requiredClass):k.removeClass(j.options.requiredClass)),d.attributespattern||(e.validityState.patternMismatch?k.addClass(j.options.patternClass):k.removeClass(j.options.patternClass)),e.validityState.valid?(k.removeClass(j.options.invalidClass),l=j.findLabel(k),l.removeClass(j.options.invalidClass),l.attr("aria-invalid","false")):(k.addClass(j.options.invalidClass),l=j.findLabel(k),l.addClass(j.options.invalidClass),l.attr("aria-invalid","true")),e.validityState.valid)},isValueMissing:function(e,f){var k,l,m,g=a(f),h=f.type!==c?f.type:f.tagName.toLowerCase(),i=/^(checkbox|radio|fieldset)$/i.test(h),j=/^submit$/i.test(h);if(j)return!1;if(i){if("checkbox"===h)return!g.is(":checked");for(k="fieldset"===h?g.find("input"):b.getElementsByName(f.name),l=0,m=k.length;l<m;l++)if(a(k[l]).is(":checked"))return!1;return!0}return!(""!==g.val()&&(d.attributes.placeholder||!g.hasClass(e.options.placeholderClass)))},matchPattern:function(b,e){var j,k,f=a(e),g=f.attr("value"),h=f.attr("pattern"),i=f.attr("type");if(!d.attributes.placeholder&&f.attr("placeholder")&&f.hasClass(b.options.placeholderClass)||(g=f.attr("value")),""===g)return!1;if("email"===i){if(f.attr("multiple")===c)return!b.options.emailPatt.test(g);for(g=g.split(b.options.mutipleDelimiter),j=0,k=g.length;j<k;j++)if(!b.options.emailPatt.test(g[j].replace(/[ ]*/g,"")))return!0}else{if("url"===i)return!b.options.urlPatt.test(g);if("text"===i&&h!==c)return usrPatt=new RegExp("^(?:"+h+")$"),!usrPatt.test(g)}return!1},placeholder:function(b,e,f){var g=a(e),h=g.attr("placeholder"),i=/^(focusin|submit)$/i.test(f),j=/^(input|textarea)$/i.test(e.nodeName),k=/^password$/i.test(e.type),l=d.attributes.placeholder;l||!j||k||h===c||(""!==e.value||i?e.value===h&&i&&(e.value="",g.removeClass(b.options.placeholderClass)):(e.value=h,g.addClass(b.options.placeholderClass)))},numberType:function(b,c){var i,j,k,l,m,n,o,p,e=a(c),f=e.attr("type"),g=/^input$/i.test(c.nodeName),h=/^(number|range)$/i.test(f);if(!(!g||!h||"number"==f&&d.types.number||"range"==f&&d.types.range)){for(i=parseInt(e.attr("min")),j=parseInt(e.attr("max")),k=parseInt(e.attr("step")),l=parseInt(e.attr("value")),m=e.prop("attributes"),n=a("<select>"),i=isNaN(i)?-100:i,p=i;p<=j;p+=k)o=a('<option value="'+p+'">'+p+"</option>"),(l==p||l>p&&l<p+k)&&o.attr("selected",""),n.append(o);a.each(m,function(){n.attr(this.name,this.value)}),e.replaceWith(n)}},autofocus:function(b,c){var e=a(c),f=!!e.attr("autofocus"),g=/^(input|textarea|select|fieldset)$/i.test(c.nodeName),h=/^submit$/i.test(c.type),i=d.attributes.autofocus;!i&&g&&!h&&f&&a(function(){b.setFocusOn(c)})},findLabel:function(b){var d,c=a('label[for="'+b.attr("id")+'"]');return c.length<=0&&(d=b.parent(),"label"==d.get(0).tagName.toLowerCase()&&(c=d)),c},setFocusOn:function(b){"fieldset"===b.tagName.toLowerCase()?a(b).find(":first").focus():a(b).focus()},renderErrorMessages:function(b,c){for(var g,h,d=c.elements,e=d.length,f={errors:[]};e--;)g=a(d[e]),h=b.findLabel(g),g.hasClass(b.options.requiredClass)&&(f.errors[e]=h.text().replace("*","")+b.options.requiredMessage),g.hasClass(b.options.patternClass)&&(f.errors[e]=h.text().replace("*","")+b.options.patternMessage);f.errors.length>0&&Joomla.renderMessages(f)}};a.fn.h5f=function(a){return this.each(function(){Object.create(e).init(a,this)})},a.fn.h5f.options={invalidClass:"invalid",requiredClass:"required",requiredMessage:" is required.",placeholderClass:"placeholder",patternClass:"pattern",patternMessage:" doesn't match pattern.",doRenderMessage:!1,formValidationEvent:"onSubmit",emailPatt:/^[a-zA-Z0-9.!#$%&‚Äô*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,urlPatt:/[a-z][\-\.+a-z]*:\/\//i},a(function(){a("form").h5f({doRenderMessage:!0,requiredClass:"musthavevalue"})})}(jQuery,document);