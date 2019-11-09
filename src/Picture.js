/** Represents a picture of course */
export default class Picture
{
    /**
     * 
     * @param {string} data_uri 
     */
    constructor(data_uri) {
        this.data_uri = data_uri;
    }

    /**
     * @returns {string}
     */
    getDataUri() {
        return this.data_uri;
    }
}
