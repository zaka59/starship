// importation de l'instance de Game créée dans Game.js
import Game from "./game";

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    const canvas = document.getElementById("stars");
    /**Création d'une nouvelle instance de Game */
    const game = new Game(canvas);
    const buttonStartStop = document.getElementById("startStop");

    const buttonSound = document.getElementById("sound");

    const buttonMusic = document.getElementById("music");
    /** Ceci permet d'ajouter une nouvelle soucoupe au jeu  */

    document
        .getElementById("nouvelleSoucoupe")
        .addEventListener("click", () => game.addSoucoupes());
    document
        .getElementById("flotteSoucoupes")
        .addEventListener("click", () => game.addAndStopSoucoupes());
    window.addEventListener("keydown", game.keyDownActionHandler.bind(game));
    window.addEventListener("keyup", game.keyUpActionHandler.bind(game));
    buttonStartStop.addEventListener("click", () => game.startStop());

    buttonSound.addEventListener("click", () => game.volume());
    /**On déssine tous les éléments du jeu */
    buttonMusic.addEventListener("click", () => game.playMusique());
    game.moveAndDraw();
    /**Ceci permet de perdre le focus */
};

// cette ligne elle sert a perde le focus des butons cliqués
document.addEventListener("click", function (e) {
    if (document.activeElement.toString() == "[object HTMLButtonElement]") {
        document.activeElement.blur();
    }
});

window.addEventListener("load", init);

//
console.log("le bundle a été généré");
