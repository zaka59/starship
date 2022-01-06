import Mobile from "./Mobile";
import shootImgSrc from "../images/tir.png";
import explosion from "../sound/explotion.mp3";
export default class Shoot extends Mobile {
    constructor(x, y) {
        super(x, y, shootImgSrc, 8, 0, 16);
        /* Cet attribut permet de savoir si un  tir a touché un
        soucoupe */
        this._tirTouche = false;
        this._muted = false;
        this._coup = this.sound(explosion);
    }
    /**
     * Cette méthode permet de savoir si un tir est
     * en collision avec une soucoupe
     * si tel es tle cas la méthode renvoie True et
     * False sinon
     * @param {*} saucer une soucoupe
     */
    collision(saucer) {
        const x1 = saucer.x;
        const y1 = saucer.y;
        const x1_1 = this._x;
        const y1_1 = this._y;
        const xP1 = Math.max(x1, x1_1);
        const yP1 = Math.max(y1, y1_1);
        const x2 = x1 + saucer.width;
        const y2 = y1 + saucer.height;
        const x2_1 = x1_1 + this.width;
        const y2_1 = y1_1 + this.height;
        const xP2 = Math.min(x2, x2_1);
        const yP2 = Math.min(y2, y2_1);
        return xP1 < xP2 && yP1 < yP2;
    }
    set muted(value) {
        this._muted = value;
    }
    get muted() {
        return this._muted;
    }
    /**
     * Cette méthode applique les conséquences sur une soucoupe
     * lorsqu'il y a collision
     * @param {*} elt Une soucoupe
     */
    filtre(elt) {
        if (!elt.toucher && this.collision(elt)) {
            if (!this.muted) this._coup.play();
            elt.toucher = true;
            this._tirTouche = true;
            elt.deltaX = 0;
            elt.deltaY = 3;
        }

        return elt;
    }
    /**
     * Cette méthode permet d'appliquer à
     * chacune des soucoupes la con séquences lorsqu'il est en collision avec le
     * tir
     * @param {*} Saucer Une liste de soucoupe
     */
    collisionSaucer(Saucer) {
        Saucer.forEach((elt) => this.filtre(elt));
    }

    /**
     * Cette m"thode permet d'accéder à la valeur de
     * l'attribut this._tirTouche
     */

    get tirTouche() {
        return this._tirTouche;
    }
}
