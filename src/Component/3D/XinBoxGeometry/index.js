import React, { useEffect } from 'react'
import * as THREE from 'three'

export default function XinBoxGeometry(props) {
  const { scene,renderer,camera,x, y, z, width3d, height3d, depth3d, color3d, materialType} = props
  if(scene) {
    const geometry = new THREE.BoxGeometry(width3d || 20, height3d ||20, depth3d || 20); 
    const material = new THREE[materialType || 'MeshLambertMaterial']({
      color: color3d || '#1677ff'
    }); 
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(x || 0,y || 0,z || 0);
    scene.add(mesh); 
    renderer.render(scene, camera);
  }
  return (
    <div id='XinBoxGeometry'>

    </div>
  )
}
