

export default (url, body = null) => {

    return new Promise((resolve, reject) => {
/*         const token = JSON.parse(localStorage.getItem("token"));
 */        const reqInit = {};
        if (body) {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            /*             headers.append("Authorization", `Basic ${token}`);*/
            reqInit.body = JSON.stringify(body);
            reqInit.headers = headers;
            reqInit.method = "POST";
        }
        else {
            reqInit.method = "GET";


        }

        fetch(url, reqInit)
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    reject(res.status);
                }
                return res.json();
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};