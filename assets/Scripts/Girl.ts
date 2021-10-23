
import { Component, Node, tween, Vec3, _decorator } from 'cc';
const { ccclass, property } = _decorator;

declare global {
    export let girl: Girl;
}
@ccclass
export class Girl extends Component {

    @property(Node)
    model: Node = null;

    onLoad() {
        Object.defineProperty(window, 'girl', { get: () => this, configurable: true });
    }

    start() {
        this.playMoveAnimation();
    }

    playMoveAnimation() {
        const half = 0.4;
        const y = -this.node.position.y;
        let anim = tween(this.model).sequence(
            tween(this.node).to(1, { position: new Vec3(half, y, 0) }, { easing: 'sineOut' }),
            tween(this.node).to(1, { position: new Vec3(-half, y, 0) }, { easing: 'sineOut' }),
            tween(this.node).delay(2),
        )
        anim.repeatForever();
        anim.start();
    }
}
