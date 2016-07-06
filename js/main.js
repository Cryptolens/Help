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
            this.loadPageMD(filename);
            this.loadPageJSON(filename);
        };
        Main.loadPageMD = function (filename) {
            $.ajax({
                url: "md/" + filename + ".md",
                success: function (data) {
                    var res = marked(data);
                    $('#markdownout').html(res);
                },
                error: Main.errorPage
            });
        };
        Main.loadPageJSON = function (filename) {
            $.ajax({
                dataType: "json",
                url: "json/" + filename + ".json",
                success: function (data) {
                    console.log(data);
                    if (data["title"]) {
                        document.title = data["title"];
                        $("#title").html(data["title"]);
                    }
                    console.log(data["color"]);
                    if (data["color"]) {
                        $("#jumbo").css("background-color", data["color"]);
                    }
                    if (data["text"]) {
                        $("#jumbo").css("color", data["text"]);
                    }
                    this.loadMenu(data);
                    main.Main.pageLoaded();
                }, error: main.Main.pageLoaded
            });
        };
        Main.loadMenu = function (data) {
            if (data["showmenu"] && data["showmenu"] === "true") {
                console.log("here");
                $("#markdownout").removeClass("col-md-12").addClass("col-md-10");
                $("#menu").removeClass().addClass("visible-lg visible-md col-md-2");
                $("#menu-nav").removeClass("hidden");
            }
            else {
                $("#markdownout").removeClass().addClass("col-md-12");
                $("#menu").addClass("hidden");
                $("#menu-nav").addClass("hidden");
            }
            if (data["menu"]) {
                var menu = $("#menu-nav");
                menu.html("");
                var cacheMenu = main.storage.retrieve("skm.menu");
                var menuData;
                if (cacheMenu) {
                    menuData = cacheMenu;
                }
                else {
                    $.ajax({});
                }
                $.each(menuData["menu"], function (i, item) {
                    console.log(i + item);
                    menu.append("<li id=\"\"><a href=\"" + item + "\">" + i + "</a></li>");
                });
                $();
            }
        };
        Main.pageLoaded = function () {
            $("body").fadeIn(300);
            main.View.fixMenu();
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
    var View = (function () {
        function View() {
        }
        View.fixMenu = function () {
            var offset = $("#markdownout").offset().top - $(document).scrollTop();
            if (offset <= 0) {
                offset = 0;
            }
            $("#menu-nav").css("top", offset + "px");
        };
        return View;
    }());
    main.View = View;
})(main || (main = {}));
var app = Sammy();
$(document).ready(new function () {
    app.get('#:file', main.Main.loadFile);
    app.get('', main.Main.default);
    app.run('');
    main.View.fixMenu();
    $(document).scroll(main.View.fixMenu);
});
//# sourceMappingURL=main.js.map