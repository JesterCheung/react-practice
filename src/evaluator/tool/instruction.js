export var INUMBER = 'INUMBER';//number
export var IOP1 = 'IOP1';//一元选项
export var IOP2 = 'IOP2';//二元选项
export var IOP3 = 'IOP3';//三元选项
export var IVAR = 'IVAR';//常量
export var IFUNCALL = 'IFUNCALL';//函数调用
export var IEXPR = 'IEXPR';//解析器
export var IMEMBER = 'IMEMBER';//成员


//获取当前的类型和值
export function Instruction(type, value) {
  this.type = type;
  this.value = (value !== undefined && value !== null) ? value : 0;
}

//判断类型
Instruction.prototype.toString = function () {
  switch (this.type) {
    case INUMBER:
    case IOP1:
    case IOP2:
    case IOP3:
    case IVAR:
      return this.value;//直接获取常量的值
    case IFUNCALL:
      return 'CALL ' + this.value;//使用call + 函数名  来调用函数
    case IMEMBER:
      return '.' + this.value;//访问成员变量
    default:
      return 'Invalid Instruction';
  }
};

export function unaryInstruction(value) {//一元
  return new Instruction(IOP1, value);
}

export function binaryInstruction(value) {//二元
  return new Instruction(IOP2, value);
}

export function ternaryInstruction(value) {//三元
  return new Instruction(IOP3, value);
}
