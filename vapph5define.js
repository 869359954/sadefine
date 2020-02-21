
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
    
    function getInfo(tagname,el){
        var po = el.getBoundingClientRect();
        var obj = {
            // el : el,
            $element_content : sdStore._.getElementContent(el,tagname),
            tagName : tagname,
            top : po.top,
            left : po.left,
            scrollX : window.pageXOffset,
            scrollY : window.pageYOffset,
            width : po.width,
            height : po.height,
            scale : window.devicePixelRatio,
            visibility : po.height > 0,
            $url : location.href,
            $element_selector : sdStore.heatmap.getDomSelector(el)
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
    var sdStore = null;
    window.sa_jssdk_app_define_mode = function(sd){
        sdStore = sd;
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