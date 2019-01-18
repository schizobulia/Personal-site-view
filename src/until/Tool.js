import axios from 'axios';
import { message } from 'antd';
let Tools = null;
let URL = "http://192.168.88.23:8888/";
let STATICPATH = "http://192.168.88.23:8888/";

class _Tools {
    isUrl(url) {
        return !!url.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
    }

    /**
    *是否是ip地址
    */
    isIp(ip) {
        var pattern = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
        return pattern.test(ip);
    }

    getApiUrl() {
        return URL;
    }

    /**
     * 获取静态资源文件路径
     */
    getStaticPath() {
        return STATICPATH;
    }

    /**
     * get一个请求
     * @param {*} url
     * @param {*} callback
     */
    httpGet(url, callback) {
        axios.get(URL + url, {
        }).then((data) => {
            if (data.status !== 200) { message.error('服务器异常'); return }
            if (data.data.status === 1) {
                callback(data.data)
            } else if (data.data.status === 0) {
                callback(null);
            }
        }).catch((err) => {
            callback(false);
            console.error(err);
        });
    }
    /**
     * 去重
     * @param {*} arr
     */
    heavyArrData(arr) {
        return Array.from(new Set(arr))
    }
    /**
     * 获取元素重复的个数
     * @param {*} arr
     * @param {*} data
     */
    getPriceArr(arr, data) {
        let i = 0;
        arr.map((element) => {
            if (element === data) i++;
        });
        return i;
    }

    /**
     * 将对象转换为数组(不包含内部对象)
     */
    setArrayByObj = (object) => {
        let arr = [];
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                let obj = {};
                const element = object[key];
                obj.title = key;
                obj.content = element;
                obj.key = key;
                if ((typeof obj.content) === 'object') {
                    continue
                }
                arr.push(obj);
            }
        }
        return arr;
    }

    /**
     * 获取objecyt中的属性
     * @param {*} obj
     * @param  {...any} arr
     */
    getAttributeByObj(obj, arr) {
        let result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (arr.indexOf(key) !== -1) {
                    const element = obj[key];
                    result[key] = element;
                }
            }
        }
        return result;
    }


    /**
     * 接受一个对象  并返回新对象
     * @param {*} oldObj
     */
    getNewObj(oldObj) {
        let obj = {};
        obj[new Date().getTime()] = 'i';
        return Object.assign(obj, oldObj);
    }


    /**
     * 格式化时间戳
     * @param {*} time
     */
    formatDate(time) {
        var now = new Date(time),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }


    /**
    * 获取上一个月
    *
    * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
    */
    getPreMonth(date) {
        var arr = date.split('-');
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var days = new Date(year, month, 0);
        days = days.getDate();
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */
    getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }

    httpGetJson(path, callback) {
        axios.get(path, {
        }).then((data) => {
            callback(data.data)
        }).catch((err) => {
            callback(false);
            console.error(err);
        });
    }

    /**将时间戳转为 2018-12-27 15:16:30 */
    time(e) {
        let date = new Date(e);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s
    }
}

function getInstance() {
    if (!Tools) {
        Tools = new _Tools();
    }
    return Tools;
}

export default getInstance();

