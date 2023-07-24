import React, { memo, useState, useEffect } from "react";
import { Upload as AntdUpload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import _ from 'lodash';
import Store from '../../Store';


const getBase64 = (img,callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload =(file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}


export default function XinUpload(props) {

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [style,setStyle] = useState({})
  const { styleCss, comId} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"50px","minHeight":"50px"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  useEffect(() => {
    const node = window.findNodeByComId(comId,attributeMap);
    if(node.attributeValue){
      setImg(`http://${window.location.hostname}:3003/images/` + node.attributeValue);
    }
  },[])

  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, () => {
        setImg(`http://${window.location.hostname}:3003/images/` + info.file.response.filename);
        const node = window.findNodeByComId(comId,attributeMap);
        node.attributeValue = info.file.response.filename;
        Store.dispatch({type:'change',attributeMap})
      });
    }
  };


  return <div>
    <AntdUpload
      name="file"
      listType="picture-card"
      showUploadList={false}
      action={`http://${window.location.hostname}:3003/upload/album`}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {img ? (
        <img draggable={false} src={img} alt="avatar" style={style} />
      ) : (
        uploadButton
      )}
    </AntdUpload>
  </div>
}
