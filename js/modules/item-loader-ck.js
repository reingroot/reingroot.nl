define(["jquery"],function(e){var t,n,r,i,s,o,u="",a=function(s){t=e(s);o=t.outerWidth();n=t.find(t.data("loaderContainer"));r=n.find(t.data("loaderItems"));t.css("position","relative");i=e(document.createElement("section"));i.addClass("item-wrapper");t.append(i);t.on("transitionend",function(e){var t=parseInt(i.css("left"));switch(u){case"resize":f();break;case"slideOut":p();break;case"":d()}});r.on("click",function(n){var r=e(this),i=r.find("a").attr("href"),s=/\/(item)\//;i=i.replace(s,"/ajax_$1/");l(i,c);n.preventDefault()})},f=function(){u="slideIn";var e=parseInt(i.css("left"));!e==0&&i.css("left",0)},l=function(t,n){e.ajax({type:"POST",url:t,data:{},dataType:"html"}).done(function(e){i.html(e);i.find(".js-to-overview").on("click",function(e){h();e.preventDefault()});i.find(".js-to-next").on("click",function(e){next();e.preventDefault()});i.find(".js-to-previous").on("click",function(e){previous();e.preventDefault()});n&&setTimeout(n,200)})},c=function(){u="resize";t.addClass("no-transition");t.height(t.height());s||(s=t.height());var n=i.outerHeight(),r=parseInt(t.css("paddingTop")),o=parseInt(t.css("paddingBottom")),a=n-(r+o);setTimeout(function(){t.removeClass("no-transition");t.height(a+"px")},0)},h=function(){u="slideOut";i.css("left",o*-1-10+"px")},p=function(){u="";i.addClass("no-transition");t.height(s+"px");i.css("left",o+10+"px");setTimeout(function(){i.removeClass("no-transition")},0)},d=function(){console.log("reset done");t.addClass("no-transition");t.height("auto");setTimeout(function(){t.removeClass("no-transition")},0)};return{init:a,slideIn:f,load:l,slideOut:h}});