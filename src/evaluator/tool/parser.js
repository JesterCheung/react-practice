import { TEOF } from './token';
import { TokenStream } from './token-stream';
import { ParserState } from './parser-state';
import { Expression } from './expression';

import {
  Add,
  Sub,
  Mul,
  Div,
  Mod,
  Concat,
  Equal,
  NotEqual,
  GreaterThan,
  LessThan,
  GreaterThanEqual,
  LessThanEqual,
  AndOperator,
  OrOperator,
  InOperator,
  LikeOperator,
  Sinh,
  Cosh,
  Tanh,
  Asinh,
  Acosh,
  Atanh,
  Log10,
  Neg,
  Not,
  Trunc,
  Random,
  Factorial,
  Gamma,
  StringLength,
  Hypot,
  Condition,
  RoundTo,
  BeginsWith,
  EndsWith,
  GetDate,
  Year,
  Hour,
  MilliSecond,
  Minute,
  Second,
  Month,
  DayOfWeek,
  AddYears,
  AddQuarters,
  AddMonths,
  AddWeeks,
  AddDays,
  AddHours,
  AddMinutes,
  AddSeconds,
  AddMilliSeconds,
  DiffYear,
  DiffMonth,
  DiffDay,
  DiffHour,
  DiffMinute,
  DiffSecond,
  DiffMilliSecond,
  DiffDate,
  DateFormat,
  LaterThisYear,
  EarlierThisYear,
  PriorThisYear,
  NextYear,
  IsThisYear,
  LaterThisMonth,
  EarlierThisMonth,
  IsThisMonth,
  NextMonth,
  EarlierThisWeek,
  LaterThisWeek,
  LastWeek,
  NextWeek,
  TwoWeeksAway,
  IsThisWeek,
  Today,
  Tomorrow,
  Yesterday,
  DayAfterTomorrow,
  ToDecimal,
  ToDouble,
  ToFloat,
  ToInt,
  ToStr,
  Max,
  Min,
  Avg,
  Count,
  Sum,
  Sign,
  PadLeft,
  PadRight,
  Replace,
  Trim,
  Lower,
  Upper,
  Substring,
  Ascii,
  UnaryOperatorBitwiseNot
} from './functions';

export function Parser(options) {
  this.options = options || {};
  this.unaryOps = {//一元运算
    Sin: Math.sin,//正弦
    Cos: Math.cos,//余弦
    Tan: Math.tan,//正切
    Asin: Math.asin,
    Acos: Math.acos,
    Atan: Math.atan, 
    Sinh: Math.sinh || Sinh,
    Cosh: Math.cosh || Cosh,
    Tanh: Math.tanh || Tanh,
    Asinh: Math.asinh || Asinh,
    Acosh: Math.acosh || Acosh,
    Atanh: Math.atanh || Atanh,
    Sqrt: Math.sqrt,//开方 x的平方
    Log: Math.log,//对数
    Ln: Math.log,
    Lg: Math.log10 || Log10,
    Log10: Math.log10 || Log10,
    Abs: Math.abs,//绝对值 
    Ceil: Math.ceil,//最小整数
    Floor: Math.floor,//最大整数
    Round: Math.round,//四舍五入
    Trunc: Math.trunc || Trunc,//x整数部分
    '-': Neg,  //取相反值即 -1 =》1
    '+': Number,
    Exp: Math.exp,//返回 e 的 x 次幂的值
    Not: Not,  //取反
    Length: StringLength,//长度
    '!': Factorial,//阶乘,
    Sign:Sign,//返回实参的符号
    '~':UnaryOperatorBitwiseNot // ~ 按位非 

  };

  this.binaryOps = {//二元运算
    '+': Add,
    '-': Sub,
    '*': Mul,
    '/': Div,
    '%': Mod,
    '^': Math.pow,//返回 x 的 y 次幂的值
    '||': Concat,  //重点！！连接字符串作用
    '==': Equal,
    '!=': NotEqual,
    '>': GreaterThan,
    '<': LessThan,
    '>=': GreaterThanEqual,
    '<=': LessThanEqual,
    And: AndOperator,  // 作用等同于 && 
    Or: OrOperator,  //作用等同于  || ，与上面 区分
    'in': InOperator,
    'like':LikeOperator,//模糊查询
    
  };

  this.ternaryOps = {
    '?': Condition
  };

  this.functions = {
    Random: Random,
    Fac: Factorial,
    Min:Min,
    Max:Max,
    Count:Count,
    Avg:Avg,
    Sum:Sum,
    Hypot: Math.hypot || Hypot,//所有参数的平方根
    Pyt: Math.hypot || Hypot, // hypot的别名
    Pow: Math.pow,//等同于 x^y 
    Atan2: Math.atan2,//X/Y的arc 正切。换句话说，。( 0，0 ) 与( x，y ) 之间的角度
    'if': Condition,//	
    Gamma: Gamma,//γ
    RoundTo: RoundTo,//小数点后x位四舍五入到n位，

    //扩展日期计算 
    GetDate:GetDate,
    Year:Year,
    Hour:Hour,
    MilliSecond:MilliSecond,
    Minute:Minute,
    Second:Second,
    Month:Month,
    DayOfWeek:DayOfWeek,
    AddYears:AddYears,
    AddQuarters:AddQuarters,
    AddMonths:AddMonths,
    AddWeeks:AddWeeks,
    AddDays:AddDays,
    AddHours:AddHours,
    AddMinutes:AddMinutes,
    AddSeconds:AddSeconds,
    AddMilliSeconds:AddMilliSeconds,
    DiffYear:DiffYear,
    DiffMonth:DiffMonth,
    DiffDay:DiffDay,
    DiffHour:DiffHour,
    DiffMinute:DiffMinute,
    DiffSecond:DiffSecond,
    DiffMilliSecond:DiffMilliSecond,
    DiffDate:DiffDate,
    DateFormat:DateFormat,
    LaterThisYear:LaterThisYear,
    EarlierThisYear:EarlierThisYear,
    PriorThisYear:PriorThisYear,
    NextYear:NextYear,
    IsThisYear:IsThisYear,
    LaterThisMonth:LaterThisMonth,
    EarlierThisMonth:EarlierThisMonth,
    IsThisMonth:IsThisMonth,
    NextMonth:NextMonth,
    EarlierThisWeek:EarlierThisWeek,
    LaterThisWeek:LaterThisWeek,
    LastWeek:LastWeek,
    NextWeek:NextWeek,
    TwoWeeksAway:TwoWeeksAway,
    IsThisWeek:IsThisWeek,
    Today:Today,
    Tomorrow:Tomorrow,
    Yesterday:Yesterday,
    DayAfterTomorrow:DayAfterTomorrow,
    BeginsWith:BeginsWith,
    EndsWith:EndsWith,
    ToDecimal:ToDecimal,
    ToDouble:ToDouble,
    ToFloat:ToFloat,
    ToInt:ToInt,
    ToStr:ToStr,
    PadLeft:PadLeft,
    PadRight:PadRight,
    Replace:Replace,
    Trim:Trim,
    Lower:Lower,
    Upper:Upper,
    Substring:Substring,
    Ceiling:Math.ceil,
    Floor:Math.floor,
    Ascii:Ascii,  //将字母转为Ascii
    FromCharCode:String.fromCharCode  //将Ascii转为字母

  };

  this.consts = {
    E: Math.E,//自然对数
    PI: Math.PI,//圆周率
    'true': true,
    'false': false
  };
}

Parser.prototype.parse = function (expr) {
  var instr = [];
  var parserState = new ParserState(
    this,
    new TokenStream(this, expr),
    { allowMemberAccess: this.options.allowMemberAccess }
  );

  parserState.parseExpression(instr);
  parserState.expect(TEOF, 'EOF');

  return new Expression(instr, this);
};

Parser.prototype.evaluate = function (expr, variables) {
  return this.parse(expr).evaluate(variables);
};

var sharedParser = new Parser();

Parser.parse = function (expr) {
  return sharedParser.parse(expr);
};

Parser.evaluate = function (expr, variables) {
  return sharedParser.parse(expr).evaluate(variables);
};


//格式化日期
Parser.prototype.date = function (expr, variables) {
  console.log("Parser",expr)
  return this.parse(expr).date(variables);
};


Parser.date = function (expr,variables){
  return sharedParser.parse(expr).date(variables)
}