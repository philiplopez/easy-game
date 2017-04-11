export interface GameLogic<GameState, GraphicsDescription> {
    initialState() : GameState
    nextState(deltaTime_s : number, prev : GameState) : GameState
    graphicsForState(state : GameState) : GraphicsDescription
    renderToScreen(graphicDescription : GraphicsDescription) : void
}

export interface GameApp {
    start() : void;
}

export function createGame<GameState, GraphicsDescription>(gameLogic : GameLogic<GameState, GraphicsDescription>) : GameApp {
    let lastTimeStamp_ms = null
    let gameState = gameLogic.initialState()

    function onAnimationFrameRequested(timeStamp_ms : number) {
        // first time lastTimeStamp_ms will be null so we'll skip the first frame...
        if (lastTimeStamp_ms) {
            // draw current state (i.e. initial or computed last frame)
            const graphicsDescription = gameLogic.graphicsForState(gameState)
            gameLogic.renderToScreen(graphicsDescription)

            // calculate the new game state
            const deltaTime_s = (timeStamp_ms - lastTimeStamp_ms) / 1000;
            gameState = gameLogic.nextState(deltaTime_s, gameState);
        }
        lastTimeStamp_ms = timeStamp_ms
        window.requestAnimationFrame(onAnimationFrameRequested)
    }

    return {
        start: () => window.requestAnimationFrame(onAnimationFrameRequested)
    };
}