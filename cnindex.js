console.log('开始加载 sdk 文件');
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
        
        server_url:'http://apprntest2.debugbox.sensorsdata.cn/sa?project=default',
        // server_url: 'http://liuxing2.debugbox.sensorsdata.cn/sa?project=chuqiangsheng',
        heatmap:{
            
        },
        is_track_single_page:true,
        app_js_bridge:{
            white_list:[
                'http://apprntest2.debugbox.sensorsdata.cn/sa?project=default',
                'http://liuxing2.debugbox.sensorsdata.cn/sa?project=default',
                'https://newsdktest.datasink.sensorsdata.cn/sa?project=weizhangxiang&token=5a394d2405c147ca',
                'http://10.120.81.212:8106/sa?project=default',
                'http://liuxing.debugbox.sensorsdata.cn/sa?project=default',
                'https://newsdktest.datasink.sensorsdata.cn/sa?project=chuqiangsheng&token=5a394d2405c147ca',
                'http://10.120.51.215:8106/sa?project=default&token=schemaLimited-0AUNwDG0'],
        }
    });
        
        sensors.quick('autoTrack');