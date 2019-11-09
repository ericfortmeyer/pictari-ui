import JsonPayload from './JsonPayload';

/**
 * Represents the payload in the response of a POST request
 * 
 * Should have links to the created object if successful
 */
export default class PostPayload extends JsonPayload
{
    /**
     * @type {string}
     * @property {string} url
     */
    url = "";
    
    /**
     * 
     * @param {*} data 
     */
    constructor(data) {
        super(data);
        this.url = data.url;
    }
}
