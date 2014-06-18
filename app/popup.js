$(document).ready(function() {

    var keywords = localStorage.getItem(CONFIG.KEYWORDS);
//  console.log(tocc);
    if(keywords === null){
        keywords = "Pr:\r\nAd:";
    }
    $("#keywords").val(keywords);

    $('#keywords').on('change', function(){
        $('#msg').text($(this).val());
        localStorage.setItem(CONFIG.KEYWORDS, $(this).val());
    });

    var urls = localStorage.getItem(CONFIG.URLS);
//  console.log(tocc);
    if(urls === null){
        urls = "";
    }
    $("#urls").val(urls);

    $('#urls').on('change', function(){
        $('#msg').text($(this).val());
        localStorage.setItem(CONFIG.URLS, $(this).val());
    });
});
