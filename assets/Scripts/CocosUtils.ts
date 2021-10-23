import { Node, Vec3 } from 'cc';

/*
 * @Author: yansixing
 * @Date: 2021-03-01 10:15:07
 * @Github: https://github.com/yansixing
 * @LastEditTime: 2021-03-09 17:32:29
 */

declare module "cc" {
    interface Node {
        /**
         * @en Transforms position from local space to world space.
         * @zh 将一个点从本地坐标转换到世界坐标。-by sixing
         */
        transformPoint(position: Vec3): Vec3;
        /**
         * @en Traverse all the child nodes under the node(include self)
         * @zh 遍历节点下面所有的子节点（包含自身），flat后返回，-by sixing
         */
        // traverse(): Node[];
    }
}
Node.prototype.transformPoint = function (position: Vec3) {
    let node: Node = this;
    let matrix = node.getWorldMatrix();
    return position.clone().transformMat4(matrix);
    // return this.getWorldPosition().clone().add(position);
}

// Node.prototype.traverse = function () {
//     let node: Node = this;
//     let outArr: Node[] = [];



//     return outArr;
// }