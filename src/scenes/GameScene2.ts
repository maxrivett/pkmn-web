import GameSceneBase from '../GameSceneBase';

const ZONE = "building1";

export default class GameScene2 extends GameSceneBase {
    constructor() {
        super({ key: 'GameScene2' });
    }

    init() {
        this.zone = ZONE;
    }
}