export default class PictureSet
{
    link; // should be the url link
    set = [];
    constructor(linkForApi, small, medium, large)
    {
        this.link = linkForApi;
        this.set.add(small);
        this.set.add(medium);
        this.set.add(large);
    }

    getSet = () => this.set;
}
