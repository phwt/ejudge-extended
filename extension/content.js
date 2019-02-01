$( document ).ready(function() {

    //Problems page
    if(window.location.href.includes("problem")){

        //Open problem on computer
        $(".dl-horizontal").append(
            "<br><div class='btn-group' style='display:flex' role='group'>"+
            "<button id='ext_open' style='flex:1' class='btn btn-default'>View on computer</button>"+
            "<button id='ext_edit' style='flex:1' class='btn btn-default'><i class='fa fa-edit'></i></button>"+
            "</div>"
        );

        var path = "K:\\Files\\GitHub\\CP2018\\lab\\";

        $("#ext_open").click(function() {
            var url = window.location.href;
            var problem_id = url.substr(url.lastIndexOf('/') + 1);
            location.href = "vscode://file/"+ path + problem_id + ".c";
        });

        //Show hidden editor
        $(".brython").removeClass("hidden");
        $(".btn-exitfullscreen, .btn-fullscreen").hide();
        $(".brython > .box > .box-header").append(
            "<button style='margin:10px' id='btn_editor_toggle' class='btn btn-success pull-right'><i class='fa fa-eye-slash'></i> Toggle Editor</button>"
        );
        $('.brython > .box > .box-body').hide();

        $('#btn_editor_toggle').click(function() {
            $('.brython > .box > .box-body').fadeToggle();
        });
    
    //Quizzes Page
    } else if(window.location.href.includes("quiz")){

        //Read input and return as array
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

        //Save current answers into localStorage
        function saveAnswers(){
            localStorage.setItem("quiz_answers", getAnswers());
        }

        //Fill in answers box with given array
        function fillAnswers(answerArray){
            answerArray =  JSON.parse(answerArray);
            try {
                current = parseInt(answerArray[0][0]);
                for (var i = 0; i < answerArray.length; i++) {
                    num = 1;
                    $("[name='answer["+current+"][]']").each(function(j, obj) {
                        $(this).val(answerArray[i][num]);
                        num++;
                    });
                    current++;
                }
            } catch(err){
                alert("Invalid Input!");
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