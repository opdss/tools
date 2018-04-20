
$('[data-toggle="tooltip"]').tooltip();

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


function swal_osc(text) {
    swal({
        'title' : text,
        'allowOutsideClick' : true,
        'showConfirmButton' : false,
        'animation' : false,
        'type' : 'success',
        'timer' : 1000,
    })
}

$('document').ready(function () {
    var clipboard_btn_copy = new ClipboardJS('.btn-copy', {
        text: function(trigger) {
            var obj = $($(trigger).data('obj'));
            if (obj.length == 0) {
                return '';
            }
            var text = '';
            if (obj[0].nodeName == 'PRE') {
                text = obj.text();
            } else if (obj[0].nodeName == 'TEXTAREA' || obj[0].nodeName == 'INPUT'){
                text = obj.val();
            }
            return text;
        }
    });

    clipboard_btn_copy.on('success', function(e) {
        /*console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);*/
        e.clearSelection();
        swal_osc("复制成功！");
    });


    var mainClass;
    var divID = 'main';
    var main = $('#'+divID);

    $('#fullscreen').click(function () {
        var divID = 'main';
        if (utils.fullscreen(divID)) {
            mainClass = main.attr('class');
            main.removeAttr('class');
            main.addClass('fullscreen');
            $(this).hide();
            $('#close-fullscreen').show();
        }
    });
    $('#close-fullscreen').click(function () {
        if (utils.closeFullscreen()) {
            main.removeAttr('class');
            main.addClass(mainClass);
            $(this).hide();
            $('#fullscreen').show();
        }
    })
});

