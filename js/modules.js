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
var main;
(function (main) {
    var search = (function () {
        function search() {
        }
        search.searchDone = function (text) {
            search.listOfFiles.sort(search.compareSecondColumn);
            if (search.listOfFiles.length == 0) {
                $('#markdowcontent').html("No relevant articles found.");
                return;
            }
            $('#markdowcontent').html("<h3>Search results for '" + text + "'</h3><br>");
            for (var i = 0; i < search.listOfFiles.length; i++) {
                if (search.listOfFiles[i][0] == "404.md") {
                    continue;
                }
                if (search.listOfFiles[i][0] == "index.md") {
                    continue;
                }
                $('#markdowcontent').html($('#markdowcontent').html() + ("<h4><a href=\"#" + search.listOfFiles[i][0].replace(".md", "") + "\">" + search.listOfMeta[search.listOfFiles[i][0]]["name"] + "</a></h4>\n                <p>" + search.listOfMeta[search.listOfFiles[i][0]]["summary"] + "</p><hr>"));
            }
        };
        search.handleSearch = function (context) {
            var query = context.params['query'];
            search.listOfFiles = [];
            search.crawl(query, "md");
            $('#markdowcontent').html("Loading...");
            document.title = "\"" + query + "\" results";
            $("#title").html("Search");
            $("#jumbo").css("background-color", "gray");
            $("#jumbo").css("color", "white");
            $("#markdownout").removeClass().addClass("col-md-12");
            $("#menu").addClass("hidden");
            $("#menu-nav").addClass("hidden");
            $("#nav-bottom-prev").hide();
            $("#nav-bottom-next").hide();
        };
        search.crawl = function (text, fileExtension) {
            $.when($.ajax({
                url: "md/",
                dataType: "html",
                success: function (data) {
                    $(data).find("a:contains('." + fileExtension + "')").each(function () {
                        search.findInFile(text, $(this).text());
                    });
                }, error: function () { }
            })).done(function () {
            });
        };
        search.findInFile = function (text, file) {
            var fileWithoutExtension = file.split(".")[0];
            $.when($.get({
                url: "md/" + file,
                dataType: "text",
                success: function (data) {
                    var counter = 0;
                    var keywords = text.trim().replace("  ", " ").toLowerCase().split(" ");
                    for (var i = 0; i < keywords.length; i++) {
                        if (keywords[i].length == 1) {
                            continue;
                        }
                        counter += (data.toLowerCase().split(keywords[i]).length - 1);
                    }
                    search.init++;
                    if (!search.containsItem(search.listOfMeta, file)) {
                        $.when($.get({
                            url: "json/" + (fileWithoutExtension + ".json"),
                            dataType: "json",
                            success: function (data) {
                                if (data["name"] != null) {
                                    for (var i = 0; i < keywords.length; i++) {
                                        if (keywords[i].length == 1) {
                                            continue;
                                        }
                                        counter += 20 * (data["name"].toLowerCase().split(keywords[i]).length - 1);
                                    }
                                }
                                if (data["summary"] != null) {
                                    for (var i = 0; i < keywords.length; i++) {
                                        if (keywords[i].length == 1) {
                                            continue;
                                        }
                                        counter += 10 * (data["summary"].toLowerCase().split(keywords[i]).length - 1);
                                    }
                                }
                                if (counter > 0) {
                                    search.listOfFiles.push([file, counter]);
                                }
                                search.listOfMeta[file] = { "name": data["name"], "summary": data["summary"], "count": counter };
                                search.counter++;
                            }
                        })).done(function () {
                            if (search.counter == search.init) {
                                search.searchDone(text);
                            }
                        });
                    }
                }
            })).done(function () {
            });
        };
        search.compareSecondColumn = function (a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] > b[1]) ? -1 : 1;
            }
        };
        search.containsItem = function (list, item) {
            for (var i = 0; i < list.length; i++) {
                if (list[i][0] == item) {
                    return true;
                }
            }
            return false;
        };
        search.listOfFiles = [];
        search.finished = [];
        search.init = 0;
        search.counter = 0;
        search.listOfMeta = {};
        return search;
    }());
    main.search = search;
})(main || (main = {}));
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
            main.Main.getFile('index');
        };
        Main.getFile = function (filename) {
            $("body").hide();
            this.loadPageMD(filename);
            this.loadPageJSON(filename);
        };
        Main.loadPageMD = function (filename) {
            $.ajax({
                url: "md/" + filename + ".md?d=" + Date.now(),
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
                url: "json/" + filename + ".json?d=" + Date.now(),
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
                    main.Main.loadMenu(data);
                    main.Main.pageLoaded();
                }, error: main.Main.pageLoaded
            });
        };
        Main.loadMenu = function (data) {
            if (data["showmenu"] && data["showmenu"] === "true") {
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
                var cacheMenu = main.storage.retrieve("skm.menu." + data["menu"]);
                if (cacheMenu) {
                    main.Main.displayMenuFromData(cacheMenu, data);
                }
                else {
                    $.ajax({
                        dataType: "json",
                        url: "json/" + data["menu"] + ".json?d=" + Date.now(),
                        success: function (freshMenu) {
                            main.storage.store("skm.menu." + data["menu"], freshMenu, 10);
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
    app.get('#/search/:query', main.search.handleSearch);
    app.get('#:file', main.Main.loadFile);
    app.get('', main.Main.default);
    app.run('');
    main.View.fixMenu();
    $(document).scroll(main.View.fixMenu);
    $(window).resize(main.View.fixMenu);
    $(function () {
        $('#searchform').on('submit', function (e) {
            e.preventDefault();
            var data = $("#searchquery").val();
            window.location.href = "/#/search/" + encodeURIComponent(data);
            $("#searchquery").val("");
            return false;
        });
    });
});
//# sourceMappingURL=modules.js.map