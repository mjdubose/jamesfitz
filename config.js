module.exports.configuration = function () {

    if (process.argv[2] === 'production') {
        return {
            client: 'pg',
            connection: process.env.DATABASE_URL || {
                host: "localhost",
                port: "5432",
                user: "postgres",
                password: "",
                database: ""
            },         
            useNullAsDefault: true
        }
    } else {
        return {
            client: 'sqlite3',
            connection: {
         filename: './database/db.db'
            },
            pool: {
                min: 1,
                max: 1
            },
            useNullAsDefault: true
        };
    }
}