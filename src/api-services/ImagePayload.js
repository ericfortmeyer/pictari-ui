import JsonPayload from "./JsonPayload";

/**
 * Represents the payload in a response from a GET request for an image
 */
export default class ImagePayload extends JsonPayload
{
    /**@type {string[]} data_uris */
    data_uris;

    /**@param {Object} - From JSON payload */
    constructor(data) {
        super(data);
        this.data_uris = data.data_uris;
    }
}
