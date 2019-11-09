import ImagePayload from './ImagePayload';
import JsonPayload from './JsonPayload';

export default class ImageService
{
    /**
     * @property {string} apiUrl
     */
    apiUrl = "";

    /**
     * @param {string} url
     * @returns {Promise<ImagePayload>}
     */
    fetch(url) {
        return fetch(url, {
            method: 'GET',
            // cors: 'cors',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        }).then(res => res.json()).then(json => new ImagePayload(json));
    }

    /**
     * @param {string} url 
     * @param {JsonPayload} data
     * @returns {Promise<JsonPayload>}
     */
    post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => new JsonPayload(json));
    }

    // not returning a payload
    // and use the response header to verify
    delete(url) {
        return fetch(url, {
            method: 'DELETE',
            cors: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
