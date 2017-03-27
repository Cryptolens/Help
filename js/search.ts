/**
 * Copyright (C) 2016 Artem Los. All rights reserved.
 */
module main {
    // TODO: do an index once and store later in local var?
    export class search {
        static listOfFiles: any = [];
        static findTerm(text:string, fileExtension: string) {
           
            $.ajax({
                url: "md/",
                success: function (data) {
                   
                   //search.listOfFiles = [];
                    $(data).find(`a:contains('.${fileExtension}')`).each(function () {
                      
                        search.findInFile(text, this.text());
                      
                        //search.listOfFiles.push(this.text())
                    });
                }
            });
        }

        static findInFile(text: string, file:string) {
          
            $.get({
                url: `md/${file}`,
                success : function(data) {
                    var counter: number = $(data).find(`*:contains(${text})`).length;
                    console.log(counter);
                    if(counter >= 0) {
                        search.listOfFiles.push([file,counter]);
                    }
                }
            })
        }


        static compareSecondColumn(a, b) {
            // from http://stackoverflow.com/a/16097058/1275924
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        }

    }
}