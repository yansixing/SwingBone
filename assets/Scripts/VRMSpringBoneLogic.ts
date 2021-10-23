
import { SphereCollider } from 'cc';
import { Mat4 } from 'cc';
import { Node, Quat, Vec3 } from 'cc';

// interface SphereCollider {
//     Position: Vec3;
//     Radius: number;
// }

export class VRMSpringBoneLogic {

    private m_transform: Node;
    public get Head() {
        return this.m_transform;
    }
    // public get Tail() {
    //     // 待验证
    //     // get { return m_transform.localToWorldMatrix.MultiplyPoint(m_boneAxis * m_length); }
    //     // this.m_transform.local
    //     let dir = this.m_boneAxis.clone().multiplyScalar(this.m_length);

    //     let result = this.m_transform.getWorldPosition().clone().add(dir);

    //     let matrix = this.m_transform.getWorldMatrix();
    //     let result2 = dir.clone().transformMat4(matrix);

    //     console.log(result, result2);
    //     return result2
    // }

    m_length: number;
    m_currentTail: Vec3 = new Vec3();
    m_prevTail: Vec3;
    // m_localDir: Vec3;
    m_localRotation: Quat;
    m_boneAxis: Vec3;
    radius: number = 0;

    constructor(center: Node | null, transform: Node, localChildPosition: Vec3) {
        // console.log("swingNode", transform);
        this.m_transform = transform;
        let worldChildPosition = this.m_transform.transformPoint(localChildPosition);
        this.m_currentTail = center != null
            ?
            center.inverseTransformPoint(this.m_currentTail, worldChildPosition)
            : worldChildPosition
            ;
        this.m_prevTail = this.m_currentTail.clone();
        this.m_localRotation = transform.rotation.clone();
        this.m_boneAxis = localChildPosition.clone().normalize();
        this.m_length = localChildPosition.length();
    }

    get ParentRotation() {
        return this.m_transform.parent != null
            ? this.m_transform.parent.getWorldRotation()
            : Quat.IDENTITY
            ;
    }

    public Update(center: Node | null, stiffnessForce: number, dragForce: number, external: Vec3, colliders: SphereCollider[]): void {
        let currentTail = center != null
            ? center.transformPoint(this.m_currentTail)
            : this.m_currentTail
            ;
        let prevTail = center != null
            ? center.transformPoint(this.m_prevTail)
            : this.m_prevTail
            ;

        let temp1 = (currentTail.clone().subtract(prevTail)).multiplyScalar((1.0 - dragForce));

        let rotateQuat: Quat = new Quat();
        Quat.multiply(rotateQuat, this.ParentRotation, this.m_localRotation);
        let rotateMat: Mat4 = new Mat4();
        Mat4.fromQuat(rotateMat, rotateQuat);
        let temp2 = this.m_boneAxis.clone().transformMat4(rotateMat).multiplyScalar(stiffnessForce);

        let nextTail = currentTail.clone().add(temp1).add(temp2).add(external);

        let temp = (nextTail.clone().subtract(this.m_transform.getWorldPosition())).normalize().multiplyScalar(this.m_length);
        nextTail = this.m_transform.getWorldPosition().clone().add(temp);

        nextTail = this.Collision(colliders, nextTail);

        this.m_prevTail = center != null
            ? center.inverseTransformPoint(this.m_prevTail, currentTail)
            : currentTail
            ;
        this.m_currentTail = center != null
            ? center.inverseTransformPoint(this.m_currentTail, nextTail)
            : nextTail
            ;

        // nextTail = new Vec3(0, 1.4, 0.662);
        let rotation = this.ApplyRotation(nextTail);
        this.Head.setWorldRotation(rotation);
    }

    protected ApplyRotation(nextTail: Vec3) {
        let rotation: Quat = new Quat();
        Quat.multiply(rotation, this.ParentRotation, this.m_localRotation);
        let rotateMat: Mat4 = new Mat4();
        Mat4.fromQuat(rotateMat, rotation);
        let tempQuat: Quat = new Quat();
        let fromDirection = this.m_boneAxis.clone().transformMat4(rotateMat);
        let toDirection = nextTail.clone().subtract(this.m_transform.getWorldPosition());
        Quat.rotationTo(tempQuat, fromDirection.normalize(), toDirection.normalize());
        let resultQuat: Quat = new Quat();
        Quat.multiply(resultQuat, tempQuat, rotation);
        return resultQuat;
    }

    protected Collision(colliders: SphereCollider[], nextTail: Vec3) {
        for (var collider of colliders) {
            let r = this.radius + collider.radius;
            if ((nextTail.clone().subtract(collider.node.transformPoint(collider.center))).length() <= r) {
                let normal = nextTail.clone().subtract(collider.node.transformPoint(collider.center)).normalize();
                let posFromCollider = collider.node.transformPoint(collider.center).clone().add(normal.multiplyScalar(r));
                let temp = posFromCollider.subtract(this.m_transform.getWorldPosition()).normalize();
                nextTail = this.m_transform.getWorldPosition().clone().add(temp.multiplyScalar(this.m_length));
            }
        }
        return nextTail;
    }
}
