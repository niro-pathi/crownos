require('dotenv').config();

const request = require('request');

module.exports = function () {
    const headers = {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.QnASubscriptionKey
    };

    function query(question, counts) {
        return new Promise(
            (resolve, reject) => {
                let url = buildUrl() + '/generateAnswer';
                if (url && headers) {
                    const requestData = {
                        url: url,
                        headers: headers,
                        body: JSON.stringify({
                            question: question,
                            top: counts
                        })
                    };

                    request.post(requestData, (error, response, body) => {
                        if (error || response.statusCode != 200) {
                            reject(error);
                        } else {
                            resolve(body);
                        }
                    });
                } else {
                    reject('The request url or headers is not valid.');
                }
            }
        );
    }

    function getFaqUrl() {
        return new Promise(
            (resolve, reject) => {
                let url = buildUrl();
                if (url && headers) {
                    const requestData = {
                        url: url,
                        headers: headers
                    };

                    request.get(requestData, (error, response, body) => {
                        if (error || response.statusCode != 200) {
                            reject(error);
                        } else {
                            resolve(body);
                        }
                    });
                } else {
                    reject('The request url or headers is not valid.');
                }
            }
        );
    }

    function buildUrl() {
        const url = process.env.QnAKnowledgeServiceURL;
        return url + process.env.QnAKnowledgebaseId;
    }

    return {
        query: query,
        getFaqUrl: getFaqUrl
    };
}();