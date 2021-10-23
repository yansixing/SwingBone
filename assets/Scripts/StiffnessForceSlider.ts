
import { Slider } from 'cc';
import { Label } from 'cc';
import { SliderComponent } from 'cc';
import { EventTouch } from 'cc';
import { _decorator, Component, Node, tween, Tween, easing, Vec3 } from 'cc';
import { SwingBone } from './SwingBone';
const { ccclass, property } = _decorator;


@ccclass
export class StiffnessForceSlider extends Component {

    @property(Slider)
    slider: Slider = null;

    @property(Label)
    label: Label = null;


    // onLoad() {
    //     this.slider.progress = SwingBone.m_stiffnessForce;
    //     this.label.string = "stiffnessForce:" + this.slider.progress.toFixed(2);
    // }

    // onSliderMove() {
    //     SwingBone.m_stiffnessForce = this.slider.progress;
    //     this.label.string = "stiffnessForce:" + this.slider.progress.toFixed(2);
    // }
}
