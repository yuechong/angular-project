/**
 * Created by xuchaosheng on 16/5/22.
 */
services.factory("tools", ["$http", "$rootScope", "$timeout","$q", function ($http, $rootScope, $timeout,$q) {
    return {
        $post:function(param){

            if (!param instanceof Object || !param.url) {
                return;
            }  
            var self = this;
            var defer = $q.defer();
            //{url:xx:data:{xx:xx}}          
            $http({
                method: 'post',
                url: param.url,
                data: param.data,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {    
                    var str = [];    
                    for (var p in obj) {    
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));    
                    }    
                    return str.join("&");    
                }   
            }).success(function(resp){
               
                if (resp.value == "session expired" || resp.message == 'session expired' || (resp.message && resp.message.indexOf('Account is logged in by other people') != -1)) {
                    if (self.mobileEnv()) {
                        window.location.href = '/trend-new-BI/mobileMain.html';
                    } else {
                        window.location.href = '/trend-new-BI/main.html';
                    }
                    return;
                }
                if(resp.success){
                    defer.resolve(resp);
                }else{
                    defer.reject(resp);
                }
            }).error(function(err){
                defer.reject(err);
            });

            return defer.promise;
        },
        $get:function(param){

            if (!param instanceof Object || !param.url) {
                return;
            }
            var self = this;
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: param.url,
                params: param.data || {},
                headers: {
                    'Accept': 'application/json, text/javascript, */*'
                }
            }).success(function (resp) {
                $rootScope.$broadcast('loading_off');
                if (resp.value == "session expired" || resp.message == 'session expired' || (resp.message && resp.message.indexOf('Account is logged in by other people') != -1)) {
                    if (self.mobileEnv()) {
                        window.location.href = '/trend-new-BI/mobileMain.html';
                    } else {
                        window.location.href = '/trend-new-BI/main.html';
                    }
                }
                if(resp.success){
                    defer.resolve(resp);
                }else{
                    defer.reject(resp);
                }
            }).error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        },
        get: function (param) {
            var self = this;
            if (!param instanceof Object || !param.url) {
                return;
            }

            $rootScope.$broadcast('loading');
            $http({
                method: param.method || 'GET',
                url: param.url,
                params: param.data || {},
                headers: {
                    'Accept': 'application/json, text/javascript, */*'
                }
            }).success(function (resp) {
                $rootScope.$broadcast('loading_off');
                if (resp.value == "session expired" || resp.message == 'session expired' || (resp.message && resp.message.indexOf('Account is logged in by other people') != -1)) {
                    if (self.mobileEnv()) {
                        window.location.href = '/trend-new-BI/mobileMain.html';
                    } else {
                        window.location.href = '/trend-new-BI/main.html';
                    }
                }
                param.succ && param.succ(resp);
            }).error(function (resp) {
                $rootScope.$broadcast('loading_off');
                param.fail && param.fail(resp);
            });
        },
        post: function (param) {
            var self = this;
            if (!param instanceof Object || !param.url) {
                return;
            }

            $http({
                method: 'post',
                url: param.url,
                data: param.data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).success(function (resp) {
                if (resp.value == "session expired" || resp.message == 'session expired' || resp.message.indexOf('Account is logged in by other people') != -1) {
                    if (self.mobileEnv()) {
                        window.location.href = '/trend-new-BI/mobileMain.html';
                    } else {
                        window.location.href = '/trend-new-BI/main.html';
                    }
                }
                param.succ && param.succ(resp);
            });
        },
        /*
         * 清除字符串两端的空格
         * */
        trim: function (str) {
            if (!str instanceof String)
                return str;
            var res = str.replace(/^\s+|\s+$/gi, "");
            return res;
        },
        /*
         * alert指令的简便调用模式
         * */
        alert: function (title, content) {
            $rootScope.$broadcast('alert', title, content);
            return false;
        },
        /*
         * confirm指令的简便调用模式
         * */
        confirm: function (config) {
            if (!config) {
                $rootScope.$broadcast('CONFIRM_OFF_EV');
                return;
            }
            $rootScope.$broadcast('CONFIRM_EV', config);
        },
        /*
         * info指令的简便调用模式
         * */
        msg: function (content) {
            $rootScope.$broadcast('MESSAGE_EV', content);
        },
        /*
         * 检查一个对象是否为空
         * */
        isEmpty: function (obj) {
            for (var i in obj) {
                return false;
            }
            return true;
        },
        /*
         * 用于跨页面保存数据
         * */
        data: {
            data: {
                itemlist: {
                    checkboxlist: {},
                    chartlist: {},
                    radiolist: {},
                    betweenlist: {},
                    selectlist: {},
                    datelist: {},
                    sheetlist: {},
                    notelist: {},
                    syncdatalist: {}
                }
            },
            setItem: function (key, value) {
                this.data[key] = value;
            },
            getItem: function (key) {
                return this.data[key];
            },
            delItem: function (key) {
                delete this.data[key];
            }
        },
        identifier: function () {
            var name = "";
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (var i = 0; i < 20; i++) {
                name += chars[Math.floor(Math.random() * 25)];
            }
            return name;
        },
        makeConditionId: function () {
            var id = "";
            var chars = '0123456789';
            for (var i = 0; i < 20; i++) {
                id += chars[Math.ceil(Math.random() * 9)];
            }
            return id;
        },
        tmpId: function () {
            var id = "";
            var chars = '0123456789';
            for (var i = 0; i < 20; i++) {
                id += chars[Math.ceil(Math.random() * 9)];
            }
            return Number(id);
        },
        fieldId: function () {
            return Math.floor(Math.random() * Math.random() * 10000000000);
        },
        isPreviewing: function () {
            return window.location.hash.indexOf("system") != -1;
        },
        isEditing: function () {
            return window.location.hash.indexOf("editor") != -1;
        },
        storage: {
            //var localStorage = window.localStorage;
            setItem: function (key, value) {
                window.localStorage.setItem(key, value);
            },
            getItem: function (key) {
                return window.localStorage.getItem(key);
            },
            removeItem: function (key) {
                window.localStorage.removeItem(key)
            }
        },
        gridwidth: function () {
            return Math.floor((window.screen.width * 0.95) / 80);
        },
        dragcontentwidth: function () {
            return (Math.floor((window.screen.width * 0.95) / 80)) * 80
        },
        screenCapture: function () {
            html2canvas(document.body).then(function (canvas) {
                $('.imgsrc').val(canvas.toDataURL())
            });
        },
        jsonToQueryStr: function (json) {
            var result = [];
            for (var i in json) {
                result.push(i + '=' + json[i]);
            }
            return result.join('&');
        },
        img2base64: function (src) {
            var c = document.createElement("canvas");
            c.width = 250;
            c.height = 250;
            var cxt = c.getContext("2d");
            var img = new Image();
            img.src = src;
            cxt.drawImage(img, 0, 0);
            var dd = c.toDataURL();
            console.log(dd)
        },
        userConfig: null,
        updateUserConfig: function (cb) {
            var self = this;
            if (!self.userConfig) {
                return;
            }

            var json_ = JSON.stringify(self.userConfig).replace(/:null/gi, ':""');
            this.get({
                url: '/Ibm-Client/updateUserConfig.htm',
                data: {
                    configInfo: json_
                },
                succ: function (resp) {
                    if (resp.success) {
                        cb && cb();
                    }
                }
            });
        },
        getUserConfig: function () {
            return this.userConfig;
        },
        initUserConfig: function (value) {
            this.userConfig = value.userConfig || {};
            this.userInfo = value;
        },
        refresh: function () {
            $timeout(function () {
            }, 0);
        },
        mobileEnv: function () {
            return window.location.href.indexOf('mobileMain') != -1;
        },
        isJiaguwen: function () {
            return window.location.host == 'app315.trenddata.cn';
        },
        isQushu: function () {
            return window.location.host == 'bi.trenddata.cn' || window.location.host == '127.0.0.1:8080';
        }
    }
}]);
services.factory('tmp', [function () {
    return {
        data: {}
    }
}]);
services.factory('chartOptions', function () {
    return {}
});
services.factory('userConfig', ['tools', "$rootScope", function (tools, $rootScope) {
    return {
        data: null,
        initUserConfig: function (val) {
            this.data = (val && val.userConfig) ? val.userConfig : {};
            window.localStorage.setItem('userConfig', JSON.stringify(this.data)); // 在本地记录userConfig,这样当用户不经登录并且来获取userConfig的时候能和线上的一致
        },
        getUserConfig: function () {
            this.data = this.data || JSON.parse(window.localStorage.getItem('userConfig'));
            return this.data;
        },
        updateUserConfig: function (cb) {
            var self = this;
            if (!self.data) {
                return;
            }
            tools.get({
                url: '/Ibm-Client/updateUserConfig.htm',
                data: {
                    configInfo: JSON.stringify(self.data)
                },
                succ: function (resp) {
                    if (resp.success) {
                        cb && cb();
                        window.localStorage.setItem('userConfig', JSON.stringify(self.data)); // 在本地记录userConfig,这样当用户不经登录并且来获取userConfig的时候能和线上的一致
                    }
                }
            });
        }
    }
}]);