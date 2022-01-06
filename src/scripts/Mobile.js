export default class Mobile {
    constructor(x, y, imagePath, deltaX = 0, deltaY = 0, width) {
        this._x = x;
        this._y = y;
        this._deltaX = deltaX;
        this._deltaY = deltaY;
        this._width = width;
        this._imagePath = imagePath;
        this._image = this.createImage();
    }

    /**
     * Cette méthode permet de modifier
     * la  vitesse horizontale du mobile
     * @param valeur la nouvelle valeur de la vitesse
     * horizontale
     */
    set deltaX(valeur) {
        this._deltaX = valeur;
    }
    /**
     * Cette méthode permet de modifier
     * la  vitesse verticale du mobile
     * @param valeur la nouvelle valeur de la vitesse
     * verticale
     */
    set deltaY(valeur) {
        this._deltaY = valeur;
    }
    set imagePath(value) {
        this._imagePath = value;
        this._image = this.createImage();
    }
    /**
     * Cette méthode permet de créer une
     * image
     * @param {*} ImgSrc la source de l'image en question
     * @returns l'image
     */
    createImage() {
        const mobileImg = new Image();
        mobileImg.width = this._width;
        mobileImg.src = this._imagePath;
        return mobileImg;
    }

    get image() {
        return this._image;
    }
    /**
     * Cette méthode permet de connaître la largeur de l'image
     * @returns la largeur de l'image
     */
    get width() {
        return this._image.width;
    }
    /**
     * Cette méthode permet de connaître la hauteur de l'image
     * @returns la hauteur de l'image
     */
    get height() {
        return this._image.height;
    }

    /**
     * Cette méthode permet de connaître l'ordonnée du mobile
     * @returns l'ordonnée
     */
    get y() {
        return this._y;
    }
    /**
     * Cette méthode permet de connaître l'abscisse du mobile
     * @returns l'abscisse
     */
    get x() {
        return this._x;
    }

    /**
     * Cette méthode permet de déssiner le mobile dans le
     * con texte de rendu
     * @param {*} context le contexte de rendu
     */
    draw(context) {
        context.drawImage(this._image, this._x, this._y);
    }
    /**
     * Cette méthode permet de faire déplacer le mobile
     * en tenant compte de sa vitesse horizontale
     * et verticale
     */
    move() {
        this._x += this._deltaX;
        this._y += this._deltaY;
    }
    sound(src) {
        const sound = new Audio();
        sound.src = src;
        sound.type = "audio/wav/mp3";
        document.body.appendChild(sound);
        return sound;
    }
}
