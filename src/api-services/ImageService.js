import ImagePayload from './ImagePayload';
import JsonPayload from './JsonPayload';

export default class ImageService
{
    /**
     * @property {string} apiUrl
     */
    apiUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/images'
        : 'https://pictari-ui.herokuapp.com/api/images'; // put this in config later

    /**
     * @param {string} url
     * @returns {Promise<ImagePayload>}
     */
    fetch(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(json => new ImagePayload(json));
    }

    /**
     * @param {JsonPayload} data
     * @returns {Promise<JsonPayload>}
     */
    post(data) {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => new JsonPayload(json));
    }

    /**
     * @param {string} url 
     * @returns {Promise<any}
     */
    delete(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
