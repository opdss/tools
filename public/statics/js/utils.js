var utils = {

    /**
     * 生成随机字符串
     * @param $num 长度
     * @param $has 是否含有特殊字符
     * @param special 特俗字符
     * @returns {string}
     */
    genRandStr: function genRandStr($num, $has, special) {
        $num = $num || 16;
        $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        $str1 = $has ? (special ? special : '!@#$%^&*()_+=-') : '';
        if ($has) {
            $str += $str1;
        }
        $len = $str.length
        $res = '';
        for ($i = 0; $i < $num; $i++) {
            $res += $str[Math.floor(Math.random() * $len)];
        }
        return $res;
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
    getNowDateTime: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },

    getTimestamp : function () {
        return Date.parse(new Date())/1000;
    }
}