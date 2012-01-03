
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.


//fgnass.github.com/spin.js#v1.2.2
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);

$.fn.spin = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if (opts !== false) {
      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
    }
  });
  return this;
};

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {

    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };

    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };

    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {
                threshold : 0
            });
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {
                threshold : 0
            });
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {
                threshold : 0
            });
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {
                threshold : 0
            });
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {
                threshold : 0
            });
        }
    });


})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/9/2009
 * @author Ariel Flesler
 * @version 1.4.1
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function($){var m=$.scrollTo=function(b,h,f){$(window).scrollTo(b,h,f)};m.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1};m.window=function(b){return $(window).scrollable()};$.fn.scrollable=function(){return this.map(function(){var b=this,h=!b.nodeName||$.inArray(b.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!h)return b;var f=(b.contentWindow||b).document||b.ownerDocument||b;return $.browser.safari||f.compatMode=='BackCompat'?f.body:f.documentElement})};$.fn.scrollTo=function(l,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};if(l=='max')l=9e9;a=$.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=$(k),d=l,p,g={},q=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)){d=n(d);break}d=$(d,this);case'object':if(d.is||d.style)p=(d=$(d)).offset()}$.each(a.axis.split(''),function(b,h){var f=h=='x'?'Left':'Top',i=f.toLowerCase(),c='scroll'+f,r=k[c],s=h=='x'?'Width':'Height';if(p){g[c]=p[i]+(q?0:r-o.offset()[i]);if(a.margin){g[c]-=parseInt(d.css('margin'+f))||0;g[c]-=parseInt(d.css('border'+f+'Width'))||0}g[c]+=a.offset[i]||0;if(a.over[i])g[c]+=d[s.toLowerCase()]()*a.over[i]}else g[c]=d[i];if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],u(s));if(!b&&a.queue){if(r!=g[c])t(a.onAfterFirst);delete g[c]}});t(a.onAfter);function t(b){o.animate(g,j,a.easing,b&&function(){b.call(this,l,a)})};function u(b){var h='scroll'+b;if(!q)return k[h];var f='client'+b,i=k.ownerDocument.documentElement,c=k.ownerDocument.body;return Math.max(i[h],c[h])-Math.min(i[f],c[f])}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);


/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);


/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9995 (09-AUG-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 * Minified with http://jscompress.com
 */
;(function(a){function r(b){function e(b){for(;b&&b.nodeName.toLowerCase()!="html";b=b.parentNode){var c=a.css(b,"background-color");if(c&&c.indexOf("rgb")>=0){var e=c.match(/\d+/g);return"#"+d(e[0])+d(e[1])+d(e[2])}if(c&&c!="transparent")return c}return"#ffffff"}function d(a){a=parseInt(a,10).toString(16);return a.length<2?"0"+a:a}c("applying clearType background-color hack");b.each(function(){a(this).css("background-color",e(this))})}function q(b,c){var d=a(c.pager);a.each(b,function(e,f){a.fn.cycle.createPagerAnchor(e,f,d,b,c)});c.updateActivePagerLink(c.pager,c.startingSlide,c.activePagerClass)}function o(b,c){var d=c?1:-1;var e=b.elements;var f=b.$cont[0],g=f.cycleTimeout;if(g){clearTimeout(g);f.cycleTimeout=0}if(b.random&&d<0){b.randomIndex--;if(--b.randomIndex==-2)b.randomIndex=e.length-2;else if(b.randomIndex==-1)b.randomIndex=e.length-1;b.nextSlide=b.randomMap[b.randomIndex]}else if(b.random){b.nextSlide=b.randomMap[b.randomIndex]}else{b.nextSlide=b.currSlide+d;if(b.nextSlide<0){if(b.nowrap)return false;b.nextSlide=e.length-1}else if(b.nextSlide>=e.length){if(b.nowrap)return false;b.nextSlide=0}}var h=b.onPrevNextEvent||b.prevNextClick;if(a.isFunction(h))h(d>0,b.nextSlide,e[b.nextSlide]);m(e,b,1,c);return false}function n(a,b,d,e){if(d.timeoutFn){var f=d.timeoutFn.call(a,a,b,d,e);while(d.fx!="none"&&f-d.speed<250)f+=d.speed;c("calculated timeout: "+f+"; speed: "+d.speed);if(f!==false)return f}return d.timeout}function m(b,d,e,f){if(e&&d.busy&&d.manualTrump){c("manualTrump in go(), stopping active transition");a(b).stop(true,true);d.busy=0}if(d.busy){c("transition active, ignoring new tx request");return}var g=d.$cont[0],h=b[d.currSlide],i=b[d.nextSlide];if(g.cycleStop!=d.stopCount||g.cycleTimeout===0&&!e)return;if(!e&&!g.cyclePause&&!d.bounce&&(d.autostop&&--d.countdown<=0||d.nowrap&&!d.random&&d.nextSlide<d.currSlide)){if(d.end)d.end(d);return}var j=false;if((e||!g.cyclePause)&&d.nextSlide!=d.currSlide){j=true;var k=d.fx;h.cycleH=h.cycleH||a(h).height();h.cycleW=h.cycleW||a(h).width();i.cycleH=i.cycleH||a(i).height();i.cycleW=i.cycleW||a(i).width();if(d.multiFx){if(f&&(d.lastFx==undefined||++d.lastFx>=d.fxs.length))d.lastFx=0;else if(!f&&(d.lastFx==undefined||--d.lastFx<0))d.lastFx=d.fxs.length-1;k=d.fxs[d.lastFx]}if(d.oneTimeFx){k=d.oneTimeFx;d.oneTimeFx=null}a.fn.cycle.resetState(d,k);if(d.before.length)a.each(d.before,function(a,b){if(g.cycleStop!=d.stopCount)return;b.apply(i,[h,i,d,f])});var l=function(){d.busy=0;a.each(d.after,function(a,b){if(g.cycleStop!=d.stopCount)return;b.apply(i,[h,i,d,f])})};c("tx firing("+k+"); currSlide: "+d.currSlide+"; nextSlide: "+d.nextSlide);d.busy=1;if(d.fxFn)d.fxFn(h,i,d,l,f,e&&d.fastOnEvent);else if(a.isFunction(a.fn.cycle[d.fx]))a.fn.cycle[d.fx](h,i,d,l,f,e&&d.fastOnEvent);else a.fn.cycle.custom(h,i,d,l,f,e&&d.fastOnEvent)}if(j||d.nextSlide==d.currSlide){d.lastSlide=d.currSlide;if(d.random){d.currSlide=d.nextSlide;if(++d.randomIndex==b.length)d.randomIndex=0;d.nextSlide=d.randomMap[d.randomIndex];if(d.nextSlide==d.currSlide)d.nextSlide=d.currSlide==d.slideCount-1?0:d.currSlide+1}else if(d.backwards){var o=d.nextSlide-1<0;if(o&&d.bounce){d.backwards=!d.backwards;d.nextSlide=1;d.currSlide=0}else{d.nextSlide=o?b.length-1:d.nextSlide-1;d.currSlide=o?0:d.nextSlide+1}}else{var o=d.nextSlide+1==b.length;if(o&&d.bounce){d.backwards=!d.backwards;d.nextSlide=b.length-2;d.currSlide=b.length-1}else{d.nextSlide=o?0:d.nextSlide+1;d.currSlide=o?b.length-1:d.nextSlide-1}}}if(j&&d.pager)d.updateActivePagerLink(d.pager,d.currSlide,d.activePagerClass);var p=0;if(d.timeout&&!d.continuous)p=n(b[d.currSlide],b[d.nextSlide],d,f);else if(d.continuous&&g.cyclePause)p=10;if(p>0)g.cycleTimeout=setTimeout(function(){m(b,d,0,!d.backwards)},p)}function l(b,c){b.addSlide=function(d,e){var f=a(d),g=f[0];if(!b.autostopCount)b.countdown++;c[e?"unshift":"push"](g);if(b.els)b.els[e?"unshift":"push"](g);b.slideCount=c.length;f.css("position","absolute");f[e?"prependTo":"appendTo"](b.$cont);if(e){b.currSlide++;b.nextSlide++}if(!a.support.opacity&&b.cleartype&&!b.cleartypeNoBg)r(f);if(b.fit&&b.width)f.width(b.width);if(b.fit&&b.height&&b.height!="auto")f.height(b.height);g.cycleH=b.fit&&b.height?b.height:f.height();g.cycleW=b.fit&&b.width?b.width:f.width();f.css(b.cssBefore);if(b.pager||b.pagerAnchorBuilder)a.fn.cycle.createPagerAnchor(c.length-1,g,a(b.pager),c,b);if(a.isFunction(b.onAddSlide))b.onAddSlide(f);else f.hide()}}function k(b){var e,f,g=a.fn.cycle.transitions;if(b.fx.indexOf(",")>0){b.multiFx=true;b.fxs=b.fx.replace(/\s*/g,"").split(",");for(e=0;e<b.fxs.length;e++){var h=b.fxs[e];f=g[h];if(!f||!g.hasOwnProperty(h)||!a.isFunction(f)){d("discarding unknown transition: ",h);b.fxs.splice(e,1);e--}}if(!b.fxs.length){d("No valid transitions named; slideshow terminating.");return false}}else if(b.fx=="all"){b.multiFx=true;b.fxs=[];for(p in g){f=g[p];if(g.hasOwnProperty(p)&&a.isFunction(f))b.fxs.push(p)}}if(b.multiFx&&b.randomizeEffects){var i=Math.floor(Math.random()*20)+30;for(e=0;e<i;e++){var j=Math.floor(Math.random()*b.fxs.length);b.fxs.push(b.fxs.splice(j,1)[0])}c("randomized fx sequence: ",b.fxs)}return true}function j(b){b.original={before:[],after:[]};b.original.cssBefore=a.extend({},b.cssBefore);b.original.cssAfter=a.extend({},b.cssAfter);b.original.animIn=a.extend({},b.animIn);b.original.animOut=a.extend({},b.animOut);a.each(b.before,function(){b.original.before.push(this)});a.each(b.after,function(){b.original.after.push(this)})}function i(b,c,f,h,i){var n=a.extend({},a.fn.cycle.defaults,h||{},a.metadata?b.metadata():a.meta?b.data():{});var p=a.isFunction(b.data)?b.data(n.metaAttr):null;if(p)n=a.extend(n,p);if(n.autostop)n.countdown=n.autostopCount||f.length;var s=b[0];b.data("cycle.opts",n);n.$cont=b;n.stopCount=s.cycleStop;n.elements=f;n.before=n.before?[n.before]:[];n.after=n.after?[n.after]:[];if(!a.support.opacity&&n.cleartype)n.after.push(function(){g(this,n)});if(n.continuous)n.after.push(function(){m(f,n,0,!n.backwards)});j(n);if(!a.support.opacity&&n.cleartype&&!n.cleartypeNoBg)r(c);if(b.css("position")=="static")b.css("position","relative");if(n.width)b.width(n.width);if(n.height&&n.height!="auto")b.height(n.height);if(n.startingSlide)n.startingSlide=parseInt(n.startingSlide,10);else if(n.backwards)n.startingSlide=f.length-1;if(n.random){n.randomMap=[];for(var t=0;t<f.length;t++)n.randomMap.push(t);n.randomMap.sort(function(a,b){return Math.random()-.5});n.randomIndex=1;n.startingSlide=n.randomMap[1]}else if(n.startingSlide>=f.length)n.startingSlide=0;n.currSlide=n.startingSlide||0;var u=n.startingSlide;c.css({position:"absolute",top:0,left:0}).hide().each(function(b){var c;if(n.backwards)c=u?b<=u?f.length+(b-u):u-b:f.length-b;else c=u?b>=u?f.length-(b-u):u-b:f.length-b;a(this).css("z-index",c)});a(f[u]).css("opacity",1).show();g(f[u],n);if(n.fit){if(!n.aspect){if(n.width)c.width(n.width);if(n.height&&n.height!="auto")c.height(n.height)}else{c.each(function(){var b=a(this);var c=n.aspect===true?b.width()/b.height():n.aspect;if(n.width&&b.width()!=n.width){b.width(n.width);b.height(n.width/c)}if(n.height&&b.height()<n.height){b.height(n.height);b.width(n.height*c)}})}}if(n.center&&(!n.fit||n.aspect)){c.each(function(){var b=a(this);b.css({"margin-left":n.width?(n.width-b.width())/2+"px":0,"margin-top":n.height?(n.height-b.height())/2+"px":0})})}if(n.center&&!n.fit&&!n.slideResize){c.each(function(){var b=a(this);b.css({"margin-left":n.width?(n.width-b.width())/2+"px":0,"margin-top":n.height?(n.height-b.height())/2+"px":0})})}var v=n.containerResize&&!b.innerHeight();if(v){var w=0,x=0;for(var y=0;y<f.length;y++){var z=a(f[y]),A=z[0],B=z.outerWidth(),C=z.outerHeight();if(!B)B=A.offsetWidth||A.width||z.attr("width");if(!C)C=A.offsetHeight||A.height||z.attr("height");w=B>w?B:w;x=C>x?C:x}if(w>0&&x>0)b.css({width:w+"px",height:x+"px"})}var D=false;if(n.pause)b.hover(function(){D=true;this.cyclePause++;e(s,true)},function(){D&&this.cyclePause--;e(s,true)});if(k(n)===false)return false;var E=false;h.requeueAttempts=h.requeueAttempts||0;c.each(function(){var b=a(this);this.cycleH=n.fit&&n.height?n.height:b.height()||this.offsetHeight||this.height||b.attr("height")||0;this.cycleW=n.fit&&n.width?n.width:b.width()||this.offsetWidth||this.width||b.attr("width")||0;if(b.is("img")){var c=a.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete;var e=a.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete;var f=a.browser.opera&&(this.cycleW==42&&this.cycleH==19||this.cycleW==37&&this.cycleH==17)&&!this.complete;var g=this.cycleH==0&&this.cycleW==0&&!this.complete;if(c||e||f||g){if(i.s&&n.requeueOnImageNotLoaded&&++h.requeueAttempts<100){d(h.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){a(i.s,i.c).cycle(h)},n.requeueTimeout);E=true;return false}else{d("could not determine size of image: "+this.src,this.cycleW,this.cycleH)}}}return true});if(E)return false;n.cssBefore=n.cssBefore||{};n.cssAfter=n.cssAfter||{};n.cssFirst=n.cssFirst||{};n.animIn=n.animIn||{};n.animOut=n.animOut||{};c.not(":eq("+u+")").css(n.cssBefore);a(c[u]).css(n.cssFirst);if(n.timeout){n.timeout=parseInt(n.timeout,10);if(n.speed.constructor==String)n.speed=a.fx.speeds[n.speed]||parseInt(n.speed,10);if(!n.sync)n.speed=n.speed/2;var F=n.fx=="none"?0:n.fx=="shuffle"?500:250;while(n.timeout-n.speed<F)n.timeout+=n.speed}if(n.easing)n.easeIn=n.easeOut=n.easing;if(!n.speedIn)n.speedIn=n.speed;if(!n.speedOut)n.speedOut=n.speed;n.slideCount=f.length;n.currSlide=n.lastSlide=u;if(n.random){if(++n.randomIndex==f.length)n.randomIndex=0;n.nextSlide=n.randomMap[n.randomIndex]}else if(n.backwards)n.nextSlide=n.startingSlide==0?f.length-1:n.startingSlide-1;else n.nextSlide=n.startingSlide>=f.length-1?0:n.startingSlide+1;if(!n.multiFx){var G=a.fn.cycle.transitions[n.fx];if(a.isFunction(G))G(b,c,n);else if(n.fx!="custom"&&!n.multiFx){d("unknown transition: "+n.fx,"; slideshow terminating");return false}}var H=c[u];if(!n.skipInitializationCallbacks){if(n.before.length)n.before[0].apply(H,[H,H,n,true]);if(n.after.length)n.after[0].apply(H,[H,H,n,true])}if(n.next)a(n.next).bind(n.prevNextEvent,function(){return o(n,1)});if(n.prev)a(n.prev).bind(n.prevNextEvent,function(){return o(n,0)});if(n.pager||n.pagerAnchorBuilder)q(f,n);l(n,f);return n}function h(b){if(b.next)a(b.next).unbind(b.prevNextEvent);if(b.prev)a(b.prev).unbind(b.prevNextEvent);if(b.pager||b.pagerAnchorBuilder)a.each(b.pagerAnchors||[],function(){this.unbind().remove()});b.pagerAnchors=null;if(b.destroy)b.destroy(b)}function g(b,c){if(!a.support.opacity&&c.cleartype&&b.style.filter){try{b.style.removeAttribute("filter")}catch(d){}}}function f(b,c,f){function j(b,c,e){if(!b&&c===true){var f=a(e).data("cycle.opts");if(!f){d("options not found, can not resume");return false}if(e.cycleTimeout){clearTimeout(e.cycleTimeout);e.cycleTimeout=0}m(f.elements,f,1,!f.backwards)}}if(b.cycleStop==undefined)b.cycleStop=0;if(c===undefined||c===null)c={};if(c.constructor==String){switch(c){case"destroy":case"stop":var g=a(b).data("cycle.opts");if(!g)return false;b.cycleStop++;if(b.cycleTimeout)clearTimeout(b.cycleTimeout);b.cycleTimeout=0;g.elements&&a(g.elements).stop();a(b).removeData("cycle.opts");if(c=="destroy")h(g);return false;case"toggle":b.cyclePause=b.cyclePause===1?0:1;j(b.cyclePause,f,b);e(b);return false;case"pause":b.cyclePause=1;e(b);return false;case"resume":b.cyclePause=0;j(false,f,b);e(b);return false;case"prev":case"next":var g=a(b).data("cycle.opts");if(!g){d('options not found, "prev/next" ignored');return false}a.fn.cycle[c](g);return false;default:c={fx:c}}return c}else if(c.constructor==Number){var i=c;c=a(b).data("cycle.opts");if(!c){d("options not found, can not advance slide");return false}if(i<0||i>=c.elements.length){d("invalid slide index: "+i);return false}c.nextSlide=i;if(b.cycleTimeout){clearTimeout(b.cycleTimeout);b.cycleTimeout=0}if(typeof f=="string")c.oneTimeFx=f;m(c.elements,c,1,i>=c.currSlide);return false}return c}function e(b,c,d){var e=a(b).data("cycle.opts");var f=!!b.cyclePause;if(f&&e.paused)e.paused(b,e,c,d);else if(!f&&e.resumed)e.resumed(b,e,c,d)}function d(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "))}function c(b){a.fn.cycle.debug&&d(b)}var b="2.9995";if(a.support==undefined){a.support={opacity:!a.browser.msie}}a.expr[":"].paused=function(a){return a.cyclePause};a.fn.cycle=function(b,e){var g={s:this.selector,c:this.context};if(this.length===0&&b!="stop"){if(!a.isReady&&g.s){d("DOM not ready, queuing slideshow");a(function(){a(g.s,g.c).cycle(b,e)});return this}d("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.each(function(){var h=f(this,b,e);if(h===false)return;h.updateActivePagerLink=h.updateActivePagerLink||a.fn.cycle.updateActivePagerLink;if(this.cycleTimeout)clearTimeout(this.cycleTimeout);this.cycleTimeout=this.cyclePause=0;var j=a(this);var k=h.slideExpr?a(h.slideExpr,this):j.children();var l=k.get();var o=i(j,k,l,h,g);if(o===false)return;if(l.length<2){d("terminating; too few slides: "+l.length);return}var p=o.continuous?10:n(l[o.currSlide],l[o.nextSlide],o,!o.backwards);if(p){p+=o.delay||0;if(p<10)p=10;c("first timeout: "+p);this.cycleTimeout=setTimeout(function(){m(l,o,0,!h.backwards)},p)}})};a.fn.cycle.resetState=function(b,c){c=c||b.fx;b.before=[];b.after=[];b.cssBefore=a.extend({},b.original.cssBefore);b.cssAfter=a.extend({},b.original.cssAfter);b.animIn=a.extend({},b.original.animIn);b.animOut=a.extend({},b.original.animOut);b.fxFn=null;a.each(b.original.before,function(){b.before.push(this)});a.each(b.original.after,function(){b.after.push(this)});var d=a.fn.cycle.transitions[c];if(a.isFunction(d))d(b.$cont,a(b.elements),b)};a.fn.cycle.updateActivePagerLink=function(b,c,d){a(b).each(function(){a(this).children().removeClass(d).eq(c).addClass(d)})};a.fn.cycle.next=function(a){o(a,1)};a.fn.cycle.prev=function(a){o(a,0)};a.fn.cycle.createPagerAnchor=function(b,d,f,g,h){var i;if(a.isFunction(h.pagerAnchorBuilder)){i=h.pagerAnchorBuilder(b,d);c("pagerAnchorBuilder("+b+", el) returned: "+i)}else i='<a href="#">'+(b+1)+"</a>";if(!i)return;var j=a(i);if(j.parents("body").length===0){var k=[];if(f.length>1){f.each(function(){var b=j.clone(true);a(this).append(b);k.push(b[0])});j=a(k)}else{j.appendTo(f)}}h.pagerAnchors=h.pagerAnchors||[];h.pagerAnchors.push(j);var l=function(c){c.preventDefault();h.nextSlide=b;var d=h.$cont[0],e=d.cycleTimeout;if(e){clearTimeout(e);d.cycleTimeout=0}var f=h.onPagerEvent||h.pagerClick;if(a.isFunction(f))f(h.nextSlide,g[h.nextSlide]);m(g,h,1,h.currSlide<b)};if(/mouseenter|mouseover/i.test(h.pagerEvent)){j.hover(l,function(){})}else{j.bind(h.pagerEvent,l)}if(!/^click/.test(h.pagerEvent)&&!h.allowPagerClickBubble)j.bind("click.cycle",function(){return false});var n=h.$cont[0];var o=false;if(h.pauseOnPagerHover){j.hover(function(){o=true;n.cyclePause++;e(n,true,true)},function(){o&&n.cyclePause--;e(n,true,true)})}};a.fn.cycle.hopsFromLast=function(a,b){var c,d=a.lastSlide,e=a.currSlide;if(b)c=e>d?e-d:a.slideCount-d;else c=e<d?d-e:d+a.slideCount-e;return c};a.fn.cycle.commonReset=function(b,c,d,e,f,g){a(d.elements).not(b).hide();if(typeof d.cssBefore.opacity=="undefined")d.cssBefore.opacity=1;d.cssBefore.display="block";if(d.slideResize&&e!==false&&c.cycleW>0)d.cssBefore.width=c.cycleW;if(d.slideResize&&f!==false&&c.cycleH>0)d.cssBefore.height=c.cycleH;d.cssAfter=d.cssAfter||{};d.cssAfter.display="none";a(b).css("zIndex",d.slideCount+(g===true?1:0));a(c).css("zIndex",d.slideCount+(g===true?0:1))};a.fn.cycle.custom=function(b,c,d,e,f,g){var h=a(b),i=a(c);var j=d.speedIn,k=d.speedOut,l=d.easeIn,m=d.easeOut;i.css(d.cssBefore);if(g){if(typeof g=="number")j=k=g;else j=k=1;l=m=null}var n=function(){i.animate(d.animIn,j,l,function(){e()})};h.animate(d.animOut,k,m,function(){h.css(d.cssAfter);if(!d.sync)n()});if(d.sync)n()};a.fn.cycle.transitions={fade:function(b,c,d){c.not(":eq("+d.currSlide+")").css("opacity",0);d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.cssBefore.opacity=0});d.animIn={opacity:1};d.animOut={opacity:0};d.cssBefore={top:0,left:0}}};a.fn.cycle.ver=function(){return b};a.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,aspect:false,autostop:0,autostopCount:0,backwards:false,before:null,center:null,cleartype:!a.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:false,slideExpr:null,slideResize:1,speed:1e3,speedIn:null,speedOut:null,startingSlide:0,sync:1,timeout:4e3,timeoutFn:null,updateActivePagerLink:null,width:null}})(jQuery);(function(a){a.fn.cycle.transitions.none=function(b,c,d){d.fxFn=function(b,c,d,e){a(c).show();a(b).hide();e()}};a.fn.cycle.transitions.fadeout=function(b,c,d){c.not(":eq("+d.currSlide+")").css({display:"block",opacity:1});d.before.push(function(b,c,d,e,f,g){a(b).css("zIndex",d.slideCount+(!g===true?1:0));a(c).css("zIndex",d.slideCount+(!g===true?0:1))});d.animIn.opacity=1;d.animOut.opacity=0;d.cssBefore.opacity=1;d.cssBefore.display="block";d.cssAfter.zIndex=0};a.fn.cycle.transitions.scrollUp=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.height();d.cssBefore.top=e;d.cssBefore.left=0;d.cssFirst.top=0;d.animIn.top=0;d.animOut.top=-e};a.fn.cycle.transitions.scrollDown=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.height();d.cssFirst.top=0;d.cssBefore.top=-e;d.cssBefore.left=0;d.animIn.top=0;d.animOut.top=e};a.fn.cycle.transitions.scrollLeft=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.width();d.cssFirst.left=0;d.cssBefore.left=e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=0-e};a.fn.cycle.transitions.scrollRight=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.width();d.cssFirst.left=0;d.cssBefore.left=-e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=e};a.fn.cycle.transitions.scrollHorz=function(b,c,d){b.css("overflow","hidden").width();d.before.push(function(b,c,d,e){if(d.rev)e=!e;a.fn.cycle.commonReset(b,c,d);d.cssBefore.left=e?c.cycleW-1:1-c.cycleW;d.animOut.left=e?-b.cycleW:b.cycleW});d.cssFirst.left=0;d.cssBefore.top=0;d.animIn.left=0;d.animOut.top=0};a.fn.cycle.transitions.scrollVert=function(b,c,d){b.css("overflow","hidden");d.before.push(function(b,c,d,e){if(d.rev)e=!e;a.fn.cycle.commonReset(b,c,d);d.cssBefore.top=e?1-c.cycleH:c.cycleH-1;d.animOut.top=e?b.cycleH:-b.cycleH});d.cssFirst.top=0;d.cssBefore.left=0;d.animIn.top=0;d.animOut.left=0};a.fn.cycle.transitions.slideX=function(b,c,d){d.before.push(function(b,c,d){a(d.elements).not(b).hide();a.fn.cycle.commonReset(b,c,d,false,true);d.animIn.width=c.cycleW});d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.width=0;d.animIn.width="show";d.animOut.width=0};a.fn.cycle.transitions.slideY=function(b,c,d){d.before.push(function(b,c,d){a(d.elements).not(b).hide();a.fn.cycle.commonReset(b,c,d,true,false);d.animIn.height=c.cycleH});d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.height=0;d.animIn.height="show";d.animOut.height=0};a.fn.cycle.transitions.shuffle=function(b,c,d){var e,f=b.css("overflow","visible").width();c.css({left:0,top:0});d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true)});if(!d.speedAdjusted){d.speed=d.speed/2;d.speedAdjusted=true}d.random=0;d.shuffle=d.shuffle||{left:-f,top:15};d.els=[];for(e=0;e<c.length;e++)d.els.push(c[e]);for(e=0;e<d.currSlide;e++)d.els.push(d.els.shift());d.fxFn=function(b,c,d,e,f){if(d.rev)f=!f;var g=f?a(b):a(c);a(c).css(d.cssBefore);var h=d.slideCount;g.animate(d.shuffle,d.speedIn,d.easeIn,function(){var c=a.fn.cycle.hopsFromLast(d,f);for(var i=0;i<c;i++)f?d.els.push(d.els.shift()):d.els.unshift(d.els.pop());if(f){for(var j=0,k=d.els.length;j<k;j++)a(d.els[j]).css("z-index",k-j+h)}else{var l=a(b).css("z-index");g.css("z-index",parseInt(l,10)+1+h)}g.animate({left:0,top:0},d.speedOut,d.easeOut,function(){a(f?this:b).hide();if(e)e()})})};a.extend(d.cssBefore,{display:"block",opacity:1,top:0,left:0})};a.fn.cycle.transitions.turnUp=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.cssBefore.top=c.cycleH;d.animIn.height=c.cycleH;d.animOut.width=c.cycleW});d.cssFirst.top=0;d.cssBefore.left=0;d.cssBefore.height=0;d.animIn.top=0;d.animOut.height=0};a.fn.cycle.transitions.turnDown=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssFirst.top=0;d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.height=0;d.animOut.height=0};a.fn.cycle.transitions.turnLeft=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.cssBefore.left=c.cycleW;d.animIn.width=c.cycleW});d.cssBefore.top=0;d.cssBefore.width=0;d.animIn.left=0;d.animOut.width=0};a.fn.cycle.transitions.turnRight=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.animIn.width=c.cycleW;d.animOut.left=b.cycleW});a.extend(d.cssBefore,{top:0,left:0,width:0});d.animIn.left=0;d.animOut.width=0};a.fn.cycle.transitions.zoom=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,false,true);d.cssBefore.top=c.cycleH/2;d.cssBefore.left=c.cycleW/2;a.extend(d.animIn,{top:0,left:0,width:c.cycleW,height:c.cycleH});a.extend(d.animOut,{width:0,height:0,top:b.cycleH/2,left:b.cycleW/2})});d.cssFirst.top=0;d.cssFirst.left=0;d.cssBefore.width=0;d.cssBefore.height=0};a.fn.cycle.transitions.fadeZoom=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,false);d.cssBefore.left=c.cycleW/2;d.cssBefore.top=c.cycleH/2;a.extend(d.animIn,{top:0,left:0,width:c.cycleW,height:c.cycleH})});d.cssBefore.width=0;d.cssBefore.height=0;d.animOut.opacity=0};a.fn.cycle.transitions.blindX=function(b,c,d){var e=b.css("overflow","hidden").width();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.width=c.cycleW;d.animOut.left=b.cycleW});d.cssBefore.left=e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=e};a.fn.cycle.transitions.blindY=function(b,c,d){var e=b.css("overflow","hidden").height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssBefore.top=e;d.cssBefore.left=0;d.animIn.top=0;d.animOut.top=e};a.fn.cycle.transitions.blindZ=function(b,c,d){var e=b.css("overflow","hidden").height();var f=b.width();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssBefore.top=e;d.cssBefore.left=f;d.animIn.top=0;d.animIn.left=0;d.animOut.top=e;d.animOut.left=f};a.fn.cycle.transitions.growX=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.cssBefore.left=this.cycleW/2;d.animIn.left=0;d.animIn.width=this.cycleW;d.animOut.left=0});d.cssBefore.top=0;d.cssBefore.width=0};a.fn.cycle.transitions.growY=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.cssBefore.top=this.cycleH/2;d.animIn.top=0;d.animIn.height=this.cycleH;d.animOut.top=0});d.cssBefore.height=0;d.cssBefore.left=0};a.fn.cycle.transitions.curtainX=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true,true);d.cssBefore.left=c.cycleW/2;d.animIn.left=0;d.animIn.width=this.cycleW;d.animOut.left=b.cycleW/2;d.animOut.width=0});d.cssBefore.top=0;d.cssBefore.width=0};a.fn.cycle.transitions.curtainY=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false,true);d.cssBefore.top=c.cycleH/2;d.animIn.top=0;d.animIn.height=c.cycleH;d.animOut.top=b.cycleH/2;d.animOut.height=0});d.cssBefore.height=0;d.cssBefore.left=0};a.fn.cycle.transitions.cover=function(b,c,d){var e=d.direction||"left";var f=b.css("overflow","hidden").width();var g=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);if(e=="right")d.cssBefore.left=-f;else if(e=="up")d.cssBefore.top=g;else if(e=="down")d.cssBefore.top=-g;else d.cssBefore.left=f});d.animIn.left=0;d.animIn.top=0;d.cssBefore.top=0;d.cssBefore.left=0};a.fn.cycle.transitions.uncover=function(b,c,d){var e=d.direction||"left";var f=b.css("overflow","hidden").width();var g=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true);if(e=="right")d.animOut.left=f;else if(e=="up")d.animOut.top=-g;else if(e=="down")d.animOut.top=g;else d.animOut.left=-f});d.animIn.left=0;d.animIn.top=0;d.cssBefore.top=0;d.cssBefore.left=0};a.fn.cycle.transitions.toss=function(b,c,d){var e=b.css("overflow","visible").width();var f=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true);if(!d.animOut.left&&!d.animOut.top)a.extend(d.animOut,{left:e*2,top:-f/2,opacity:0});else d.animOut.opacity=0});d.cssBefore.left=0;d.cssBefore.top=0;d.animIn.left=0};a.fn.cycle.transitions.wipe=function(b,c,d){var e=b.css("overflow","hidden").width();var f=b.height();d.cssBefore=d.cssBefore||{};var g;if(d.clip){if(/l2r/.test(d.clip))g="rect(0px 0px "+f+"px 0px)";else if(/r2l/.test(d.clip))g="rect(0px "+e+"px "+f+"px "+e+"px)";else if(/t2b/.test(d.clip))g="rect(0px "+e+"px 0px 0px)";else if(/b2t/.test(d.clip))g="rect("+f+"px "+e+"px "+f+"px 0px)";else if(/zoom/.test(d.clip)){var h=parseInt(f/2,10);var i=parseInt(e/2,10);g="rect("+h+"px "+i+"px "+h+"px "+i+"px)"}}d.cssBefore.clip=d.cssBefore.clip||g||"rect(0px 0px 0px 0px)";var j=d.cssBefore.clip.match(/(\d+)/g);var k=parseInt(j[0],10),l=parseInt(j[1],10),m=parseInt(j[2],10),n=parseInt(j[3],10);d.before.push(function(b,c,d){if(b==c)return;var g=a(b),h=a(c);a.fn.cycle.commonReset(b,c,d,true,true,false);d.cssAfter.display="block";var i=1,j=parseInt(d.speedIn/13,10)-1;(function o(){var a=k?k-parseInt(i*(k/j),10):0;var b=n?n-parseInt(i*(n/j),10):0;var c=m<f?m+parseInt(i*((f-m)/j||1),10):f;var d=l<e?l+parseInt(i*((e-l)/j||1),10):e;h.css({clip:"rect("+a+"px "+d+"px "+c+"px "+b+"px)"});i++<=j?setTimeout(o,13):g.css("display","none")})()});a.extend(d.cssBefore,{display:"block",opacity:1,top:0,left:0});d.animIn={left:0};d.animOut={left:0}}})(jQuery);

/**
 * Paginate by Glen Cheney
 * http://glencheney.com
 */
;(function(a){var b="paginate",c={init:function(d){var e={itemWidth:230,margins:20,key:"all",prevClass:".paginate-prev",nextClass:".paginate-next",controls:".paginate-controls"};if(d){a.extend(e,d)}return this.each(function(){var d=a(this),f=d.children(),g=Math.floor(d.width()/e.itemWidth),h=2,i=f.first().outerHeight(),j;j={$items:f,itemsPerRow:g,numRows:h,itemHeight:i,itemWidth:e.itemWidth,margins:e.margins,prevClass:e.prevClass,nextClass:e.nextClass,controls:e.controls};d.data(b,j);if(!Modernizr.csstransforms||!Modernizr.csstransitions){c.setPrefixedCss(f,"transition","none")}c.clicks.call(this,e);c.paginate.call(this,"all")})},paginate:function(d){var e=a(this),f=e.data(b);if(!f){c.init.call(this);f=a(this).data(b)}if(!d)d="all";if(d=="all"){f.$items.removeClass("concealed stage-left stage-center stage-right")}else{f.$items.removeClass("concealed stage-left stage-center stage-right filtered").each(function(){var b=a(this).attr("data-key"),c=a.parseJSON(b);if(a.inArray(d,c)===-1){a(this).addClass("concealed");return}})}f.$items.not(".concealed").addClass("filtered");c.createControls.call(this,e.find(".filtered").length);c.shrink.call(this);c.filter.call(this);c.navigated.call(a(this),0)},clicks:function(b){var c=this;a(c).parent().find(b.nextClass).click(function(){a(c).paginate("next")});a(c).parent().find(b.prevClass).click(function(){a(c).paginate("prev")})},shrink:function(){var d=a(this).find(".concealed");if(d.length===0){return}d.each(function(){var d=a(this),e=parseInt(d.attr("data-x")),f=parseInt(d.attr("data-y")),g=d.parent().data(b);if(!e)e=0;if(!f)f=0;c.transition({$this:d,x:e,y:f,left:e+g.itemWidth/2+"px",top:f+g.itemHeight/2+"px",scale:.001,opacity:0,height:"0px",width:"0px"})})},filter:function(){a(this).find(".filtered").each(function(d){var e=a(this),f=e.parent().data(b),g=Math.floor(d/f.itemsPerRow),h=d%f.itemsPerRow*(f.itemWidth+f.margins),i=g%f.numRows*(f.itemHeight+f.margins),j=Math.floor(d/(f.itemsPerRow*f.numRows));e.attr({"data-x":h,"data-y":i,"data-page":j});if(j===0){e.addClass("stage-center")}else if(j>0){e.addClass("stage-right");h+=e.parent().width()}c.transition({$this:e,x:h,y:i,left:h+"px",top:i+"px",scale:1,opacity:1,height:f.itemHeight+"px",width:f.itemWidth+"px"})})},setPrefixedCss:function(a,b,c){a.css(Modernizr.testAllProps(b,"pfx"),c)},transition:function(a){var b;if(Modernizr.csstransforms&&Modernizr.csstransitions){if(Modernizr.csstransforms3d){b="translate3d("+a.x+"px, "+a.y+"px, 0px) scale3d("+a.scale+", "+a.scale+", "+a.scale+")"}else{b="translate("+a.x+"px, "+a.y+"px) scale("+a.scale+", "+a.scale+")"}c.setPrefixedCss(a.$this,"transform",b)}else{a.$this.animate({left:a.left,top:a.top,opacity:a.opacity,height:a.height,width:a.width},800)}},next:function(){var d=this.data(b),e=this.find(".filtered.stage-center"),f=parseInt(e.first().attr("data-page")),g=f+1,h=this.find(".filtered[data-page="+g+"]");if(h.length===0){return}e.addClass("stage-left").removeClass("stage-center");h.addClass("stage-center").removeClass("stage-right");e.each(function(){var b=a(this),d=parseInt(b.attr("data-x")),e=parseInt(b.attr("data-y")),f=b.height(),g=b.width(),h=b.parent().width();c.transition({$this:a(this),x:d-h,y:e,left:d-h+"px",top:e+"px",scale:1,opacity:1,height:f+"px",width:g+"px"})});h.each(function(b){var e=a(this),f=b%d.itemsPerRow*(d.itemWidth+d.margins),g=parseInt(e.attr("data-y")),h=e.height(),i=e.width();c.transition({$this:a(this),x:f,y:g,left:f+"px",top:g+"px",scale:1,opacity:1,height:h+"px",width:i+"px"})});c.navigated.call(this,g)},prev:function(){var d=this.data(b),e=this.find(".filtered.stage-center"),f=parseInt(e.first().attr("data-page")),g=f-1,h=this.find(".filtered[data-page="+g+"]");if(h.length===0){return}e.addClass("stage-right").removeClass("stage-center");h.addClass("stage-center").removeClass("stage-left");e.each(function(){var b=a(this),d=parseInt(b.attr("data-x")),e=parseInt(b.attr("data-y")),f=b.height(),g=b.width(),h=b.parent().width();c.transition({$this:a(this),x:d+h,y:e,left:d+h+"px",top:e+"px",scale:1,opacity:1,height:f+"px",width:g+"px"})});h.each(function(b){var e=a(this),f=b%d.itemsPerRow*(d.itemWidth+d.margins),g=parseInt(e.attr("data-y")),h=e.height(),i=e.width();c.transition({$this:a(this),x:f,y:g,left:f+"px",top:g+"px",scale:1,opacity:1,height:h+"px",width:i+"px"})});c.navigated.call(this,g)},navigated:function(c){var d=this.data(b),e=this.find(".filtered[data-page="+(c-1)+"]").length>0,f=this.find(".filtered[data-page="+(c+1)+"]").length>0;if(e){a(d.prevClass).addClass("can-nav")}else{a(d.prevClass).removeClass("can-nav")}if(f){a(d.nextClass).addClass("can-nav")}else{a(d.nextClass).removeClass("can-nav")}this.parent().find(d.controls+" span").each(function(b){if(c!=b)a(this).removeClass("active");else a(this).addClass("active")})},createControls:function(c){var d=a(this),e=d.data(b),f=Math.ceil(c/(e.itemsPerRow*e.numRows)),g="",h=0;for(;h<f;h++){g+='<span data-index="'+h+'">'+(h+1)+"</span>"}d.parent().find(e.controls).html(g)}};a.fn.paginate=function(b){if(c[b]){return c[b].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof b==="object"||!b){return c.init.apply(this,arguments)}else{a.error("Method "+b+" does not exist on jQuery.paginate");return false}}})(jQuery);

(function($) {
    var blockbox = 'blockbox',
    $body = $('body'),
    $mask = $('<div></div>', {"class" : "blockbox-mask closed"}),
    $container = $('<div></div>', {"class" : "blockbox-container closed"}),
    $content = $('<div></div>', {"class" : "blockbox-content"}),
    isOpen = false,
    spinnerOpts = { 
        lines: 12, // The number of lines to draw
        length: 7, // The length of each line
        width: 5, // The line thickness
        radius: 10, // The radius of the inner circle
        color: '#F0F0F0', // #rbg or #rrggbb
        speed: 1, // Rounds per second
        trail: 100, // Afterglow percentage
        shadow: true // Whether to render a shadow
    },
    spinnerCss = {
        position: 'fixed',
        zIndex: '7',
        top: '50%',
        left: '50%',
        marginLeft: '-16px',
        marginTop: '-16px'
    },
    $spinner = $('<div class="blockbox-spinner"></div>', spinnerCss).css(spinnerCss),

    methods = {
        init : function(options) {

            return this.each(function() {

                var $this = $(this),
                    container = this,
                    settings = {
                        navFilter : '',
                        animate : {
                            left: 3000,
                            opacity: 0.5
                        }
                    },
                    data = $this.data(blockbox);
                    
                if (options) {
                    $.extend(settings, options);
                }
                
                settings.animateprev = {
                    left : settings.animate.left + 'px',
                    opacity: settings.animate.opacity
                };
                settings.animatenext = {
                    left : '-' + settings.animate.left + 'px',
                    opacity: settings.animate.opacity
                }


                if (!data) {
                    var $links = $this.find('a');

                    data = {
                        settings: settings,
                        $links : $links,
                        navLinks : null,
                        currentIndex : null
                    };
                    
                    // Save our settings for the updateNavLinks function
                    $this.data(blockbox, data);
                    data.navLinks = methods.updateNavLinks.call(this);
                    
                    // Save our new links
                    $this.data(blockbox, data);

                }

                // On a clicked link
                data.$links.click(function(event) {
                    // Ignore it if it's a middle click or ctrl click
                    if (event.which > 1 || event.metaKey) {
                        return true;
                    }
                    event.preventDefault();

                    // Show loading
                    $body.append($spinner);

                    // Update the links that we can navigate through in the preview
                    data.navLinks = methods.updateNavLinks.call(container);

                    // Find which link we're dealing with
                    data.currentIndex = $.inArray(this.href, data.navLinks);

                    // Save data back
                    $this.data(blockbox, data);

                    // Get content
                    methods.loadContent.call(container, this.href);
                });
            });

        },
        
        loadContent : function(url, type) {
            var container = this;
            $spinner.spin();
            $.ajax({
                url : url,
                dataType : 'html',
                data : 'ajax=1',
                success : function(response) {
                    methods.contentLoaded.call(container, response, type);
                }
            });
        },

        /**
         * Called when the content has been returne from the server.
         * Animates neccessary elements and adds events to the new content.
         *
         * @param {HTMLElement} response the html returned from ajax request
         * @param {String|null} type last navigation button clicked
         */
        contentLoaded : function(response, type) {
            var container = this,
                info = $(this).data(blockbox),
                settings = info.settings,
                oppType = type === 'next' ? 'prev' : 'next';
            
            // Trigger the on content removed event for those interested
            $(window).trigger('contentremove.Blockbox');

            if (isOpen) {
                $(response).addClass(type);
            }

            // Insert content
            // if dialog hasn't already been opened, just append it
            if (!type) {
                $content.html(response);
            }
            
            // Content has already been here, place it off screen so we can animate it in
            else {
                $content.css('left', settings['animate' + oppType].left).html(response);
            }

            
            if (!isOpen) {
                // Add close handler to mask (not modal)
                $mask.click(function(e) {
                    e.preventDefault();
                    methods.remove();
                });
                
                // With display: box, the container takes up the entire screen and the mask
                // is underneath, so we add an event to it and test if we've only clicked on the container
                $container.click(function(e) {
                    if (e.target.className === 'blockbox-container') {
                        methods.remove();
                    }
                });

                // Add mask and content to page
                $container.append($content);
                $body.append($mask, $container);

                // And we're open!
                isOpen = true;
            }
            
            
            // Set up nav and nav events
            methods.getNav.call(container, info.currentIndex, info.navLinks.length);
            
            // Remove loading
            $spinner.spin(false);
            
            // Launched for the first time
            if (!type) {
                // Show content
                methods.showBox();
            }
            
            // Preview already open
            else {
                $content.animate({left : '0px', opacity: '1'}, {duration:600, queue:true});
            }

            
            $(window).trigger('contentloaded.Blockbox');
        },
        
        /**
         * Hides or shows the navigation. Adds click events for navigation and close buttons
         * 
         * @param {int} i current index in the navigation
         * @param {int} len length of the navigation links array
         */
        getNav : function(i, len) {
            var container = this,
                $prev = $content.find('.blockbox-nav-prev'),
                $next = $content.find('.blockbox-nav-next');
            if (i === 0) {
                $prev.removeClass('can-nav');
            } else {
                $prev.addClass('can-nav');
                $prev.click(function() {
                    methods.prev.call(container);
                });
            }

            if (i === len - 1) {
                $next.removeClass('can-nav');
            } else {
                $next.addClass('can-nav');
                    $next.click(function() {
                    methods.next.call(container);
                });
            }
            
            // Add close event handler to ajax content div
            $content.find('.blockbox-close').click(function(){
                methods.remove();
            });
            
            // Show the status
            methods.updateStatus($('.filter-options .active').text(), i + 1, len);
        },

        next : function() {
            var container = this,
                info = $(this).data(blockbox),
                url;

            if (info.currentIndex + 1 === info.navLinks.length) {
                console.warn('Cannot go forward, index out of range');
                return;
            } else {
                info.currentIndex++;
            }

            url = info.navLinks[info.currentIndex];

            // Save the data back
            $(this).data(blockbox, info);

            methods.loadContent.call(container, url, 'next');
            $content.animate(info.settings.animatenext, {duration:600, queue:true});

        },

        prev : function() {
            var container = this,
                info = $(this).data(blockbox),
                url;

            if (info.currentIndex - 1 < 0) {
                console.warn('Cannot go back, index out of range');
                return;
            } else {
                info.currentIndex--;
            }

            url = info.navLinks[info.currentIndex];

            // Save the data back
            $(this).data(blockbox, info);
            
            methods.loadContent.call(container, url, 'prev');
            $content.animate(info.settings.animateprev, {duration:600, queue:true});
        },

        hideBox : function() {
            var msUntilClose = 800;
            $container.addClass('closed');
            setTimeout(function() {
                $mask.addClass('closed');
                $(window).trigger('closed.Blockbox');
            }, msUntilClose);
        }, 

        showBox : function() {
            var msUntilOpen = 800;
            $mask.removeClass('closed');
            setTimeout(function() {
                $container.removeClass('closed');
                $(window).trigger('open.Blockbox');
            }, msUntilOpen);
        },

        remove : function() {
            var msUntilRemove = 1500;
            methods.hideBox();
            setTimeout(function() {
                var collection = $mask.add($container);
                collection.remove();
                isOpen = false;
                $(window).trigger('removed.Blockbox');
            }, msUntilRemove);
        },

        updateNavLinks : function() {
            var info = $(this).data(blockbox),
                navLinks = info.settings.navFilter ? $(info.settings.navFilter).get() : info.$links.get(),
                len = navLinks.length,
                i = 0;

            for (; i < len; i++) {
                navLinks[i] = navLinks[i].href;
            }

            return navLinks;
        },
        
        /**
         * Modifies the text at the top right to display the index of the current
         * item and category it has been filtered from
         * 
         * @param {string} category
         * @param {int} position current index
         * @param {int} total total navigation items
         */
        updateStatus : function(category, position, total) {
            $('.blockbox-status').text(category + ' ' + position + '/' + total);
        }
    };
    
    $.fn.blockbox = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.blockbox');
        }    
  
    };
})(jQuery);
