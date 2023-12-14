import React, { useEffect } from 'react'
import * as THREE from 'three'

export default function XinDodecahedronGeometry(props) {
  const { scene,renderer,camera,x, y, z, radius3d, detail, color3d, materialType, rotateX, rotateY, rotateZ, mapUrl, actionJs} = props
  if(scene) {
    const geometry = new THREE.DodecahedronGeometry( radius3d || 10, detail || 0);
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
    for(let propName in actionJs) {
      let clickFun = new Function(actionJs?.[propName]);
      window.addEventListener("keydown", function(event) {
        // 检查是否按下了空格键（键码为32）
        if (event.key === propName) {
          clickFun({mesh, renderer, camera, scene})
        }
      });
    }
  }
  return (
    <div id='XinDodecahedronGeometry'>

    </div>
  )
}
