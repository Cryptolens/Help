

module main {

    /**
     * Main
     */
    export class Main {
        constructor(parameters) {

        }

        static loadFile(context: Sammy.EventContext) {
            var file = context.params['file'] as string;
            Main.getFile(file);
        }

        static loadFileAnchor(context: Sammy.EventContext) {
            var result = context.params["splat"];
            console.log(context.params);
console.log("here");
            console.log(result);
             main.Main.getFile('index');
            
        }

        /**
         * Attempts to find the markdown file (without .md extension)
         * and display it to the user.
         * @filename The file name (without .md extension)
         */
        static getFile(filename: string) {
            $("body").hide();
            $.ajax({
                url: "md/" + filename + ".md",
                success: function (data) {
                    var res = marked(data);
                    $('#markdownout').html(res);
                },
                error: Main.errorPage
            });

            $.ajax({
                url: "md/" + filename + ".json",
                success: function (rawData) {
                    var data = JSON.parse(rawData);
                    if (data["title"]) {
                        document.title = data["title"];
                        $("#title").html(data["title"]);
                    }

                    if (data["color"]) {
                        $("#jumbo").css("background-color", data["color"]);
                    }
                    if (data["text"]) {
                        $("#jumbo").css("color", data["text"]);
                    }

                    if (data["showmenu"]) {
                        console.log("here");
                        $("#markdownout").removeClass("col-md-12").addClass("col-md-10");
                        $("#menu").removeClass("hidden");
                    } else {
                        $("#markdownout").removeClass("col-md-10").addClass("col-md-12");
                        $("#menu").addClass("hidden");
                    }

                    $("body").fadeIn(300);
                }
            });
        }

        static errorPage() {
            // this may not fail, otherwise inf loop.
            Main.getFile("404");
        }
        static default(context: Sammy.EventContext) {
            main.Main.getFile('index');
        }

    }
}

var app: Sammy.Application = Sammy();
$(document).ready(new function () {

    app.get('#:file', main.Main.loadFile);
    //app.get('#:file#:any', main.Main.loadFile);
    //app.get(/#\/:file(#.+)?/, main.Main.loadFileAnchor);
    app.get('', main.Main.default);

    app.run('');

    /*    $(document).scroll(function () {
            $('#menu').css('top', $(this).scrollTop());
        });*/

  /*  $('#sidebar').affix({
        offset: {
            top: 245
        }
    });

    var $body = $(document.body);
    var navHeight = 110;

    $body.scrollspy({
        target: '#menu',
        offset: navHeight
    });*/

    $(document).scroll(function(){
        var offset = $("#markdownout").offset().top - $(document).scrollTop();

        if(offset <= 0) {
            offset = 0;
        }
        console.log(offset);
        $("#menu-nav").css("top", offset + "px");
    });

});

