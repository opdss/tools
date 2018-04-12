var utils = {

    specialStr : '!@#$%^&*()_+=-',
    /**
     * 生成随机字符串
     * @param $num 长度
     * @param $has 是否含有特殊字符
     * @param special 特俗字符
     * @returns {string}
     */
    genRandStr: function genRandStr(num, has, special) {
        num = num || 16;
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        var specialStr = has ? (special ? special : utils.specialStr) : '';
        if (has) {
            str += specialStr;
        }
        var len = str.length
        var res = '';
        for (var i = 0; i < num; i++) {
            res += str[Math.floor(Math.random() * len)];
        }
        return res;
    },

    /**
     * 校验18位身份证是否合法
     * @param idcard
     * @returns {boolean}
     */
    isIC: function (idcard) {
        if (idcard.length != 18) {
            return false;
        }

        $r = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        $sum = 0;
        for ($i = 0; $i < 17; $i++) {
            $sum += idcard[$i] * $r[$i];
        }
        $t = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2];
        return idcard[17].toLowerCase() == $t[$sum % 11];
    },

    /*get : function (url, succFunc) {
     $.get(url,)
     },
     post : function () {

     }*/
    getFmtDateTime: function (timestamp) {
        var date = timestamp && typeof timestamp == 'number' ? new Date(timestamp) : new Date();
        var s1 = "-";
        var s2 = ":";
        var pad = function(num) {
            return num < 10 ? "0" + num.toString() : num;
        }
        return date.getFullYear() + s1 + pad(date.getMonth()+1) + s1 + pad(date.getDate()) + " " + pad(date.getHours()) + s2 + pad(date.getMinutes()) + s2 + pad(date.getSeconds());
    },

    getTimestamp: function (fmtDate) {
        if (fmtDate) {
            return Date.parse(new Date(fmtDate)) / 1000;
        }
        return Date.parse(new Date()) / 1000;
    },

    //得到标准时区的时间的函数
    getZoneTime: function (timezone) {
        //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
        if (typeof timezone !== 'number') {
            timezone = 8;
        }
        var dt = new Date();
        //本地时间与GMT时间的时间偏移差
        var offset = dt.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = dt.getTime() + offset + 3600000 * timezone;
        return utils.getFmtDateTime(utcTime);
    }
}