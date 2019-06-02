const User = (db) => {
    let tableName = 'users'
    return {
        /**
         * Add new user
         * @param username
         * @param password
         */
        insert: async (username, password) => {
            username = `${username}`.toLowerCase()
            const result = await db.query(`INSERT INTO ${tableName} (username, password) VALUES ($1, $2);`, [username, password])
                .catch(err => console.log(err))
            return result;
        },
        /**
         * Find user
         * @param id
         */
        find: async (id) => {
            const { rows } = await db.query(`SELECT id, username FROM ${tableName} WHERE id = $1 LIMIT 1;`, [id])
            return rows && rows.length ? rows[0] : null;
        },
        /**
         * Auth check user
         * @param id
         */
         authCheck: async (username, password) => {
            username = `${username}`.toLowerCase()
            const { rows } =  await db.query(`SELECT id, username FROM ${tableName} WHERE username = $1 AND password = $2 LIMIT 1;`, [username, password])
            return rows;
        },
        /**
         * Upgrade user table
         */
        up() {
            db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (` +
                '  id SERIAL PRIMARY KEY,' +
                '  username VARCHAR(225) NOT NULL UNIQUE,' +
                '  password VARCHAR(225) NOT NULL' +
                '); ').catch(err => console.log(err))
        },
        /**
         * Downgrade user table
         */
        down() {
            db.query(`DROP TABLE ${tableName};`)
        }
    }
}
module.exports = User;