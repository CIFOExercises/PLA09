export async function ajaxRequest(endpoint, method, data = {}, responseType = "text") {
    let datos = new FormData()

    for (let prop in data) {
        console.log(prop, data)
        datos.append(prop, data[prop])
    }

    let headers = {
        method: method
    }

    if (method !== 'post') {
        headers.body = data
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint, headers)
            .then(res => {
                if (res.ok) {
                    switch (responseType) {
                        case 'json': return res.json()
                        case 'text': return res.text()
                        case 'blob': return res.blob()

                        default: throw ('Tipo de respuesta no válido');
                    }
                } else {
                    console.log(res)
                    throw ('Algo ha ido mal en la petición')
                }
            })
            .then(msg => {
                console.log(msg)
                resolve(msg)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}