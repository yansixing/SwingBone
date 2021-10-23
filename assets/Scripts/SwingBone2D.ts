
import { SphereCollider } from 'cc';
import { _decorator, Component, Node, Vec3, math } from 'cc';
import { VRMSpringBoneLogic2D } from './VRMSpringBoneLogic2D';
const { ccclass, property } = _decorator;

@ccclass
export class SwingBone2D extends Component {

    @property
    m_comment: string = "";

    @property([Node])
    RootBones: Node[] = [];

    @property([SphereCollider])
    colliderGroups: SphereCollider[] = [];

    @property
    m_stiffnessForce: number = 5.0;

    @property
    m_gravityPower: number = 0;

    @property
    m_gravityDir: Vec3 = new Vec3(0, -1, 0);

    @property
    m_dragForce: number = 0.4;

    @property(Node)
    m_center = null;

    @property
    m_hitRadius: number = 0.02;

    m_initialLocalRotationMap: Map<Node, math.Quat> = new Map();

    m_verlet: VRMSpringBoneLogic2D[] = [];

    m_colliderList: SphereCollider[] = [];

    start() {
        this.setup();
    }

    setup(force = false) {
        // console.log("setup");
        if (this.RootBones != null) {
            if (force || this.m_initialLocalRotationMap == null) {
                this.m_initialLocalRotationMap = new Map();
            } else {
                for (let [key, value] of this.m_initialLocalRotationMap) {
                    key.rotation = value;
                }
                this.m_initialLocalRotationMap.clear();
            }
            this.m_verlet.length = 0;

            for (let go of this.RootBones) {
                if (go != null) {
                    // for (var x in go.transform.Traverse()) {
                    //     this.m_initialLocalRotationMap[x] = x.localRotation;
                    // }
                    this.m_initialLocalRotationMap.set(go, go.rotation);

                    this.SetupRecursive(this.m_center, go);
                }
            }
            for (let collider of this.colliderGroups) {
                if (collider !== null) {
                    this.m_colliderList.push(collider);
                }
            }
        }
    }

    // static IEnumerable<Transform> GetChildren(Transform parent)
    // {
    //     for(int i=0; i<parent.childCount; ++i)
    //     {
    //         yield return parent.GetChild(i);
    //     }
    // }

    public SetupRecursive(center: Node | null, parent: Node) {
        if (parent.children.length == 0) {
            if (!parent.parent) {
                return;
            }
            var delta = parent.getWorldPosition().clone().subtract(parent.parent.getWorldPosition());
            var childPosition = parent.getWorldPosition().clone().add(delta.normalize().multiplyScalar(100));
            let matrix = parent.getWorldMatrix().invert();
            let localChildPosition = childPosition.clone().transformMat4(matrix);
            let com = new VRMSpringBoneLogic2D(center, parent, localChildPosition);
            this.m_verlet.push(com);
        }
        else {
            var firstChild = parent.children[0];
            var localPosition = firstChild.position;
            var scale = firstChild.scale;
            let com = new VRMSpringBoneLogic2D(
                center, parent,
                new Vec3(
                    localPosition.x * scale.x,
                    localPosition.y * scale.y,
                    localPosition.z * scale.z
                ));
            // let com = new VRMSpringBoneLogic2D(center, parent, localPosition);
            this.m_verlet.push(com);
        }

        parent.children.forEach(child => {
            this.SetupRecursive(center, child);
        })
    }

    lateUpdate(dt: number) {
        // console.log("lateUpdate");
        if (this.m_verlet == null || this.m_verlet.length == 0) {
            if (this.RootBones == null) {
                return;
            }

            this.setup();
        }

        // m_colliderList.Clear();
        // if (ColliderGroups != null) {
        //     foreach(var group in ColliderGroups)
        //     {
        //         if (group != null) {
        //             foreach(var collider in group.Colliders)
        //             {
        //                 m_colliderList.Add(new SphereCollider
        //                     {
        //                         Position = group.transform.TransformPoint(collider.Offset),
        //                         Radius = collider.Radius,
        //                     });
        //             }
        //         }
        //     }
        // }

        var stiffness = this.m_stiffnessForce * dt;
        var external = this.m_gravityDir.clone().multiplyScalar(this.m_gravityPower * dt);
        this.m_verlet.forEach(verlet => {
            verlet.radius = this.m_hitRadius;
            verlet.Update(
                this.m_center,
                stiffness,
                this.m_dragForce,
                external,
                this.m_colliderList
            );
        })
    }
}
