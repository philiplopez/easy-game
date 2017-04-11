"use strict";
exports.__esModule = true;
function createGame(gameLogic) {
    var lastTimeStamp_ms = null;
    var gameState = gameLogic.initialState();
    function onAnimationFrameRequested(timeStamp_ms) {
        // first time lastTimeStamp_ms will be null so we'll skip the first frame...
        if (lastTimeStamp_ms) {
            // draw current state (i.e. initial or computed last frame)
            var graphicsDescription = gameLogic.graphicsForState(gameState);
            gameLogic.renderToScreen(graphicsDescription);
            // calculate the new game state
            var deltaTime_s = (timeStamp_ms - lastTimeStamp_ms) / 1000;
            gameState = gameLogic.nextState(deltaTime_s, gameState);
        }
        lastTimeStamp_ms = timeStamp_ms;
        window.requestAnimationFrame(onAnimationFrameRequested);
    }
    return {
        start: function () { return window.requestAnimationFrame(onAnimationFrameRequested); }
    };
}
exports.createGame = createGame;
