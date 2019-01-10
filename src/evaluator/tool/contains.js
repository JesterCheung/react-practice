import { type } from "os";

/**
 * contains
 * @param {*} value 
 * @param {*} obj
 *  判断选定数组中是否包含当前对象
 */
export default  function contains(value, obj) {
  if(value instanceof Array){//数组
    for (var i = 0; i < value.length; i++) {
      if (value[i] === obj) {
        return true;
      }
    }
  }else if(typeof(value)==="string"){//字符串
    return value.includes(obj)
  }
  return false;

}


