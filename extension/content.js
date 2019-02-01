$( document ).ready(function() {

    //Problems page
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

        $(".brython").removeClass("hidden");
        $(".btn-exitfullscreen, .btn-fullscreen").hide();
        $(".brython > .box > .box-header").append(
            "<button style='margin:10px' id='btn_editor_toggle' class='btn btn-success pull-right'><i class='fa fa-eye-slash'></i> Toggle Editor</button>"
        );
        $('.brython > .box > .box-body').hide();

        $('#btn_editor_toggle').click(function() {
            $('.brython > .box > .box-body').fadeToggle();
        });
    
    //Quizes Page
    } else if(window.location.href.includes("quiz")){

        function getAnswers(){
            arr_out = []; last_id = ""; pos = -1;
            $("[name^=answer").each(function(j, obj) {
                var case_id = $(this).attr("name").split("[")[1].slice(0, 3);
                if (case_id != last_id){
                    arr_out.push([case_id]);
                    pos++;
                }
                arr_out[pos].push($(this).val());
                last_id = case_id;
            });
            return JSON.stringify(arr_out);
        }

        function saveAnswers(){
            localStorage.setItem("quiz_answers", getAnswers());
        }

        function fillAnswers(answerArray){
            answerArray =  JSON.parse(answerArray);
            current = parseInt(answerArray[0][0]);
            for (var i = 0; i < answerArray.length; i++) {
                num = 1;
                $("[name='answer["+current+"][]']").each(function(j, obj) {
                    $(this).val(answerArray[i][num]);
                    num++;
                });
                current++;
            }            
        }

        //Display case ID
        $('[data-toggle="tab"]').each(function(i, obj) {
            old_text = $(this).html();
            id = $(this).attr("href").slice(-3);
            $(this).html(old_text + "- " + id);
        });

        //Add addition button to the tab
        $(".question-tab").append(
            "<button class='btn btn-info' id='btn_save' title='Save Answers'><i class='fa fa-save'></i></button>&nbsp;"+
            "<button class='btn btn-warning' id='btn_restore' title='Restore Answers'><i class='fa fa-undo'></i></button>&nbsp;"+
            "&nbsp;<button class='btn btn-success' id='btn_export' title='Export Answers'><i class='fa fa-upload'></i></button>&nbsp;"+
            "<button class='btn btn-success' id='btn_import' title='Import Answers'><i class='fa fa-download'></i></button>"
        );

        //Handle additional button click action
        $('#btn_save').click(function() {
            saveAnswers();
        });

        $('#btn_restore').click(function() {
            fillAnswers(localStorage.getItem("quiz_answers"));
        });

        $('#btn_export').click(function() {
            prompt('Export Result', getAnswers());
        });

        $('#btn_import').click(function() {
            importArray = prompt('Import Result');
            fillAnswers(importArray);
        });

        //Handle tab button click action
        $('[data-toggle="tab"]').click(function() {
            $('[data-toggle="tab"]').each(function(i, obj) {
                $(this).removeClass('btn-primary').addClass('btn-default');
            });
            $(this).removeClass('btn-default').addClass('btn-primary');
        });
    }

});