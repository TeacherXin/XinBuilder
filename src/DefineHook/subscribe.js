import Store from "../Store";
import { useEffect } from "react";

export default function(callback){
  useEffect(() => {
    Store.subscribe(() => {
      callback();
    })
  },[])
}