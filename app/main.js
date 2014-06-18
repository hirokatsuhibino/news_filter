$(function(){

    // 設定
    var timerid = null;

    // 表示をブロックしたいキーワード
    var blockKeywords = [
        "幸福の科学",
        "大川隆法",
        '麗人uno',
       'アズ文庫',
       '産経',
      'ポストセブン',
       "池田信夫",
    ];
    var blocktitlelist = [
        "Pr:",
        "Ad:",
       "池田信夫",
       '産経',
    ];
    // 表示をブロックしたいURL
    var blockUrlList = [
        "sankei",
    ];
    

    $('body').bind('DOMSubtreeModified', function() {
        var url = location.href;
        if(url.indexOf('amazon') != -1){
            amazon();
        }else if(url.indexOf('yahoo') != -1){
            yahoo();
        }else if(url.indexOf('feedly') != -1){
            feedly();
        }else if(url.indexOf('hatena') != -1){
            hatena();
        }
    });


    function amazon() {

        $('span.lrg,span.med.reg').each(function() {
            var val = $(this).text();
            var span = $(this);
            //console.log('>>'+val);
            $.each(blockKeywords, function(index, blockitem) {
                if(blockitem.length > 0 && val.indexOf(blockitem) !== -1){
                    //console.log(val+' hide');
                    span.closest('div.rsltGrid').hide();
                }
            });
        });
    }
    
    function feedly() {

        $('a.title').each(function() {
            test($(this));
        });

        function test(atag) {
            var title = atag.text().trim();
            //console.log('>'+title);
            $.each(blocktitlelist, function(index, blockitem) {
               // console.log(title+','+blockitem+','+title.indexOf(blockitem));
                if(blockitem.length > 0 && title.indexOf(blockitem) === 0){
                    //console.log('>>'+title);
                    atag.parent().parent().hide();
                }
            });
        }
    }

    function hatena() {

        $('a.domain span').each(function() {
            var span = $(this);
            var title = span.text();
            //console.log('>'+title);
            $.each(blockUrlList, function(index, blockitem) {
               // console.log(title+','+blockitem+','+title.indexOf(blockitem));
                if(blockitem.length > 0 && title.indexOf(blockitem) === 0){
                    //console.log('>>'+title);
                    span.closest('li.entry-unit').hide();
                }
            });
        });

        $('a.entry-link').each(function() {
            var title = $(this).text();
            var atag = $(this);
            $.each(blockKeywords, function(index, blockitem) {
                if(blockitem.length > 0 && title.indexOf(blockitem) !== -1){
                    atag.closest('li.entry-unit').hide();
                    console.log(title+' hide');
                }
            });
        });

    }

    function yahoo() {

        $('.itemBox a.js-clip').each(function() {
            var title = $(this).attr('data-title');
            var atag = $(this);
            $.each(blockKeywords, function(index, blockitem) {
                if(blockitem.length > 0 && title.indexOf(blockitem) !== -1){
                    atag.parent().hide();
                    //console.log(title+' hide');
                }
            });
        });
    }

    function init() {
        var getOptions = function() {
//            console.log('a');
            chrome.extension.sendMessage({cmd: "get_options"}, function(response) {
                var options = response.options;
                blockKeywords = options.keywords;
                blocktitlelist = options.keywords;
                blockUrlList = options.urls;
                // if(blockKeywords.length > 0){
                //     $.each(blockKeywords, function(i, val){
                //         console.log(val);
                //     })
                // }
                // if(blockUrlList.length > 0){
                //     $.each(blockUrlList, function(i, val){
                //         console.log(val);
                //     })
                // }
            });
        };

        // 設定を１秒おきに読み直す（ポーリング）
        timerid = setInterval(getOptions, 1000);
    }

    // 初期化
    init();
});
