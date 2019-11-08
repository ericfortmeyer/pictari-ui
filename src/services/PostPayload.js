import JsonPayload from './JsonPayload';

export default class PostPayload extends JsonPayload
{
    url;
    constructor(data) {
        super(data);
        this.url = data.url;
    }
}
