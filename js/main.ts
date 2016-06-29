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
                url:"md/" + filename + ".json",
                success: function (rawData) {
                    var data = JSON.parse(rawData);
                    if (data["title"]) {
                        document.title = data["title"];
                        $("#title").html(data["title"]);
                    }

                    if(data["color"]) {
                        $("#jumbo").css("background-color", data["color"]);
                    }
                    if(data["text"]){
                        $("#jumbo").css("color", data["text"]);
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
    app.get('', main.Main.default);

    app.run('');
});

