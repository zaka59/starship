import Mobile from "./Mobile";
import MoveState from "./movestate";
import starshipImgSrc from "../assets/images/vaisseau-ballon-petit.png";

export default class StarShip extends Mobile {
    constructor(y) {
        super(40, y, starshipImgSrc, 0, 8, 48);
        this._moving = MoveState.NONE;
    }

    /**
     * Cette méthode permet de savoir si le vaisseau est
     * en haut ou en bas
     * @returns un booleen
     */
    up() {
        return this._moving === MoveState.UP;
    }
    /**
     * Cette méthode permet de savoir si le vaisseau est
     * en haut ou en bas
     * @returns un booleen
     */
    down() {
        return this._moving === MoveState.DOWN;
    }

    /**
     *
     *
     */
    moveUp() {
        this._deltaY = -Math.abs(this._deltaY);
        this._moving = MoveState.UP;
    }

    /**
     *
     *
     */
    moveDown() {
        this._deltaY = Math.abs(this._deltaY);
        this._moving = MoveState.DOWN;
    }

    move(canvas) {
        //console.log(this._moving);
        if (this.up()) this._y = Math.max(0, this._y + this._deltaY);
        if (this.down())
            this._y = Math.min(
                canvas.height - this._width+6,
                this._y + this._deltaY
            );
    }
    stopMoving() {
        this._moving = MoveState.NONE;
    }
}
