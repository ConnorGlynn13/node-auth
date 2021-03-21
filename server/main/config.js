module.exports = {
    database: {
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    session: {
        secret: process.env.SEESSION_SECRET || 'secret',
    }
}