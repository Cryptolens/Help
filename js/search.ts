/**
 * Copyright (C) 2016 Artem Los. All rights reserved.
 */
module main {
    // TODO: do an index once and store later in local var?
    export class search {

        // TODO: when sending requests in main, take care of the meta data in this array so that it does not have to be retrieved.
        static listOfFiles: any = [];

        static finished: any = [];
        static init = 0;
        static counter = 0;

        static listOfMeta: any = {};

        static searchDone(text: string): any {



            if (search.listOfFiles.length == 0) {
                $('#markdowcontent').html("No relevant articles found.");
                return;
            }

            $('#markdowcontent').html(`<h3>Search results for '${text}'</h3> <ul>`);

            for (var i = 0; i < search.listOfFiles.length; i++) {

                $('#markdowcontent').html($('#markdowcontent').html() + `<li><a href="#${search.listOfFiles[i][0].replace(".md", "")}">${search.listOfMeta[search.listOfFiles[i][0]]["name"]}</a></li>`);
            }

            //$('#markdowcontent').html("#dd");
        }

        static handleSearch(context: Sammy.EventContext) {
            var query = context.params['query'] as string;
            search.listOfFiles = [];
            search.crawl(query, "md");
            $('#markdowcontent').html("Loading...");

            document.title = `"${query}" results`;
            $("#title").html(`Search`);
            $("#jumbo").css("background-color", "gray");
            $("#jumbo").css("color", "white");
            $("#markdownout").removeClass().addClass("col-md-12");
            $("#menu").addClass("hidden");
            $("#menu-nav").addClass("hidden");
            $("#nav-bottom-prev").hide();
            $("#nav-bottom-next").hide();
        }

        /**
         * Crawls through the content and calls searchDone once complete.
         * @param text The text to search for (aka query)
         * @param fileExtension The file extension without the dot, eg. "md" not ".md"
         */
        static crawl(text: string, fileExtension: string) {

            $.when($.ajax({
                url: "md/",
                success: function (data) {

                    $(data).find(`a:contains('.${fileExtension}')`).each(function () {
                        search.findInFile(text, $(this).text());
                    });
                }, error: function () { }
            })).done(function () {
                // remove, it does not do anything.
            });
        }

        static findInFile(text: string, file: string) {

            var fileWithoutExtension = file.split(".")[0];

            $.when($.get({
                url: `md/${file}`,
                success: function (data) {
                    var counter: number = 0; //4//$(data).find(`a:contains('${text}')`) //$(data).contents.toString().match(`${text}`).length; // 

                    // look through all the keywords in the search expression.

                    var keywords = text.split(" ");
                    for(var i = 0; i < keywords.length; i++) {
                        counter += (data.split(keywords[i]).length - 1);
                        console.log(keywords[i]);
                    }

                    if (counter > 0) {
                        search.init++;
                        search.listOfFiles.push([file, counter]);

                        if (!search.containsItem(search.listOfMeta, file)) {
                            $.when($.get({
                                url: `json/${fileWithoutExtension + ".json"}`,
                                success: function (data) {
                                    search.listOfMeta[file] = { "name": JSON.parse(data)["name"], "summary": JSON.parse(data)["summary"] };
                                    search.counter++;
                                }
                            })).done(function () {
                                if (search.counter == search.init) {
                                    search.searchDone(text);
                                }
                            });
                        }
                    }
                }
            }),
            ).done(function () {
                // remove, it does not do anything.
            });
        }


        static compareSecondColumn(a, b) {
            // from http://stackoverflow.com/a/16097058/1275924
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] > b[1]) ? -1 : 1;
            }
        }

        static containsItem(list, item: string): boolean {

            for (var i = 0; i < list.length; i++) {
                if (list[i][0] == item) {
                    return true;
                }
            }
            return false;
        }

    }
}

