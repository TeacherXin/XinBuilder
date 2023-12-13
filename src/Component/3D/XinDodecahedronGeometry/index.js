import React, { useEffect } from 'react'
import * as THREE from 'three'

export default function XinDodecahedronGeometry(props) {
  const { scene,renderer,camera,x, y, z, radius3d, detail, color3d, materialType, rotateX, rotateY, rotateZ, mapUrl} = props
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
    let flag = 'stop'
    window.addEventListener("keydown", function(event) {
      // 检查是否按下了空格键（键码为32）
      if (event.keyCode === 32 && flag === 'stop') {
        flag = 'top'
        jump()
        renderer.render(scene, camera);
      }
    });

    function jump() {
      if(flag === 'down') {
        renderer.render(scene, camera);
        mesh.position.y = parseInt(mesh.position.y) - 1;
        mesh.position.x = parseInt(mesh.position.x) - 1;
        mesh.rotateZ(0.5)
        if(mesh.position.y < 15) {
          mesh.position.y = 15;
          flag = 'stop'
        }
      }else if(flag === 'top'){
        renderer.render(scene, camera);
        mesh.position.y = parseInt( mesh.position.y) +  1
        mesh.position.x = parseInt(mesh.position.x) -  1
        mesh.rotateZ(0.5)
        if(mesh.position.y >= 40) {
          flag = 'down'
        }
      }else if(flag === 'stop'){
        return;
      }
      requestAnimationFrame(jump)
    }
  }
  return (
    <div id='XinDodecahedronGeometry'>

    </div>
  )
}
