import JsonPayload from "./JsonPayload";

export default class ImagePayload extends JsonPayload
{
    data_uris;

    constructor(data) {
        this.data_uris = data.data_uris;
    }
}
