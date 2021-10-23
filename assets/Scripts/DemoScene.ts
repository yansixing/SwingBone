
import { director } from 'cc';
import { Button } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { Footer } from './Footer';
const { ccclass, property } = _decorator;


@ccclass
export class DemoScene extends Component {

    @property(Button)
    btnNext: Button = null;

    @property(Node)
    handNode: Node = null;


    onLoad() {
        this.btnNext.node.on(Node.EventType.TOUCH_END, this.onTapNext, this);
    }

    start() {
        // this.handNode
        tween(this.handNode)
            .sequence(
                tween().by(2, { position: new Vec3(200, 0, 0) }, { easing: easing.sineInOut }),
                tween().by(2, { position: new Vec3(-200, 0, 0) }, { easing: easing.sineInOut })
            )
            .repeatForever()
            .start();
    }

    onTapNext() {
        let sceneName = "tutorial-1";
        director.loadScene(sceneName);
    }
}
