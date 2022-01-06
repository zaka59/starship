import Mobile from "./Mobile";
import saucerImgSrc from "../images/flyingSaucer-petit.png";

import saucerRougeImgSrc from "../assets/images/flyingSaucer-petit-rouge.png";
import explosion1 from "../assets/images/explotion/explosion1.png";
import explosion2 from "../assets/images/explotion/explosion2.png";
import explosion3 from "../assets/images/explotion/explosion3.png";
import explosion4 from "../assets/images/explotion/explosion4.png";
import explosion5 from "../assets/images/explotion/explosion5.png";
import explosion6 from "../assets/images/explotion/explosion6.png";
import explosion7 from "../assets/images/explotion/explosion7.png";
import explosion8 from "../assets/images/explotion/explosion8.png";
import explosion9 from "../assets/images/explotion/explosion9.png";
import explosion10 from "../assets/images/explotion/explosion10.png";
import explosion11 from "../assets/images/explotion/explosion11.png";

export default class Saucer extends Mobile {
    constructor(x, y, speed = -3) {
        super(x, y, saucerImgSrc, speed, 0, 30);
        // this._moving = null;
        /*Cet attribut permet de savoir si la soucoupe a été touché 
        ou non */
        this._toucher = false;
        this._explosion = 0;
    }

    /**
     * Cette méthode permet de modifier la valeur de l'attribut
     * this._toucher
     */
    set toucher(valeur) {
        this._toucher = valeur;
    }

    get toucher() {
        return this._toucher;
    }
    /**
     * Cette méthode permet de savoir si mobile
     * a atteind la bas du canvas ou non
     * @param {*} canvas
     */
    atteindlebas(canvas) {
        return this._y + this._deltaY === canvas.width;
    }

    /**
     * Cette méthode permet de savoir si
     * le mobile sort par la gauche
     */
    test() {
        //console.log(this.x + this.deltaX);
        return this._x + this._deltaX <= 0;
    }
    /**
     * Cette méthode permet de surcharger
     * la méthode move de sa classe mère
     * de telle sorte que si le mobile atteind la gauche
     * il est supprimé
     */
    move() {
        if (!this.test()) super.move(this._deltaX, this._deltaY);
    }
    get explosion() {
        return this._explosion;
    }

    draw(context) {
        if (this._toucher) this.explosion();
        context.drawImage(this._image, this._x, this._y);
    }

    explosion() {
        this.image.width = 10;
        this._explosion++;
        if (this._explosion <= 23) {
            switch (this._explosion) {
                case 1:
                    this.image.src = explosion1;
                    break;
                case 3:
                    this.image.src = explosion2;
                    break;
                case 5:
                    this.image.src = explosion3;
                    break;
                case 7:
                    this.image.src = explosion4;
                    break;
                case 9:
                    this.image.src = explosion5;
                    break;
                case 11:
                    this.image.src = explosion6;
                    break;
                case 13:
                    this.image.src = explosion7;
                    break;
                case 15:
                    this.image.src = explosion8;
                    break;
                case 17:
                    this.image.src = explosion9;
                    break;
                case 19:
                    this.image.src = explosion10;
                    break;
                case 21:
                    this.image.src = explosion11;
                    break;
                case 23:
                    this.image.src = saucerRougeImgSrc;
                    break;
            }
        }
    }
}
