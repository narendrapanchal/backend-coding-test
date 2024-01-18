async function queryAsync(db, query, values) {
    return new Promise((resolve, reject) => {
        if (query.toLowerCase().startsWith('select')) {
            db.all(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } else {
            db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this); 
                }
            });
        }
    });
}
module.exports={queryAsync}