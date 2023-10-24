import Store from "../Store";
import { useEffect } from "react";

export default function(callback){
  /**
   * 自定义hook，用于在redux状态更新的时候调用
   * @level 4
   */
  useEffect(() => {
    Store.subscribe(() => {
      callback();
    })
  },[])
}