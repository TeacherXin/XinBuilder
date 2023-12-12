import React, { useEffect, useState } from 'react'
import { Modal, Select } from 'antd'
import _ from 'lodash'
import Store from '../../store';

export default function EditMeterial(props) {
  const {showMaterial, setShowMaterial, comId} = props;
  const [material, setMaterial] = useState('MeshLambertMaterial')
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const options = [
    {
      value: 'MeshBasicMaterial',
      label: '基础网格材质',
    },
    {
      value: 'MeshDepthMaterial',
      label: '深度网格材质',
    },
    {
      value: 'MeshLambertMaterial',
      label: 'Lambert网格材质',
    },
    {
      value: 'MeshPhysicalMaterial',
      label: '物理网格材质',
    },
    {
      value: 'MeshNormalMaterial',
      label: '法线网格材质',
    },
    {
      value: 'MeshPhongMaterial',
      label: 'Phong网格材质',
    },
    {
      value: 'MeshStandardMaterial',
      label: '标准网格材质',
    },
    {
      value: 'MeshToonMaterial',
      label: '卡通着色材质',
    } 
  ]

  useEffect(() => {
    const node = window.findNodeByComId(comId, attributeMap);
    if(node?.materialType) {
      setMaterial(node.materialType)
    }
  },[showMaterial])

  const handleChange = (value) => {
    setMaterial(value)
  }

  const submitMaterial = () => {
    const node = window.findNodeByComId(comId,attributeMap);
    node.materialType = material;
    Store.dispatch({type:'change',attributeMap})
    setShowMaterial(false)
  }

  return (
    <div>
      <Modal
        open={showMaterial}
        onCancel={() => {setShowMaterial(false)}}
        closable={false}
        onOk={submitMaterial}
      >
        <Select onChange={handleChange} style={{width:180}} value={material} options={options} />
      </Modal>
    </div>
  )
}
