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
                url: file,
                success: function (data) {
                    var res = marked(data);
                    $('#markdownout').html(res);
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
    app.get('#:file', main.Main.getFile);
    app.get('', main.Main.default);
    app.run('');
});
//# sourceMappingURL=main.js.map