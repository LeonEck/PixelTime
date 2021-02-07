!function(r,e){if("object"==typeof exports){var n=e();"object"==typeof module&&module&&module.exports&&(exports=module.exports=n),exports.randomColor=n}else"function"==typeof define&&define.amd?define([],e):r.randomColor=e()}(this,function(){var r=null,e={};o("monochrome",null,[[0,0],[100,0]]),o("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),o("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),o("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),o("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),o("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),o("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),o("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]);var n=[],t=function(o){if(null!=(o=o||{}).seed&&o.seed===parseInt(o.seed,10))r=o.seed;else if("string"==typeof o.seed)r=function(r){for(var e=0,n=0;n!==r.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=r.charCodeAt(n);return e}(o.seed);else{if(null!=o.seed)throw new TypeError("The seed value must be an integer or string");r=null}var l,c;if(null!=o.count){for(var h=o.count,g=[],d=0;d<o.count;d++)n.push(!1);for(o.count=null;h>g.length;)r&&o.seed&&(o.seed+=1),g.push(t(o));return o.count=h,g}return function(r,e){switch(e.format){case"hsvArray":return r;case"hslArray":return f(r);case"hsl":var n=f(r);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var t=f(r),a=e.alpha||Math.random();return"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+a+")";case"rgbArray":return s(r);case"rgb":return"rgb("+s(r).join(", ")+")";case"rgba":var u=s(r);return a=e.alpha||Math.random(),"rgba("+u.join(", ")+", "+a+")";default:return function(r){var e=s(r);function n(r){var e=r.toString(16);return 1==e.length?"0"+e:e}return"#"+n(e[0])+n(e[1])+n(e[2])}(r)}}([l=function(r){if(n.length>0){var t=u(f=function(r){if(isNaN(r)){if("string"==typeof r)if(e[r]){var n=e[r];if(n.hueRange)return n.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i))return a(i(r)[0]).hueRange}else{var t=parseInt(r);if(t<360&&t>0)return a(r).hueRange}return[0,360]}(r.hue)),o=(f[1]-f[0])/n.length,s=parseInt((t-f[0])/o);return!0===n[s]?s=(s+2)%n.length:n[s]=!0,(t=u(f=[(f[0]+s*o)%359,(f[0]+(s+1)*o)%359]))<0&&(t=360+t),t}var f;return(t=u(f=function(r){if("number"==typeof parseInt(r)){var n=parseInt(r);if(n<360&&n>0)return[n,n]}if("string"==typeof r)if(e[r]){var t=e[r];if(t.hueRange)return t.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var a=i(r)[0];return[a,a]}return[0,360]}(r.hue)))<0&&(t=360+t),t}(o),c=function(r,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return u([0,100]);var n=function(r){return a(r).saturationRange}(r),t=n[0],o=n[1];switch(e.luminosity){case"bright":t=55;break;case"dark":t=o-10;break;case"light":o=55}return u([t,o])}(l,o),function(r,e,n){var t=function(r,e){for(var n=a(r).lowerBounds,t=0;t<n.length-1;t++){var u=n[t][0],o=n[t][1],s=n[t+1][0];if(e>=u&&e<=s){var i=(n[t+1][1]-o)/(s-u);return i*e+(o-i*u)}}return 0}(r,e),o=100;switch(n.luminosity){case"dark":o=t+20;break;case"light":t=(o+t)/2;break;case"random":t=0,o=100}return u([t,o])}(l,c,o)],o)};function a(r){for(var n in r>=334&&r<=360&&(r-=360),e){var t=e[n];if(t.hueRange&&r>=t.hueRange[0]&&r<=t.hueRange[1])return e[n]}return"Color not found"}function u(e){if(null===r){var n=Math.random();return n+=.618033988749895,n%=1,Math.floor(e[0]+n*(e[1]+1-e[0]))}var t=e[0]||0;return r=(9301*r+49297)%233280,Math.floor(t+r/233280*((e[1]||1)-t))}function o(r,n,t){e[r]={hueRange:n,lowerBounds:t,saturationRange:[t[0][0],t[t.length-1][0]],brightnessRange:[t[t.length-1][1],t[0][1]]}}function s(r){var e=r[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=r[1]/100,t=r[2]/100,a=Math.floor(6*e),u=6*e-a,o=t*(1-n),s=t*(1-u*n),i=t*(1-(1-u)*n),f=256,l=256,c=256;switch(a){case 0:f=t,l=i,c=o;break;case 1:f=s,l=t,c=o;break;case 2:f=o,l=t,c=i;break;case 3:f=o,l=s,c=t;break;case 4:f=i,l=o,c=t;break;case 5:f=t,l=o,c=s}return[Math.floor(255*f),Math.floor(255*l),Math.floor(255*c)]}function i(r){r=3===(r=r.replace(/^#/,"")).length?r.replace(/(.)/g,"$1$1"):r;var e=parseInt(r.substr(0,2),16)/255,n=parseInt(r.substr(2,2),16)/255,t=parseInt(r.substr(4,2),16)/255,a=Math.max(e,n,t),u=a-Math.min(e,n,t),o=a?u/a:0;switch(a){case e:return[(n-t)/u%6*60||0,o,a];case n:return[60*((t-e)/u+2)||0,o,a];case t:return[60*((e-n)/u+4)||0,o,a]}}function f(r){var e=r[1]/100,n=r[2]/100,t=(2-e)*n;return[r[0],Math.round(e*n/(t<1?t:2-t)*1e4)/100,t/2*100]}return t});