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

        var getPath = function(){return localStorage.getItem("code_path")};
        var getLang = function(){return $(".dl-horizontal dd:nth-child(6)").html()};

        function setPath(){
            newPath = prompt("Enter path");
            if(newPath != null){
                localStorage.setItem("code_path", newPath);
                return
            }
            alert("Operation Terminated by user");
        }

        if((getPath() == null) || (getPath() == "")){setPath()}

        $("#ext_open").click(function() {
            var url = window.location.href;
            var problem_id = url.substr(url.lastIndexOf('/') + 1);
            location.href = "vscode://file/"+ getPath() + "/" + problem_id + "." + getLang();
        });

        $("#ext_edit").click(function() {setPath();});

        //Show hidden editor for C and Python only
            if(getLang() == "c" || getLang() == "py"){
            $(".brython").removeClass("hidden");
            $(".btn-exitfullscreen, .btn-fullscreen").hide();
            $(".brython > .box > .box-header").append(
                "<button style='margin:10px' id='btn_editor_toggle' class='btn btn-success pull-right'><i class='fa fa-eye-slash'></i> Toggle Editor</button>"
            );
            $('.brython > .box > .box-body').hide();

            $('#btn_editor_toggle').click(function() {
                $('.brython > .box > .box-body').fadeToggle();
            });
        }
    
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
            return JSON.stringify(arr_out.sort());
        }

        //Save current answers into localStorage
        function saveAnswers(){
            localStorage.setItem("quiz_answers", getAnswers());
        }

        //Fill in answers box with given array
        function fillAnswers(answerArray){
            answerArray = JSON.parse(answerArray).sort();
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
            "<button class='btn btn-success' id='btn_save' title='Save Answers'><i class='icon-save fa fa-save'></i></button>&nbsp;"+
            "<button class='btn btn-warning' id='btn_restore' title='Restore Answers'><i class='fa fa-undo'></i></button>&nbsp;"+
            "<button class='btn btn-danger' id='btn_clear' title='Clear Answers'><i class='fa fa-times'></i></button>&nbsp;"+
            "&nbsp;&nbsp;<button class='btn btn-info' id='btn_export' title='Export Answers'><i class='fa fa-upload'></i></button>&nbsp;"+
            "<button class='btn btn-info' id='btn_import' title='Import Answers'><i class='fa fa-download'></i></button>"
        );

        //Handle additional button click action
        $('#btn_save').click(function() {
            $('.icon-save').removeClass("fa-save").addClass("fa-check").delay(500).queue(function(){
                $(this).removeClass("fa-check").addClass("fa-save").dequeue();
            });
            saveAnswers();
        });

        $('#btn_restore').click(function() {fillAnswers(localStorage.getItem("quiz_answers"));});

        $('#btn_clear').click(function() {$('[name^=answer').val("")});

        $('#btn_export').click(function() {prompt('Export Result', getAnswers());});

        $('#btn_import').click(function() {
            importArray = prompt('Import Result');
            if(importArray != null){
                fillAnswers(importArray);
                return
            }
            alert("Operation Terminated by user");
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