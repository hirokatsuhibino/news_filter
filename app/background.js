//background.js

var CONFIG = {
    KEYWORDS: "jp.co.orangesoft.news_filter.config.keywords",
    URLS: "jp.co.orangesoft.news_filter.config.urls",
    BLOCK_COUNT: "jp.co.orangesoft.news_filter.block_count",
};

window.onload = init;

function init() {
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.cmd == "get_options"){
            sendResponse({
                options: getOptions()
            });
        }else if(request.cmd == "set_options"){
            localStorage[request.key] = request.value;
        }else if(request.cmd == "update_title"){
            if(request.counter !== null && request.counter !== undefined && request.counter > 0){
                chrome.browserAction.setTitle({title: request.counter+' items block.'});
            }else{
                chrome.browserAction.setTitle({title: 'news filters'});
            }
        }
        sendResponse("ok");
      });
}

function getOptions() {
    var options = {
        keywords: [],
        urls: [],
    };

//    console.log('getOptions');
    var text = localStorage[CONFIG.KEYWORDS];
    if(text !== null && text.length > 0){
//        console.log('key='+text);
        var items = text.split(/\r\n|\r|\n/);
        for(var n = 0; n<items.length; ++n){
            if(items[n].length > 0){
                options.keywords.push(items[n]);
            }
        }
    }
    text = localStorage[CONFIG.URLS];
    if(text !== null && text.length > 0){
//        console.log('urls='+text);
        var items = text.split(/\r\n|\r|\n/);
        for(var n = 0; n<items.length; ++n){
            if(items[n].length > 0){
                options.urls.push(items[n]);
            }
        }
    }

    return options;
}

