

var start = document.getElementById('startdefine');
console.log(33);
if(start){
    console.log('66');
    var flag = true;
    console.log('请点击开始可视化');
    start.onclick = function(){
        if(flag){
            var config = {
                sdk_url:'./sensorsdata.full.js',
                name: 'sensors',
                server_url:'https://newsdktest.datasink.sensorsdata.cn/sa?project=weizhangxiang&token=5a394d2405c147ca',
                // server_url: 'http://liuxing2.debugbox.sensorsdata.cn/sa?project=chuqiangsheng',
                // heatmap:{
                //     scroll_notice_map:'not_collect',
                //     // element_selector:'not_use_id',
                // },
                is_track_single_page:true,
                // app_js_bridge:{
                //     white_list:[
                //     'https://newsdktest.datasink.sensorsdata.cn/sa?project=chuqiangsheng&token=5a394d2405c147ca',
                //     'http://10.120.51.215:8106/sa?project=default&token=schemaLimited-0AUNwDG0'],
                // }  
            };
            if(select_auto && select_auto.value){
                switch(select_auto.value){
                    case 'yes':
                        config.heatmap = {};
                        break;
                    case "no":
                        break;
                }
                
            }
            if(select_bridge && select_bridge.value){
                if(select_bridge.value == 'yes'){
                    config.app_js_bridge = {
                        white_list:[
                            'https://newsdktest.datasink.sensorsdata.cn/sa?project=chuqiangsheng&token=5a394d2405c147ca',
                            'http://10.120.51.215:8106/sa?project=default&token=schemaLimited-0AUNwDG0'
                        ]
                        
                    };
                }
            }
            if(server_input && server_input.value){
                config.app_js_bridge.white_list.push(server_input.value);
            }
            
            (function(para) {
                var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
                if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
                    return false;
                }
                w['sensorsDataAnalytic201505'] = n;//'sensors'
                w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
                var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
                for (var i = 0; i < ifs.length; i++) {
                w[n][ifs[i]] = w[n].call(null, ifs[i]);
                }
                if (!w[n]._t) {
                    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
                    x.async = 1;
                    x.src = p;
                    x.setAttribute('charset','UTF-8');
                    w[n].para = para;
                    y.parentNode.insertBefore(x, y);
                }
            })(config);
                
            sensors.quick('autoTrack');
            flag = false;
        }else{
            alert('SDK 重复初始化，请刷新页面重新配置');
        }
       
    };



}else{
    console.log(123);
    (function(para) {
        var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
        if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
            return false;
        }
        w['sensorsDataAnalytic201505'] = n;//'sensors'
        w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
        var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
        for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
        }
        if (!w[n]._t) {
            x = d.createElement(s), y = d.getElementsByTagName(s)[0];
            x.async = 1;
            x.src = p;
            x.setAttribute('charset','UTF-8');
            w[n].para = para;
            y.parentNode.insertBefore(x, y);
        }
    })({

        sdk_url:'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.15.5/sensorsdata.min.js',
        // heatmap_url: './define/heatmap.full.js',
        name: 'sensors',
        is_track_device_id:true,
        source_channel:['bd_vid'],
        source_type:{
            utm:['ls']
        },
        server_url:'http://liuxing.debugbox.sensorsdata.cn/sa?project=default',
        // server_url: 'http://liuxing2.debugbox.sensorsdata.cn/sa?project=chuqiangsheng',
        heatmap:{
            scroll_notice_map:'not_collect',
            // element_selector:'not_use_id',
        },
        is_track_single_page:true,
        
        // use_app_track:'only',
        app_js_bridge:{
            white_list:[
            'http://10.120.81.212:8106/sa?project=default',
            'http://liuxing2.debugbox.sensorsdata.cn/sa?project=default',
            'https://newsdktest.datasink.sensorsdata.cn/sa?project=weizhangxiang&token=5a394d2405c147ca',
            'http://10.120.81.212:8106/sa?project=default',
            'http://liuxing.debugbox.sensorsdata.cn/sa?project=default',
            'https://newsdktest.datasink.sensorsdata.cn/sa?project=chuqiangsheng&token=5a394d2405c147ca',
            'http://10.120.51.215:8106/sa?project=default&token=schemaLimited-0AUNwDG0'],
        }
    });
        
        sensors.quick('autoTrack',{
            $url:'13'
        });
}

var num = 3;
window.ls869 = true;


function drawDefine(data){
    if(window.ls869 == true){
        var tdata = JSON.parse(data);
        if(num > 0){
                    console.log('开始渲染');
                    setTimeout(() => {
                        getEle(tdata.data);
                        num --;
                    }, 500);
        }
    }else{
        return false;
    }
   
}
var webkit = {
    messageHandlers :{
        sensorsdataNativeTracker : {
            postMessage : function(data){
                console.log('ios 成功接收数据');
                console.log('----',data);
                drawDefine(data);
            }
        }
    }
};

var SensorsData_iOS_JS_Bridge = {
    sensorsdata_app_server_url: 'http://10.120.81.212:8106/sa?project=default',
};
var SensorsData_App_Visual_Bridge = {
    sensorsdata_visualized_mode:true,

};
// var SensorsData_APP_JS_Bridge = {
//     sensorsdata_track : function(data){
//         console.log('android APP_JS_Bridge 接收数据',data);
//     },
//     sensorsdata_verify:function(data){
//         console.log('sensorsdata_verify',data);
//         return false;
//     },
//     sensorsdata_visual_verify : function(data){
//         console.log('sensorsdata_visual_verify',data);
//         return true;
//     }
// };
// var SensorsData_APP_New_H5_Bridge = {
//     sensorsdata_get_server_url :function(){
//         return 'https://newsdktest.datasink.sensorsdata.cn/sa?project=weizhangxiang&token=5a394d2405c147ca';

//     },
//     sensorsdata_track : function(data){
//         console.log('android APP_New_H5_Bridge 接收数据',data);
//     }
// };
// var num = 3;
// var SensorsData_App_Visual_Bridge ={
//     sensorsdata_visualized_mode : function(){
//         return true;
//     },
//     sensorsdata_hover_web_nodes:function(data){
//     //    console.log('Android 圈选数据',data);
//        var tdata = JSON.parse(data);
//        if(num > 0){
//                 console.log('开始渲染');
//                 setTimeout(() => {
//                     getEle(tdata.data);
//                     num --;
//                 }, 500);
                
//         }
//     },
//     sensorsdata_visualized_alert_info:function(data){
//         console.log(data);
//     }
// };




function getEle(resultarr){
    for(var i=0;i<resultarr.length;i++){
        var divy = document.createElement('div');
        
        for(var prop in resultarr[i]){
            str = '';
            str = str + prop +':'+resultarr[i][prop];
            var oli = document.createElement('li');
            oli.innerText = str;
            divy.appendChild(oli);
        }
        divy.style.border = '3px solid black';
        document.body.appendChild(divy);
        var odiv = document.createElement('div');
        odiv.id = 'test'+i;
        odiv.style.margin = '0';
        odiv.style.border = '0.5px solid red';
        odiv.style.zIndex = 99999999;
        odiv.style.position = 'absolute';
        odiv.style.top = resultarr[i].top + resultarr[i].scrollY + 'px';
        odiv.style.left = resultarr[i].left + resultarr[i].scrollX + 'px';
        odiv.style.width = resultarr[i].width + 'px';
        odiv.style.height = resultarr[i].height + 'px';
        if(!resultarr[i].visibility){
            odiv.style.visibility='hidden';
        }
        
        document.getElementsByTagName('body')[0].appendChild(odiv);
    }
}
 
            
            
      