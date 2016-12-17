module.exports.configuration = function () {

    if (process.argv[2] === 'production') {
        return {
            client: 'pg',
            connection: process.env.DATABASE_URL,
            // pool: {
            //     min: 1,
            //     max: 7
            // },
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