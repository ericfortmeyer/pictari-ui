export default class Picture
{
    constructor(data_uri) {
        this.data_uri = data_uri;
    }

    getDataUri() {
        return this.data_uri;
    }
}
