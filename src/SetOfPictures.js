/**
 * A set of small, medium, and large variations of a picture
 * @typedef {import('./Picture.js').default} Picture
 */
export default class SetOfPictures
{
    /**
     * @type {string} link - Should be the url link
     * @property
     */
    link = "";
    /**
     * @type {Picture[]} set
     * @property
     */
    set = [];
    /**
     * @param {string} linkForApi - For deleting, et cetera
     * @param {Picture} small
     * @param {Picture} medium
     * @param {Picture} large
     */
    constructor(linkForApi, small, medium, large)
    {
        this.link = linkForApi;
        this.set.push(small);
        this.set.push(medium);
        this.set.push(large);
    }

    getSet = () => this.set;
}
