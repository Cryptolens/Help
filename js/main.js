var main;
(function (main) {
    var Main = (function () {
        function Main(parameters) {
        }
        Main.loadFile = function (context) {
            var file = context.params['file'];
            Main.getFile(file);
        };
        Main.loadFileAnchor = function (context) {
            var result = context.params["splat"];
            console.log(context.params);
            console.log("here");
            console.log(result);
            main.Main.getFile('index');
        };
        Main.getFile = function (filename) {
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
                    }
                    else {
                        $("#markdownout").removeClass("col-md-10").addClass("col-md-12");
                        $("#menu").addClass("hidden");
                    }
                    $("body").fadeIn(300);
                }
            });
        };
        Main.errorPage = function () {
            Main.getFile("404");
        };
        Main.default = function (context) {
            main.Main.getFile('index');
        };
        return Main;
    }());
    main.Main = Main;
})(main || (main = {}));
var app = Sammy();
$(document).ready(new function () {
    app.get('#:file', main.Main.loadFile);
    app.get('', main.Main.default);
    app.run('');
    $(document).scroll(function () {
        var offset = $("#markdownout").offset().top - $(document).scrollTop();
        if (offset <= 0) {
            offset = 0;
        }
        console.log(offset);
        $("#menu-nav").css("top", offset + "px");
    });
});
//# sourceMappingURL=main.js.map