$( document ).ready(function() {

    if(window.location.href.includes("problem")){
        $(".dl-horizontal").append(`
            <br><button id="ext_open" class="btn btn-secondary btn-block">View on computer</button>
        `);

        var path = "K:\\Files\\GitHub\\CP2018\\lab\\";

        $("#ext_open").click(function() {
            var url = window.location.href;
            var problem_id = url.substr(url.lastIndexOf('/') + 1);
            location.href = "vscode://file/"+ path + problem_id + ".c";
        });
    } else if(window.location.href.includes("quiz")){
        $('[data-toggle="tab"]').each(function(i, obj) {
            old_text = $(this).html();
            id = $(this).attr("href").slice(-3);
            $(this).html(old_text + "(" + id + ")");
        });
    }


});
