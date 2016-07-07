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
                    $('#markdowcontent').html(res);
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
                    main.Main.loadMenu(data);
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
                var cacheMenu = main.storage.retrieve("skm.menu");
                if (cacheMenu) {
                    main.Main.displayMenuFromData(cacheMenu, data);
                }
                else {
                    $.ajax({
                        dataType: "json",
                        url: "json/" + data["menu"] + ".json",
                        success: function (freshMenu) {
                            main.storage.store("skm.menu", freshMenu, 10);
                            main.Main.displayMenuFromData(freshMenu, data);
                        }
                    });
                }
            }
            else {
                $("#nav-bottom-prev").hide();
                $("#nav-bottom-next").hide();
            }
        };
        Main.displayMenuFromData = function (data, pageJSON) {
            console.log("data-menu");
            console.log(data);
            var menu = $("#menu-nav");
            menu.html("");
            var link2name = {};
            $.each(data, function (i, item) {
                menu.append("<li url=\"" + item + "\"><a href=\"" + item + "\">" + i + "</a></li>");
                link2name[item] = i;
            });
            $("li[url^='" + window.location.hash + "']").addClass("active");
            if (pageJSON["prev"]) {
                $("#nav-bottom-prev").html("<a href=\"" + pageJSON["prev"] + "\"><span aria-hidden=\"true\">&larr;</span> " + link2name[pageJSON["prev"]] + "</a>")
                    .show();
            }
            else {
                $("#nav-bottom-prev").hide();
            }
            if (pageJSON["next"]) {
                $("#nav-bottom-next").html("<a href=\"" + pageJSON["next"] + "\">" + link2name[pageJSON["next"]] + "<span aria-hidden=\"true\">&rarr;</span></a>")
                    .show();
            }
            else {
                $("#nav-bottom-next").hide();
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
            if (offset <= 21) {
                offset = 21;
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
    $(window).resize(main.View.fixMenu);
});
var main;
(function (main) {
    var storage = (function () {
        function storage() {
        }
        storage.store = function (key, value, expiresMin) {
            var data = JSON.stringify([value, new Date().getTime() + expiresMin * 60 * 1000]);
            localStorage.setItem(key, data);
        };
        storage.retrieve = function (key) {
            var data = localStorage.getItem(key);
            if (data == null) {
                return null;
            }
            var json = JSON.parse(data);
            if (new Date().getTime() < json[1]) {
                return json[0];
            }
            return localStorage.removeItem(key);
        };
        return storage;
    }());
    main.storage = storage;
})(main || (main = {}));
//# sourceMappingURL=modules.js.map