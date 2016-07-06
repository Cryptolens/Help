/**
 * Copyright (C) 2016 Artem Los. All rights reserved.
 */
module main {
    export class storage {

        /**
         * Stores a value in the local storage with a certain expiration time.
         * @param key The key
         * @param value The value
         * @param expiresMin The number of minutes this record should exist.
         */
        static store(key: string, value: string, expiresMin: number) {
            var data = JSON.stringify([value, new Date().getTime() + expiresMin * 60 * 1000]);

            localStorage.setItem(key, data);
        }

        /**
         * Attempts to retrieve a certain variable if it has not expired.
         * @param key The key
         */
        static retrieve(key: string) {
            var data = localStorage.getItem(key);

            if (data == null) {
                return null;
            }

            var json = JSON.parse(data);

            // checking time
            if (new Date().getTime() < json[1]) {
                return json[0];
            }

            return localStorage.removeItem(key);

        }
    }
}