import GameSceneBase from '../GameSceneBase';

const ZONE = "zone1";

export default class GameScene1 extends GameSceneBase {
    constructor() {
        super({ key: 'GameScene1' });
    }

    init() {
        this.zone = ZONE;
    }
}