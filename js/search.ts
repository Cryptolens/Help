/**
 * Copyright (C) 2016 Artem Los. All rights reserved.
 */
module main {
    // TODO: do an index once and store later in local var?
    export class search {
        static listOfFiles: any = [];

        static finished: any = [];
        static init = 0;
        static counter = 0;

        static searchDone(text:string):any {

         
            console.log(search.listOfFiles.sort(search.compareSecondColumn));
        }
        static crawl(text:string, fileExtension: string) {
           
            $.when($.ajax({
                url: "md/",
                success: function (data) {
                   
                    $(data).find(`a:contains('.${fileExtension}')`).each(function () {
                        search.init++;
                        search.findInFile(text, $(this).text());
                      
                        //search.listOfFiles.push(this.text())
                    });
                }, error: function () {}
            })).done(function() {
                if(search.counter == search.init)
                {
                    search.searchDone(text);
                }
                });
        }

        static findInFile(text: string, file:string) {
          
            $.when($.get({
                url: `md/${file}`,
                success : function(data) {
                    var counter: number = (data.split("str").length - 1) //4//$(data).find(`a:contains('${text}')`) //$(data).contents.toString().match(`${text}`).length; // 
                    //var counter = 0;
                    if(counter > 0) {
                        search.listOfFiles.push([file,counter]);
                    }
                    search.counter++;
                }
            })).done(function() {
                if(search.counter == search.init)
                 {
                     search.searchDone(text);
                 }});
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

    }
}