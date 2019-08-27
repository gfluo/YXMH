const request = require('request');

function get (url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } 

            if (res.statusCode != 200) {
                reject(Error('本次请求失败'));
            }

            resolve(body);
        })
    })
}

module.exports = {
    get: get 
}