
$('[data-toggle="tooltip"]').tooltip();

$('.btn-copy').click(function () {
    var obj = $(this).data('obj');
    if (!obj) {
        console.log('copy operation obj error', obj);
        return false;
    }
    $(this).zclip({
        path: "/statics/zclip/ZeroClipboard.swf",
        copy: function(){
            return $(obj).val();
        },
        afterCopy: function () { alert('OK'); } /* 复制成功后的操作 */
    });
});

$('.btn-remove').click(function () {
    var obj = $(this).data('obj');
    if (!obj) {
        console.log('remove operation obj error', obj);
        return false;
    }
    $(obj).val('');
});

$('.btn-retweet').click(function () {
    var obj = $(this).data('obj');
    if (!obj) {
        console.log('remove operation obj error', obj);
        return false;
    }
    var arr = obj.split('|');
    if (arr.length != 2){
        console.log('remove operation arr error', obj);
        return false;
    }
    var tmp = $(arr[0]).val();
    $(arr[0]).val($(arr[1]).val());
    $(arr[1]).val(tmp);
});


function genRandStr($num, $has, special)
{
    console.log($num, $has, special);
    $num = $num || 16;
    $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    $str1 = $has ? (special ? special : '!@#$%^&*()_+=-') : '';
    if ($has) {
        $str += $str1;
    }
    $len = $str.length
    $res = '';
    for ($i=0; $i<$num; $i++) {
        $res += $str[Math.floor(Math.random()*$len)];
    }
    return $res;
}