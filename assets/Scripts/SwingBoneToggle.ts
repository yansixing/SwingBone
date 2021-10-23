

import { Toggle } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { SwingBone } from './SwingBone';
const { ccclass, property } = _decorator;


@ccclass
export class SwingBoneToggle extends Component {

    @property(Toggle)
    toggle: Toggle = null;

    @property(Label)
    label: Label = null;

    onLoad() {
        console.log(this);
        this.toggle.isChecked = SwingBone.enabled;
        this.label.string = this.toggle.isChecked ? "Enabled" : "Disabled";
    }

    onToggle() {
        SwingBone.enabled = this.toggle.isChecked;
        this.label.string = this.toggle.isChecked ? "Enabled" : "Disabled";
    }
}
