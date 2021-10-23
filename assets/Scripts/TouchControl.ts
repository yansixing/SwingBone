
import { EventTouch } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass
export class TouchControl extends Component {

    @property(Node)
    rotateNode: Node = null;

    onLoad() {
    }

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        // Editor.Selection.getSelected()
        // this.node.active
        // Editor.Message.request("scene", 'query-node', "");
        
    }

    isMouseDown = false;
    onTouchStart(event: EventTouch) {
        this.isMouseDown = true;
    }

    onTouchMove(event: EventTouch) {
        if (!this.isMouseDown) return;
        if (!this.rotateNode) return;
        let delta = event.getDelta();
        let euler = this.rotateNode.eulerAngles;
        euler.add(new Vec3(0, delta.x, 0));
        this.rotateNode.setRotationFromEuler(euler);
    }

    onTouchEnd(event: EventTouch) {
        this.isMouseDown = false;
    }

}
