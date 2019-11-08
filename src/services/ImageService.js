import ImagePayload from './ImagePayload';
import JsonPayload from './JsonPayload';

export default class ImageService
{
    // returns an ImagePayload type
    fetch(url) {
        return fetch(url, {
            method: 'GET',
            cors: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(json => new ImagePayload(json));
    }

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
        fetch(url, {
            method: 'DELETE',
            cors: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
