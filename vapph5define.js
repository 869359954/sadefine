
;(function(){
    function getDefineTagsAndInfo(child){
        var arr = [];
        //递归便利获取所有可圈选元素的信息 obj
        function func(obj,index){
            for(var i=0;i<obj.length;i++){
                var target = obj[i];
                target.sensorsIndex = index;
                var tagname = target.tagName;
                if(tagname === 'A' || tagname === 'BUTTON' || tagname === 'INPUT' ||tagname === 'TEXTAREA'|| target.hasAttribute('data-sensors-click')){
                    arr.push(getInfo(tagname,target));
                }
    　　　　　　  if(target.children){
    　　　　　　　　  func(target.children,index+1);
    　　　　　    }               
    　　　　 } 
        }    
        func(child,1);
        return arr;

    }
    function getVisibility(el,height){
        var visibility = window.getComputedStyle(el,null).getPropertyValue("visibility");
        var opacity = window.getComputedStyle(el,null).getPropertyValue("opacity");
        if(height == 0 || visibility == "hidden" || opacity == 0){　
            　　return false;
            }else{
            　　return true;
            
            }
    }
    function getZIndex(el){
        var zIndex = window.getComputedStyle(el,null).getPropertyValue("z-index");
        var indexNum = 0;
        if(zIndex == 'auto' || !zIndex){
            indexNum = 0;
        }else{
            indexNum = +zIndex;
        }
        if(typeof(el.sensorsIndex !== 'undefined')){
            indexNum = indexNum + el.sensorsIndex;
        }
        return indexNum;
    }
    //获取元素信息
    function getInfo(tagname,el){
        // console.log(el);
        var po = el.getBoundingClientRect();
        var obj = {
            // el : el,
            $element_content : sdStore._.getElementContent(el,tagname),
            $element_selector : sdStore.heatmap.getDomSelector(el),
            tagName : tagname,
            top : po.top,
            left : po.left,
            scrollX : window.pageXOffset,
            scrollY : window.pageYOffset,
            width : po.width,
            height : po.height,
            scale : window.devicePixelRatio,
            visibility : getVisibility(el,po.height),
            $url : location.href,
            $title : document.title,
            zIndex : getZIndex(el)
        };
        return obj;
    }
    //根据元素层级排序，前端要求 zIndex 为不重复的值
    function sortIndex(arr){
        arr.sort(function(a,b){
            return a.zIndex - b.zIndex;
        });
        //app 拿到排好序的数组进行依次 +1，不需要 zindex 字段
        for(var i=0;i<arr.length;i++){
            delete arr[i].zIndex;
        }
        return arr;
    }
    //获取元素信息并发送给 app
    function getDefineInfo(){
        var tagDataArr = getDefineTagsAndInfo(document.children);
        var arr = sortIndex(tagDataArr);
        var dataObj = {
            callType : 'visualized_track',
            data : arr
        };
        console.log(arr);
        if(typeof SensorsData_iOS_JS_Bridge === 'object' && SensorsData_iOS_JS_Bridge.sensorsdata_define_mode && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage){
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(dataObj));
        }else if(typeof SensorsData_APP_JS_Bridge === 'object' && SensorsData_APP_JS_Bridge.sensorsdata_define_mode){
            SensorsData_APP_JS_Bridge.sensorsdata_define_mode(JSON.stringify(dataObj));
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
        var throttle = function(func, delay) {            
            var timer = null;            
            return function() {                
                var context = this;               
                var args = arguments;                
                if (!timer) {                    
                    timer = setTimeout(function() {                        
                        func.apply(context, args);                        
                        timer = null;                    
                    }, delay);                
                }            
            };        
        };              
        observe(document.body, options, throttle(callback, 1000));
        sdStore._.addEvent(window,'scroll',throttle(callback, 1000));
    }
    var sdStore = null;
    window.sa_jssdk_app_define_mode = function(sd){
        sdStore = sd;
        var flag = false;
        window.addEventListener('load',function(){
            flag = true;
            getDefineInfo();//获取元素信息
            addDefineListener(getDefineInfo);//添加监控器
        });
        setTimeout(function(){
            if(!flag){
                getDefineInfo();
                addDefineListener(getDefineInfo);
            }
        },1000);
    };
})();