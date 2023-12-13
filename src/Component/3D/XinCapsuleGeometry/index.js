import React, { useEffect } from 'react'
import * as THREE from 'three'

export default function XinCapsuleGeometry(props) {
  const { scene,renderer,camera,x, y, z, radius3d, length3d, capSegments, radialSegments, color3d, materialType, rotateX, rotateY, rotateZ, mapUrl } = props
  if(scene) {
    const geometry = new THREE.CapsuleGeometry( radius3d || 5, length3d || 5, capSegments || 10, radialSegments || 20 );
    const material = new THREE[materialType || 'MeshLambertMaterial']({
      color: color3d || '#1677ff'
    }); 
    if(mapUrl) {
      const texLoader = new THREE.TextureLoader();
      const texture = texLoader.load(mapUrl,() => {
        renderer.render(scene, camera);
      });
      material.setValues({
        map: texture,
        color: 0xffffff
      })
    }
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(x || 0,y || 0,z || 0);
    mesh.rotation.set(rotateX || 0,rotateY || 0,rotateZ || 0)
    scene.add(mesh); 
    renderer.render(scene, camera);
  }
  return (
    <div id='XinCapsuleGeometry'>

    </div>
  )
}
