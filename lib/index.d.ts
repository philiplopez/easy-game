export interface GameLogic<GameState, GraphicsDescription> {
    initialState(): GameState;
    nextState(deltaTime_s: number, prev: GameState): GameState;
    graphicsForState(state: GameState): GraphicsDescription;
    renderToScreen(graphicDescription: GraphicsDescription): void;
}
export interface GameApp {
    start(): void;
}
export declare function createGame<GameState, GraphicsDescription>(gameLogic: GameLogic<GameState, GraphicsDescription>): GameApp;
