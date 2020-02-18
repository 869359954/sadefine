
;(function(){
    function getDefineTagsAndInfo(child){
        var arr = [];
        function func(obj){
            for(var i=0;i<obj.length;i++){
    　　　　　　  if(obj[i].children){
    　　　　　　　　  func(obj[i].children);
    　　　　　    }
                var tagname = obj[i].tagName;
                if(tagname === 'A' || tagname === 'BUTTON' || tagname === 'INPUT' || tagname === 'TEXTAREA'){
                    arr.push(getInfo(tagname,obj[i]));
                }
    　　　　 }    
        }    
        func(child);
        return arr;
    }
    function getScroll(){
        if(window.pageXOffset !== 'undefined'){
            return{
                x : window.pageXOffset,
                y : window.pageYOffset
            };
        }else{
            return{
                x : document.documentElement.scrollLeft,
                y : document.documentElement.scrollTop
            };
        }
    }
    function getSelector(el){
        function getDomIndex(el){
            if (!el.parentNode) return -1;
            var i=0;
            var nodeName = el.tagName;
            var list = el.parentNode.children;
            for (var n = 0; n < list.length; n++) {
              if (list[n].tagName === nodeName) {
                if(el === list[n]){
                  return i;
                }
                else {
                  i++;
                }
              }
            }
            return -1;
        }
        function selector(el){
            var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : getDomIndex(el);
            if(el.getAttribute && el.getAttribute('id') && heatmap_obj.element_selector !== 'not_use_id'){
              return '#' + el.getAttribute('id');
            }else{
                return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
            }
        }
        function getDomSelector(el,arr){
            if(!el || !el.parentNode || !el.parentNode.children){
                return false;
            }
            arr = arr && arr.join ? arr : [];
            var name = el.nodeName.toLowerCase();
            if (!el || name === 'body' || 1 != el.nodeType) {
                arr.unshift('body');
                return arr.join(' > ');
            }
            arr.unshift(selector(el));
            if (el.getAttribute && el.getAttribute('id') && (heatmap_obj.element_selector !== 'not_use_id')) return arr.join(' > ');
            return getDomSelector(el.parentNode, arr);
        }
        return getDomSelector(el);
    }
    function getContent(el){
        function trim(str){
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
        var textContent = '';
        if (el.textContent) {
            textContent = trim(el.textContent);
          }else if(el.innerText){
            textContent = trim(el.innerText);
          }
          if (textContent) {
            textContent = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
          }
          return textContent;
    }
    function getInfo(tagname,el){
        var po = el.getBoundingClientRect();
        var scroll = getScroll();
        var obj = {
            // el : el,
            $element_content : getContent(el),
            tagName : tagname,
            top : po.top,
            left : po.left,
            scrollX : scroll.x,
            scrollY : scroll.y,
            width : po.width,
            height : po.height,
            scale : window.devicePixelRatio,
            visibility : po.height == 0 ? 1 : 0,
            $url : location.href,
            $element_selector : getSelector(el)
        };
        return obj;
    }
    
    function getDefineInfo(){
        var tagDataArr = getDefineTagsAndInfo(document.children);
        var dataObj = {
            callType : 'visualized_track',
            data : tagDataArr
        };
        console.log(dataObj);
        if(typeof SensorsData_iOS_JS_Bridge === 'object' && SensorsData_iOS_JS_Bridge.sensorsdata_define_mode && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage){
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(dataObj));
        }else if(typeof SensorsData_APP_JS_Bridge === 'object' && SensorsData_APP_JS_Bridge.sensorsdata_define_mode){
            SensorsData_APP_JS_Bridge.sensorsdata_define_mode(JSON.stringify(dataObj));
            // SensorsData_APP_JS_Bridge.sensorsdata_define_mode(dataObj);
        }            
    }
    function addDefineListener(callback){
        function observe (el, options, callback) {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var observer = new MutationObserver(callback);
            observer.observe(el, options);
        }
        var options = {
            childList: true,
            subtree: true,
            attributes: true
        };
        var obj = {
            temp: null,
            callback: callback,
            func: function(){
                clearTimeout(this.temp);
                var that = this;
                this.temp = setTimeout(function(){
                    that.callback();
                },300);
            }
        };
        
        observe(document.body, options, function(){
            console.log('监听到变化');
            obj.func();
        });
    }
    var heatmap_obj = {
        element_selector : ''
    };
    window.sa_jssdk_app_define_mode = function(element_selector){
        heatmap_obj.element_selector = element_selector;
        var flag = false;
        window.addEventListener('load',function(){
            flag = true;
            getDefineInfo();
            addDefineListener(getDefineInfo);
        });
        setTimeout(function(){
            if(!flag){
                getDefineInfo();
                addDefineListener(getDefineInfo);
            }
        },1000);
    };
})();