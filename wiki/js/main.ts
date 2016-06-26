module main {

    /**
     * Main
     */
    export class Main {
        constructor(parameters) {

        }

        static getFile(context: Sammy.EventContext) {
            console.log("print");
            var file = context.params['file'] as string;
            console.log(file);
            $.ajax({
                url: file,
                success: function (data) {
                    var res = marked(data);
                    $('#markdownout').html(res);
                }

            });
        }

        static default(context: Sammy.EventContext) {
            //
        }

    }
}

var app: Sammy.Application = Sammy();
$(document).ready(new function () {

    app.get('#:file', main.Main.getFile);
    app.get('', main.Main.default);
    app.run('');
});

