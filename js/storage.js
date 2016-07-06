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
//# sourceMappingURL=storage.js.map