
;(function(){
    //获取可圈选标签
    function getDefineTags(child){
        var arr = [];
        var DefineTagNum = 0;
        //递归便利获取所有可圈选元素的信息 obj
        function func(obj,index){
            for(var i=0;i<obj.length;i++){
                var target = obj[i];
                var tagname = target.tagName;
                if(tagname === 'A' || tagname === 'BUTTON' || tagname === 'INPUT' ||tagname === 'TEXTAREA'){
                    var tagstore = {
                        level : index,
                        id : 'h' + DefineTagNum
                    };
                    DefineTagNum ++;
                    target.sensorsDefineStore = tagstore;
                    arr.push(target);
                }       
    　　　　　　  if(target.children){
                  func(target.children,index+1);
    　　　　　    }
    　　　　 } 
        }    
        func(child,1);
        return arr;

    }
    function getVisibility(el){
        return (_isVisible(el));

        function _isVisible(el) {
            var p = el.parentNode;
            
            if ( 9 === p.nodeType ) {
                return true;
            }
            if (
                 '0' === _getStyle(el, 'opacity') ||
                 'none' === _getStyle(el, 'display') ||
                 'hidden' === _getStyle(el, 'visibility')
            ) {
                return false;
            }
            var po = el.getBoundingClientRect();
            if ( p ) {
                if ( ('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow')) ) {
                    var parentPo = p.getBoundingClientRect();
                    if (
                        (po.bottom <= parentPo.top)||
                        (po.top >= parentPo.bottom)||
                        (po.right <= parentPo.left)||
                        (po.left >= parentPo.right)
                    ) {  
                        return false;
                    }
                }
                return _isVisible(p);
            }
            return true;
        }
    
        function _getStyle(el, property) {
            if ( window.getComputedStyle ) {
                return document.defaultView.getComputedStyle(el,null)[property];
            }
            if ( el.currentStyle ) {
                return el.currentStyle[property];
            }
        }
    
        
    }
    //zIndex 取值为 level+zIndex
    function getZIndex(el){
        var zIndex = window.getComputedStyle(el,null).getPropertyValue("z-index");
        var indexNum = 0;
        if(zIndex && !isNaN(+zIndex)){
            indexNum = +zIndex;
        }
        if(sdStore._.isObject(el.sensorsDefineStore)){
            indexNum += el.sensorsDefineStore.level;
        }
        return indexNum;
    }
    //获取可圈选子元素
    function getSubElements(el){
        var elementsArr = [];
        function testTag(el){
            if(el.children){
                for(var i=0;i<el.children.length;i++){
                    if(typeof(el.children[i].sensorsDefineStore) == 'object' && el.children[i].sensorsDefineStore.id){
                         elementsArr.push(el.children[i].sensorsDefineStore.id);
                    }
                    testTag(el.children[i]);
                }
            }
        }
        testTag(el);
        return elementsArr;
    }
    //获取元素信息
    function getInfo(el){
        var po = el.getBoundingClientRect();
        var tagname = el.tagName;
        var obj = {
            id : el.sensorsDefineStore.id,
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
            visibility : getVisibility(el),
            $url : location.href,
            $title : document.title,
            zIndex : getZIndex(el),
            subelements : getSubElements(el)
        };
        return obj;
    }
    //获取圈选元素信息返回按序排列好的
    function getTagsInfo(tags){
        var arr = [];
        for(var i=0;i<tags.length;i++){
            arr.push(getInfo(tags[i]));
        }
        return sortIndex(arr);
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
        var tags = getDefineTags(document.children);
        var tagDataArr = getTagsInfo(tags);
        var dataObj = {
            callType : 'visualized_track',
            data : tagDataArr
        };
        console.log(tagDataArr);
        if(typeof window.SensorsData_App_Visual_Bridge === 'object' && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker){
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(dataObj));
        }else if(typeof window.SensorsData_App_Visual_Bridge === 'object' && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode() && window.SensorsData_App_Visual_Bridge.sensorsdata_hover_web_nodes){
            window.SensorsData_App_Visual_Bridge.sensorsdata_hover_web_nodes(JSON.stringify(dataObj));
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
        observe(document.body, options, sdStore._.throttle(callback, 1000));
        sdStore._.addEvent(window,'scroll',sdStore._.throttle(callback, 1000));

    }
   
    
    var sdStore = null;
    window.sa_jssdk_app_define_mode = function(sd){
        sdStore = sd;
        var loaded = false;
        window.addEventListener('load',function(){
            loaded = true;
            getDefineInfo();//获取元素信息
            addDefineListener(getDefineInfo);//添加监控器
        });
        setTimeout(function(){
            if(!loaded){
                getDefineInfo();
                addDefineListener(getDefineInfo);
            }
        },1000);
    };
})();