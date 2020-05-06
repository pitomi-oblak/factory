

/*===============================
/template/plugins/system/t3/base-bs3/bootstrap/js/bootstrap.js
================================================================================*/;
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){'use strict';var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)||(version[0]>2)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
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
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.6'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.3.6'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state+='Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked'))changed=false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')}else if($input.prop('type')=='checkbox'){if(($input.prop('checked'))!==this.$element.hasClass('active'))changed=false
this.$element.toggleClass('active')}
$input.prop('checked',this.$element.hasClass('active'))
if(changed)$input.trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
if(!($(e.target).is('input[type="radio"]')||$(e.target).is('input[type="checkbox"]')))e.preventDefault()}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.6'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.6'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.6'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.6'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.inState=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.6'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||this.options.viewport))
this.inState={click:false,hover:false,focus:false}
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusin'?'focus':'hover']=true}
if(self.tip().hasClass('in')||self.hoverState=='in'){self.hoverState='in'
return}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState){if(this.inState[key])return true}
return false}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusout'?'focus':'hover']=false}
if(self.isInStateTrue())return
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.'+this.type)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var viewportDim=this.getPosition(this.$viewport)
placement=placement=='bottom'&&pos.bottom+actualHeight>viewportDim.bottom?'top':placement=='top'&&pos.top-actualHeight<viewportDim.top?'bottom':placement=='right'&&pos.right+actualWidth>viewportDim.width?'left':placement=='left'&&pos.left-actualWidth<viewportDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top+=marginTop
offset.left+=marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof $e.attr('data-original-title')!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var elOffset=isBody?{top:0,left:0}:$element.offset()
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.right){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template)
if(this.$tip.length!=1){throw new Error(this.type+' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
if(e){self.inState.click=!self.inState.click
if(self.isInStateTrue())self.enter(self)
else self.leave(self)}else{self.tip().hasClass('in')?self.leave(self):self.enter(self)}}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)
if(that.$tip){that.$tip.detach()}
that.$tip=null
that.$arrow=null
that.$viewport=null})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.6'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.6'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.6'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.6'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':false
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?false:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?false:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return false}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=Math.max($(document).height(),$(document.body).height())
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);


/*===============================
/template/media/j2store/js/j2store.namespace.js
================================================================================*/;
if(typeof(j2store)=='undefined'){var j2store={};}
if(typeof(j2store.jQuery)=='undefined'){j2store.jQuery=jQuery.noConflict();}
if(typeof(j2storeURL)=='undefined'){var j2storeURL='';}


/*===============================
/template/media/j2store/js/jquery-ui.min.js
================================================================================*/;
if(typeof(j2store) == 'undefined') {
	var j2store = {};
}
if(typeof(j2store.jQuery) == 'undefined') {
	j2store.jQuery = jQuery.noConflict();
}
// =============================================================================
(function(jQuery){ // <<< DO NOT REMOVE - USED FOR JQUERY COMPATIBILITY <<<
// =============================================================================

/*! jQuery UI - v1.9.2 - 2013-06-04
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.datepicker.js, jquery.ui.menu.js, jquery.ui.slider.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})})(jQuery);(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)})(jQuery);(function(e,t){var n=0;e.widget("ui.autocomplete",{version:"1.9.2",defaultElement:"<input>",options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){t=!0,r=!0,n=!0;return}t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t){t=!1,r.preventDefault();return}if(n)return;var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}},input:function(e){if(r){r=!1,e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target!==t.element[0]&&r.target!==n&&!e.contains(n,r.target)&&t.close()})})},menufocus:function(t,n){if(this.isNewMenu){this.isNewMenu=!1;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}var r=n.item.data("ui-autocomplete-item")||n.item.data("item.autocomplete");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item")||t.item.data("item.autocomplete"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),e.fn.bgiframe&&this.menu.element.bgiframe(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),e==="source"&&this._initSource(),e==="appendTo"&&this.menu.element.appendTo(this.document.find(t||"body")[0]),e==="disabled"&&t&&this.xhr&&this.xhr.abort()},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):typeof this.options.source=="string"?(n=this.options.source,this.source=function(t,i){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){i(e)},error:function(){i([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){e=e!=null?e:this._value(),this.term=this._value();if(e.length<this.options.minLength)return this.close(t);if(this._trigger("search",t)===!1)return;return this._search(e)},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,t=++n;return function(r){t===n&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return typeof t=="string"?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(n,t),this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term),this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(e,t),t.preventDefault()}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments);if(this.options.disabled||this.cancelSearch)return;e&&e.length?t=this.options.messages.results(e.length):t=this.options.messages.noResults,this.liveRegion.text(t)}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var n in t)if(t[n]==null||t[n]==undefined)e[n]=t[n];return e}$.extend($.ui,{datepicker:{version:"1.9.2"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var n=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var n=$(e);t.append=$([]),t.trigger=$([]);if(n.hasClass(this.markerClassName))return;this._attachments(n,t),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e)},_attachments:function(e,t){var n=this._get(t,"appendText"),r=this._get(t,"isRTL");t.append&&t.append.remove(),n&&(t.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),e[r?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var i=this._get(t,"showOn");(i=="focus"||i=="both")&&e.focus(this._showDatepicker);if(i=="button"||i=="both"){var s=this._get(t,"buttonText"),o=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):$('<button type="button"></button>').addClass(this._triggerClass).html(o==""?s:$("<img/>").attr({src:o,alt:s,title:s}))),e[r?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),n=this._get(e,"dateFormat");if(n.match(/[DM]/)){var r=function(e){var t=0,n=0;for(var r=0;r<e.length;r++)e[r].length>t&&(t=e[r].length,n=r);return n};t.setMonth(r(this._get(e,n.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(r(this._get(e,n.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var n=$(e);if(n.hasClass(this.markerClassName))return;n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block")},_dialogDatepicker:function(e,t,n,r,i){var s=this._dialogInst;if(!s){this.uuid+=1;var o="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+o+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),s=this._dialogInst=this._newInst(this._dialogInput,!1),s.settings={},$.data(this._dialogInput[0],PROP_NAME,s)}extendRemove(s.settings,r||{}),t=t&&t.constructor==Date?this._formatDate(s,t):t,this._dialogInput.val(t),this._pos=i?i.length?i:[i.pageX,i.pageY]:null;if(!this._pos){var u=document.documentElement.clientWidth,a=document.documentElement.clientHeight,f=document.documentElement.scrollLeft||document.body.scrollLeft,l=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[u/2-100+f,a/2-150+l]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),s.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,s),this},_destroyDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),r=="input"?(n.append.remove(),n.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r=="div"||r=="span")&&t.removeClass(this.markerClassName).empty()},_enableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})},_disableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,n){var r=this._getInst(e);if(arguments.length==2&&typeof t=="string")return t=="defaults"?$.extend({},$.datepicker._defaults):r?t=="all"?$.extend({},r.settings):this._get(r,t):null;var i=t||{};typeof t=="string"&&(i={},i[t]=n);if(r){this._curInst==r&&this._hideDatepicker();var s=this._getDateDatepicker(e,!0),o=this._getMinMaxDate(r,"min"),u=this._getMinMaxDate(r,"max");extendRemove(r.settings,i),o!==null&&i.dateFormat!==undefined&&i.minDate===undefined&&(r.settings.minDate=this._formatDate(r,o)),u!==null&&i.dateFormat!==undefined&&i.maxDate===undefined&&(r.settings.maxDate=this._formatDate(r,u)),this._attachments($(e),r),this._autoSize(r),this._setDate(r,s),this._updateAlternate(r),this._updateDatepicker(r)}},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),n=!0,r=t.dpDiv.is(".ui-datepicker-rtl");t._keyEvent=!0;if($.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),n=!1;break;case 13:var i=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);i[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,i[0]);var s=$.datepicker._get(t,"onSelect");if(s){var o=$.datepicker._formatDate(t);s.apply(t.input?t.input[0]:null,[o,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),n=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),n=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?1:-1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),n=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?-1:1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),n=e.ctrlKey||e.metaKey;break;default:n=!1}else e.keyCode==36&&e.ctrlKey?$.datepicker._showDatepicker(this):n=!1;n&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||r<" "||!n||n.indexOf(r)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var n=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));n&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(r){$.datepicker.log(r)}return!0},_showDatepicker:function(e){e=e.target||e,e.nodeName.toLowerCase()!="input"&&(e=$("input",e.parentNode)[0]);if($.datepicker._isDisabledDatepicker(e)||$.datepicker._lastInput==e)return;var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var n=$.datepicker._get(t,"beforeShow"),r=n?n.apply(e,[e,t]):{};if(r===!1)return;extendRemove(t.settings,r),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var i=!1;$(e).parents().each(function(){return i|=$(this).css("position")=="fixed",!i});var s={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),s=$.datepicker._checkOffset(t,s,i),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"});if(!t.inline){var o=$.datepicker._get(t,"showAnim"),u=$.datepicker._get(t,"duration"),a=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(!!e.length){var n=$.datepicker._getBorders(t.dpDiv);e.css({left:-n[0],top:-n[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[o]||$.effects[o])?t.dpDiv.show(o,$.datepicker._get(t,"showOptions"),u,a):t.dpDiv[o||"show"](o?u:null,a),(!o||!u)&&a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var n=e.dpDiv.find("iframe.ui-datepicker-cover");!n.length||n.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var r=this._getNumberOfMonths(e),i=r[1],s=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&e.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",s*i+"em"),e.dpDiv[(r[0]!=1||r[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus();if(e.yearshtml){var o=e.yearshtml;setTimeout(function(){o===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),o=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,n){var r=e.dpDiv.outerWidth(),i=e.dpDiv.outerHeight(),s=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,u=document.documentElement.clientWidth+(n?0:$(document).scrollLeft()),a=document.documentElement.clientHeight+(n?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?r-s:0,t.left-=n&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=n&&t.top==e.input.offset().top+o?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+r>u&&u>r?Math.abs(t.left+r-u):0),t.top-=Math.min(t.top,t.top+i>a&&a>i?Math.abs(i+o):0),t},_findPos:function(e){var t=this._getInst(e),n=this._get(t,"isRTL");while(e&&(e.type=="hidden"||e.nodeType!=1||$.expr.filters.hidden(e)))e=e[n?"previousSibling":"nextSibling"];var r=$(e).offset();return[r.left,r.top]},_hideDatepicker:function(e){var t=this._curInst;if(!t||e&&t!=$.data(e,PROP_NAME))return;if(this._datepickerShowing){var n=this._get(t,"showAnim"),r=this._get(t,"duration"),i=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[n]||$.effects[n])?t.dpDiv.hide(n,$.datepicker._get(t,"showOptions"),r,i):t.dpDiv[n=="slideDown"?"slideUp":n=="fadeIn"?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1;var s=this._get(t,"onClose");s&&s.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(!$.datepicker._curInst)return;var t=$(e.target),n=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&t.parents("#"+$.datepicker._mainDivId).length==0&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=n)&&$.datepicker._hideDatepicker()},_adjustDate:function(e,t,n){var r=$(e),i=this._getInst(r[0]);if(this._isDisabledDatepicker(r[0]))return;this._adjustInstDate(i,t+(n=="M"?this._get(i,"showCurrentAtPos"):0),n),this._updateDatepicker(i)},_gotoToday:function(e){var t=$(e),n=this._getInst(t[0]);if(this._get(n,"gotoCurrent")&&n.currentDay)n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear;else{var r=new Date;n.selectedDay=r.getDate(),n.drawMonth=n.selectedMonth=r.getMonth(),n.drawYear=n.selectedYear=r.getFullYear()}this._notifyChange(n),this._adjustDate(t)},_selectMonthYear:function(e,t,n){var r=$(e),i=this._getInst(r[0]);i["selected"+(n=="M"?"Month":"Year")]=i["draw"+(n=="M"?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(i),this._adjustDate(r)},_selectDay:function(e,t,n,r){var i=$(e);if($(r).hasClass(this._unselectableClass)||this._isDisabledDatepicker(i[0]))return;var s=this._getInst(i[0]);s.selectedDay=s.currentDay=$("a",r).html(),s.selectedMonth=s.currentMonth=t,s.selectedYear=s.currentYear=n,this._selectDate(e,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(e){var t=$(e),n=this._getInst(t[0]);this._selectDate(t,"")},_selectDate:function(e,t){var n=$(e),r=this._getInst(n[0]);t=t!=null?t:this._formatDate(r),r.input&&r.input.val(t),this._updateAlternate(r);var i=this._get(r,"onSelect");i?i.apply(r.input?r.input[0]:null,[t,r]):r.input&&r.input.trigger("change"),r.inline?this._updateDatepicker(r):(this._hideDatepicker(),this._lastInput=r.input[0],typeof r.input[0]!="object"&&r.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var n=this._get(e,"altFormat")||this._get(e,"dateFormat"),r=this._getDate(e),i=this.formatDate(n,r,this._getFormatConfig(e));$(t).each(function(){$(this).val(i)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var n=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((n-t)/864e5)/7)+1},parseDate:function(e,t,n){if(e==null||t==null)throw"Invalid arguments";t=typeof t=="object"?t.toString():t+"";if(t=="")return null;var r=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff;r=typeof r!="string"?r:(new Date).getFullYear()%100+parseInt(r,10);var i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=-1,f=-1,l=-1,c=-1,h=!1,p=function(t){var n=y+1<e.length&&e.charAt(y+1)==t;return n&&y++,n},d=function(e){var n=p(e),r=e=="@"?14:e=="!"?20:e=="y"&&n?4:e=="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=t.substring(g).match(i);if(!s)throw"Missing number at position "+g;return g+=s[0].length,parseInt(s[0],10)},v=function(e,n,r){var i=$.map(p(e)?r:n,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),s=-1;$.each(i,function(e,n){var r=n[1];if(t.substr(g,r.length).toLowerCase()==r.toLowerCase())return s=n[0],g+=r.length,!1});if(s!=-1)return s+1;throw"Unknown name at position "+g},m=function(){if(t.charAt(g)!=e.charAt(y))throw"Unexpected literal at position "+g;g++},g=0;for(var y=0;y<e.length;y++)if(h)e.charAt(y)=="'"&&!p("'")?h=!1:m();else switch(e.charAt(y)){case"d":l=d("d");break;case"D":v("D",i,s);break;case"o":c=d("o");break;case"m":f=d("m");break;case"M":f=v("M",o,u);break;case"y":a=d("y");break;case"@":var b=new Date(d("@"));a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"!":var b=new Date((d("!")-this._ticksTo1970)/1e4);a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"'":p("'")?m():h=!0;break;default:m()}if(g<t.length){var w=t.substr(g);if(!/^\s+/.test(w))throw"Extra/unparsed characters found in date: "+w}a==-1?a=(new Date).getFullYear():a<100&&(a+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a<=r?0:-100));if(c>-1){f=1,l=c;do{var E=this._getDaysInMonth(a,f-1);if(l<=E)break;f++,l-=E}while(!0)}var b=this._daylightSavingAdjust(new Date(a,f-1,l));if(b.getFullYear()!=a||b.getMonth()+1!=f||b.getDate()!=l)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,i=(n?n.dayNames:null)||this._defaults.dayNames,s=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,o=(n?n.monthNames:null)||this._defaults.monthNames,u=function(t){var n=h+1<e.length&&e.charAt(h+1)==t;return n&&h++,n},a=function(e,t,n){var r=""+t;if(u(e))while(r.length<n)r="0"+r;return r},f=function(e,t,n,r){return u(e)?r[t]:n[t]},l="",c=!1;if(t)for(var h=0;h<e.length;h++)if(c)e.charAt(h)=="'"&&!u("'")?c=!1:l+=e.charAt(h);else switch(e.charAt(h)){case"d":l+=a("d",t.getDate(),2);break;case"D":l+=f("D",t.getDay(),r,i);break;case"o":l+=a("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":l+=a("m",t.getMonth()+1,2);break;case"M":l+=f("M",t.getMonth(),s,o);break;case"y":l+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=t.getTime()*1e4+this._ticksTo1970;break;case"'":u("'")?l+="'":c=!0;break;default:l+=e.charAt(h)}return l},_possibleChars:function(e){var t="",n=!1,r=function(t){var n=i+1<e.length&&e.charAt(i+1)==t;return n&&i++,n};for(var i=0;i<e.length;i++)if(n)e.charAt(i)=="'"&&!r("'")?n=!1:t+=e.charAt(i);else switch(e.charAt(i)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":r("'")?t+="'":n=!0;break;default:t+=e.charAt(i)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()==e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i,s;i=s=this._getDefaultDate(e);var o=this._getFormatConfig(e);try{i=this.parseDate(n,r,o)||s}catch(u){this.log(u),r=t?"":r}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=r?i.getDate():0,e.currentMonth=r?i.getMonth():0,e.currentYear=r?i.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,n){var r=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},i=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(n){}var r=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,i=r.getFullYear(),s=r.getMonth(),o=r.getDate(),u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=u.exec(t);while(a){switch(a[2]||"d"){case"d":case"D":o+=parseInt(a[1],10);break;case"w":case"W":o+=parseInt(a[1],10)*7;break;case"m":case"M":s+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s))}a=u.exec(t)}return new Date(i,s,o)},s=t==null||t===""?n:typeof t=="string"?i(t):typeof t=="number"?isNaN(t)?n:r(t):new Date(t.getTime());return s=s&&s.toString()=="Invalid Date"?n:s,s&&(s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0)),this._daylightSavingAdjust(s)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!=e.selectedMonth||s!=e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()==""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(n)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var n=this._get(e,"isRTL"),r=this._get(e,"showButtonPanel"),i=this._get(e,"hideIfNoPrevNext"),s=this._get(e,"navigationAsDateFormat"),o=this._getNumberOfMonths(e),u=this._get(e,"showCurrentAtPos"),a=this._get(e,"stepMonths"),f=o[0]!=1||o[1]!=1,l=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),c=this._getMinMaxDate(e,"min"),h=this._getMinMaxDate(e,"max"),p=e.drawMonth-u,d=e.drawYear;p<0&&(p+=12,d--);if(h){var v=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth()-o[0]*o[1]+1,h.getDate()));v=c&&v<c?c:v;while(this._daylightSavingAdjust(new Date(d,p,1))>v)p--,p<0&&(p=11,d--)}e.drawMonth=p,e.drawYear=d;var m=this._get(e,"prevText");m=s?this.formatDate(m,this._daylightSavingAdjust(new Date(d,p-a,1)),this._getFormatConfig(e)):m;var g=this._canAdjustMonth(e,-1,d,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>":i?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>",y=this._get(e,"nextText");y=s?this.formatDate(y,this._daylightSavingAdjust(new Date(d,p+a,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,d,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>":i?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>",w=this._get(e,"currentText"),E=this._get(e,"gotoCurrent")&&e.currentDay?l:t;w=s?this.formatDate(w,E,this._getFormatConfig(e)):w;var S=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",x=r?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(n?S:"")+(this._isInRange(e,E)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+w+"</button>":"")+(n?"":S)+"</div>":"",T=parseInt(this._get(e,"firstDay"),10);T=isNaN(T)?0:T;var N=this._get(e,"showWeek"),C=this._get(e,"dayNames"),k=this._get(e,"dayNamesShort"),L=this._get(e,"dayNamesMin"),A=this._get(e,"monthNames"),O=this._get(e,"monthNamesShort"),M=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),D=this._get(e,"selectOtherMonths"),P=this._get(e,"calculateWeek")||this.iso8601Week,H=this._getDefaultDate(e),B="";for(var j=0;j<o[0];j++){var F="";this.maxRows=4;for(var I=0;I<o[1];I++){var q=this._daylightSavingAdjust(new Date(d,p,e.selectedDay)),R=" ui-corner-all",U="";if(f){U+='<div class="ui-datepicker-group';if(o[1]>1)switch(I){case 0:U+=" ui-datepicker-group-first",R=" ui-corner-"+(n?"right":"left");break;case o[1]-1:U+=" ui-datepicker-group-last",R=" ui-corner-"+(n?"left":"right");break;default:U+=" ui-datepicker-group-middle",R=""}U+='">'}U+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+R+'">'+(/all|left/.test(R)&&j==0?n?b:g:"")+(/all|right/.test(R)&&j==0?n?g:b:"")+this._generateMonthYearHeader(e,p,d,c,h,j>0||I>0,A,O)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var z=N?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"";for(var W=0;W<7;W++){var X=(W+T)%7;z+="<th"+((W+T+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+C[X]+'">'+L[X]+"</span></th>"}U+=z+"</tr></thead><tbody>";var V=this._getDaysInMonth(d,p);d==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,V));var J=(this._getFirstDayOfMonth(d,p)-T+7)%7,K=Math.ceil((J+V)/7),Q=f?this.maxRows>K?this.maxRows:K:K;this.maxRows=Q;var G=this._daylightSavingAdjust(new Date(d,p,1-J));for(var Y=0;Y<Q;Y++){U+="<tr>";var Z=N?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(G)+"</td>":"";for(var W=0;W<7;W++){var et=M?M.apply(e.input?e.input[0]:null,[G]):[!0,""],tt=G.getMonth()!=p,nt=tt&&!D||!et[0]||c&&G<c||h&&G>h;Z+='<td class="'+((W+T+6)%7>=5?" ui-datepicker-week-end":"")+(tt?" ui-datepicker-other-month":"")+(G.getTime()==q.getTime()&&p==e.selectedMonth&&e._keyEvent||H.getTime()==G.getTime()&&H.getTime()==q.getTime()?" "+this._dayOverClass:"")+(nt?" "+this._unselectableClass+" ui-state-disabled":"")+(tt&&!_?"":" "+et[1]+(G.getTime()==l.getTime()?" "+this._currentClass:"")+(G.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+((!tt||_)&&et[2]?' title="'+et[2]+'"':"")+(nt?"":' data-handler="selectDay" data-event="click" data-month="'+G.getMonth()+'" data-year="'+G.getFullYear()+'"')+">"+(tt&&!_?"&#xa0;":nt?'<span class="ui-state-default">'+G.getDate()+"</span>":'<a class="ui-state-default'+(G.getTime()==t.getTime()?" ui-state-highlight":"")+(G.getTime()==l.getTime()?" ui-state-active":"")+(tt?" ui-priority-secondary":"")+'" href="#">'+G.getDate()+"</a>")+"</td>",G.setDate(G.getDate()+1),G=this._daylightSavingAdjust(G)}U+=Z+"</tr>"}p++,p>11&&(p=0,d++),U+="</tbody></table>"+(f?"</div>"+(o[0]>0&&I==o[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),F+=U}B+=F}return B+=x+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,B},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),l=this._get(e,"showMonthAfterYear"),c='<div class="ui-datepicker-title">',h="";if(s||!a)h+='<span class="ui-datepicker-month">'+o[t]+"</span>";else{var p=r&&r.getFullYear()==n,d=i&&i.getFullYear()==n;h+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var v=0;v<12;v++)(!p||v>=r.getMonth())&&(!d||v<=i.getMonth())&&(h+='<option value="'+v+'"'+(v==t?' selected="selected"':"")+">"+u[v]+"</option>");h+="</select>"}l||(c+=h+(s||!a||!f?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!f)c+='<span class="ui-datepicker-year">'+n+"</span>";else{var m=this._get(e,"yearRange").split(":"),g=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?n+parseInt(e.substring(1),10):e.match(/[+-].*/)?g+parseInt(e,10):parseInt(e,10);return isNaN(t)?g:t},b=y(m[0]),w=Math.max(b,y(m[1]||""));b=r?Math.max(b,r.getFullYear()):b,w=i?Math.min(w,i.getFullYear()):w,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;b<=w;b++)e.yearshtml+='<option value="'+b+'"'+(b==n?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",c+=e.yearshtml,e.yearshtml=null}}return c+=this._get(e,"yearSuffix"),l&&(c+=(s||!a||!f?"&#xa0;":"")+h),c+="</div>",c},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n=="Y"?t:0),i=e.drawMonth+(n=="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n=="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n=="M"||n=="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return i=r&&i>r?r:i,i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max");return(!n||t.getTime()>=n.getTime())&&(!r||t.getTime()<=r.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return typeof e!="string"||e!="isDisabled"&&e!="getDate"&&e!="widget"?e=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){typeof e=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.2",window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(e,t){var n=!1;e.widget("ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var r=e(t.target).closest(".ui-menu-item");!n&&r.not(".ui-state-disabled").length&&(n=!0,this.select(t),r.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),n=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus);r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-—–\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},_startOpening:function(e){clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})})(jQuery);(function(e,t){var n=5;e.widget("ui.slider",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var t,r,i=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",u=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(i.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),i.range&&(i.range===!0&&(i.values||(i.values=[this._valueMin(),this._valueMin()]),i.values.length&&i.values.length!==2&&(i.values=[i.values[0],i.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(i.range==="min"||i.range==="max"?" ui-slider-range-"+i.range:""))),r=i.values&&i.values.length||1;for(t=s.length;t<r;t++)u.push(o);this.handles=s.add(e(u.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).mouseenter(function(){i.disabled||e(this).addClass("ui-state-hover")}).mouseleave(function(){e(this).removeClass("ui-state-hover")}).focus(function(){i.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))}).blur(function(){e(this).removeClass("ui-state-focus")}),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)}),this._on(this.handles,{keydown:function(t){var r,i,s,o,u=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:t.preventDefault();if(!this._keySliding){this._keySliding=!0,e(t.target).addClass("ui-state-active"),r=this._start(t,u);if(r===!1)return}}o=this.options.step,this.options.values&&this.options.values.length?i=s=this.values(u):i=s=this.value();switch(t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+o);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-o)}this._slide(t,u,s)},keyup:function(t){var n=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,n),this._change(t,n),e(t.target).removeClass("ui-state-active"))}}),this._refreshValue(),this._animateOff=!1},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var n,r,i,s,o,u,a,f,l=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),n={x:t.pageX,y:t.pageY},r=this._normValueFromMouse(n),i=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var n=Math.abs(r-l.values(t));i>n&&(i=n,s=e(this),o=t)}),c.range===!0&&this.values(1)===c.min&&(o+=1,s=e(this.handles[o])),u=this._start(t,o),u===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,s.addClass("ui-state-active").focus(),a=s.offset(),f=!e(t.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=f?{left:0,top:0}:{left:t.pageX-a.left-s.width()/2,top:t.pageY-a.top-s.height()/2-(parseInt(s.css("borderTopWidth"),10)||0)-(parseInt(s.css("borderBottomWidth"),10)||0)+(parseInt(s.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,r),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,n),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,n,r,i,s;return this.orientation==="horizontal"?(t=this.elementSize.width,n=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,n=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),r=n/t,r>1&&(r=1),r<0&&(r=0),this.orientation==="vertical"&&(r=1-r),i=this._valueMax()-this._valueMin(),s=this._valueMin()+r*i,this._trimAlignValue(s)},_start:function(e,t){var n={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("start",e,n)},_slide:function(e,t,n){var r,i,s;this.options.values&&this.options.values.length?(r=this.values(t?0:1),this.options.values.length===2&&this.options.range===!0&&(t===0&&n>r||t===1&&n<r)&&(n=r),n!==this.values(t)&&(i=this.values(),i[t]=n,s=this._trigger("slide",e,{handle:this.handles[t],value:n,values:i}),r=this.values(t?0:1),s!==!1&&this.values(t,n,!0))):n!==this.value()&&(s=this._trigger("slide",e,{handle:this.handles[t],value:n}),s!==!1&&this.value(n))},_stop:function(e,t){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("stop",e,n)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("change",e,n)}},value:function(e){if(arguments.length){this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(t,n){var r,i,s;if(arguments.length>1){this.options.values[t]=this._trimAlignValue(n),this._refreshValue(),this._change(null,t);return}if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();r=this.options.values,i=arguments[0];for(s=0;s<r.length;s+=1)r[s]=this._trimAlignValue(i[s]),this._change(null,s);this._refreshValue()},_setOption:function(t,n){var r,i=0;e.isArray(this.options.values)&&(i=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments);switch(t){case"disabled":n?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.prop("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.prop("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(r=0;r<i;r+=1)this._change(null,r);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e),e},_values:function(e){var t,n,r;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t),t;n=this.options.values.slice();for(r=0;r<n.length;r+=1)n[r]=this._trimAlignValue(n[r]);return n},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,n=(e-this._valueMin())%t,r=e-n;return Math.abs(n)*2>=t&&(r+=n>0?t:-t),parseFloat(r.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,n,r,i,s,o=this.options.range,u=this.options,a=this,f=this._animateOff?!1:u.animate,l={};this.options.values&&this.options.values.length?this.handles.each(function(r){n=(a.values(r)-a._valueMin())/(a._valueMax()-a._valueMin())*100,l[a.orientation==="horizontal"?"left":"bottom"]=n+"%",e(this).stop(1,1)[f?"animate":"css"](l,u.animate),a.options.range===!0&&(a.orientation==="horizontal"?(r===0&&a.range.stop(1,1)[f?"animate":"css"]({left:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({width:n-t+"%"},{queue:!1,duration:u.animate})):(r===0&&a.range.stop(1,1)[f?"animate":"css"]({bottom:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({height:n-t+"%"},{queue:!1,duration:u.animate}))),t=n}):(r=this.value(),i=this._valueMin(),s=this._valueMax(),n=s!==i?(r-i)/(s-i)*100:0,l[this.orientation==="horizontal"?"left":"bottom"]=n+"%",this.handle.stop(1,1)[f?"animate":"css"](l,u.animate),o==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[f?"animate":"css"]({width:n+"%"},u.animate),o==="max"&&this.orientation==="horizontal"&&this.range[f?"animate":"css"]({width:100-n+"%"},{queue:!1,duration:u.animate}),o==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[f?"animate":"css"]({height:n+"%"},u.animate),o==="max"&&this.orientation==="vertical"&&this.range[f?"animate":"css"]({height:100-n+"%"},{queue:!1,duration:u.animate}))}})})(jQuery);
//=============================================================================
})(j2store.jQuery); // <<< DO NOT REMOVE - USED FOR JQUERY COMPATIBILITY <<<
//=============================================================================



/*===============================
/template/media/j2store/js/jquery-ui-timepicker-addon.js
================================================================================*/;
/*! jQuery Timepicker Addon - v1.4 - 2013-08-11
* http://trentrichardson.com/examples/timepicker
* Copyright (c) 2013 Trent Richardson; Licensed MIT */
if(typeof(j2store)=='undefined'){var j2store={};}
if(typeof(j2store.jQuery)=='undefined'){j2store.jQuery=jQuery.noConflict();}
(function($){$.ui.timepicker=$.ui.timepicker||{};if($.ui.timepicker.version){return;}
$.extend($.ui,{timepicker:{version:"1.4"}});var Timepicker=function(){this.regional=[];this.regional['']={currentText:'Now',closeText:'Done',amNames:['AM','A'],pmNames:['PM','P'],timeFormat:'HH:mm',timeSuffix:'',timeOnlyTitle:'Choose Time',timeText:'Time',hourText:'Hour',minuteText:'Minute',secondText:'Second',millisecText:'Millisecond',microsecText:'Microsecond',timezoneText:'Time Zone',isRTL:false};this._defaults={showButtonPanel:true,timeOnly:false,showHour:null,showMinute:null,showSecond:null,showMillisec:null,showMicrosec:null,showTimezone:null,showTime:true,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,stepMicrosec:1,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,microsecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,microsecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,microsecGrid:0,alwaysSetTime:true,separator:' ',altFieldTimeOnly:true,altTimeFormat:null,altSeparator:null,altTimeSuffix:null,pickerTimeFormat:null,pickerTimeSuffix:null,showTimepicker:true,timezoneList:null,addSliderAccess:false,sliderAccessArgs:null,controlType:'slider',defaultValue:null,parse:'strict'};$.extend(this._defaults,this.regional['']);};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,microsec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,microsecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,microsecMaxOriginal:null,ampm:'',formattedDate:'',formattedTime:'',formattedDateTime:'',timezoneList:null,units:['hour','minute','second','millisec','microsec'],support:{},control:null,setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this;},_newInst:function($input,opts){var tp_inst=new Timepicker(),inlineSettings={},fns={},overrides,i;for(var attrName in this._defaults){if(this._defaults.hasOwnProperty(attrName)){var attrValue=$input.attr('time:'+attrName);if(attrValue){try{inlineSettings[attrName]=eval(attrValue);}catch(err){inlineSettings[attrName]=attrValue;}}}}
overrides={beforeShow:function(input,dp_inst){if($.isFunction(tp_inst._defaults.evnts.beforeShow)){return tp_inst._defaults.evnts.beforeShow.call($input[0],input,dp_inst,tp_inst);}},onChangeMonthYear:function(year,month,dp_inst){tp_inst._updateDateTime(dp_inst);if($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)){tp_inst._defaults.evnts.onChangeMonthYear.call($input[0],year,month,dp_inst,tp_inst);}},onClose:function(dateText,dp_inst){if(tp_inst.timeDefined===true&&$input.val()!==''){tp_inst._updateDateTime(dp_inst);}
if($.isFunction(tp_inst._defaults.evnts.onClose)){tp_inst._defaults.evnts.onClose.call($input[0],dateText,dp_inst,tp_inst);}}};for(i in overrides){if(overrides.hasOwnProperty(i)){fns[i]=opts[i]||null;}}
tp_inst._defaults=$.extend({},this._defaults,inlineSettings,opts,overrides,{evnts:fns,timepicker:tp_inst});tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(val){return val.toUpperCase();});tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(val){return val.toUpperCase();});tp_inst.support=detectSupport(tp_inst._defaults.timeFormat+
(tp_inst._defaults.pickerTimeFormat?tp_inst._defaults.pickerTimeFormat:'')+
(tp_inst._defaults.altTimeFormat?tp_inst._defaults.altTimeFormat:''));if(typeof(tp_inst._defaults.controlType)==='string'){if(tp_inst._defaults.controlType==='slider'&&typeof($.ui.slider)==='undefined'){tp_inst._defaults.controlType='select';}
tp_inst.control=tp_inst._controls[tp_inst._defaults.controlType];}
else{tp_inst.control=tp_inst._defaults.controlType;}
var timezoneList=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,525,540,570,600,630,660,690,720,765,780,840];if(tp_inst._defaults.timezoneList!==null){timezoneList=tp_inst._defaults.timezoneList;}
var tzl=timezoneList.length,tzi=0,tzv=null;if(tzl>0&&typeof timezoneList[0]!=='object'){for(;tzi<tzl;tzi++){tzv=timezoneList[tzi];timezoneList[tzi]={value:tzv,label:$.timepicker.timezoneOffsetString(tzv,tp_inst.support.iso8601)};}}
tp_inst._defaults.timezoneList=timezoneList;tp_inst.timezone=tp_inst._defaults.timezone!==null?$.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone):((new Date()).getTimezoneOffset()*-1);tp_inst.hour=tp_inst._defaults.hour<tp_inst._defaults.hourMin?tp_inst._defaults.hourMin:tp_inst._defaults.hour>tp_inst._defaults.hourMax?tp_inst._defaults.hourMax:tp_inst._defaults.hour;tp_inst.minute=tp_inst._defaults.minute<tp_inst._defaults.minuteMin?tp_inst._defaults.minuteMin:tp_inst._defaults.minute>tp_inst._defaults.minuteMax?tp_inst._defaults.minuteMax:tp_inst._defaults.minute;tp_inst.second=tp_inst._defaults.second<tp_inst._defaults.secondMin?tp_inst._defaults.secondMin:tp_inst._defaults.second>tp_inst._defaults.secondMax?tp_inst._defaults.secondMax:tp_inst._defaults.second;tp_inst.millisec=tp_inst._defaults.millisec<tp_inst._defaults.millisecMin?tp_inst._defaults.millisecMin:tp_inst._defaults.millisec>tp_inst._defaults.millisecMax?tp_inst._defaults.millisecMax:tp_inst._defaults.millisec;tp_inst.microsec=tp_inst._defaults.microsec<tp_inst._defaults.microsecMin?tp_inst._defaults.microsecMin:tp_inst._defaults.microsec>tp_inst._defaults.microsecMax?tp_inst._defaults.microsecMax:tp_inst._defaults.microsec;tp_inst.ampm='';tp_inst.$input=$input;if(tp_inst._defaults.altField){tp_inst.$altInput=$(tp_inst._defaults.altField).css({cursor:'pointer'}).focus(function(){$input.trigger("focus");});}
if(tp_inst._defaults.minDate===0||tp_inst._defaults.minDateTime===0){tp_inst._defaults.minDate=new Date();}
if(tp_inst._defaults.maxDate===0||tp_inst._defaults.maxDateTime===0){tp_inst._defaults.maxDate=new Date();}
if(tp_inst._defaults.minDate!==undefined&&tp_inst._defaults.minDate instanceof Date){tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime());}
if(tp_inst._defaults.minDateTime!==undefined&&tp_inst._defaults.minDateTime instanceof Date){tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime());}
if(tp_inst._defaults.maxDate!==undefined&&tp_inst._defaults.maxDate instanceof Date){tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime());}
if(tp_inst._defaults.maxDateTime!==undefined&&tp_inst._defaults.maxDateTime instanceof Date){tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime());}
tp_inst.$input.bind('focus',function(){tp_inst._onFocus();});return tp_inst;},_addTimePicker:function(dp_inst){var currDT=(this.$altInput&&this._defaults.altFieldTimeOnly)?this.$input.val()+' '+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(currDT);this._limitMinMaxDateTime(dp_inst,false);this._injectTimePicker();},_parseTime:function(timeString,withDate){if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);}
if(withDate||!this._defaults.timeOnly){var dp_dateFormat=$.datepicker._get(this.inst,'dateFormat');try{var parseRes=parseDateTimeInternal(dp_dateFormat,this._defaults.timeFormat,timeString,$.datepicker._getFormatConfig(this.inst),this._defaults);if(!parseRes.timeObj){return false;}
$.extend(this,parseRes.timeObj);}catch(err){$.timepicker.log("Error parsing the date/time string: "+err+"\ndate/time string = "+timeString+"\ntimeFormat = "+this._defaults.timeFormat+"\ndateFormat = "+dp_dateFormat);return false;}
return true;}else{var timeObj=$.datepicker.parseTime(this._defaults.timeFormat,timeString,this._defaults);if(!timeObj){return false;}
$.extend(this,timeObj);return true;}},_injectTimePicker:function(){var $dp=this.inst.dpDiv,o=this.inst.settings,tp_inst=this,litem='',uitem='',show=null,max={},gridSize={},size=null,i=0,l=0;if($dp.find("div.ui-timepicker-div").length===0&&o.showTimepicker){var noDisplay=' style="display:none;"',html='<div class="ui-timepicker-div'+(o.isRTL?' ui-timepicker-rtl':'')+'"><dl>'+'<dt class="ui_tpicker_time_label"'+((o.showTime)?'':noDisplay)+'>'+o.timeText+'</dt>'+'<dd class="ui_tpicker_time"'+((o.showTime)?'':noDisplay)+'></dd>';for(i=0,l=this.units.length;i<l;i++){litem=this.units[i];uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o['show'+uitem]!==null?o['show'+uitem]:this.support[litem];max[litem]=parseInt((o[litem+'Max']-((o[litem+'Max']-o[litem+'Min'])%o['step'+uitem])),10);gridSize[litem]=0;html+='<dt class="ui_tpicker_'+litem+'_label"'+(show?'':noDisplay)+'>'+o[litem+'Text']+'</dt>'+'<dd class="ui_tpicker_'+litem+'"><div class="ui_tpicker_'+litem+'_slider"'+(show?'':noDisplay)+'></div>';if(show&&o[litem+'Grid']>0){html+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';if(litem==='hour'){for(var h=o[litem+'Min'];h<=max[litem];h+=parseInt(o[litem+'Grid'],10)){gridSize[litem]++;var tmph=$.datepicker.formatTime(this.support.ampm?'hht':'HH',{hour:h},o);html+='<td data-for="'+litem+'">'+tmph+'</td>';}}
else{for(var m=o[litem+'Min'];m<=max[litem];m+=parseInt(o[litem+'Grid'],10)){gridSize[litem]++;html+='<td data-for="'+litem+'">'+((m<10)?'0':'')+m+'</td>';}}
html+='</tr></table></div>';}
html+='</dd>';}
var showTz=o.showTimezone!==null?o.showTimezone:this.support.timezone;html+='<dt class="ui_tpicker_timezone_label"'+(showTz?'':noDisplay)+'>'+o.timezoneText+'</dt>';html+='<dd class="ui_tpicker_timezone" '+(showTz?'':noDisplay)+'></dd>';html+='</dl></div>';var $tp=$(html);if(o.timeOnly===true){$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">'+'<div class="ui-datepicker-title">'+o.timeOnlyTitle+'</div>'+'</div>');$dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide();}
for(i=0,l=tp_inst.units.length;i<l;i++){litem=tp_inst.units[i];uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o['show'+uitem]!==null?o['show'+uitem]:this.support[litem];tp_inst[litem+'_slider']=tp_inst.control.create(tp_inst,$tp.find('.ui_tpicker_'+litem+'_slider'),litem,tp_inst[litem],o[litem+'Min'],max[litem],o['step'+uitem]);if(show&&o[litem+'Grid']>0){size=100*gridSize[litem]*o[litem+'Grid']/(max[litem]-o[litem+'Min']);$tp.find('.ui_tpicker_'+litem+' table').css({width:size+"%",marginLeft:o.isRTL?'0':((size/(-2*gridSize[litem]))+"%"),marginRight:o.isRTL?((size/(-2*gridSize[litem]))+"%"):'0',borderCollapse:'collapse'}).find("td").click(function(e){var $t=$(this),h=$t.html(),n=parseInt(h.replace(/[^0-9]/g),10),ap=h.replace(/[^apm]/ig),f=$t.data('for');if(f==='hour'){if(ap.indexOf('p')!==-1&&n<12){n+=12;}
else{if(ap.indexOf('a')!==-1&&n===12){n=0;}}}
tp_inst.control.value(tp_inst,tp_inst[f+'_slider'],litem,n);tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/gridSize[litem])+'%',textAlign:'center',overflow:'hidden'});}}
this.timezone_select=$tp.find('.ui_tpicker_timezone').append('<select></select>').find("select");$.fn.append.apply(this.timezone_select,$.map(o.timezoneList,function(val,idx){return $("<option />").val(typeof val==="object"?val.value:val).text(typeof val==="object"?val.label:val);}));if(typeof(this.timezone)!=="undefined"&&this.timezone!==null&&this.timezone!==""){var local_timezone=(new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12)).getTimezoneOffset()*-1;if(local_timezone===this.timezone){selectLocalTimezone(tp_inst);}else{this.timezone_select.val(this.timezone);}}else{if(typeof(this.hour)!=="undefined"&&this.hour!==null&&this.hour!==""){this.timezone_select.val(o.timezone);}else{selectLocalTimezone(tp_inst);}}
this.timezone_select.change(function(){tp_inst._onTimeChange();tp_inst._onSelectHandler();});var $buttonPanel=$dp.find('.ui-datepicker-buttonpane');if($buttonPanel.length){$buttonPanel.before($tp);}else{$dp.append($tp);}
this.$timeObj=$tp.find('.ui_tpicker_time');if(this.inst!==null){var timeDefined=this.timeDefined;this._onTimeChange();this.timeDefined=timeDefined;}
if(this._defaults.addSliderAccess){var sliderAccessArgs=this._defaults.sliderAccessArgs,rtl=this._defaults.isRTL;sliderAccessArgs.isRTL=rtl;setTimeout(function(){if($tp.find('.ui-slider-access').length===0){$tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);var sliderAccessWidth=$tp.find('.ui-slider-access:eq(0)').outerWidth(true);if(sliderAccessWidth){$tp.find('table:visible').each(function(){var $g=$(this),oldWidth=$g.outerWidth(),oldMarginLeft=$g.css(rtl?'marginRight':'marginLeft').toString().replace('%',''),newWidth=oldWidth-sliderAccessWidth,newMarginLeft=((oldMarginLeft*newWidth)/oldWidth)+'%',css={width:newWidth,marginRight:0,marginLeft:0};css[rtl?'marginRight':'marginLeft']=newMarginLeft;$g.css(css);});}}},10);}
tp_inst._limitMinMaxDateTime(this.inst,true);}},_limitMinMaxDateTime:function(dp_inst,adjustSliders){var o=this._defaults,dp_date=new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay);if(!this._defaults.showTimepicker){return;}
if($.datepicker._get(dp_inst,'minDateTime')!==null&&$.datepicker._get(dp_inst,'minDateTime')!==undefined&&dp_date){var minDateTime=$.datepicker._get(dp_inst,'minDateTime'),minDateTimeDate=new Date(minDateTime.getFullYear(),minDateTime.getMonth(),minDateTime.getDate(),0,0,0,0);if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null||this.microsecMinOriginal===null){this.hourMinOriginal=o.hourMin;this.minuteMinOriginal=o.minuteMin;this.secondMinOriginal=o.secondMin;this.millisecMinOriginal=o.millisecMin;this.microsecMinOriginal=o.microsecMin;}
if(dp_inst.settings.timeOnly||minDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMin=minDateTime.getHours();if(this.hour<=this._defaults.hourMin){this.hour=this._defaults.hourMin;this._defaults.minuteMin=minDateTime.getMinutes();if(this.minute<=this._defaults.minuteMin){this.minute=this._defaults.minuteMin;this._defaults.secondMin=minDateTime.getSeconds();if(this.second<=this._defaults.secondMin){this.second=this._defaults.secondMin;this._defaults.millisecMin=minDateTime.getMilliseconds();if(this.millisec<=this._defaults.millisecMin){this.millisec=this._defaults.millisecMin;this._defaults.microsecMin=minDateTime.getMicroseconds();}else{if(this.microsec<this._defaults.microsecMin){this.microsec=this._defaults.microsecMin;}
this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.hourMin=this.hourMinOriginal;this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}
if($.datepicker._get(dp_inst,'maxDateTime')!==null&&$.datepicker._get(dp_inst,'maxDateTime')!==undefined&&dp_date){var maxDateTime=$.datepicker._get(dp_inst,'maxDateTime'),maxDateTimeDate=new Date(maxDateTime.getFullYear(),maxDateTime.getMonth(),maxDateTime.getDate(),0,0,0,0);if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null||this.millisecMaxOriginal===null){this.hourMaxOriginal=o.hourMax;this.minuteMaxOriginal=o.minuteMax;this.secondMaxOriginal=o.secondMax;this.millisecMaxOriginal=o.millisecMax;this.microsecMaxOriginal=o.microsecMax;}
if(dp_inst.settings.timeOnly||maxDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMax=maxDateTime.getHours();if(this.hour>=this._defaults.hourMax){this.hour=this._defaults.hourMax;this._defaults.minuteMax=maxDateTime.getMinutes();if(this.minute>=this._defaults.minuteMax){this.minute=this._defaults.minuteMax;this._defaults.secondMax=maxDateTime.getSeconds();if(this.second>=this._defaults.secondMax){this.second=this._defaults.secondMax;this._defaults.millisecMax=maxDateTime.getMilliseconds();if(this.millisec>=this._defaults.millisecMax){this.millisec=this._defaults.millisecMax;this._defaults.microsecMax=maxDateTime.getMicroseconds();}else{if(this.microsec>this._defaults.microsecMax){this.microsec=this._defaults.microsecMax;}
this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.hourMax=this.hourMaxOriginal;this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}
if(adjustSliders!==undefined&&adjustSliders===true){var hourMax=parseInt((this._defaults.hourMax-((this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour)),10),minMax=parseInt((this._defaults.minuteMax-((this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute)),10),secMax=parseInt((this._defaults.secondMax-((this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond)),10),millisecMax=parseInt((this._defaults.millisecMax-((this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec)),10),microsecMax=parseInt((this._defaults.microsecMax-((this._defaults.microsecMax-this._defaults.microsecMin)%this._defaults.stepMicrosec)),10);if(this.hour_slider){this.control.options(this,this.hour_slider,'hour',{min:this._defaults.hourMin,max:hourMax});this.control.value(this,this.hour_slider,'hour',this.hour-(this.hour%this._defaults.stepHour));}
if(this.minute_slider){this.control.options(this,this.minute_slider,'minute',{min:this._defaults.minuteMin,max:minMax});this.control.value(this,this.minute_slider,'minute',this.minute-(this.minute%this._defaults.stepMinute));}
if(this.second_slider){this.control.options(this,this.second_slider,'second',{min:this._defaults.secondMin,max:secMax});this.control.value(this,this.second_slider,'second',this.second-(this.second%this._defaults.stepSecond));}
if(this.millisec_slider){this.control.options(this,this.millisec_slider,'millisec',{min:this._defaults.millisecMin,max:millisecMax});this.control.value(this,this.millisec_slider,'millisec',this.millisec-(this.millisec%this._defaults.stepMillisec));}
if(this.microsec_slider){this.control.options(this,this.microsec_slider,'microsec',{min:this._defaults.microsecMin,max:microsecMax});this.control.value(this,this.microsec_slider,'microsec',this.microsec-(this.microsec%this._defaults.stepMicrosec));}}},_onTimeChange:function(){if(!this._defaults.showTimepicker){return;}
var hour=(this.hour_slider)?this.control.value(this,this.hour_slider,'hour'):false,minute=(this.minute_slider)?this.control.value(this,this.minute_slider,'minute'):false,second=(this.second_slider)?this.control.value(this,this.second_slider,'second'):false,millisec=(this.millisec_slider)?this.control.value(this,this.millisec_slider,'millisec'):false,microsec=(this.microsec_slider)?this.control.value(this,this.microsec_slider,'microsec'):false,timezone=(this.timezone_select)?this.timezone_select.val():false,o=this._defaults,pickerTimeFormat=o.pickerTimeFormat||o.timeFormat,pickerTimeSuffix=o.pickerTimeSuffix||o.timeSuffix;if(typeof(hour)==='object'){hour=false;}
if(typeof(minute)==='object'){minute=false;}
if(typeof(second)==='object'){second=false;}
if(typeof(millisec)==='object'){millisec=false;}
if(typeof(microsec)==='object'){microsec=false;}
if(typeof(timezone)==='object'){timezone=false;}
if(hour!==false){hour=parseInt(hour,10);}
if(minute!==false){minute=parseInt(minute,10);}
if(second!==false){second=parseInt(second,10);}
if(millisec!==false){millisec=parseInt(millisec,10);}
if(microsec!==false){microsec=parseInt(microsec,10);}
var ampm=o[hour<12?'amNames':'pmNames'][0];var hasChanged=(hour!==this.hour||minute!==this.minute||second!==this.second||millisec!==this.millisec||microsec!==this.microsec||(this.ampm.length>0&&(hour<12)!==($.inArray(this.ampm.toUpperCase(),this.amNames)!==-1))||(this.timezone!==null&&timezone!==this.timezone));if(hasChanged){if(hour!==false){this.hour=hour;}
if(minute!==false){this.minute=minute;}
if(second!==false){this.second=second;}
if(millisec!==false){this.millisec=millisec;}
if(microsec!==false){this.microsec=microsec;}
if(timezone!==false){this.timezone=timezone;}
if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);}
this._limitMinMaxDateTime(this.inst,true);}
if(this.support.ampm){this.ampm=ampm;}
this.formattedTime=$.datepicker.formatTime(o.timeFormat,this,o);if(this.$timeObj){if(pickerTimeFormat===o.timeFormat){this.$timeObj.text(this.formattedTime+pickerTimeSuffix);}
else{this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat,this,o)+pickerTimeSuffix);}}
this.timeDefined=true;if(hasChanged){this._updateDateTime();}},_onSelectHandler:function(){var onSelect=this._defaults.onSelect||this.inst.settings.onSelect;var inputEl=this.$input?this.$input[0]:null;if(onSelect&&inputEl){onSelect.apply(inputEl,[this.formattedDateTime,this]);}},_updateDateTime:function(dp_inst){dp_inst=this.inst||dp_inst;var dtTmp=(dp_inst.currentYear>0?new Date(dp_inst.currentYear,dp_inst.currentMonth,dp_inst.currentDay):new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay)),dt=$.datepicker._daylightSavingAdjust(dtTmp),dateFmt=$.datepicker._get(dp_inst,'dateFormat'),formatCfg=$.datepicker._getFormatConfig(dp_inst),timeAvailable=dt!==null&&this.timeDefined;this.formattedDate=$.datepicker.formatDate(dateFmt,(dt===null?new Date():dt),formatCfg);var formattedDateTime=this.formattedDate;if(dp_inst.lastVa===""){dp_inst.currentYear=dp_inst.selectedYear;dp_inst.currentMonth=dp_inst.selectedMonth;dp_inst.currentDay=dp_inst.selectedDay;}
if(this._defaults.timeOnly===true){formattedDateTime=this.formattedTime;}else if(this._defaults.timeOnly!==true&&(this._defaults.alwaysSetTime||timeAvailable)){formattedDateTime+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix;}
this.formattedDateTime=formattedDateTime;if(!this._defaults.showTimepicker){this.$input.val(this.formattedDate);}else if(this.$altInput&&this._defaults.timeOnly===false&&this._defaults.altFieldTimeOnly===true){this.$altInput.val(this.formattedTime);this.$input.val(this.formattedDate);}else if(this.$altInput){this.$input.val(formattedDateTime);var altFormattedDateTime='',altSeparator=this._defaults.altSeparator?this._defaults.altSeparator:this._defaults.separator,altTimeSuffix=this._defaults.altTimeSuffix?this._defaults.altTimeSuffix:this._defaults.timeSuffix;if(!this._defaults.timeOnly){if(this._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(this._defaults.altFormat,(dt===null?new Date():dt),formatCfg);}
else{altFormattedDateTime=this.formattedDate;}
if(altFormattedDateTime){altFormattedDateTime+=altSeparator;}}
if(this._defaults.altTimeFormat){altFormattedDateTime+=$.datepicker.formatTime(this._defaults.altTimeFormat,this,this._defaults)+altTimeSuffix;}
else{altFormattedDateTime+=this.formattedTime+altTimeSuffix;}
this.$altInput.val(altFormattedDateTime);}else{this.$input.val(formattedDateTime);}
this.$input.trigger("change");},_onFocus:function(){if(!this.$input.val()&&this._defaults.defaultValue){this.$input.val(this._defaults.defaultValue);var inst=$.datepicker._getInst(this.$input.get(0)),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}catch(err){$.timepicker.log(err);}}}}},_controls:{slider:{create:function(tp_inst,obj,unit,val,min,max,step){var rtl=tp_inst._defaults.isRTL;return obj.prop('slide',null).slider({orientation:"horizontal",value:rtl?val*-1:val,min:rtl?max*-1:min,max:rtl?min*-1:max,step:step,slide:function(event,ui){tp_inst.control.value(tp_inst,$(this),unit,rtl?ui.value*-1:ui.value);tp_inst._onTimeChange();},stop:function(event,ui){tp_inst._onSelectHandler();}});},options:function(tp_inst,obj,unit,opts,val){if(tp_inst._defaults.isRTL){if(typeof(opts)==='string'){if(opts==='min'||opts==='max'){if(val!==undefined){return obj.slider(opts,val*-1);}
return Math.abs(obj.slider(opts));}
return obj.slider(opts);}
var min=opts.min,max=opts.max;opts.min=opts.max=null;if(min!==undefined){opts.max=min*-1;}
if(max!==undefined){opts.min=max*-1;}
return obj.slider(opts);}
if(typeof(opts)==='string'&&val!==undefined){return obj.slider(opts,val);}
return obj.slider(opts);},value:function(tp_inst,obj,unit,val){if(tp_inst._defaults.isRTL){if(val!==undefined){return obj.slider('value',val*-1);}
return Math.abs(obj.slider('value'));}
if(val!==undefined){return obj.slider('value',val);}
return obj.slider('value');}},select:{create:function(tp_inst,obj,unit,val,min,max,step){var sel='<select class="ui-timepicker-select" data-unit="'+unit+'" data-min="'+min+'" data-max="'+max+'" data-step="'+step+'">',format=tp_inst._defaults.pickerTimeFormat||tp_inst._defaults.timeFormat;for(var i=min;i<=max;i+=step){sel+='<option value="'+i+'"'+(i===val?' selected':'')+'>';if(unit==='hour'){sel+=$.datepicker.formatTime($.trim(format.replace(/[^ht ]/ig,'')),{hour:i},tp_inst._defaults);}
else if(unit==='millisec'||unit==='microsec'||i>=10){sel+=i;}
else{sel+='0'+i.toString();}
sel+='</option>';}
sel+='</select>';obj.children('select').remove();$(sel).appendTo(obj).change(function(e){tp_inst._onTimeChange();tp_inst._onSelectHandler();});return obj;},options:function(tp_inst,obj,unit,opts,val){var o={},$t=obj.children('select');if(typeof(opts)==='string'){if(val===undefined){return $t.data(opts);}
o[opts]=val;}
else{o=opts;}
return tp_inst.control.create(tp_inst,obj,$t.data('unit'),$t.val(),o.min||$t.data('min'),o.max||$t.data('max'),o.step||$t.data('step'));},value:function(tp_inst,obj,unit,val){var $t=obj.children('select');if(val!==undefined){return $t.val(val);}
return $t.val();}}}});$.fn.extend({timepicker:function(o){o=o||{};var tmp_args=Array.prototype.slice.call(arguments);if(typeof o==='object'){tmp_args[0]=$.extend(o,{timeOnly:true});}
return $(this).each(function(){$.fn.datetimepicker.apply($(this),tmp_args);});},datetimepicker:function(o){o=o||{};var tmp_args=arguments;if(typeof(o)==='string'){if(o==='getDate'){return $.fn.datepicker.apply($(this[0]),tmp_args);}else{return this.each(function(){var $t=$(this);$t.datepicker.apply($t,tmp_args);});}}else{return this.each(function(){var $t=$(this);$t.datepicker($.timepicker._newInst($t,o)._defaults);});}}});$.datepicker.parseDateTime=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var parseRes=parseDateTimeInternal(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings);if(parseRes.timeObj){var t=parseRes.timeObj;parseRes.date.setHours(t.hour,t.minute,t.second,t.millisec);parseRes.date.setMicroseconds(t.microsec);}
return parseRes.date;};$.datepicker.parseTime=function(timeFormat,timeString,options){var o=extendRemove(extendRemove({},$.timepicker._defaults),options||{}),iso8601=(timeFormat.replace(/\'.*?\'/g,'').indexOf('Z')!==-1);var strictParse=function(f,s,o){var getPatternAmpm=function(amNames,pmNames){var markers=[];if(amNames){$.merge(markers,amNames);}
if(pmNames){$.merge(markers,pmNames);}
markers=$.map(markers,function(val){return val.replace(/[.*+?|()\[\]{}\\]/g,'\\$&');});return'('+markers.join('|')+')?';};var getFormatPositions=function(timeFormat){var finds=timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),orders={h:-1,m:-1,s:-1,l:-1,c:-1,t:-1,z:-1};if(finds){for(var i=0;i<finds.length;i++){if(orders[finds[i].toString().charAt(0)]===-1){orders[finds[i].toString().charAt(0)]=i+1;}}}
return orders;};var regstr='^'+f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){var ml=match.length;switch(match.charAt(0).toLowerCase()){case'h':return ml===1?'(\\d?\\d)':'(\\d{'+ml+'})';case'm':return ml===1?'(\\d?\\d)':'(\\d{'+ml+'})';case's':return ml===1?'(\\d?\\d)':'(\\d{'+ml+'})';case'l':return'(\\d?\\d?\\d)';case'c':return'(\\d?\\d?\\d)';case'z':return'(z|[-+]\\d\\d:?\\d\\d|\\S+)?';case't':return getPatternAmpm(o.amNames,o.pmNames);default:return'('+match.replace(/\'/g,"").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,function(m){return"\\"+m;})+')?';}}).replace(/\s/g,'\\s?')+
o.timeSuffix+'$',order=getFormatPositions(f),ampm='',treg;treg=s.match(new RegExp(regstr,'i'));var resTime={hour:0,minute:0,second:0,millisec:0,microsec:0};if(treg){if(order.t!==-1){if(treg[order.t]===undefined||treg[order.t].length===0){ampm='';resTime.ampm='';}else{ampm=$.inArray(treg[order.t].toUpperCase(),o.amNames)!==-1?'AM':'PM';resTime.ampm=o[ampm==='AM'?'amNames':'pmNames'][0];}}
if(order.h!==-1){if(ampm==='AM'&&treg[order.h]==='12'){resTime.hour=0;}else{if(ampm==='PM'&&treg[order.h]!=='12'){resTime.hour=parseInt(treg[order.h],10)+12;}else{resTime.hour=Number(treg[order.h]);}}}
if(order.m!==-1){resTime.minute=Number(treg[order.m]);}
if(order.s!==-1){resTime.second=Number(treg[order.s]);}
if(order.l!==-1){resTime.millisec=Number(treg[order.l]);}
if(order.c!==-1){resTime.microsec=Number(treg[order.c]);}
if(order.z!==-1&&treg[order.z]!==undefined){resTime.timezone=$.timepicker.timezoneOffsetNumber(treg[order.z]);}
return resTime;}
return false;};var looseParse=function(f,s,o){try{var d=new Date('2012-01-01 '+s);if(isNaN(d.getTime())){d=new Date('2012-01-01T'+s);if(isNaN(d.getTime())){d=new Date('01/01/2012 '+s);if(isNaN(d.getTime())){throw"Unable to parse time with native Date: "+s;}}}
return{hour:d.getHours(),minute:d.getMinutes(),second:d.getSeconds(),millisec:d.getMilliseconds(),microsec:d.getMicroseconds(),timezone:d.getTimezoneOffset()*-1};}
catch(err){try{return strictParse(f,s,o);}
catch(err2){$.timepicker.log("Unable to parse \ntimeString: "+s+"\ntimeFormat: "+f);}}
return false;};if(typeof o.parse==="function"){return o.parse(timeFormat,timeString,o);}
if(o.parse==='loose'){return looseParse(timeFormat,timeString,o);}
return strictParse(timeFormat,timeString,o);};$.datepicker.formatTime=function(format,time,options){options=options||{};options=$.extend({},$.timepicker._defaults,options);time=$.extend({hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null},time);var tmptime=format,ampmName=options.amNames[0],hour=parseInt(time.hour,10);if(hour>11){ampmName=options.pmNames[0];}
tmptime=tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){switch(match){case'HH':return('0'+hour).slice(-2);case'H':return hour;case'hh':return('0'+convert24to12(hour)).slice(-2);case'h':return convert24to12(hour);case'mm':return('0'+time.minute).slice(-2);case'm':return time.minute;case'ss':return('0'+time.second).slice(-2);case's':return time.second;case'l':return('00'+time.millisec).slice(-3);case'c':return('00'+time.microsec).slice(-3);case'z':return $.timepicker.timezoneOffsetString(time.timezone===null?options.timezone:time.timezone,false);case'Z':return $.timepicker.timezoneOffsetString(time.timezone===null?options.timezone:time.timezone,true);case'T':return ampmName.charAt(0).toUpperCase();case'TT':return ampmName.toUpperCase();case't':return ampmName.charAt(0).toLowerCase();case'tt':return ampmName.toLowerCase();default:return match.replace(/'/g,"");}});return tmptime;};$.datepicker._base_selectDate=$.datepicker._selectDate;$.datepicker._selectDate=function(id,dateStr){var inst=this._getInst($(id)[0]),tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._limitMinMaxDateTime(inst,true);inst.inline=inst.stay_open=true;this._base_selectDate(id,dateStr);inst.inline=inst.stay_open=false;this._notifyChange(inst);this._updateDatepicker(inst);}else{this._base_selectDate(id,dateStr);}};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;$.datepicker._updateDatepicker=function(inst){var input=inst.input[0];if($.datepicker._curInst&&$.datepicker._curInst!==inst&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!==input){return;}
if(typeof(inst.stay_open)!=='boolean'||inst.stay_open===false){this._base_updateDatepicker(inst);var tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._addTimePicker(inst);}}};$.datepicker._base_doKeyPress=$.datepicker._doKeyPress;$.datepicker._doKeyPress=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if($.datepicker._get(inst,'constrainInput')){var ampm=tp_inst.support.ampm,tz=tp_inst._defaults.showTimezone!==null?tp_inst._defaults.showTimezone:tp_inst.support.timezone,dateChars=$.datepicker._possibleChars($.datepicker._get(inst,'dateFormat')),datetimeChars=tp_inst._defaults.timeFormat.toString().replace(/[hms]/g,'').replace(/TT/g,ampm?'APM':'').replace(/Tt/g,ampm?'AaPpMm':'').replace(/tT/g,ampm?'AaPpMm':'').replace(/T/g,ampm?'AP':'').replace(/tt/g,ampm?'apm':'').replace(/t/g,ampm?'ap':'')+" "+tp_inst._defaults.separator+
tp_inst._defaults.timeSuffix+
(tz?tp_inst._defaults.timezoneList.join(''):'')+
(tp_inst._defaults.amNames.join(''))+(tp_inst._defaults.pmNames.join(''))+
dateChars,chr=String.fromCharCode(event.charCode===undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<' '||!dateChars||datetimeChars.indexOf(chr)>-1);}}
return $.datepicker._base_doKeyPress(event);};$.datepicker._base_updateAlternate=$.datepicker._updateAlternate;$.datepicker._updateAlternate=function(inst){var tp_inst=this._get(inst,'timepicker');if(tp_inst){var altField=tp_inst._defaults.altField;if(altField){var altFormat=tp_inst._defaults.altFormat||tp_inst._defaults.dateFormat,date=this._getDate(inst),formatCfg=$.datepicker._getFormatConfig(inst),altFormattedDateTime='',altSeparator=tp_inst._defaults.altSeparator?tp_inst._defaults.altSeparator:tp_inst._defaults.separator,altTimeSuffix=tp_inst._defaults.altTimeSuffix?tp_inst._defaults.altTimeSuffix:tp_inst._defaults.timeSuffix,altTimeFormat=tp_inst._defaults.altTimeFormat!==null?tp_inst._defaults.altTimeFormat:tp_inst._defaults.timeFormat;altFormattedDateTime+=$.datepicker.formatTime(altTimeFormat,tp_inst,tp_inst._defaults)+altTimeSuffix;if(!tp_inst._defaults.timeOnly&&!tp_inst._defaults.altFieldTimeOnly&&date!==null){if(tp_inst._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(tp_inst._defaults.altFormat,date,formatCfg)+altSeparator+altFormattedDateTime;}
else{altFormattedDateTime=tp_inst.formattedDate+altSeparator+altFormattedDateTime;}}
$(altField).val(altFormattedDateTime);}}
else{$.datepicker._base_updateAlternate(inst);}};$.datepicker._base_doKeyUp=$.datepicker._doKeyUp;$.datepicker._doKeyUp=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}catch(err){$.timepicker.log(err);}}}
return $.datepicker._base_doKeyUp(event);};$.datepicker._base_gotoToday=$.datepicker._gotoToday;$.datepicker._gotoToday=function(id){var inst=this._getInst($(id)[0]),$dp=inst.dpDiv;this._base_gotoToday(id);var tp_inst=this._get(inst,'timepicker');selectLocalTimezone(tp_inst);var now=new Date();this._setTime(inst,now);$('.ui-datepicker-today',$dp).click();};$.datepicker._disableTimepickerDatepicker=function(target){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){inst.settings.showTimepicker=false;tp_inst._defaults.showTimepicker=false;tp_inst._updateDateTime(inst);}};$.datepicker._enableTimepickerDatepicker=function(target){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){inst.settings.showTimepicker=true;tp_inst._defaults.showTimepicker=true;tp_inst._addTimePicker(inst);tp_inst._updateDateTime(inst);}};$.datepicker._setTime=function(inst,date){var tp_inst=this._get(inst,'timepicker');if(tp_inst){var defaults=tp_inst._defaults;tp_inst.hour=date?date.getHours():defaults.hour;tp_inst.minute=date?date.getMinutes():defaults.minute;tp_inst.second=date?date.getSeconds():defaults.second;tp_inst.millisec=date?date.getMilliseconds():defaults.millisec;tp_inst.microsec=date?date.getMicroseconds():defaults.microsec;tp_inst._limitMinMaxDateTime(inst,true);tp_inst._onTimeChange();tp_inst._updateDateTime(inst);}};$.datepicker._setTimeDatepicker=function(target,date,withDate){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){this._setDateFromField(inst);var tp_date;if(date){if(typeof date==="string"){tp_inst._parseTime(date,withDate);tp_date=new Date();tp_date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);tp_date.setMicroseconds(tp_inst.microsec);}else{tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());}
if(tp_date.toString()==='Invalid Date'){tp_date=undefined;}
this._setTime(inst,tp_date);}}};$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker;$.datepicker._setDateDatepicker=function(target,date){var inst=this._getInst(target);if(!inst){return;}
if(typeof(date)==='string'){date=new Date(date);if(!date.getTime()){$.timepicker.log("Error creating Date object from string.");}}
var tp_inst=this._get(inst,'timepicker');var tp_date;if(date instanceof Date){tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());}else{tp_date=date;}
if(tp_inst){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=tp_date.getTimezoneOffset()*-1;}
date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);tp_date=$.timepicker.timezoneAdjust(tp_date,tp_inst.timezone);}
this._updateDatepicker(inst);this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(target,tp_date,true);};$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker;$.datepicker._getDateDatepicker=function(target,noDefault){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){if(inst.lastVal===undefined){this._setDateFromField(inst,noDefault);}
var date=this._getDate(inst);if(date&&tp_inst._parseTime($(target).val(),tp_inst.timeOnly)){date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);date.setMicroseconds(tp_inst.microsec);if(tp_inst.timezone!=null){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=date.getTimezoneOffset()*-1;}
date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);}}
return date;}
return this._base_getDateDatepicker(target,noDefault);};$.datepicker._base_parseDate=$.datepicker.parseDate;$.datepicker.parseDate=function(format,value,settings){var date;try{date=this._base_parseDate(format,value,settings);}catch(err){if(err.indexOf(":")>=0){date=this._base_parseDate(format,value.substring(0,value.length-(err.length-err.indexOf(':')-2)),settings);$.timepicker.log("Error parsing the date string: "+err+"\ndate string = "+value+"\ndate format = "+format);}else{throw err;}}
return date;};$.datepicker._base_formatDate=$.datepicker._formatDate;$.datepicker._formatDate=function(inst,day,month,year){var tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._updateDateTime(inst);return tp_inst.$input.val();}
return this._base_formatDate(inst);};$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker;$.datepicker._optionDatepicker=function(target,name,value){var inst=this._getInst(target),name_clone;if(!inst){return null;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){var min=null,max=null,onselect=null,overrides=tp_inst._defaults.evnts,fns={},prop;if(typeof name==='string'){if(name==='minDate'||name==='minDateTime'){min=value;}else if(name==='maxDate'||name==='maxDateTime'){max=value;}else if(name==='onSelect'){onselect=value;}else if(overrides.hasOwnProperty(name)){if(typeof(value)==='undefined'){return overrides[name];}
fns[name]=value;name_clone={};}}else if(typeof name==='object'){if(name.minDate){min=name.minDate;}else if(name.minDateTime){min=name.minDateTime;}else if(name.maxDate){max=name.maxDate;}else if(name.maxDateTime){max=name.maxDateTime;}
for(prop in overrides){if(overrides.hasOwnProperty(prop)&&name[prop]){fns[prop]=name[prop];}}}
for(prop in fns){if(fns.hasOwnProperty(prop)){overrides[prop]=fns[prop];if(!name_clone){name_clone=$.extend({},name);}
delete name_clone[prop];}}
if(name_clone&&isEmptyObject(name_clone)){return;}
if(min){if(min===0){min=new Date();}else{min=new Date(min);}
tp_inst._defaults.minDate=min;tp_inst._defaults.minDateTime=min;}else if(max){if(max===0){max=new Date();}else{max=new Date(max);}
tp_inst._defaults.maxDate=max;tp_inst._defaults.maxDateTime=max;}else if(onselect){tp_inst._defaults.onSelect=onselect;}}
if(value===undefined){return this._base_optionDatepicker.call($.datepicker,target,name);}
return this._base_optionDatepicker.call($.datepicker,target,name_clone||name,value);};var isEmptyObject=function(obj){var prop;for(prop in obj){if(obj.hasOwnProperty(prop)){return false;}}
return true;};var extendRemove=function(target,props){$.extend(target,props);for(var name in props){if(props[name]===null||props[name]===undefined){target[name]=props[name];}}
return target;};var detectSupport=function(timeFormat){var tf=timeFormat.replace(/'.*?'/g,'').toLowerCase(),isIn=function(f,t){return f.indexOf(t)!==-1?true:false;};return{hour:isIn(tf,'h'),minute:isIn(tf,'m'),second:isIn(tf,'s'),millisec:isIn(tf,'l'),microsec:isIn(tf,'c'),timezone:isIn(tf,'z'),ampm:isIn(tf,'t')&&isIn(timeFormat,'h'),iso8601:isIn(timeFormat,'Z')};};var convert24to12=function(hour){hour%=12;if(hour===0){hour=12;}
return String(hour);};var computeEffectiveSetting=function(settings,property){return settings&&settings[property]?settings[property]:$.timepicker._defaults[property];};var splitDateTime=function(dateTimeString,timeSettings){var separator=computeEffectiveSetting(timeSettings,'separator'),format=computeEffectiveSetting(timeSettings,'timeFormat'),timeParts=format.split(separator),timePartsLen=timeParts.length,allParts=dateTimeString.split(separator),allPartsLen=allParts.length;if(allPartsLen>1){return{dateString:allParts.splice(0,allPartsLen-timePartsLen).join(separator),timeString:allParts.splice(0,timePartsLen).join(separator)};}
return{dateString:dateTimeString,timeString:''};};var parseDateTimeInternal=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var date,parts,parsedTime;parts=splitDateTime(dateTimeString,timeSettings);date=$.datepicker._base_parseDate(dateFormat,parts.dateString,dateSettings);if(parts.timeString===''){return{date:date};}
parsedTime=$.datepicker.parseTime(timeFormat,parts.timeString,timeSettings);if(!parsedTime){throw'Wrong time format';}
return{date:date,timeObj:parsedTime};};var selectLocalTimezone=function(tp_inst,date){if(tp_inst&&tp_inst.timezone_select){var now=date||new Date();tp_inst.timezone_select.val(-now.getTimezoneOffset());}};$.timepicker=new Timepicker();$.timepicker.timezoneOffsetString=function(tzMinutes,iso8601){if(isNaN(tzMinutes)||tzMinutes>840||tzMinutes<-720){return tzMinutes;}
var off=tzMinutes,minutes=off%60,hours=(off-minutes)/60,iso=iso8601?':':'',tz=(off>=0?'+':'-')+('0'+Math.abs(hours)).slice(-2)+iso+('0'+Math.abs(minutes)).slice(-2);if(tz==='+00:00'){return'Z';}
return tz;};$.timepicker.timezoneOffsetNumber=function(tzString){var normalized=tzString.toString().replace(':','');if(normalized.toUpperCase()==='Z'){return 0;}
if(!/^(\-|\+)\d{4}$/.test(normalized)){return tzString;}
return((normalized.substr(0,1)==='-'?-1:1)*((parseInt(normalized.substr(1,2),10)*60)+
parseInt(normalized.substr(3,2),10)));};$.timepicker.timezoneAdjust=function(date,toTimezone){var toTz=$.timepicker.timezoneOffsetNumber(toTimezone);if(!isNaN(toTz)){date.setMinutes(date.getMinutes()+-date.getTimezoneOffset()-toTz);}
return date;};$.timepicker.timeRange=function(startTime,endTime,options){return $.timepicker.handleRange('timepicker',startTime,endTime,options);};$.timepicker.datetimeRange=function(startTime,endTime,options){$.timepicker.handleRange('datetimepicker',startTime,endTime,options);};$.timepicker.dateRange=function(startTime,endTime,options){$.timepicker.handleRange('datepicker',startTime,endTime,options);};$.timepicker.handleRange=function(method,startTime,endTime,options){options=$.extend({},{minInterval:0,maxInterval:0,start:{},end:{}},options);function checkDates(changed,other){var startdt=startTime[method]('getDate'),enddt=endTime[method]('getDate'),changeddt=changed[method]('getDate');if(startdt!==null){var minDate=new Date(startdt.getTime()),maxDate=new Date(startdt.getTime());minDate.setMilliseconds(minDate.getMilliseconds()+options.minInterval);maxDate.setMilliseconds(maxDate.getMilliseconds()+options.maxInterval);if(options.minInterval>0&&minDate>enddt){endTime[method]('setDate',minDate);}
else if(options.maxInterval>0&&maxDate<enddt){endTime[method]('setDate',maxDate);}
else if(startdt>enddt){other[method]('setDate',changeddt);}}}
function selected(changed,other,option){if(!changed.val()){return;}
var date=changed[method].call(changed,'getDate');if(date!==null&&options.minInterval>0){if(option==='minDate'){date.setMilliseconds(date.getMilliseconds()+options.minInterval);}
if(option==='maxDate'){date.setMilliseconds(date.getMilliseconds()-options.minInterval);}}
if(date.getTime){other[method].call(other,'option',option,date);}}
$.fn[method].call(startTime,$.extend({onClose:function(dateText,inst){checkDates($(this),endTime);},onSelect:function(selectedDateTime){selected($(this),endTime,'minDate');}},options,options.start));$.fn[method].call(endTime,$.extend({onClose:function(dateText,inst){checkDates($(this),startTime);},onSelect:function(selectedDateTime){selected($(this),startTime,'maxDate');}},options,options.end));checkDates(startTime,endTime);selected(startTime,endTime,'minDate');selected(endTime,startTime,'maxDate');return $([startTime.get(0),endTime.get(0)]);};$.timepicker.log=function(err){if(window.console){window.console.log(err);}};$.timepicker._util={_extendRemove:extendRemove,_isEmptyObject:isEmptyObject,_convert24to12:convert24to12,_detectSupport:detectSupport,_selectLocalTimezone:selectLocalTimezone,_computeEffectiveSetting:computeEffectiveSetting,_splitDateTime:splitDateTime,_parseDateTimeInternal:parseDateTimeInternal};if(!Date.prototype.getMicroseconds){Date.prototype.microseconds=0;Date.prototype.getMicroseconds=function(){return this.microseconds;};Date.prototype.setMicroseconds=function(m){this.setMilliseconds(this.getMilliseconds()+Math.floor(m/1000));this.microseconds=m%1000;return this;};}
$.timepicker.version="1.4";})(j2store.jQuery);


/*===============================
/template/media/j2store/js/jquery.zoom.js
================================================================================*/;
/*!
 Zoom v1.7.11 - 2013-11-12
 Enlarge images on click or mouseover.
 (c) 2013 Jack Moore - http://www.jacklmoore.com/zoom
 license: http://www.opensource.org/licenses/mit-license.php
*/
(function($){var defaults={url:false,callback:false,target:false,duration:120,on:'mouseover',touch:true,onZoomIn:false,onZoomOut:false,magnify:1};$.zoom=function(target,source,img,magnify){var targetHeight,targetWidth,sourceHeight,sourceWidth,xRatio,yRatio,offset,position=$(target).css('position');$(target).css({position:/(absolute|fixed)/.test(position)?position:'relative',overflow:'hidden'});img.style.width=img.style.height='';$(img).addClass('zoomImg').css({position:'absolute',top:0,left:0,opacity:0,width:img.width*magnify,height:img.height*magnify,border:'none',maxWidth:'none'}).appendTo(target);return{init:function(){targetWidth=$(target).outerWidth();targetHeight=$(target).outerHeight();if(source===target){sourceWidth=targetWidth;sourceHeight=targetHeight;}else{sourceWidth=$(source).outerWidth();sourceHeight=$(source).outerHeight();}
xRatio=(img.width-targetWidth)/sourceWidth;yRatio=(img.height-targetHeight)/sourceHeight;offset=$(source).offset();},move:function(e){var left=(e.pageX-offset.left),top=(e.pageY-offset.top);top=Math.max(Math.min(top,sourceHeight),0);left=Math.max(Math.min(left,sourceWidth),0);img.style.left=(left*-xRatio)+'px';img.style.top=(top*-yRatio)+'px';}};};$.fn.zoom=function(options){return this.each(function(){var
settings=$.extend({},defaults,options||{}),target=settings.target||this,source=this,img=document.createElement('img'),$img=$(img),mousemove='mousemove.zoom',clicked=false,touched=false,$urlElement;if(!settings.url){$urlElement=$(source).find('img');if($urlElement[0]){settings.url=$urlElement.data('src')||$urlElement.attr('src');}
if(!settings.url){return;}}
img.onload=function(){var zoom=$.zoom(target,source,img,settings.magnify);function start(e){zoom.init();zoom.move(e);$img.stop().fadeTo($.support.opacity?settings.duration:0,1,$.isFunction(settings.onZoomIn)?settings.onZoomIn.call(img):false);}
function stop(){$img.stop().fadeTo(settings.duration,0,$.isFunction(settings.onZoomOut)?settings.onZoomOut.call(img):false);}
if(settings.on==='grab'){$(source).on('mousedown.zoom',function(e){if(e.which===1){$(document).one('mouseup.zoom',function(){stop();$(document).off(mousemove,zoom.move);});start(e);$(document).on(mousemove,zoom.move);e.preventDefault();}});}else if(settings.on==='click'){$(source).on('click.zoom',function(e){if(clicked){return;}else{clicked=true;start(e);$(document).on(mousemove,zoom.move);$(document).one('click.zoom',function(){stop();clicked=false;$(document).off(mousemove,zoom.move);});return false;}});}else if(settings.on==='toggle'){$(source).on('click.zoom',function(e){if(clicked){stop();}else{start(e);}
clicked=!clicked;});}else if(settings.on==='mouseover'){zoom.init();$(source).on('mouseenter.zoom',start).on('mouseleave.zoom',stop).on(mousemove,zoom.move);}
if(settings.touch){$(source).on('touchstart.zoom',function(e){e.preventDefault();if(touched){touched=false;stop();}else{touched=true;start(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0]);}}).on('touchmove.zoom',function(e){e.preventDefault();zoom.move(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0]);});}
if($.isFunction(settings.callback)){settings.callback.call(img);}};img.src=settings.url;$(source).one('zoom.destroy',function(){$(source).off(".zoom");$img.remove();});});};$.fn.zoom.defaults=defaults;}(window.jQuery));


/*===============================
/template/media/j2store/js/j2store.js
================================================================================*/;
if(typeof(j2store)=='undefined'){var j2store={};}
if(typeof(j2store.jQuery)=='undefined'){j2store.jQuery=jQuery.noConflict();}
if(typeof(j2storeURL)=='undefined'){var j2storeURL='';}
(function($){$(document).on('click','.j2store_add_to_cart_button',function(e){var $thisbutton=$(this);if(!$thisbutton.attr('data-product_id'))
return true;$thisbutton.removeClass('added');$thisbutton.addClass('loading');var data={option:'com_j2store',view:'carts',task:'addItem',ajax:'1',};$.each($thisbutton.data(),function(key,value){data[key]=value;});$('body').trigger('adding_to_cart',[$thisbutton,data]);var href=$thisbutton.attr('href');if(typeof href!=='undefined'||href==''){href='index.php';}
$.post(href,data,function(response){if(!response)
return;var this_page=window.location.toString();this_page=this_page.replace('add-to-cart','added-to-cart');if(response['error']){window.location=response.product_url;return;}
if(response['redirect']){window.location.href=response['redirect'];return;}
if(response['success']){$thisbutton.removeClass('loading');$thisbutton.addClass('added');$thisbutton.parent().find('.cart-action-complete').show();$('body').trigger('after_adding_to_cart',[$thisbutton,response,'link']);}},'json');return false;return true;});})(j2store.jQuery);(function($){$(document).ready(function(){$('.j2store-addtocart-form').each(function(){$(this).submit(function(e){e.preventDefault();var form=$(this);form.find('input[name=\'ajax\']').val(1);var values=form.find('input[type=\'text\'], input[type=\'number\'], input[type=\'hidden\'], input[type=\'radio\']:checked, input[type=\'checkbox\']:checked, select, textarea');form.find('input[type=\'submit\']').val(form.find('input[type=\'submit\']').data('cart-action-always'));var href=form.attr('action');if(typeof href=='undefined'||href==''){var href='index.php';}
$('body').trigger('adding_to_cart',[form,values]);var j2Ajax=$.ajax({url:href,type:'post',data:values,dataType:'json'});j2Ajax.done(function(json){form.find('.j2success, .j2warning, .j2attention, .j2information, .j2error').remove();$('.j2store-notification').hide();if(json['error']){form.find('input[type=\'submit\']').val(form.find('input[type=\'submit\']').data('cart-action-done'));if(json['error']['option']){for(i in json['error']['option']){form.find('#option-'+i).after('<span class="j2error">'+json['error']['option'][i]+'</span>');}}
if(json['error']['stock']){form.find('.j2store-notifications').html('<span class="j2error">'+json['error']['stock']+'</span>');}
if(json['error']['general']){form.find('.j2store-notifications').html('<span class="j2error">'+json['error']['general']+'</span>');}
if(json['error']['product']){form.find('.j2store-notifications').after('<span class="j2error">'+json['error']['product']+'</span>');}}
if(json['redirect']){window.location.href=json['redirect'];}
if(json['success']){setTimeout(function(){form.find('input[type=\'submit\']').val(form.find('input[type=\'submit\']').data('cart-action-done'));form.find('.cart-action-complete').fadeIn('slow');},form.find('input[type=\'submit\']').data('cart-action-timeout'));$('body').trigger('after_adding_to_cart',[form,json,'normal']);}}).fail(function(jqXHR,textStatus,errorThrown){form.find('input[type=\'submit\']').val(form.find('input[type=\'submit\']').data('cart-action-done'));console.log(textStatus+errorThrown);}).always(function(jqXHR,textStatus,errorThrown){});});});});})(j2store.jQuery);(function($){$(document).ready(function(){if($('#j2store_shipping_make_same').length>0){if($('#j2store_shipping_make_same').is(':checked')){$('#j2store_shipping_section').css({'visible':'visible','display':'none'});$('#j2store_shipping_section').children(".input-label").removeClass("required");$('#j2store_shipping_section').children(".input-text").removeClass("required");}}});})(j2store.jQuery);function doMiniCart(){(function($){var murl=j2storeURL
+'index.php?option=com_j2store&view=carts&task=ajaxmini';$.ajax({url:murl,type:'get',cache:false,contentType:'application/json; charset=utf-8',dataType:'json',success:function(json){if(json!=null&&json['response']){$.each(json['response'],function(key,value){if($('.j2store_cart_module_'+key).length){$('.j2store_cart_module_'+key).each(function(){$(this).html(value);});}});}}});})(j2store.jQuery);}
function j2storeDoTask(url,container,form,msg,formdata){(function($){container='#'+container;if(url&&form){var str=$(form).serialize();$.ajax({url:url,type:'get',cache:false,contentType:'application/json; charset=utf-8',data:formdata,dataType:'json',beforeSend:function(){$(container).before('<span class="wait"><img src="'+j2storeURL+'media/j2store/images/loader.gif" alt="" /></span>');},complete:function(){$('.wait').remove();},success:function(json){if($(container).length>0){$(container).html(json.msg);}
return true;}});}else if(url&&!form){$.ajax({url:url,type:'get',cache:false,contentType:'application/json; charset=utf-8',data:formdata,dataType:'json',beforeSend:function(){$(container).before('<span class="wait"><img src="'+j2storeURL+'media/j2store/images/loader.gif" alt="" /></span>');},complete:function(){$('.wait').remove();},success:function(json){if($(container).length>0){$(container).html(json.msg);}}});}})(j2store.jQuery);}
function j2storeSetShippingRate(name,price,tax,extra,code,combined,ship_element,css_id)
{(function($){$("input[type='hidden'][name='shipping_name']").val(name);$("input[type='hidden'][name='shipping_code']").val(code);$("input[type='hidden'][name='shipping_price']").val(price);$("input[type='hidden'][name='shipping_tax']").val(tax);$("input[type='hidden'][name='shipping_extra']").val(extra);var ship_name=name.replace(' ','');$('#onCheckoutShipping_wrapper .shipping_element').hide();$('#onCheckoutShipping_wrapper .'+css_id+'_select_text').show();})(j2store.jQuery);}
function doAjaxFilter(pov_id,product_id,po_id,id){(function($){if(pov_id==''||$('#ChildOptions'+po_id).length!=0){$('#ChildOptions'+po_id).html('');}
var form=$(id).closest('form');if(form.data('product_id')!=product_id)return;var values=form.serializeArray();values.pop({name:"task",value:'addItem'});values.pop({name:"view",value:'carts'});values.push({name:"product_id",value:product_id});var arrayClean=function(thisArray){"use strict";$.each(thisArray,function(index,item){if(item.name=='task'||item.name=='view'){delete values[index];}});}
arrayClean(values);if(form.data('product_type')=='advancedvariable'){var csv=[];form.find('input[type=\'radio\']:checked, select').each(function(index,el){if(el.value){if($(el).data('is-variant')){csv.push(el.value);}}});var processed_csv=[];processed_csv=csv.sort(function(a,b){return a-b});var $selected_variant=processed_csv.join();var $variants=form.data('product_variants');var $variant_id=get_matching_variant($variants,$selected_variant);form.find('input[name=\'variant_id\']').val($variant_id);values.push({name:"variant_id",value:$variant_id});}
values=values.filter(function(element){return element!==undefined;});values=jQuery.param(values);$('body').trigger('before_doAjaxFilter',[form,values]);$.ajax({url:j2storeURL+'index.php?option=com_j2store&view=products&task=update&po_id='
+po_id
+'&pov_id='
+pov_id
+'&product_id='
+product_id,type:'get',cache:false,data:values,dataType:'json',beforeSend:function(){$('#option-'+po_id).append('<span class="wait">&nbsp;<img src="'+j2storeURL+'/media/j2store/images/loader.gif" alt="" /></span>');},complete:function(){$('.wait').remove();},success:function(response){var $product=$('.product-'+product_id);if($product.length&&typeof response.error=='undefined'){if(response.sku){$product.find('.sku').html(response.sku);}
if(response.pricing.base_price){$product.find('.base-price').html(response.pricing.base_price);}
if(response.pricing.price){$product.find('.sale-price').html(response.pricing.price);}
if(response.afterDisplayPrice){$product.find('.afterDisplayPrice').html(response.afterDisplayPrice);}
if(response.quantity){$product.find('input[name="product_qty"]').val(response.quantity);if(form.data('product_type')=='variable'||form.data('product_type')=='advancedvariable'){$product.find('input[name="product_qty"]').attr({value:response.quantity,min:response.quantity});}}
if(response.dimensions){$product.find('.product-dimensions').html(response.dimensions);}
if(response.weight){$product.find('.product-weight').html(response.weight);}
if(typeof response.stock_status!='undefined'){if(response.availability==1){$product.find('.product-stock-container').html('<span class="instock">'+response.stock_status+'</span>');}else{$product.find('.product-stock-container').html('<span class="outofstock">'+response.stock_status+'</span>');}}
if(response.optionhtml){$product.find(' #ChildOptions'+po_id).html(response.optionhtml);}}
$('body').trigger('after_doAjaxFilter_response',[$product,response]);},error:function(xhr,ajaxOptions,thrownError){console.log(thrownError+"\r\n"+xhr.statusText
+"\r\n"+xhr.responseText);}});})(j2store.jQuery);}
function get_matching_variant(variants,selected){for(var i in variants){if(variants[i]==selected)return i;}}
function doAjaxPrice(product_id,id){(function($){var form=$(id).closest('form');if(form.data('product_id')!=product_id)return;var values=form.serializeArray();values.pop({name:"task",value:'addItem'});values.pop({name:"view",value:'carts'});values.push({name:"product_id",value:product_id});var arrayClean=function(thisArray){"use strict";$.each(thisArray,function(index,item){if(item.name=='task'||item.name=='view'){delete values[index];}});}
arrayClean(values);if(form.data('product_type')=='variable'||form.data('product_type')=='advancedvariable'||form.data('product_type')=='variablesubscriptionproduct'){var csv=[];if(form.data('product_type')=='advancedvariable'){form.find('input[type=\'radio\']:checked, select').each(function(index,el){if(el.value){if($(el).data('is-variant')){csv.push(el.value);}}});}else{form.find('input[type=\'radio\']:checked, select').each(function(index,el){csv.push(el.value);});}
var processed_csv=[];processed_csv=csv.sort(function(a,b){return a-b});var $selected_variant=processed_csv.join();var $variants=form.data('product_variants');var $variant_id=get_matching_variant($variants,$selected_variant);form.find('input[name=\'variant_id\']').val($variant_id);values.push({name:"variant_id",value:$variant_id});}
values=values.filter(function(element){return element!==undefined;});$('body').trigger('before_doAjaxPrice',[form,values]);$.ajax({url:j2storeURL+'index.php?option=com_j2store&view=product&task=update',type:'get',data:values,dataType:'json',success:function(response){var $product=$('.product-'+product_id);if($product.length&&typeof response.error=='undefined'){if(response.sku){$product.find('.sku').html(response.sku);}
if(response.pricing.base_price){$product.find('.base-price').html(response.pricing.base_price);}
if(response.pricing.price){$product.find('.sale-price').html(response.pricing.price);}
if(response.afterDisplayPrice){$product.find('.afterDisplayPrice').html(response.afterDisplayPrice);}
if(response.quantity){$product.find('input[name="product_qty"]').val(response.quantity);if(form.data('product_type')=='variable'||form.data('product_type')=='advancedvariable'||form.data('product_type')=='variablesubscriptionproduct'){$product.find('input[name="product_qty"]').attr({value:response.quantity,min:response.quantity});}}
if(response.main_image){$product.find('.j2store-product-thumb-image-'+product_id).attr("src",response.main_image);j2store.jQuery('.j2store-product-thumb-image-'+product_id).attr("src",response.main_image);j2store.jQuery('.j2store-product-main-image-'+product_id).attr("src",response.main_image);$product.find('.j2store-mainimage .j2store-img-responsive').attr("src",response.main_image);$product.find('.j2store-product-additional-images .additional-mainimage').attr("src",response.main_image);}
if(typeof response.stock_status!='undefined'){if(response.availability==1){$product.find('.product-stock-container').html('<span class="instock">'+response.stock_status+'</span>');}else{$product.find('.product-stock-container').html('<span class="outofstock">'+response.stock_status+'</span>');}}
if(response.dimensions){$product.find('.product-dimensions').html(response.dimensions);}
if(response.weight){$product.find('.product-weight').html(response.weight);}
$('body').trigger('after_doAjaxFilter',[$product,response]);$('body').trigger('after_doAjaxPrice',[$product,response]);}},error:function(xhr,ajaxOptions,thrownError){console.log(thrownError+"\r\n"+xhr.statusText+"\r\n"
+xhr.responseText);}});})(j2store.jQuery);}
function setMainPreview(addimagId,product_id,imageZoom,zoom_type){zoom_type=zoom_type||"outer";var src="";(function($){src=$("#"+addimagId).attr('src');$("#j2store-item-main-image-"+product_id+" img").attr('src','');$("#j2store-item-main-image-"+product_id+" img").attr('src',src);if(imageZoom){if(zoom_type=='outer'){$('#j2store-item-main-image-'+product_id).elevateZoom({cursor:"crosshair",zoomWindowFadeIn:500,zoomWindowFadeOut:750,zoomWindowWidth:450,zoomWindowHeight:300});}else if(zoom_type=='inner'){$("#j2store-item-main-image-"+product_id+" .zoomImg").attr('src',src);$("#j2store-item-main-image-"+product_id+" img").attr('src',src);$('#j2store-item-main-image-'+product_id).elevateZoom({cursor:"crosshair",zoomWindowFadeIn:500,zoomWindowFadeOut:750,zoomWindowWidth:450,zoomWindowHeight:300});}}})(j2store.jQuery);}
function removeAdditionalImage(product_id,main_image,imageZoom,zoom_type){zoom_type=zoom_type||"outer";(function($){$("#j2store-item-main-image-"+product_id+" img").attr('src',main_image);setMainPreview('j2store-item-main-image-'+product_id,product_id,imageZoom,zoom_type);})(j2store.jQuery);}
function getJ2storeFiltersSubmit(){jQuery("#j2store-product-loading").show();jQuery("#productsideFilters").submit();}
function resetJ2storeBrandFilter(inputid){if(inputid){jQuery("#productsideFilters").find("#"+inputid).prop('checked',false);}else{jQuery(".j2store-brand-checkboxes").each(function(){this.checked=false;});}}
function resetJ2storeVendorFilter(inputid){if(inputid){jQuery("#productsideFilters").find("#"+inputid).prop('checked',false);}else{jQuery(".j2store-vendor-checkboxes").each(function(){this.checked=false;});}}
function resetJ2storeProductFilter(productfilter_class,inputid){if(productfilter_class){jQuery("."+productfilter_class).each(function(){this.checked=false;});}else if(inputid){jQuery("#productsideFilters").find("#"+inputid).prop('checked',false);}}
function getPriceFilterToggle(){(function($){$('#price-filter-icon-plus').toggle();$('#price-filter-icon-minus').toggle();$('#j2store-slider-range').toggle();$('#j2store-slider-range-box').toggle();})(j2store.jQuery);}
function getCategoryFilterToggle(){(function($){$('#cat-filter-icon-plus').toggle();$('#cat-filter-icon-minus').toggle();$('#j2store_category').toggle();})(j2store.jQuery);}
function getBrandFilterToggle(){(function($){$('#brand-filter-icon-plus').toggle();$('#brand-filter-icon-minus').toggle();$('#j2store-brand-filter-container').toggle();})(j2store.jQuery);}
function getVendorFilterToggle(){(function($){$('#vendor-filter-icon-plus').toggle();$('#vendor-filter-icon-minus').toggle();$('#j2store-vendor-filter-container').toggle();})(j2store.jQuery);}
function getPFFilterToggle(id){(function($){$('#pf-filter-icon-plus-'+id).toggle();$('#pf-filter-icon-minus-'+id).toggle();$('#j2store-pf-filter-'+id).toggle();})(j2store.jQuery);}


/*===============================
/template/media/system/js/core.js
================================================================================*/;
Joomla=window.Joomla||{},Joomla.editors=Joomla.editors||{},Joomla.editors.instances=Joomla.editors.instances||{},function(e,t){"use strict";e.submitform=function(e,o,n){o||(o=t.getElementById("adminForm")),e&&(o.task.value=e),o.noValidate=!n,o.setAttribute("novalidate",!n);var r=t.createElement("input");r.style.display="none",r.type="submit",o.appendChild(r).click(),o.removeChild(r)},e.submitbutton=function(t){e.submitform(t)},e.JText={strings:{},_:function(t,o){var n=e.getOptions("joomla.jtext");return n&&(this.load(n),e.loadOptions({"joomla.jtext":null})),o=void 0===o?"":o,t=t.toUpperCase(),void 0!==this.strings[t]?this.strings[t]:o},load:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.strings[t.toUpperCase()]=e[t]);return this}},e.optionsStorage=e.optionsStorage||null,e.getOptions=function(t,o){return e.optionsStorage||e.loadOptions(),void 0!==e.optionsStorage[t]?e.optionsStorage[t]:o},e.loadOptions=function(o){if(o)if(e.optionsStorage)for(var n in o)o.hasOwnProperty(n)&&(e.optionsStorage[n]=o[n]);else e.optionsStorage=o;else for(var r,a,i,s=t.querySelectorAll(".joomla-script-options.new"),l=0,d=s.length;d>l;l++)a=s[l],r=a.text||a.textContent,i=JSON.parse(r),i?e.loadOptions(i):null,a.className=a.className.replace(" new"," loaded")},e.replaceTokens=function(e){if(/^[0-9A-F]{32}$/i.test(e)){var o,n,r,a=t.getElementsByTagName("input");for(o=0,r=a.length;r>o;o++)n=a[o],"hidden"==n.type&&"1"==n.value&&32==n.name.length&&(n.name=e)}},e.isEmail=function(e){var t=/^[\w.!#$%&‚Äô*+\/=?^`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]{2,})+$/i;return t.test(e)},e.checkAll=function(e,t){if(!e.form)return!1;t=t?t:"cb";var o,n,r,a=0;for(o=0,r=e.form.elements.length;r>o;o++)n=e.form.elements[o],n.type==e.type&&0===n.id.indexOf(t)&&(n.checked=e.checked,a+=n.checked?1:0);return e.form.boxchecked&&(e.form.boxchecked.value=a),!0},e.renderMessages=function(o){e.removeMessages();var n,r,a,i,s,l,d,c,u=t.getElementById("system-message-container");for(n in o)if(o.hasOwnProperty(n)){r=o[n],a=t.createElement("div"),c="notice"==n?"alert-info":"alert-"+n,c="message"==n?"alert-success":c,a.className="alert "+c;var m=t.createElement("button");for(m.setAttribute("type","button"),m.setAttribute("data-dismiss","alert"),m.className="close",m.innerHTML="×",a.appendChild(m),i=e.JText._(n),"undefined"!=typeof i&&(s=t.createElement("h4"),s.className="alert-heading",s.innerHTML=e.JText._(n),a.appendChild(s)),l=r.length-1;l>=0;l--)d=t.createElement("div"),d.innerHTML=r[l],a.appendChild(d);u.appendChild(a)}},e.removeMessages=function(){for(var e=t.getElementById("system-message-container");e.firstChild;)e.removeChild(e.firstChild);e.style.display="none",e.offsetHeight,e.style.display=""},e.ajaxErrorsMessages=function(t,o){var n={};if("parsererror"===o){for(var r=t.responseText.trim(),a=[],i=r.length-1;i>=0;i--)a.unshift(["&#",r[i].charCodeAt(),";"].join(""));r=a.join(""),n.error=[e.JText._("JLIB_JS_AJAX_ERROR_PARSE").replace("%s",r)]}else"nocontent"===o?n.error=[e.JText._("JLIB_JS_AJAX_ERROR_NO_CONTENT")]:"timeout"===o?n.error=[e.JText._("JLIB_JS_AJAX_ERROR_TIMEOUT")]:"abort"===o?n.error=[e.JText._("JLIB_JS_AJAX_ERROR_CONNECTION_ABORT")]:t.responseJSON&&t.responseJSON.message?n.error=[e.JText._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s",t.status)+" <em>"+t.responseJSON.message+"</em>"]:t.statusText?n.error=[e.JText._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s",t.status)+" <em>"+t.statusText+"</em>"]:n.error=[e.JText._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s",t.status)];return n},e.isChecked=function(e,o){if("undefined"==typeof o&&(o=t.getElementById("adminForm")),o.boxchecked.value=e?parseInt(o.boxchecked.value)+1:parseInt(o.boxchecked.value)-1,o.elements["checkall-toggle"]){var n,r,a,i=!0;for(n=0,a=o.elements.length;a>n;n++)if(r=o.elements[n],"checkbox"==r.type&&"checkall-toggle"!=r.name&&!r.checked){i=!1;break}o.elements["checkall-toggle"].checked=i}},e.popupWindow=function(e,t,o,n,r){var a=(screen.width-o)/2,i=(screen.height-n)/2,s="height="+n+",width="+o+",top="+i+",left="+a+",scrollbars="+r+",resizable";window.open(e,t,s).window.focus()},e.tableOrdering=function(o,n,r,a){"undefined"==typeof a&&(a=t.getElementById("adminForm")),a.filter_order.value=o,a.filter_order_Dir.value=n,e.submitform(r,a)},window.writeDynaList=function(e,o,n,r,a,i){var s,l,d,c="<select "+e+">",u=n==r,m=0;for(l in o)o.hasOwnProperty(l)&&(d=o[l],d[0]==n&&(s="",(u&&a==d[1]||!u&&0===m)&&(s='selected="selected"'),c+='<option value="'+d[1]+'" '+s+">"+d[2]+"</option>",m++));c+="</select>",i?i.innerHTML=c:t.writeln(c)},window.changeDynaList=function(e,o,n,r,a){for(var i,s,l,d,c=t.adminForm[e],u=n==r;c.firstChild;)c.removeChild(c.firstChild);i=0;for(s in o)o.hasOwnProperty(s)&&(l=o[s],l[0]==n&&(d=new Option,d.value=l[1],d.text=l[2],(u&&a==d.value||!u&&0===i)&&(d.selected=!0),c.options[i++]=d));c.length=i},window.radioGetCheckedValue=function(e){if(!e)return"";var t,o=e.length;if(void 0===o)return e.checked?e.value:"";for(t=0;o>t;t++)if(e[t].checked)return e[t].value;return""},window.getSelectedValue=function(e,o){var n=t[e][o],r=n.selectedIndex;return null!==r&&r>-1?n.options[r].value:null},window.listItemTask=function(e,o){var n,r=t.adminForm,a=0,i=r[e];if(!i)return!1;for(;;){if(n=r["cb"+a],!n)break;n.checked=!1,a++}return i.checked=!0,r.boxchecked.value=1,window.submitform(o),!1},window.submitbutton=function(t){e.submitbutton(t)},window.submitform=function(t){e.submitform(t)},window.saveorder=function(e,t){window.checkAll_button(e,t)},window.checkAll_button=function(o,n){n=n?n:"saveorder";var r,a;for(r=0;o>=r;r++){if(a=t.adminForm["cb"+r],!a)return void alert("You cannot change the order of items, as an item in the list is `Checked Out`");a.checked=!0}e.submitform(n)},e.loadingLayer=function(o,n){if(o=o||"show",n=n||t.body,"load"==o){var r=t.getElementsByTagName("body")[0].getAttribute("data-basepath")||"",a=t.createElement("div");a.id="loading-logo",a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.opacity="0.8",a.style.filter="alpha(opacity=80)",a.style.overflow="hidden",a.style["z-index"]="10000",a.style.display="none",a.style["background-color"]="#fff",a.style["background-image"]='url("'+r+'/media/jui/images/ajax-loader.gif")',a.style["background-position"]="center",a.style["background-repeat"]="no-repeat",a.style["background-attachment"]="fixed",n.appendChild(a)}else t.getElementById("loading-logo")||e.loadingLayer("load",n),t.getElementById("loading-logo").style.display="show"==o?"block":"none";return t.getElementById("loading-logo")},e.extend=function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);return e},e.request=function(t){t=e.extend({url:"",method:"GET",data:null,perform:!0},t),t.method=t.data?"POST":t.method;try{var o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");if(o.open(t.method,t.url,!0),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("X-Ajax-Engine","Joomla!"),"POST"!==t.method||t.headers&&t.headers["Content-Type"]||o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.headers)for(var n in t.headers)t.headers.hasOwnProperty(n)&&o.setRequestHeader(n,t.headers[n]);if(o.onreadystatechange=function(){4===o.readyState&&(200===o.status?t.onSuccess&&t.onSuccess.call(window,o.responseText,o):t.onError&&t.onError.call(window,o))},t.perform){if(t.onBefore&&t.onBefore.call(window,o)===!1)return o;o.send(t.data)}}catch(r){return window.console?console.log(r):null,!1}return o}}(Joomla,document);


/*===============================
/template/media/j2store/js/filter.js
================================================================================*/;
jQuery(function($){var filters={getAbsolutePath:function(url,donotSet,options){var loc=window.location;var pathName=loc.pathname.substring(0,loc.pathname.lastIndexOf('/')+1);if(loc.href.indexOf("view")>-1&&loc.href.indexOf("option")>-1&&loc.href.indexOf('Itemid')>-1){var origin_slash=loc.origin.substring(loc.origin.length-1,loc.origin.length);var origin=loc.origin;if(origin_slash=='/'){origin=loc.origin.substring(1,loc.origin.length-1);}
var pathName_slash=pathName.substring(0,1);if(pathName_slash!='/'){pathName='/'+pathName;}
var absoulte_url=origin+pathName;url_link='';if($(options.form_id).length>0&&$(options.form_id).attr('data-link')){if($(options.form_id).data('link')){var form_id_slash=$(options.form_id).data('link').substring(0,1);if(form_id_slash=='/'){url_link=$(options.form_id).data('link').substring(1,$(options.form_id).data('link').length);}}}else if($(options.topFilter_id).length>0&&$(options.topFilter_id).attr('data-link')){var topFilter_id_slash=$(options.topFilter_id).data('link').substring(0,1);if(topFilter_id_slash=='/'){url_link=$(options.topFilter_id).data('link').substring(1,$(options.topFilter_id).data('link').length);}}else if($('.j2store-product-list').length>0&&$('.j2store-product-list').attr('data-link')){var product_slash=$('.j2store-product-list').data('link').substring(0,1);if(product_slash=='/'){url_link=$('.j2store-product-list').data('link').substring(1,$('.j2store-product-list').data('link').length);}}else if(j2store_product_base_link!==''){var productbase_slash=j2store_product_base_link.substring(0,1);if(productbase_slash=='/'){url_link=j2store_product_base_link.substring(1,j2store_product_base_link.length);}}
absoulte_url=absoulte_url+url_link;var absoulte_url_slash=absoulte_url.substring(absoulte_url.length-1,absoulte_url.length);if(absoulte_url_slash=='/'){url_slash=url.substring(0,1);if(url_slash=='/'){url=url.substring(1,url.length);}}
var item_id=loc.href.substring(loc.href.indexOf('Itemid'));var option_url='&option=com_j2store&view=products';if(item_id){option_url=option_url+"&"+item_id;}
var index_file=loc.href.indexOf("index.php");if(index_file){absoulte_url=absoulte_url+"index.php";}
url_check=url.indexOf("?")===-1?"?":"&";if(url_check=='?'){url_amp=url.substring(0,1);if(url_amp=='&'){url=url.substring(1,url.length);}}
url=url+option_url;url=url_check+url;document.location.href=absoulte_url+url;}else{var absoulte_url=loc.href.substring(0,loc.href.length-((loc.pathname+loc.search+loc.hash).length-pathName.length));url=url.substr(1);var site_url=absoulte_url.indexOf("?")===-1?"?":"&";if(donotSet==true){return site_url+url;}else{document.location.href=site_url+url;}}},getQueryParam:function(param){var result=window.location.search.match(new RegExp("(\\?|&)"
+param+"(\\[\\])?=([^&]*)"));return result?result[3]:false;},removeParameter:function(url,parameter,onlyselected){var urlparts=url.split('?');if(urlparts.length>=2){var urlBase=urlparts.shift();var queryString=urlparts.join("?");var prefix=parameter+'=';var pars=queryString.split(/[&;]/g);for(var i=pars.length;i-->0;)
if(pars[i].lastIndexOf(prefix,0)!==-1)
pars.splice(i,1);url=urlBase+'?'+pars.join('&');}
return url;}}
$.J2StoreFilters=function(options){this.init(options);}
$.J2StoreFilters.prototype={init:function(options){if(options.form_id==''){options.form_id='#productsideFilters';}
if(options.topFilter_id==''){options.topFilter_id='#productFilters';}
if((options.form_id).length!=0){this.sideFilter(options);this.categoryFilter(options);this.priceSlider(options);$(options.form_id).find('.manufacturer-filters a').on('click',function(){document.getElementById('j2store-product-loading').style.display='block';if(filters.getQueryParam("manufacturer_ids")){location.href=filters.removeParameter(window.location.href,'manufacturer_ids[]');}else{$(options.form_id).find(".j2store-brand-checkboxes").each(function(){this.checked=false;});}
document.getElementById('j2store-product-loading').style.display='none';});$(options.form_id).find('.j2store-product-vendor-filters a').on('click',function(){document.getElementById('j2store-product-loading').style.display='block';if(filters.getQueryParam("vendor_ids")){location.href=filters.removeParameter(window.location.href,'vendor_ids[]');}
document.getElementById('j2store-product-loading').style.display='none';});$(options.form_id).find('.productfilters-list a').on('click',function(){document.getElementById('j2store-product-loading').style.display='block';if(filters.getQueryParam("productfilter_ids")){jQuery("."+$(this).data('class')).each(function(){this.checked=false;});var url='';$(options.form_id).find('input[type="checkbox"]').each(function(){if(this.checked){url+='&'+this.name+'='+this.value;}});if($(options.form_id).find("li.active").length>0){var active_li=$(options.form_id).find("li.active").find('a');url+='&'+$(active_li).data('key')+'='+$(active_li).data('value');}
if($(options.form_id+" #j2store-slider-range").length!=0){url+='&pricefrom='+$(options.form_id).find("#min_price_input").attr('value');url+='&priceto='+$(options.form_id).find("#max_price_input").attr('value');}
filters.getAbsolutePath(url,false,options);}
document.getElementById('j2store-product-loading').style.display='none';});}
this.topFilter(options);},categoryFilter:function(options){$(options.form_id).find('.j2product-categories').on('click',function(e){document.getElementById('j2store-product-loading').style.display='block';var url='';if($('.j2product-categories > a').data('key')){url+='&'+$(this).find('a').data('key')+'='+$(this).find('a').data('value');}
if($(options.form_id).find("li.active").length!=0){$(options.form_id).find('input[type="checkbox"]:checked').each(function(index,el){url+='&'+$(el).attr('name')+'='+$(el).attr('value');});}
if($(options.topFilter_id).length!=0){if($(options.topFilter_id).find('input[name=search]').length!=0){var search=$(options.topFilter_id).find('input[name=search]');if(search!=''){url+='&'+$(search).attr('name')+'='+$(search).attr('value');}}
if($(options.topFilter_id).find('select[name=sortby]').length!=0){var sortby=$(options.topFilter_id).find('select[name=sortby] option:selected');if(sortby){url+='&'+$(options.topFilter_id).find('select[name=sortby]').attr('name')+'='+$(options.topFilter_id).find('select[name=sortby]').attr('value');}}}
if($(options.form_id+" #j2store-slider-range").length!=0){url+='&pricefrom='+$(options.form_id).find("#min_price_input").attr('value');url+='&priceto='+$(options.form_id).find("#max_price_input").attr('value');}
filters.getAbsolutePath(url,false,options);});},sideFilter:function(options){$(options.form_id).find('input[type="checkbox"]').on('change',function(el){document.getElementById('j2store-product-loading').style.display='block';var url='';if((options.form_id).length!=0){$(options.form_id).find('input[type="checkbox"]').each(function(){if(this.checked){url+='&'+this.name+'='+this.value;}});if($(options.form_id).find("li.active").length!=0){var active_li=$(options.form_id).find("li.active").find('a');url+='&'+$(active_li).data('key')+'='+$(active_li).data('value');}
if($(options.form_id).find("#j2store-slider-range").length!=0){url+='&pricefrom='+$(options.form_id).find("#min_price_input").attr('value');url+='&priceto='+$(options.form_id).find("#max_price_input").attr('value');}}
if($(options.topFilter_id).length!=0){if($(options.topFilter_id).find('input[name=search]').length!=0){var search=$(options.topFilter_id).find('input[name=search]');if(search!=''){url+='&'+$(search).attr('name')+'='+$(search).attr('value');}}
if($(options.topFilter_id).find('select[name=sortby]').length!=0){var sortby=$(options.topFilter_id).find('select[name=sortby] option:selected');if(sortby){url+='&'+$(options.topFilter_id).find('select[name=sortby]').attr('name')+'='+$(options.topFilter_id).find('select[name=sortby]').attr('value');}}}
filters.getAbsolutePath(url,false,options);});},topFilter:function(options){if($(options.topFilter_id).length!=0){var url='';$(options.topFilter_id).submit(function(e){e.preventDefault();if($(options.form_id).find("li.active").length>0){var active_li=$(options.form_id).find("li.active").find('a');url+='&'+$(active_li).data('key')+'='+$(active_li).data('value');}
if($(options.form_id).find("li.active").length!=0){$(options.form_id).find('input[type="checkbox"]:checked').each(function(index,el){url+='&'+$(el).attr('name')+'='+$(el).attr('value');});}
if($(options.topFilter_id).find('input[name=search]').length!=0){var search=$(options.topFilter_id).find('input[name=search]');if(search!=''){url+='&'+$(search).attr('name')+'='+$(search).attr('value');}}
if($(options.topFilter_id).find('select[name=sortby]').length!=0){var sortby=$(options.topFilter_id).find('select[name=sortby] option:selected');url+='&'+$(options.topFilter_id).find('select[name=sortby]').attr('name')+'='+$(options.topFilter_id).find('select[name=sortby]').attr('value');}
if($(options.form_id).find("#j2store-slider-range").length!=0){url+='&pricefrom='+$(options.form_id).find("#min_price_input").attr('value');url+='&priceto='+$(options.form_id).find("#max_price_input").attr('value');}
filters.getAbsolutePath(url,false,options);});}},priceSlider:function(options){$(options.form_id).find("#j2store-slider-range").slider({slide:function(event,ui){document.getElementById('j2store-product-loading').style.display='block';var url='';if((options.form_id).length!=0){if($(options.form_id).find("li.active").length>0){var active_li=$(options.form_id).find("li.active").find('a');url+='&'+$(active_li).data('key')+'='+$(active_li).data('value');}
if($(options.form_id).find('input[type="checkbox"]:checked').length!=0){$(options.form_id).find('input[type="checkbox"]').each(function(){if(this.checked){url+='&'+this.name+'='+this.value;}});}}
if($(options.topFilter_id).length!=0){var search=$(options.topFilter_id).find('input[name=search]').length;if(search>0){url+='&'+$(options.topFilter_id).find('input[name=search]').attr('name')+'='+$(options.topFilter_id).find('input[name=search]').attr('value');}
var sortby=$(options.topFilter_id).find('select[name=sortby] option:selected');if($(options.topFilter_id).find('select[name=sortby]').length>0){url+='&'+$(options.topFilter_id).find('select[name=sortby]').attr('name')+'='+$(options.topFilter_id).find('select[name=sortby]').attr('value');}}
if($(options.form_id).find("#j2store-slider-range").length!=0){url+='&pricefrom='+ui.values[0];url+='&priceto='+ui.values[1];$(options.form_id).find("#min_price").html(ui.values[0]);$(options.form_id).find("#max_price").html(ui.values[1]);}
filters.getAbsolutePath(url,false,options);}});},};var myClassObj=new $.J2StoreFilters({'form_id':'#productsideFilters','topFilter_id':'#productFilters'});});


/*===============================
/template/plugins/system/t3/base-bs3/js/jquery.tap.min.js
================================================================================*/;
!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);


/*===============================
/template/plugins/system/t3/base-bs3/js/off-canvas.js
================================================================================*/;
jQuery(document).ready(function($){function getAndroidVersion(ua){var ua=ua||navigator.userAgent;var match=ua.match(/Android\s([0-9\.]*)/);return match?match[1]:false;};if(parseInt(getAndroidVersion())==4){$('#t3-mainnav').addClass('t3-mainnav-android');}
var JA_isLoading=false;if(/MSIE\s([\d.]+)/.test(navigator.userAgent)?new Number(RegExp.$1)<10:false){$('html').addClass('old-ie');}else if(/constructor/i.test(window.HTMLElement)){$('html').addClass('safari');}
var $wrapper=$('body'),$inner=$('.t3-wrapper'),$toggles=$('.off-canvas-toggle'),$offcanvas=$('.t3-off-canvas'),$close=$('.t3-off-canvas .close'),$btn=null,$nav=null,direction='left',$fixed=null;if(!$wrapper.length)return;$toggles.each(function(){var $this=$(this),$nav=$($this.data('nav')),effect=$this.data('effect'),direction=($('html').attr('dir')=='rtl'&&$this.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$this.data('pos')=='right')?'right':'left';$nav.addClass(effect).addClass('off-canvas-'+direction);var inside_effect=['off-canvas-effect-3','off-canvas-effect-16','off-canvas-effect-7','off-canvas-effect-8','off-canvas-effect-14'];if($.inArray(effect,inside_effect)==-1){$inner.before($nav);}else{$inner.prepend($nav);}});$toggles.on('tap',function(e){stopBubble(e);if($wrapper.hasClass('off-canvas-open')){oc_hide(e);return false;}
$btn=$(this);$nav=$($btn.data('nav'));if(!$fixed)$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});else $fixed=$fixed.filter(function(){return $(this).css("position")==='fixed';}).add($inner.find('.affix'));$nav.addClass('off-canvas-current');direction=($('html').attr('dir')=='rtl'&&$btn.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$btn.data('pos')=='right')?'right':'left';$offcanvas.height($(window).height());var events=$(window).data('events');if(events&&events.scroll&&events.scroll.length){var handlers=[];for(var i=0;i<events.scroll.length;i++){handlers[i]=events.scroll[i].handler;}
$(window).data('scroll-events',handlers);$(window).off('scroll');}
var scrollTop=($('html').scrollTop())?$('html').scrollTop():$('body').scrollTop();$('html').addClass('noscroll').css('top',-scrollTop).data('top',scrollTop);$('.t3-off-canvas').css('top',scrollTop);$fixed.each(function(){var $this=$(this),$parent=$this.parent(),mtop=0;while(!$parent.is($inner)&&$parent.css("position")==='static')$parent=$parent.parent();mtop=-$parent.offset().top;$this.css({'position':'absolute','margin-top':mtop});});$wrapper.scrollTop(scrollTop);$wrapper[0].className=$.trim($wrapper[0].className.replace(/\s*off\-canvas\-effect\-\d+\s*/g,' '))+' '+$btn.data('effect')+' '+'off-canvas-'+direction;setTimeout(oc_show,50);return false;});var oc_show=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$wrapper.addClass('off-canvas-open');$inner.on('click',oc_hide);$close.on('click',oc_hide);$offcanvas.on('click',handleClick);if($.browser.msie&&$.browser.version<10){var p1={},p2={};p1['padding-'+direction]=$('.t3-off-canvas').width();p2[direction]=0;$inner.animate(p1);$nav.animate(p2);}
setTimeout(function(){JA_isLoading=false;},200);};var oc_hide=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$inner.off('click',oc_hide);$close.off('click',oc_hide);$offcanvas.off('click',handleClick);setTimeout(function(){$wrapper.removeClass('off-canvas-open');},100);setTimeout(function(){$wrapper.removeClass($btn.data('effect')).removeClass('off-canvas-'+direction);$wrapper.scrollTop(0);$('html').removeClass('noscroll').css('top','');$('html,body').scrollTop($('html').data('top'));$nav.removeClass('off-canvas-current');$fixed.css({'position':'','margin-top':''});if($(window).data('scroll-events')){var handlers=$(window).data('scroll-events');for(var i=0;i<handlers.length;i++){$(window).on('scroll',handlers[i]);}
$(window).data('scroll-events',null);}
JA_isLoading=false;},700);if($('html').hasClass('old-ie')){var p1={},p2={};p1['padding-'+direction]=0;p2[direction]=-$('.t3-off-canvas').width();$inner.animate(p1);$nav.animate(p2);}};var handleClick=function(e){if(e.target.tagName=='A'){var arr1=e.target.href.split('#'),arr2=location.href.split('#');if(arr1[0]==arr2[0]&&arr1.length>1&&arr1[1].length){oc_hide();setTimeout(function(){var anchor=$("a[name='"+arr1[1]+"']");if(!anchor.length)anchor=$('#'+arr1[1]);$('html,body').animate({scrollTop:anchor.offset().top},'slow');},500);}}
stopBubble(e);return true;}
var stopBubble=function(e){e.stopPropagation();}
$(window).load(function(){setTimeout(function(){$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});},100);});})


/*===============================
/template/plugins/system/t3/base-bs3/js/script.js
================================================================================*/;
!function($){if($.browser==undefined||$.browser.msie==undefined){$.browser={msie:false,version:0};if(match=navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)||navigator.userAgent.match(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/)){$.browser.msie=true;$.browser.version=match[1];}}
if($.browser.msie){$('html').addClass('ie'+Math.floor($.browser.version));}
$(document).ready(function(){if(!window.getComputedStyle){window.getComputedStyle=function(el,pseudo){this.el=el;this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;if(prop=='float')prop='styleFloat';if(re.test(prop)){prop=prop.replace(re,function(){return arguments[2].toUpperCase();});}
return el.currentStyle[prop]?el.currentStyle[prop]:null;}
return this;}}
var fromClass='body-data-holder',prop='content',$inspector=$('<div>').css('display','none').addClass(fromClass).appendTo($('body'));try{var computedStyle=window.getComputedStyle($inspector[0],':before');if(computedStyle){var attrs=computedStyle.getPropertyValue(prop);if(attrs){var matches=attrs.match(/([\da-z\-]+)/gi),data={};if(matches&&matches.length){for(var i=0;i<matches.length;i++){data[matches[i++]]=i<matches.length?matches[i]:null;}}
$('body').data(data);}}}finally{$inspector.remove();}});(function(){$.support.t3transform=(function(){var style=document.createElement('div').style,vendors=['t','webkitT','MozT','msT','OT'],transform,i=0,l=vendors.length;for(;i<l;i++){transform=vendors[i]+'ransform';if(transform in style){return transform;}}
return false;})();})();(function(){$('html').addClass('ontouchstart'in window?'touch':'no-touch');})();$(document).ready(function(){(function(){if(window.MooTools&&window.MooTools.More&&Element&&Element.implement){var mthide=Element.prototype.hide,mtshow=Element.prototype.show,mtslide=Element.prototype.slide;Element.implement({show:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtshow)&&mtshow.apply(this,args);},hide:function(){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mthide)&&mthide.apply(this,arguments);},slide:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtslide)&&mtslide.apply(this,args);}})}})();$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.DEFAULTS&&($.fn.tooltip.Constructor.DEFAULTS.html=true);$.fn.popover.Constructor&&$.fn.popover.Constructor.DEFAULTS&&($.fn.popover.Constructor.DEFAULTS.html=true);$.fn.tooltip.defaults&&($.fn.tooltip.defaults.html=true);$.fn.popover.defaults&&($.fn.popover.defaults.html=true);(function(){if(window.jomsQuery&&jomsQuery.fn.collapse){$('[data-toggle="collapse"]').on('click',function(e){$($(this).attr('data-target')).eq(0).collapse('toggle');e.stopPropagation();return false;});jomsQuery('html, body').off('touchstart.dropdown.data-api');}})();(function(){if($.fn.chosen&&$(document.documentElement).attr('dir')=='rtl'){$('select').addClass('chzn-rtl');}})();});$(window).load(function(){if(!$(document.documentElement).hasClass('off-canvas-ready')&&($('.navbar-collapse-fixed-top').length||$('.navbar-collapse-fixed-bottom').length)){var btn=$('.btn-navbar[data-toggle="collapse"]');if(!btn.length){return;}
if(btn.data('target')){var nav=$(btn.data('target'));if(!nav.length){return;}
var fixedtop=nav.closest('.navbar-collapse-fixed-top').length;btn.on('click',function(){var wheight=(window.innerHeight||$(window).height());if(!$.support.transition){nav.parent().css('height',!btn.hasClass('collapsed')&&btn.data('t3-clicked')?'':wheight);btn.data('t3-clicked',1);}
nav.addClass('animate').css('max-height',wheight-
(fixedtop?(parseFloat(nav.css('top'))||0):(parseFloat(nav.css('bottom'))||0)));});nav.on('shown hidden',function(){nav.removeClass('animate');});}}});}(jQuery);


/*===============================
/template/plugins/system/t3/base-bs3/js/menu.js
================================================================================*/;
;(function($){var T3Menu=function(elm,options){this.$menu=$(elm);if(!this.$menu.length){return;}
this.options=$.extend({},$.fn.t3menu.defaults,options);this.child_open=[];this.loaded=false;this.start();};T3Menu.prototype={constructor:T3Menu,start:function(){if(this.loaded){return;}
this.loaded=true;var self=this,options=this.options,$menu=this.$menu;this.$items=$menu.find('li');this.$items.each(function(idx,li){var $item=$(this),$child=$item.children('.dropdown-menu'),$link=$item.children('a'),item={$item:$item,child:$child.length,link:$link.length,clickable:!($link.length&&$child.length),mega:$item.hasClass('mega'),status:'close',timer:null,atimer:null};$item.data('t3menu.item',item);if($child.length&&!options.hover){$item.on('click',function(e){e.stopPropagation();if($item.hasClass('group')){return;}
if(item.status=='close'){e.preventDefault();self.show(item);}});}else{$item.on('click',function(e){if($(e.target).data('toggle'))return;e.stopPropagation()});}
$item.find('a > .caret').on('click tap',function(e){item.clickable=false;});if(options.hover){$item.on('mouseover',function(e){if($item.hasClass('group'))
return;var $target=$(e.target);if($target.data('show-processed'))
return;$target.data('show-processed',true);setTimeout(function(){$target.data('show-processed',false);},10);self.show(item);}).on('mouseleave',function(e){if($item.hasClass('group'))
return;var $target=$(e.target);if($target.data('hide-processed'))
return;$target.data('hide-processed',true);setTimeout(function(){$target.data('hide-processed',false);},10);self.hide(item,$target);});if($link.length&&$child.length){$link.on('click',function(e){if(item.clickable){e.stopPropagation();}
return item.clickable;});}}});$(document.body).on('tap hideall.t3menu',function(e){clearTimeout(self.timer);self.timer=setTimeout($.proxy(self.hide_alls,self),e.type=='tap'?500:self.options.hidedelay);});$menu.find('.mega-dropdown-menu').on('hideall.t3menu',function(e){e.stopPropagation();e.preventDefault();return false;});$menu.find('input, select, textarea, label').on('click tap',function(e){e.stopPropagation();});var $megatab=$menu.find('.mega-tab');if($megatab.length){$megatab.each(function(){var $tabul=$(this).find('>div>ul'),$tabItems=$tabul.children('.dropdown-submenu'),$tabs=$tabul.find('>li>.dropdown-menu'),tabheight=0,$parentItem=$(this).closest('li');$tabItems.data('mega-tab-item',1);var megatabs=$parentItem.data('mega-tabs')?$parentItem.data('mega-tabs'):[];megatabs.push($tabul);$parentItem.data('mega-tabs',megatabs);$tabItems.first().data('mega-tab-active',true).addClass('open');var $p=$tabul.parents('.dropdown-menu');$p.each(function(){var $this=$(this);$this.data('prev-style',$this.attr('style')).css({visibility:"visible",display:"block"});})
$tabs.each(function(){var $this=$(this),thisstyle=$this.attr('style');$this.css({visibility:"hidden",display:"block"});tabheight=Math.max(tabheight,$this.children().innerHeight());if(thisstyle){$this.attr('style',thisstyle);}else{$this.removeAttr('style');}});$tabul.css('min-height',tabheight);$p.each(function(){var $this=$(this);if($this.data('prev-style'))
$this.attr('style',$this.data('prev-style'));else
$this.removeAttr('style');$this.removeData('prev-style');})})}
$menu.find('.modal').appendTo('body');},show:function(item){if(item.$item.data('mega-tab-item')){item.$item.parent().children().removeClass('open').data('mega-tab-active',false);item.$item.addClass('open').data('mega-tab-active',true);}
if($.inArray(item,this.child_open)<this.child_open.length-1){this.hide_others(item);}
$(document.body).trigger('hideall.t3menu',[this]);clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.ftimer);clearTimeout(item.ctimer);if(item.status!='open'||!item.$item.hasClass('open')||!this.child_open.length){if(item.mega){clearTimeout(item.astimer);clearTimeout(item.atimer);this.position(item.$item);item.astimer=setTimeout(function(){item.$item.addClass('animating')},10);item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration+50);item.timer=setTimeout(function(){item.$item.addClass('open');},100);}else{item.$item.addClass('open');}
item.status='open';if(item.child&&$.inArray(item,this.child_open)==-1){this.child_open.push(item);}}
item.ctimer=setTimeout($.proxy(this.clickable,this,item),300);},hide:function(item,$target){clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.astimer);clearTimeout(item.atimer);clearTimeout(item.ftimer);if($target&&$target.is('input',item.$item)){return;}
if(item.mega){item.$item.addClass('animating');item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration);item.timer=setTimeout(function(){if(!item.$item.data('mega-tab-active'))
item.$item.removeClass('open')},100);}else{item.timer=setTimeout(function(){if(!item.$item.data('mega-tab-active'))
item.$item.removeClass('open');},100);}
item.status='close';for(var i=this.child_open.length;i--;){if(this.child_open[i]===item){this.child_open.splice(i,1);}}
item.ftimer=setTimeout($.proxy(this.hidden,this,item),this.options.duration);this.timer=setTimeout($.proxy(this.hide_alls,this),this.options.hidedelay);},hidden:function(item){if(item.status=='close'){item.clickable=false;}},hide_others:function(item){var self=this;$.each(this.child_open.slice(),function(idx,open){if(!item||(open!=item&&!open.$item.has(item.$item).length)){self.hide(open);}});},hide_alls:function(e,inst){if(!e||e.type=='tap'||(e.type=='hideall'&&this!=inst)){var self=this;$.each(this.child_open.slice(),function(idx,item){item&&self.hide(item);});}},clickable:function(item){item.clickable=true;},position:function($item){var sub=$item.children('.mega-dropdown-menu'),is_show=sub.is(':visible');if(!is_show){sub.show();}
var offset=$item.offset(),width=$item.outerWidth(),screen_width=$(window).width()
-this.options.sb_width,sub_width=sub.outerWidth(),level=$item.data('level');if(!is_show){sub.css('display','');}
sub.css({left:'',right:''});if(level==1){var align=$item.data('alignsub'),align_offset=0,align_delta=0,align_trans=0;if(align=='justify'){return;}
if(!align){align='left';}
if(align=='center'){align_offset=offset.left+(width/2);if(!$.support.t3transform){align_trans=-sub_width/2;sub.css(this.options.rtl?'right':'left',align_trans+width/2);}}else{align_offset=offset.left
+((align=='left'&&this.options.rtl||align=='right'&&!this.options.rtl)?width:0);}
if(this.options.rtl){if(align=='right'){if(align_offset+sub_width>screen_width){align_delta=screen_width-align_offset
-sub_width;sub.css('left',align_delta);if(screen_width<sub_width){sub.css('left',align_delta+sub_width
-screen_width);}}}else{if(align_offset<(align=='center'?sub_width/2:sub_width)){align_delta=align_offset
-(align=='center'?sub_width/2:sub_width);sub.css('right',align_delta+align_trans);}
if(align_offset
+(align=='center'?sub_width/2:0)
-align_delta>screen_width){sub.css('right',align_offset
+(align=='center'?(sub_width+width)/2:0)+align_trans
-screen_width);}}}else{if(align=='right'){if(align_offset<sub_width){align_delta=align_offset-sub_width;sub.css('right',align_delta);if(sub_width>screen_width){sub.css('right',sub_width-screen_width
+align_delta);}}}else{if(align_offset
+(align=='center'?sub_width/2:sub_width)>screen_width){align_delta=screen_width
-align_offset
-(align=='center'?sub_width/2:sub_width);sub.css('left',align_delta+align_trans);}
if(align_offset
-(align=='center'?sub_width/2:0)
+align_delta<0){sub.css('left',(align=='center'?(sub_width+width)/2:0)
+align_trans
-align_offset);}}}}else{if(this.options.rtl){if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width
-sub_width);}}}else{if(offset.left-sub_width<0){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left
-sub_width);}}}}else{if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left-sub_width<0){$item.removeClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left
-sub_width);}}}else{if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width
-sub_width);}}}}}}};$.fn.t3menu=function(option){return this.each(function(){var $this=$(this),data=$this.data('megamenu'),options=typeof option=='object'&&option;if($this.parents('#off-canvas-nav').length)
return;if($this.parents('#t3-off-canvas').length)
return;if(!data){$this.data('megamenu',(data=new T3Menu(this,options)));}else{if(typeof option=='string'&&data[option]){data[option]()}}})};$.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:true,sb_width:20};$(document).ready(function(){var mm_duration=$('.t3-megamenu').data('duration')||0;if(mm_duration){$('<style type="text/css">'
+'.t3-megamenu.animate .animating > .mega-dropdown-menu,'
+'.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {'
+'transition-duration: '
+mm_duration+'ms !important;'
+'-webkit-transition-duration: '
+mm_duration+'ms !important;'
+'}'+'</style>').appendTo('head');}
var mm_timeout=mm_duration?100+mm_duration:500,mm_rtl=$(document.documentElement).attr('dir')=='rtl',mm_trigger=$(document.documentElement).hasClass('mm-hover'),sb_width=(function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()
-child.height(100).innerWidth();parent.remove();return width;})();if(!$.support.transition){$('.t3-megamenu').removeClass('animate');mm_timeout=100;}
$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});$(window).load(function(){$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});});});})(jQuery);


/*===============================
/template/templates/jb_fatory_press/js/script.js
================================================================================*/;
jQuery(function($){jQuery('[data-toggle=tooltip]').tooltip();$('#back-to-top').on('click',function(){$("html, body").animate({scrollTop:0},500);return false;});});


/*===============================
/template/templates/jb_fatory_press/js/prettySocial.min.js
================================================================================*/;
/**
 * jQuery prettySocial: Use custom social share buttons
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */(function(a){a.fn.prettySocial=function(){var b={pinterest:{url:"http://pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{description}}",popup:{width:685,height:500}},facebook:{url:"https://www.facebook.com/sharer/sharer.php?s=100&p[title]={{title}}&p[summary]={{description}}&p[url]={{url}}&p[images][0]={{media}}",popup:{width:626,height:436}},twitter:{url:"https://twitter.com/share?url={{url}}&via={{via}}&text={{description}}",popup:{width:685,height:500}},googleplus:{url:"https://plus.google.com/share?url={{url}}",popup:{width:600,height:600}},linkedin:{url:"https://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{description}}+&source={{via}}",popup:{width:600,height:600}}},d=function(f,e){var h=(window.innerWidth/2)-(f.popup.width/2),g=(window.innerHeight/2)-(f.popup.height/2);return window.open(e,"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+f.popup.width+", height="+f.popup.height+", top="+g+", left="+h)},c=function(f,g){var e=f.url.replace(/{{url}}/g,encodeURIComponent(g.url)).replace(/{{title}}/g,encodeURIComponent(g.title)).replace(/{{description}}/g,encodeURIComponent(g.description)).replace(/{{media}}/g,encodeURIComponent(g.media)).replace(/{{via}}/g,encodeURIComponent(g.via));return e};return this.each(function(){var i=a(this);var g=i.data("type"),f=b[g]||null;if(!f){a.error("Social site is not set.")}var h={url:i.data("url")||"",title:i.data("title")||"",description:i.data("description")||"",media:i.data("media")||"",via:i.data("via")||""};var e=c(f,h);if(navigator.userAgent.match(/Android|IEMobile|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)){i.bind("touchstart",function(j){if(j.originalEvent.touches.length>1){return}i.data("touchWithoutScroll",true)}).bind("touchmove",function(){i.data("touchWithoutScroll",false);return}).bind("touchend",function(k){k.preventDefault();var j=i.data("touchWithoutScroll");if(k.originalEvent.touches.length>1||!j){return}d(f,e)})}else{i.bind("click",function(j){j.preventDefault();d(f,e)})}})}})(jQuery);


/*===============================
/template/templates/jb_fatory_press/js/switcher.js
================================================================================*/;
window.console=window.console||(function(){var c={};c.log=c.warn=c.debug=c.info=c.error=c.time=c.dir=c.profile=c.clear=c.exception=c.trace=c.assert=function(){};return c;})();jQuery(document).ready(function($){$("#style-switcher .switch_btn").click(function(e){e.preventDefault();var div=$("#style-switcher");console.log(div.css("left"));if(div.css("left")==="-280px"){$("#style-switcher").animate({left:"0px"});}else{$("#style-switcher").animate({left:"-280px"});}});$("#layout-style").change(function(e){if($(this).val()==1){$("body").removeClass("jb-boxed"),$(window).resize();stickyheader=!stickyheader;}else{$("body").addClass("jb-boxed"),$(window).resize();stickyheader=!stickyheader;}});$('.bg li a').click(function(){var current=$('#style-switcher select[id=layout-style]').find('option:selected').val();if(current=='2'){var bg=$(this).css("backgroundImage");$("body").css("backgroundImage",bg);}else{alert('Please select boxed layout');}});$("#reset a").click(function(e){var bg=$(this).css("backgroundImage");$("body").css("backgroundImage","url(../images/bg/default_bg.png)");$("#navigation").removeClass("style-2")});});


/*===============================
/template/templates/jb_fatory_press/js/waypoints.min.js
================================================================================*/;
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);



/*===============================
/template/plugins/system/t3/base-bs3/js/nav-collapse.js
================================================================================*/;
jQuery(document).ready(function($){$('.t3-navbar').each(function(){var $navwrapper=$(this),$menu=null,$placeholder=null;if($navwrapper.find('.t3-megamenu').length){$menu=$navwrapper.find('ul.level0').clone(),$placeholder=$navwrapper.prev('.navbar-collapse');if(!$placeholder.length){$placeholder=$navwrapper.closest('.container, .t3-mainnav').find('.navbar-collapse:empty');}
var lis=$menu.find('li[data-id]'),liactive=lis.filter('.current');lis.removeClass('mega dropdown mega-align-left mega-align-right mega-align-center mega-align-adjust');lis.each(function(){var $li=$(this),$child=$li.find('>:first-child');if($child[0].nodeName=='DIV'){$child.find('>:first-child').prependTo($li);$child.remove();}
if($li.data('hidewcol')){$child.find('.caret').remove();$child.nextAll().remove();return;}
var subul=$li.find('ul.level'+$li.data('level'));if(subul.length){$ul=$('<ul class="level'+$li.data('level')+' dropdown-menu">');subul.each(function(){if($(this).parents('.mega-col-nav').data('hidewcol'))return;$(this).find('>li').appendTo($ul);});if($ul.children().length){$ul.appendTo($li);}}
$li.find('>div').remove();if(!$li.children('ul').length){$child.find('.caret').remove();}
var divider=$li.hasClass('divider');for(var x in $li.data()){$li.removeAttr('data-'+x)}
$child.removeAttr('class');for(var x in $child.data()){$child.removeAttr('data-'+x)}
if(divider){$li.addClass('divider');}});liactive.addClass('current active');}else{$menu=$navwrapper.find('ul.nav').clone();$placeholder=$('.t3-navbar-collapse:empty, .navbar-collapse:empty').eq(0);}
$menu.find('a[data-toggle="dropdown"]').removeAttr('data-toggle').removeAttr('data-target');$menu.find('> li > ul.dropdown-menu').prev('a').attr('data-toggle','dropdown').attr('data-target','#').parent('li').addClass(function(){return'dropdown'+($(this).data('level')>1?' dropdown-submenu':'');});$menu.appendTo($placeholder);});});


/*===============================
/template/media/system/js/html5fallback.js
================================================================================*/;
!function(a,b,c){"use strict";"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b});var d=function(a,b){for(var c=["required","pattern","placeholder","autofocus","formnovalidate"],d=["email","url","number","range"],e={attributes:{},types:{}};b=c.pop();)e.attributes[b]=!!(b in a);for(;b=d.pop();)a.setAttribute("type",b),e.types[b]=a.type==b;return e}(b.createElement("input")),e={init:function(b,c){var d=this;d.elem=c,d.$elem=a(c),c.H5Form=d,d.options=a.extend({},a.fn.h5f.options,b),"form"===c.nodeName.toLowerCase()&&d.bindWithForm(d.elem,d.$elem)},bindWithForm:function(a,b){var i,e=this,f=!!b.attr("novalidate"),g=a.elements,h=g.length;for("onSubmit"===e.options.formValidationEvent&&b.on("submit",function(a){i=this.H5Form.donotValidate!==c&&this.H5Form.donotValidate,i||f||e.validateForm(e)?b.find(":input").each(function(){e.placeholder(e,this,"submit")}):(a.preventDefault(),this.donotValidate=!1)}),b.on("focusout focusin",function(a){e.placeholder(e,a.target,a.type)}),b.on("focusout change",e.validateField),b.find("fieldset").on("change",function(){e.validateField(this)}),d.attributes.formnovalidate||b.find(":submit[formnovalidate]").on("click",function(){e.donotValidate=!0});h--;)e.polyfill(g[h]),e.autofocus(e,g[h])},polyfill:function(a){if("form"===a.nodeName.toLowerCase())return!0;var b=a.form.H5Form;b.placeholder(b,a),b.numberType(b,a)},validateForm:function(){var f,g,a=this,b=a.elem,c=b.elements,d=c.length,e=!0;for(b.isValid=!0,f=0;f<d;f++)g=c[f],g.isRequired=!!g.required,g.isDisabled&&(g.isDisabled=!!g.disabled),g.isDisabled||(e=a.validateField(g),b.isValid&&!e&&a.setFocusOn(g),b.isValid=e&&b.isValid);return a.options.doRenderMessage&&a.renderErrorMessages(a,b),b.isValid},validateField:function(b){var j,k,l,e=b.target||b,f=!1,g=!1,h=!1,i=!1;return e.form===c?null:(j=e.form.H5Form,k=a(e),g=!!k.attr("required"),h=!!k.attr("disabled"),e.isDisabled||(f=!d.attributes.required&&g&&j.isValueMissing(j,e),i=!d.attributes.pattern&&j.matchPattern(j,e)),e.validityState={valueMissing:f,patternMismatch:i,valid:e.isDisabled||!(f||i)},d.attributes.required||(e.validityState.valueMissing?k.addClass(j.options.requiredClass):k.removeClass(j.options.requiredClass)),d.attributespattern||(e.validityState.patternMismatch?k.addClass(j.options.patternClass):k.removeClass(j.options.patternClass)),e.validityState.valid?(k.removeClass(j.options.invalidClass),l=j.findLabel(k),l.removeClass(j.options.invalidClass),l.attr("aria-invalid","false")):(k.addClass(j.options.invalidClass),l=j.findLabel(k),l.addClass(j.options.invalidClass),l.attr("aria-invalid","true")),e.validityState.valid)},isValueMissing:function(e,f){var k,l,m,g=a(f),h=f.type!==c?f.type:f.tagName.toLowerCase(),i=/^(checkbox|radio|fieldset)$/i.test(h),j=/^submit$/i.test(h);if(j)return!1;if(i){if("checkbox"===h)return!g.is(":checked");for(k="fieldset"===h?g.find("input"):b.getElementsByName(f.name),l=0,m=k.length;l<m;l++)if(a(k[l]).is(":checked"))return!1;return!0}return!(""!==g.val()&&(d.attributes.placeholder||!g.hasClass(e.options.placeholderClass)))},matchPattern:function(b,e){var j,k,f=a(e),g=f.attr("value"),h=f.attr("pattern"),i=f.attr("type");if(!d.attributes.placeholder&&f.attr("placeholder")&&f.hasClass(b.options.placeholderClass)||(g=f.attr("value")),""===g)return!1;if("email"===i){if(f.attr("multiple")===c)return!b.options.emailPatt.test(g);for(g=g.split(b.options.mutipleDelimiter),j=0,k=g.length;j<k;j++)if(!b.options.emailPatt.test(g[j].replace(/[ ]*/g,"")))return!0}else{if("url"===i)return!b.options.urlPatt.test(g);if("text"===i&&h!==c)return usrPatt=new RegExp("^(?:"+h+")$"),!usrPatt.test(g)}return!1},placeholder:function(b,e,f){var g=a(e),h=g.attr("placeholder"),i=/^(focusin|submit)$/i.test(f),j=/^(input|textarea)$/i.test(e.nodeName),k=/^password$/i.test(e.type),l=d.attributes.placeholder;l||!j||k||h===c||(""!==e.value||i?e.value===h&&i&&(e.value="",g.removeClass(b.options.placeholderClass)):(e.value=h,g.addClass(b.options.placeholderClass)))},numberType:function(b,c){var i,j,k,l,m,n,o,p,e=a(c),f=e.attr("type"),g=/^input$/i.test(c.nodeName),h=/^(number|range)$/i.test(f);if(!(!g||!h||"number"==f&&d.types.number||"range"==f&&d.types.range)){for(i=parseInt(e.attr("min")),j=parseInt(e.attr("max")),k=parseInt(e.attr("step")),l=parseInt(e.attr("value")),m=e.prop("attributes"),n=a("<select>"),i=isNaN(i)?-100:i,p=i;p<=j;p+=k)o=a('<option value="'+p+'">'+p+"</option>"),(l==p||l>p&&l<p+k)&&o.attr("selected",""),n.append(o);a.each(m,function(){n.attr(this.name,this.value)}),e.replaceWith(n)}},autofocus:function(b,c){var e=a(c),f=!!e.attr("autofocus"),g=/^(input|textarea|select|fieldset)$/i.test(c.nodeName),h=/^submit$/i.test(c.type),i=d.attributes.autofocus;!i&&g&&!h&&f&&a(function(){b.setFocusOn(c)})},findLabel:function(b){var d,c=a('label[for="'+b.attr("id")+'"]');return c.length<=0&&(d=b.parent(),"label"==d.get(0).tagName.toLowerCase()&&(c=d)),c},setFocusOn:function(b){"fieldset"===b.tagName.toLowerCase()?a(b).find(":first").focus():a(b).focus()},renderErrorMessages:function(b,c){for(var g,h,d=c.elements,e=d.length,f={errors:[]};e--;)g=a(d[e]),h=b.findLabel(g),g.hasClass(b.options.requiredClass)&&(f.errors[e]=h.text().replace("*","")+b.options.requiredMessage),g.hasClass(b.options.patternClass)&&(f.errors[e]=h.text().replace("*","")+b.options.patternMessage);f.errors.length>0&&Joomla.renderMessages(f)}};a.fn.h5f=function(a){return this.each(function(){Object.create(e).init(a,this)})},a.fn.h5f.options={invalidClass:"invalid",requiredClass:"required",requiredMessage:" is required.",placeholderClass:"placeholder",patternClass:"pattern",patternMessage:" doesn't match pattern.",doRenderMessage:!1,formValidationEvent:"onSubmit",emailPatt:/^[a-zA-Z0-9.!#$%&‚Äô*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,urlPatt:/[a-z][\-\.+a-z]*:\/\//i},a(function(){a("form").h5f({doRenderMessage:!0,requiredClass:"musthavevalue"})})}(jQuery,document);