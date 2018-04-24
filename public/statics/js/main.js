
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



    if (window.localStorage) {
        if (window.localStorage.getItem('tools')
            && window.localStorage.getItem('version')
            && (window.localStorage.getItem('version') >= config.version)) {
            init_typeahead(JSON.parse(window.localStorage.getItem('tools')));
        } else {
            $.ajax({
                type: 'get',
                url: '/api/routes',
                async: true,
                success: function(result){
                    if (result.errCode == 0) {
                        init_typeahead(result.data);
                        window.localStorage.setItem('version', config.version);
                        window.localStorage.setItem('tools', JSON.stringify(result.data));
                    }
                }
            })
        }
    } else {
        $.get("/api/routes", function (result) {
            if (result.errCode == 0) {
                init_typeahead(result.data);
            }
        });
    }
    function init_typeahead(tools){
        var $input = $('.typeahead');
        $input.typeahead({
            source: tools,
            autoSelect: true,
            minLength: 1,
            matcher: function(item) {
                return item.name.toLowerCase().match(this.query.toLowerCase());
            }
        });
        $input.change(function() {
            var current = $input.typeahead("getActive");
            if (current) {
                // Some item from your model is active!
                if (current.name == $input.val()) {
                    window.location.href=current.url
                } else {
                    // This means it is only a partial match, you can either add a new item
                    // or take the active if you don't want new items
                }
            } else {
                // Nothing is active so it is a new value (or maybe empty value)
            }
        });
    }
});

