export default class JsonPayload
{
    code;
    _links;

    constructor(data) {
        this.code = data.code;
        this._links = data._links;
    }
}
