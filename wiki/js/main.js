var main;
(function (main) {
    var Main = (function () {
        function Main(parameters) {
        }
        Main.getFile = function (context) {
            console.log("print");
            var file = context.params['file'];
            console.log(file);
            $.ajax({
                url: "index.md",
                success: function (data) {
                    document.write(data);
                }
            });
        };
        Main.default = function (context) {
        };
        return Main;
    }());
    main.Main = Main;
})(main || (main = {}));
var app = Sammy();
$(document).ready(new function () {
    app.get('#/p/:file', main.Main.getFile);
    app.get('#/', main.Main.default);
    app.run('#/');
});
//# sourceMappingURL=main.js.map