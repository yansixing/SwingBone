
import { director } from 'cc';
import { Button } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { Footer } from './Footer';
const { ccclass, property } = _decorator;


@ccclass
export class DemoScene extends Component {

    @property(Button)
    btnNext: Button = null;

    onLoad() {
        this.btnNext.node.on(Node.EventType.TOUCH_END, this.onTapNext, this);
    }

    onTapNext() {
        let sceneName = "tutorial-1";
        director.loadScene(sceneName);
    }
}
