module.exports.configuration = function () {

    if (process.env.NODE_ENV === 'production') {
        return {
            client: 'pg',
            connection: process.env.DIABLO_DATABASE,
            pool: {
                min: 1,
                max: 7
            },
            useNullAsDefault: true
        }
    } else {
        return {
            client: 'pg',
            connection: {
                host: "localhost",
                port: "5432",
                user: "postgres",
                password: "",
                database: ""
            },
            pool: {
                min: 1,
                max: 7
            },
            useNullAsDefault: true
        };
    }
}