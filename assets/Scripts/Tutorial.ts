
import { director } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { Footer } from './Footer';
const { ccclass, property } = _decorator;


@ccclass
export class Tutorial extends Component {

    @property
    pageIndex: number = 1;

    @property(Footer)
    footer: Footer = null;

    sceneName: string;

    onLoad() {
        console.log("Enter page:", this.pageIndex)
        this.footer.setup(this.pageIndex);
    }

    start() {
        // this.sceneName = director.getScene().name;

    }

}
