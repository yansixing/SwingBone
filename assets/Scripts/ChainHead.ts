
import { UITransform } from 'cc';
import { instantiate } from 'cc';
import { EventTouch } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass
export class ChainHead extends Component {

    @property(Node)
    boneNode: Node = null;
    @property(Node)
    boneContainer: Node = null;

    boneCount: number = 5;
    boneLength: number = 100;
    rootNode: Node = null;
    tailNode: Node = null;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.rootNode = this.node.parent;
        this.tailNode = this.boneContainer;
        //方便演示用
        if (this.boneContainer.children.length == 0) {
            this.initNodes();
        }
    }

    // @logFuncName
    initNodes() {
        for (let i = 0; i < this.boneCount; i++) {
            let node = instantiate(this.boneNode);
            node.getComponent(UITransform).height = this.boneLength;
            if (i == 0) {
                node.setPosition(new Vec3(0, 0, 0));
            } else {
                node.setPosition(new Vec3(0, -this.boneLength, 0));
            }
            node.active = true;
            this.tailNode.addChild(node);
            this.tailNode = node;
        }
    }

    start() {


    }

    isMouseDown = false;
    onTouchStart(event: EventTouch) {
        this.isMouseDown = true;
    }

    onTouchMove(event: EventTouch) {
        if (!this.isMouseDown) return;
        // console.log("onTouchMove");
        let location = event.getUILocation();
        let pos = new Vec3(location.x, location.y, 0);
        pos = this.rootNode.getComponent(UITransform).convertToNodeSpaceAR(pos);
        this.node.setPosition(pos);
    }

    onTouchEnd(event: EventTouch) {
        this.isMouseDown = false;
        // console.log("onTouchEnd");
    }

}
