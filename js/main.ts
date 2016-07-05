

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
                success: function (data) {
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

                    if (data["showmenu"] && data["showmenu"] === "true") {
                        console.log("here");
                        $("#markdownout").removeClass("col-md-12").addClass("col-md-10");
                        $("#menu").removeClass().addClass("visible-lg visible-md col-md-2");
                        $("#menu-nav").removeClass("hidden");
                    } else {
                        $("#markdownout").removeClass().addClass("col-md-12");
                        $("#menu").addClass("hidden");
                        $("#menu-nav").addClass("hidden");
                    }
                    main.Main.pageLoaded();
                }, error: main.Main.pageLoaded
            });
        }

        /**
         * Executed when page is loaded (i.e. json and md files obtained).
         */
        static pageLoaded() {

            $("body").fadeIn(300);
            main.View.fixMenu();
        }
        static errorPage() {
            // this may not fail, otherwise inf loop.
            Main.getFile("404");
        }
        static default(context: Sammy.EventContext) {
            main.Main.getFile('index');
        }
    }

    export class View {
        static fixMenu() {
            var offset: number = $("#markdownout").offset().top - $(document).scrollTop();

            if (offset <= 0) {
                offset = 0;
            }

            $("#menu-nav").css("top", offset + "px");
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

    main.View.fixMenu();

    $(document).scroll(main.View.fixMenu);

});

