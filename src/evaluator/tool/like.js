export default function like(value, obj) {
//是否需要区分大小写
    if(value.startsWith("%") && value.endsWith("%")){
      let v=value.substring(1,value.length-1)
      return obj.includes(v)
    }else if(value.startsWith("%")){
      let v=value.substring(1)
      return obj.endsWith(v)
    }else if(value.endsWith("%")){
        let v=value.substring(0,value.length-1)
        return obj.startsWith(v)
    }
  }


  