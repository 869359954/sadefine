
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
            sdk_url:'./sensorsdata.full.js',
            // heatmap_url: './define/heatmap.full.js',
            name: 'sensors',
            is_track_device_id:true,
            source_channel:['bd_vid'],
            source_type:{
                utm:['ls']
            },
            server_url: 'https://test-syg.datasink.sensorsdata.cn/sa?project=liangshuang&token=27f1e21b78daf376',
            heatmap:{
                scroll_notice_map:'not_collect',
                // element_selector:'not_use_id',
            },
            is_track_single_page:true,
            
            use_app_track:true
            });
            
            sensors.quick('autoTrack');
            

            window.SensorsData_APP_JS_Bridge = {
                sensorsdata_define_mode : function(data){
                //    var data = JSON.parse(data);
                    // console.log(data);
                    // if(num > 0){
                    //     console.log('开始渲染');
                    //     setTimeout(() => {
                    //         getEle(data.data);
                    //         num --;
                    //     }, 500);
                        
                    // }
                }
            };
            
