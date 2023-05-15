import React from 'react'
import { Rate } from 'antd';

export default function XinRate(props) {
 
  const {allowHalf,count,disabled} = props;

  const getCount = (count) => {
    if(count > 0){
      return parseInt(count)
    }else{
      return 5;
    }
  }

  return (
    <div>
      <Rate
        allowHalf={allowHalf}
        count={getCount(count)}
        disabled={disabled}
      />
    </div>
  )
}
