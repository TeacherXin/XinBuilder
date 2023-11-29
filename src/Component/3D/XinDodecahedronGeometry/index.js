import React, { useEffect } from 'react'
import * as THREE from 'three'

export default function XinDodecahedronGeometry(props) {
  const { scene,renderer,camera,x, y, z, radius3d, detail} = props
  if(scene) {
    const geometry = new THREE.DodecahedronGeometry( radius3d || 10, detail || 0);
    const material = new THREE.MeshLambertMaterial({
      color:'red'
    }); 
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(x || 0,y || 0,z || 0);
    scene.add(mesh); 
    renderer.render(scene, camera);
  }
  return (
    <div id='XinDodecahedronGeometry'>

    </div>
  )
}
