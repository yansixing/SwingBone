
import { Button } from 'cc';
import { director } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { TutorialManger } from './TutorialManger';
const { ccclass, property } = _decorator;


@ccclass
export class Footer extends Component {

    @property(Button)
    btnPrev: Button = null;

    @property(Button)
    btnNext: Button = null;

    pageIndex: number;

    setup(pageIndex: number) {
        this.btnPrev.node.on(Node.EventType.TOUCH_END, this.onTapPrev, this);
        this.btnNext.node.on(Node.EventType.TOUCH_END, this.onTapNext, this);

        this.pageIndex = pageIndex;
        if (pageIndex == 1) {
            this.btnPrev.node.active = false;
        }

        if (pageIndex == TutorialManger.totalPages) {
            this.btnNext.node.active = false;
        }
    }

    onTapPrev() {
        console.log("onTapPrev");
        if (!this.pageIndex || this.pageIndex <= 1) return;
        let sceneName = "tutorial-" + (this.pageIndex - 1);
        director.loadScene(sceneName);
    }

    onTapNext() {
        console.log("onTapNext");
        if (this.pageIndex >= TutorialManger.totalPages) return;
        let sceneName = "tutorial-" + (this.pageIndex + 1);
        director.loadScene(sceneName);

    }

    onDestroy() {
        // this.btnPrev.node.off(Node.EventType.TOUCH_END, this.onTapPrev, this);
        // this.btnNext.node.off(Node.EventType.TOUCH_END, this.onTapNext, this);
    }

}
