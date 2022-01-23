import StarShip from "./StarShip";
import Saucer from "./Saucer";
import Shoot from "./Shoot";
import menuImgPath from "../images/StarShip-Game.png";
import pauseImgPath from "../images/Game-is-paused.png";
import startImgPath from "../images/Start.png";
import stopImgPath from "../images/Stop.png";
import src from "../sound/frelon-k-requiem-for-the-forest.mp3";
import tir from "../sound/laser.mp3";
import volumeImgPath from "../images/volume.png";
import muteImgPath from "../images/mute.png";
import playMusiqueImgPath from "../images/play.png";
import pauseMusiqueImgPath from "../images/pause.png";
export default class Game {
    constructor(canvas) {
        /* on itialise un canvas */
        this._canvas = canvas;
        /*le contexte de rendu */
        this._context = this._canvas.getContext("2d");
        /* le vaisseau du joueur initialisé*/
        this._starShip = new StarShip(Math.abs(canvas.height / 2));
        this._requete = null;
        this._soucoupes = [];
        this._tir = [];
        this._score = 0;
        this._moveAndDraw = this.moveAndDraw.bind(this);
        this._addSoucoupes = this.addSoucoupes.bind(this);
        this._nIntervId = null;
        this._gamestarted = false;
        this._menu = this.createImage(menuImgPath);
        this._pause = false;
        this._pauseImage = this.createImage(pauseImgPath);
        this._level = 750;
        this._saucerSpeed = -3;
        this._shadow = "";
        this._myMusic = this.sound(src);
        this._coup = this.sound(tir);
        this._muted = false;
        this._playingMusic = false;
    }

    createImage(imagePath) {
        const menuImg = new Image();
        menuImg.width = 650;
        menuImg.src = imagePath;
        return menuImg;
    }
    sound(src) {
        const sound = new Audio();
        sound.src = src;
        sound.type = "audio/wav/mp3";
        document.body.appendChild(sound);

        return sound;
    }
    /**
     * Cette fonction permet de d'ajouter au score une valeur donné
     * cela nous permet de modifier le score du joueur
     * @param valeur la valeur à ajouter au score
     */
    addScore(valeur) {
        this._score += valeur;
    }

    /**
     * Cette fonction permet de de réduire le score d'une valeur donné
     * cela nous permet de modifier le score du joueur
     * @param valeur la valeur à ajouter au score
     */
    reduceScore(valeur) {
        this._score -= valeur;
    }
    /**
     * Cette fonction permet d'accéder au valeur
     * de connaître la valeur du s3core
     * @returns le score du joueur
     */
    get score() {
        return this._score;
    }
    /**
     * Cette fonction permet d'accéder au canvas
     * et permet d'y accéder au canvas
     * @returns le canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Cette méthode permet capturer les touches du clavier
     * @param event l'evenement
     *
     */
    keyDownActionHandler(event) {
        let buttonImage = document.getElementById("startStopImage");
        if (!this._gamestarted) {
            this._gamestarted = true;
            buttonImage.src = stopImgPath;
            return;
        }
        switch (event.key) {
            case "Escape":
                this.startStop();

                break;
            case "A":
            case "a":
                this.addSoucoupes();
                break;
            case "Z":
            case "z":
                this.addAndStopSoucoupes();
                break;
            case "ArrowUp":
            case "Up":
                this._starShip.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this._starShip.moveDown();
                break;
            case " ":
                this.addTir();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this._starShip.stopMoving();
                break;
            case "ArrowDown":
            case "Down":
                this._starShip.stopMoving();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    /**
     * Cette méthode permet d'appliquer les conséquences sur une soucoupe
     * en utilisant (forEach)
     * et ajoute 200 au score si une soucoupe a été touché
     **/
    consequence() {
        this._tir.forEach((elt) => elt.collisionSaucer(this._soucoupes));
        this._tir.forEach((elt) => {
            if (elt.tirTouche) {
                this.addScore(200);
            }
        });
        this._tir = this._tir.filter((elt) => !elt.tirTouche);
    }
    /**
     * Cette méthode permet de déssiner le vaisseau du joueur
     * le faire bouger déssier les tirs, applique la conséquence
     * réduit le score de 1000 si une soupe dépasse le vaisseau
     * et ceux qui dépasse le vaisseau sont donc supprimés
     */
    moveAndDraw() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (!this._gamestarted) {
            this._context.drawImage(this._menu, 150, 150);
        } else {
            this._starShip.move(this._canvas);
            this._starShip.draw(this._context);
            this.consequence();
            this._tir.map((elt) => elt.move());

            this._tir.map((elt) => (elt.muted = this._muted));
            this._tir.map((elt) => elt.draw(this._context));

            this._soucoupes.forEach((elt) => {
                if (elt.test()) {
                    //this._canvas.style.boxShadow  = "-12px 0 8px -1px red";
                    this.reduceScore(1000);
                }
            });
            /* on filtre les soucoupes qui ne dépasse pas 
    le vaisseau du joueur et on actualise dons la liste 
    des soucoupes*/
            this._soucoupes = this._soucoupes.filter((elt) => !elt.test());
            this._soucoupes = this._soucoupes.filter(
                (elt) => !elt.atteindlebas(this._canvas)
            );
            /* On dessine les soucoupes */
            this._soucoupes.map((elt) => elt.move(this._canvas));
            this._soucoupes.map((elt) => elt.draw(this._context));
            /*score.innerHTML permet d'écrire le score actuel
             */
        }
        score.innerHTML = this.score;
        this._requete = window.requestAnimationFrame(this._moveAndDraw);
    }

    /**
     * Cette méthode permet d'ajouter un tir à this._tir
     *
     */
    addTir() {
        this._tir.push(
            new Shoot(this._starShip.x + 35, this._starShip.y + 10)
        );
        if (!this._muted) this._coup.play();
    }

    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get saucerSpeed() {
        return this._saucerSpeed;
    }
    set saucerSpeed(value) {
        this._saucerSpeed = value;
    }
    /**
     * Cette méthode permet d'ajouter un soucoupe au jeu
     * à une ahuteur aléatoire
     *
     */
    addSoucoupes() {
        this._gamestarted = true;
        if (!this._pause) {
            this.adjustLevel();
            const aleaY = Math.floor(
                Math.random() * (this._canvas.height - 30)
            );
            const saucer = new Saucer(
                this._canvas.width,
                aleaY,
                this.saucerSpeed
            );
            this._soucoupes.push(saucer);
        }
    }
    /**
     * Cette méthode provoque la création d'une nouvelle
     * soucoupe à intervalle de 750 ms un nouveau click
     */
    addAndStopSoucoupes() {
        this._gamestarted = true;
        if (this._nIntervId === null) {
            this._nIntervId = setInterval(this._addSoucoupes, this.level);
        } else {
            clearInterval(this._nIntervId);
            this._nIntervId = null;
        }
    }
    adjustLevel() {
        let mobileShadow = "";
        let mobileShadowBlur = 0;
        if (this.score >= 2000) {
            this._shadow = "";
            this.level = 650;
        }
        if (this.score >= 3000) {
            this.level = 600;
            this.saucerSpeed = -4;
            this._shadow = "5px 5px 30px #00cc66";
        }
        if (this.score >= 4000) this.level = 550;
        if (this.score >= 5000) {
            this.level = 500;
            this.saucerSpeed = -5;

            this._shadow = "5px 5px 30px #ffcc00";
        }
        if (this.score >= 6000) this.level = 450;
        if (this.score >= 7000) this.saucerSpeed = -6;
        if (this.score >= 9000) this.level = 400;
        // a partir de la le jeu devient compliquée
        if (this.score >= 11000) {
            this.saucerSpeed = -7;

            this._shadow = "5px 5px 30px #e60000";
        }
        if (this.score >= 13000) this.level = 300;
        if (this.score >= 15000) this.level = 250;
        if (this.score >= 17000) this.saucerSpeed = -7;
        if (this.score >= 19000) {
            this.saucerSpeed = -9;
            /*mobileShadow = "red";
            mobileShadowBlur = 15;*/
            
            this.level = 450;
        }
        if (this.score >= 20000) {
            this.saucerSpeed = -10 ;
           
            this.level = 425;}
        if (this.score >= 22000){
            this.saucerSpeed = -11;
            
            this.level = 400;
        } 
        if (this.score >= 25000) {
            this.saucerSpeed = -17;
            
            this.level = 375;}
        if (this.score >= 30000) {
            this.saucerSpeed = -18;
            
            this.level = 300;}
        this._context.shadowColor = mobileShadow;
        this._context.shadowBlur = mobileShadowBlur;
        this._canvas.style.boxShadow = this._shadow;
    }
    startStop() {
        let buttonImage = document.getElementById("startStopImage");
        if (!this._gamestarted) {
            this._gamestarted = true;
            buttonImage.src = stopImgPath;
            return;
        }
        if (this._requete === null) {
            this.moveAndDraw();
            if(!this._muted && this._playingMusic)
            this._myMusic.play();
            this._pause = false;
            buttonImage.src = stopImgPath;
        } else {
            window.cancelAnimationFrame(this._requete);
            this._requete = null;
            this._myMusic.pause();

            this._pause = true;
            buttonImage.src = startImgPath;
            this._context.drawImage(this._pauseImage, 150, 150);
        }
    }
    volume() {
        let buttonImage = document.getElementById("soundImg");
        if (this._muted) {
            this._muted = false;
            buttonImage.src = muteImgPath;
            if (this._playingMusic) this._myMusic.play();
        } else {
            this._myMusic.pause();
            this._muted = true;
            buttonImage.src = volumeImgPath;
            this._myMusic.pause();
        }
    }
    playMusique() {
        let buttonImage = document.getElementById("musicImg");
        if (!this._playingMusic) {
            if(!this._pause){
            this._playingMusic = true;
            if (!this._muted) this._myMusic.play();
            buttonImage.src = pauseMusiqueImgPath;
            }
        } else {
            this._myMusic.pause();
            this._playingMusic = false;
            buttonImage.src = playMusiqueImgPath;
        }
    }
}
