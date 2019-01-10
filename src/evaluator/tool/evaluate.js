import { INUMBER, IOP1, IOP2, IOP3, IVAR, IFUNCALL, IEXPR, IMEMBER } from './instruction';
/**
 * 
 * @param {*} tokens 解析表达式 例："3 in DJZT" =>[{type:"INUMBER",value:3},{type: "IVAR", value: "DJZT"},{type: "IOP2", value: "in"}]
 * @param {*} expr 表达式规则
 * @param {*} values 需要计算的值 例：{DJZT:'1,2,3'}
 */

//异步
export default async function evaluate(tokens, expr, values) {
  // console.log("evaluate",{tokens:tokens,expr:expr,values:values})
  var nstack = [];
  var n1, n2, n3;
  var f;
  for (var i = 0; i < tokens.length; i++) {//遍历token
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER) {//数字类型
      nstack.push(item.value);
    } else if (type === IOP2) {//二元运算符
      //pop()用于删除并返回数组最后一个元素 [3,"1,2,3"]
      n2 = nstack.pop();//值  
      n1 = nstack.pop();//条件
      if (item.value === 'and') {
        nstack.push(n1 ? !!evaluate(n2, expr, values) : false);
      } else if (item.value === 'or') {
        nstack.push(n1 ? true : !!evaluate(n2, expr, values));
      } else {

        let f = expr.binaryOps[item.value];//调用expr中的binaryOps函数二元运算
        let result = await f(n1,n2)
        nstack.push(result);//返回ture/false
      }
    } else if (type === IOP3) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === '?') {//三元运算符
        nstack.push(evaluate(n1 ? n2 : n3, expr, values));
      } else {
        f = expr.ternaryOps[item.value];
        let result = await f(n1, n2, n3)
        nstack.push(result);
        
      }
    } else if (type === IVAR) {//字符串常量
      if (item.value in expr.functions) {//expr表达式内置的func：atan2,fac,gamma,hypot,if,max,min,pow,pyt,random,roundTo
        let result =  await expr.functions[item.value]
        nstack.push(result);
       
      } else {
        var v = values[item.value];//将数组转换成字符串
        if (v !== undefined) {
          nstack.push(v);//组成新的字符串[条件，"字符串"]=>例子：[3,"1,2,3"]
        } else {
          throw new Error('undefined variable: ' + item.value);
        }
      }
    } else if (type === IOP1) {
      n1 = nstack.pop();
      f = expr.unaryOps[item.value];
      nstack.push(f(n1));
    } else if (type === IFUNCALL) {
      var argCount = item.value;
      var args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      f = nstack.pop();
      if (f.apply && f.call) {
        nstack.push(f.apply(undefined, args));
      } else {
        throw new Error(f + ' is not a function');
      }
    } else if (type === IEXPR) {
      nstack.push(item.value);
    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      nstack.push(n1[item.value]);
    } else {
      throw new Error('invalid Expression');
    }
  }
  if (nstack.length > 1) {
    throw new Error('invalid Expression (parity)');
  }


  return nstack[0]
}
