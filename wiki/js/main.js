var main;
(function (main) {
    var Main = (function () {
        function Main(parameters) {
        }
        Main.loadFile = function (context) {
            var file = context.params['file'];
            Main.getFile(file);
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
                    $("body").fadeIn(300);
                }
            });
        };
        Main.errorPage = function () {
            Main.getFile("404");
        };
        Main.default = function (context) {
        };
        return Main;
    }());
    main.Main = Main;
})(main || (main = {}));
var app = Sammy();
$(document).ready(new function () {
    app.get('#:file', main.Main.loadFile);
    app.get('#index', main.Main.default);
    app.run('#index');
});
//# sourceMappingURL=main.js.map