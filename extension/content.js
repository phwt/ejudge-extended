$( document ).ready(function() {

    if(window.location.href.includes("problem")){
        $(".dl-horizontal").append(`
            <br><button id="ext_open" class="btn btn-secondary btn-block">View on computer</button>
        `);

        $("#ext_open").click(function() {
            var url = window.location.href;
            var problem_id = url.substr(url.lastIndexOf('/') + 1);
            // for(i = 0101; i < 1231+1; i++){
            //     if(i%100 > 31 || i%100 == 0){
            //         continue;
            //     }

            //     var guess = i.toString(10);
            //     if((i).toString(10).length == 3){
            //         guess = '0' + guess;
            //     }

                // console.log("vscode://file/K:\\Files\\GitHub\\CP2018\\lab\\"+guess+"\\"+problem_id+".c");
            // window.open("vscode://file/K:\\Files\\GitHub\\CP2018\\lab\\"+problem_id+".c","_self");
            location.href = "vscode://file/K:\\Files\\GitHub\\CP2018\\lab\\"+problem_id+".c";
            // }
        });
    } else if(window.location.href.includes("quiz")){
        $('[data-toggle="tab"]').each(function(i, obj) {
            old_text = $(this).html();
            id = $(this).attr("href").slice(-3);
            $(this).html(old_text + "(" + id + ")");
        });
    }


});
