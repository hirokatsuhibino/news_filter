$(function(){

    // 設定
    var timerid = null;

    // 表示をブロックしたいキーワード
    var blockKeywords = [
    ];
    var blocktitlelist = [
        "Pr:",
        "Ad:",
    ];
    // 表示をブロックしたいURL
    var blockUrlList = [
        "sankei",
    ];
    
    var counter = 0;

    $('body').bind('DOMSubtreeModified', function() {
        updateTitle(0);
        counter = 0;
        var url = location.href;
        if(url.indexOf('amazon') != -1){
            searchAndHideKeywordItems(items.amazon);
        }else if(url.indexOf('yahoo') != -1){
            searchAndHideKeywordItems(items.yahoo);
        }else if(url.indexOf('feedly') != -1){
            searchAndHideKeywordItems(items.feedly);
        }else if(url.indexOf('hatena') != -1){
            searchAndHideKeywordItems(items.hatena);
        }
        if(counter > 0){
            updateTitle(counter);
        }
    });

    var items = {
        amazon : [
            {target: 'span.lrg,span.med.reg', hide: 'div.rsltGrid'},
            {target: 'div.zg_title a', hide: 'div.zg_itemRow'},
        ],
        feedly : [
            {target: 'a.title', hide: 'div.u5Entry'},
        ],
        hatena : [
            {target: 'a.domain span', hide: 'li.entry-unit'},
        ],
        yahoo : [
            {target: '.js-link>a', hide: 'div.itemBox'},
        ],
    };

    function updateTitle(count) {
        chrome.extension.sendMessage({cmd: "update_title", counter: count}, function(response) {});
    }

    function searchAndHideKeywordItems(pairs) {
        $.each(pairs, function(i, pair){
            $(pair.target).each(function() {
                var val = $(this).text();
                var item = $(this);
                //console.log('>>'+val);
                $.each(blockKeywords, function(index, blockitem) {
                    if(blockitem.length > 0 && val.indexOf(blockitem) !== -1){
                        //console.log(val+' hide');
                        item.closest(pair.hide).hide();
                        counter++;
                    }
                });
            });
        });
    }

    function init() {
        var getOptions = function() {
            chrome.extension.sendMessage({cmd: "get_options", counter: counter}, function(response) {
                var options = response.options;
                blockKeywords = options.keywords;
                blocktitlelist = options.keywords;
                blockUrlList = options.urls;
            });
        };

        // 設定を１秒おきに読み直す（ポーリング）
        timerid = setInterval(getOptions, 1000);
    }

    // 初期化
    init();
});
