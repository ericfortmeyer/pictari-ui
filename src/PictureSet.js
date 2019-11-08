export default class PictureSet
{
    set = [];
    constructor(small, medium, large)
    {
        this.set.add(small);
        this.set.add(medium);
        this.set.add(large);
    }

    getSet = () => this.set;
}
