import contains from './contains';
import like from './like'

/**
 * 函数操作
 * @param {*} a 
 * @param {*} b 
 */


export function Add(a, b) {
  return Number(a) + Number(b);
}

export function Sub(a, b) {
  return a - b;
}

export function Mul(a, b) {
  return a * b;
}

export function Div(a, b) {
  return a / b;
}

export function Mod(a, b) {
  return a % b;
}

export function Concat(a, b) {
  return '' + a + b;
}

export function Equal(a, b) {
  return a === b;
}

export function NotEqual(a, b) {
  return a !== b;
}

export function GreaterThan(a, b) {
  return a > b;
}

export function LessThan(a, b) {
  return a < b;
}

export function GreaterThanEqual(a, b) {
  return a >= b;
}

export function LessThanEqual(a, b) {
  return a <= b;
}

export function AndOperator(a, b) {
  return Boolean(a && b);
}

export function OrOperator(a, b) {
  return Boolean(a || b);
}

export function InOperator(a, b) {
  return contains(b, a);
}
//like 运算符
export function LikeOperator(a,b){
  return like(b, a)
}

export function Sinh(a) {
  return ((Math.exp(a) - Math.exp(-a)) / 2);
}

export function Cosh(a) {
  return ((Math.exp(a) + Math.exp(-a)) / 2);
}

export function Tanh(a) {
  if (a === Infinity) return 1;
  if (a === -Infinity) return -1;
  return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a));
}

export function Asinh(a) {
  if (a === -Infinity) return a;
  return Math.log(a + Math.sqrt((a * a) + 1));
}

export function Acosh(a) {
  return Math.log(a + Math.sqrt((a * a) - 1));
}

export function Atanh(a) {
  return (Math.log((1 + a) / (1 - a)) / 2);
}

export function Log10(a) {
  return Math.log(a) * Math.LOG10E;
}

export function Neg(a) {
  return -a;
}

export function Not(a) {
  return !a;
}

export function Trunc(a) {
  return a < 0 ? Math.ceil(a) : Math.floor(a);
}

export function Random(a) {
  return Math.random() * (a || 1)
}

export function Factorial(a) { // a!
  return Gamma(a + 1);
}

function isInteger(value) {
  return isFinite(value) && (value === Math.round(value));
}

var GAMMA_G = 4.7421875;
var GAMMA_P = [
  0.99999999999999709182,
  57.156235665862923517, -59.597960355475491248,
  14.136097974741747174, -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4, -0.98374475304879564677e-4,
  0.15808870322491248884e-3, -0.21026444172410488319e-3,
  0.21743961811521264320e-3, -0.16431810653676389022e-3,
  0.84418223983852743293e-4, -0.26190838401581408670e-4,
  0.36899182659531622704e-5
];

// Gamma function from math.js
export function Gamma(n) {
  var t, x;

  if (isInteger(n)) {
    if (n <= 0) {
      return isFinite(n) ? Infinity : NaN;
    }

    if (n > 171) {
      return Infinity; // Will overflow
    }

    var value = n - 2;
    var res = n - 1;
    while (value > 1) {
      res *= value;
      value--;
    }

    if (res === 0) {
      res = 1; // 0! is per definition 1
    }

    return res;
  }

  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * Gamma(1 - n));
  }

  if (n >= 171.35) {
    return Infinity; // will overflow
  }

  if (n > 85.0) { // Extended Stirling Approx
    var twoN = n * n;
    var threeN = twoN * n;
    var fourN = threeN * n;
    var fiveN = fourN * n;
    return Math.sqrt(2 * Math.PI / n) * Math.pow((n / Math.E), n) *
      (1 + (1 / (12 * n)) + (1 / (288 * twoN)) - (139 / (51840 * threeN)) -
      (571 / (2488320 * fourN)) + (163879 / (209018880 * fiveN)) +
      (5246819 / (75246796800 * fiveN * n)));
  }

  --n;
  x = GAMMA_P[0];
  for (var i = 1; i < GAMMA_P.length; ++i) {
    x += GAMMA_P[i] / (n + i);
  }

  t = n + GAMMA_G + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}

export function StringLength(s) {
  return String(s).length;
}

export function Hypot() {
  var sum = 0;
  var larg = 0;
  for (var i = 0; i < arguments.length; i++) {
    var arg = Math.abs(arguments[i]);
    var div;
    if (larg < arg) {
      div = larg / arg;
      sum = (sum * div * div) + 1;
      larg = arg;
    } else if (arg > 0) {
      div = arg / larg;
      sum += div * div;
    } else {
      sum += arg;
    }
  }
  return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
}

export function Condition(cond, yep, nope) {
  return cond ? yep : nope;
}

/**
* Decimal adjustment of a number.
* From @escopecz.
*
* @param {Number} value The number.
* @param {Integer} exp  The exponent (the 10 logarithm of the adjustment base).
* @return {Number} The adjusted value.
*/
export function RoundTo(value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }
  value = +value;
  exp = -(+exp);
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export function BeginsWith(str){
  return str.split('')[0]
}
export function EndsWith(str){
  return str.split('')[str.length-1]
}



//日期类-返回单个日期

//返回日期(中国标准时间)
export function GetDate(date){
    return new Date(date)
}
//返回当前年份
export function Year(date){
  date = new Date(date)
  return date.getFullYear()
}
//当前小时
export function Hour(date){
  date = new Date(date)
  return date.getHours()
}
// 当前毫秒
export function MilliSecond(date){
  date = new Date(date)
  return date.getMilliseconds()
}
// 当前分钟
export function Minute (date){
  date = new Date(date)
  return date.getMinutes()
}
//当前秒
export function Second(date){
  date = new Date(date)
  return date.getSeconds()
}
//当前月份
export function Month(date){
  date = new Date(date)
  return date.getMonth()
}
//当前星期几（0为星期一）
export function DayOfWeek (date){
  date = new Date(date)
  return date.getDay()//返回星期几（0是周日）
}
//日期类加减运算
/**
 * 年
 * @param {*} date 
 * @param {*} number 
 */
export function AddYears(date,number){
  date = new Date(date)
  date.setFullYear(date.getFullYear() + number);
  return date
}
/**
 * 季度
 * @param {*} date 
 * @param {*} number 
 */
export function AddQuarters(date,number){
  date = new Date(date)
  date.setMonth(date.getMonth()+number*3)
  return date
}
//增加月
export function AddMonths(date,number){
  date = new Date(date)
  date.setMonth(date.getMonth()+number)
  return date
}
//增加周
export function AddWeeks(date,number){
  date = new Date(date)
  date.setDate(date.getDate()+number*7)
  return date
}
//增加天数
export function AddDays(date,number){
  date = new Date(date)
  date.setDate(date.getDate+number)
  return date
}
//增加小时数
export function AddHours(date,number){
  date = new Date(date)
  date.setHours(date.getHours()+number)
  return date
}
//增加分钟数
export function AddMinutes(date,number){
  date = new Date(date)
  date.setMinutes(date.getMinutes()+number)
  return date
}
//增加秒数
export function AddSeconds(date,number){
  date = new Date(date)
  date.setSeconds(date.getSeconds()+number)
  return date
}
//增加毫秒数
export function AddMilliSeconds(date,number){
  date = new Date(date)
  date.setUTCMilliseconds(date.getMilliseconds()+number)
  return date
}

//日期类-两个日期运算处理 年 月 日 天 小时 分钟 秒 毫秒

//年份差
export function DiffYear(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.abs(dateTwo.getFullYear()-dateOne.getFullYear())
  return diff
}
//月份差
export function DiffMonth(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.abs(dateTwo.getMonth()-dateOne.getMonth())
  return diff
}
//天数差
export function DiffDay(dateOne, dateTwo) {
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let dateSpan,
    diff;
    dateSpan = Math.abs (dateTwo - dateOne);
    diff =  Math.floor(dateSpan / (24 * 3600 * 1000));
    return diff 
}
//小时差
export function DiffHour(dateOne, dateTwo) {
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.floor(Math.abs((dateOne.getTime()-dateTwo.getTime()) / 1000/3600));
  return diff 
}
// 分钟差
export function DiffMinute(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.floor(Math.abs((dateOne.getTime()-dateTwo.getTime()) / 1000/60));
  return diff
}
//秒差
export function DiffSecond(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.floor(Math.abs((dateOne.getTime()-dateTwo.getTime()) / 1000));
  return diff
}
//毫秒差
export function DiffMilliSecond(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  let diff = Math.floor(Math.abs(dateOne.getTime()-dateTwo.getTime()));
  return diff
}

/**
 * 计算两个日期的时间差（精确到天、小时、分、秒）
 * @param {*} dateOne 
 * @param {*} dateTwo 
 */
export function DiffDate(dateOne,dateTwo){
  dateOne = new Date(dateOne)
  dateTwo = new Date(dateTwo)
  var dateDiff = Math.abs(dateTwo.getTime()-dateOne.getTime())//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff/(24*3600*1000));//相差天数
  var ms1 = dateDiff%(24*3600*1000)//计算天数后剩余的毫秒数
  var hours = Math.floor(ms1/(3600*1000))//计算出小时
 
  var ms2 = ms1%(3600*1000)//计算小时后剩余的毫秒数
  var minutes = Math.floor(ms2/(60*1000)) //计算相差的分钟数
  var ms3 = ms2%(60*1000)//计算剩余的毫秒数
  var seconds = Math.round(ms3/1000)//计算秒

  let result ={
    days:dayDiff,
    hours:hours,
    minutes:minutes,
    seconds:seconds
  }
  return result
}

/**
 * 格式化显示日期
 * @param {*} value 日期
 * @param {*} exp 时间日期显示格式
 */
export function DateFormat(value, fmt) {
  value = new Date(value)
  fmt = fmt || "yyyy-MM-dd hh:mm:ss"//默认格式
  var d = {
    "M+": value.getMonth() + 1,
    "d+": value.getDate(),
    "h+": value.getHours(),
    "m+": value.getMinutes(),
    "s+": value.getSeconds(),
    "q+": Math.floor((value.getMonth() + 3) / 3),
    "S": value.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in d)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (d[k]) : (("00" + d[k]).substr(("" + d[k]).length)));
  return fmt
}

//日期类-[通用比较逻辑]
//晚于今年
export function LaterThisYear(date){
  let current = new Date()
  date = new Date(date)
  if(date.getFullYear()-current.getFullYear()>0){
    return true
  }
  return false
}
//早于今年
export function EarlierThisYear(date){
  let current = new Date()
  date = new Date(date)  
  if((date.getFullYear()-current.getFullYear)<0){
    return true
  }
  return false
}
//去年
export function PriorThisYear(date){
  let current = new Date()
  date = new Date(date)
  if((current.getFullYear()-date.getFullYear())==1){
    return true
  }
  return false
}
//明年
export function NextYear(date){
  let current = new Date()
  date = new Date(date)
  if((date.getFullYear()-current.getFullYear())==1){
    return true
  }
  return false
}
//今年
export function IsThisYear(date){
  let current = new Date()
  date = new Date(date)
  if((date.getFullYear()-current.getFullYear())==0){
    return true
  }
  return false
}


//晚于本月
export function LaterThisMonth(date){
  let current = new Date()
  date = new Date(date)
  if((date.getFullYear()*12 + (date.getMonth()+1))-(current.getFullYear()*12 + (current.getMonth()+1))>1){
    return true
  }
  return false
}
//早于本月
export function EarlierThisMonth(date){
  let current = new Date()
  date = new Date(date)
  if((current.getFullYear()*12 + (current.getMonth()+1))-(date.getFullYear()*12 + (date.getMonth()+1))>1){
    return true
  }
  return false
}
//本月
export function IsThisMonth(date){
  let current = new Date()
  date = new Date(date)
  if((date.getFullYear()*12 + (date.getMonth()+1))-(current.getFullYear()*12 + (current.getMonth()+1))==0){
    return true
  }
  return false
}
//下个月
export function NextMonth(date){
  let current = new Date()
  date = new Date(date)
  if((date.getFullYear()*12 + (date.getMonth()+1))-(current.getFullYear()*12 + (current.getMonth()+1))==1){
    return true
  }
  return false
}


//早于本周
export function EarlierThisWeek(date){
  //换算成天数差 (Math.floor((Math.abs(date.getTime()-current.getTime()))/(24*3600*1000)))
  //当前周date.getDay()
  let current = new Date()
  date = new Date(date)
  let startWeek = 0 - current.getDay()
  if(startWeek>(date.getDate()-current.getDate())){
    return true
  }
  return false
}
//晚于本周
export function LaterThisWeek(date){
  let current = new Date()
  date = new Date(date)
  let endWeek = 6-current.getDay()
  if((date.getDate()-current.getDate())>endWeek){
    return true
  }
  return false
}
//是上一周
export function LastWeek(date){
  let current = new Date()
  date = new Date(date)
  let endLastWeek = 0 - current.getDay()
  let startLastWeek = 0 - (6 + current.getDay())
  let result = date.getDate()-current.getDate();
  if(startLastWeek<result && result<endLastWeek){
    return true
  }
  return false
}
//是下一周
export function NextWeek(date){
  let current = new Date()
  date = new Date(date)
  let startLastWeek =  current.getDay()
  let endLastWeek = 6 + current.getDay()
  let result = date.getDate()-current.getDate()
  if(startLastWeek<result && result<endLastWeek){
    return true
  }
  return false
}
//两周之后
export function TwoWeeksAway(date){
  let current = new Date()
  date = new Date(date)
  if((date.getDate()-current.getDate())>((6-current.getDay())+7)){
    return true
  }
  return false
}
//本周
export function IsThisWeek(date){
  let current = new Date()
  date = new Date(date)
  let startWeek = 0 - current.getDay()
  let endWeek = 6 - current.getDay()
  let result = date.getDate()-current.getDate()
  if(startWeek<result&&result<endWeek){
    return true
  }
  return false
}


//今天
export function Today(date){

  
  let current = new Date()
  date = new Date(date)
  if((Math.floor((Math.abs(date.getTime()-current.getTime()))/(24*3600*1000)))==0){
    return true
  }
  return false
}



//明天
export function Tomorrow(date){
  let current = new Date()
  date = new Date(date)
  if((Math.floor((Math.abs(date.getTime()-current.getTime()))/(24*3600*1000)))==1){
    console.log("Tomorow",date.valueOf())
    return true
  }
  return false
}
//昨天
export function Yesterday(date){
  let current = new Date()
  date = new Date(date)
  if((Math.floor((Math.abs(current.getTime()-date.getTime()))/(24*3600*1000)))==1){
    return true
  }
  return false
}
//明天之后
export function DayAfterTomorrow(date){
  let current = new Date()
  date = new Date(date)
  if((Math.floor((Math.abs(date.getTime()-current.getTime()))/(24*3600*1000)))>1){
    return true
  }
  return false
}

//世界协调时间
export function UtcNow (date){
  return new Date(date).UTC()
}

//不同类型转换
//十进制
export function ToDecimal(data){
  return parseInt(data)
}
//双精度
export function ToDouble(data){
  //JS中没有双精度的说法，可以选择保留两位有效数字
  return parseFloat(data).toFixed(2)
}
//浮点数
export function ToFloat(data){
  return parseFloat(data)
}
//整数
export function ToInt(data){
  return parseInt(data)
}
//字符串
export function ToStr(data){
  return data.toString()
}



/**    
 * //数值类-多值运算比较
 *  FuncName="Avg" Des="Avg平均" 
    FuncName="Count" Des="计数" 
    FuncName="Max" Des="最大" 
    FuncName="Min" Des="最小" 
    FuncName="Sum" Des="和" 
    FuncName="Exists" Des="存在" (使用in 代替))
 * 
 */
//平均数
export function Avg(array){
  return Sum(array)/array.length;
}
//计数
export function Count(array){
 return array.length;
}
//最大值
export function Max(array){
  return Math.max(...array)
}
//最小值
export function Min(array){
  return Math.min(...array)
  
}
//求和
export function Sum(array){
  return array.reduce(function(x, y){
    return x + y;
  });
}

/**
 * 
 * //数值类-单值运算处理 
 * FuncName="Reverse" Des="反转" 
 * FuncName="Sign" Des="返回实参的符号" 
 * FuncName="BigMul" Des="乘积" 
 */

//返回实参的符号
export function Sign(number){
  let re=Math.sign(number);
  if(re){
    return '+'
  }else{
    return '-'
  }
}



/** 
//字符串类-单值运算处理
FuncName="PadLeft" Des="左补齐" 
FuncName="PadRight" Des="右补齐" 
FuncName="Remove" Des="移去" 
FuncName="Replace" Des="字符替换" 
FuncName="Trim" Des="去除空白" 
FuncName="Lower" Des="小写" 
FuncName="Upper" Des="转成大写" 
FuncName="Substring" Des="字串中取值" 
*/

//左补齐
export function PadLeft(num, n) {  
  let re='00000000000000000000000000000'+num; 
  return re.substr(re.length-n);  
} 

//右补齐
export function PadRight(num, n) {  
  let re= num +'00000000000000000000000000000'; 

  return re.substr(0,n);  
} 

//字符替换

export function Replace(str,substr,replacement){

  return str.replace(substr,replacement)
}

//去除空白
export function Trim(str){

  return str.trim();
}

//小写
export function Lower(str){

  return str.toLowerCase()
}

//大写
export function Upper(str){

  return str.toUpperCase()
}

//截取字符串
export function Substring(str,start,end){
  
  return str.substring(start,end)
}

//常量

//将字母转为Ascii
export function Ascii(str){

  return str.charCodeAt(str)
}


export function UnaryOperatorBitwiseNot(num){

  return ~num;
}













