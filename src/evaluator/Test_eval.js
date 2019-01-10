import React, { Component } from 'react';
// import {Parser} from 'expr-eval'
import { Parser } from './tool/parser'



/**
 * Expression
 * Parser.parse(str)返回一个Expression对象
 */

/**
 * evaluate(varibles?:object)
 * 使用绑定到varibles中的值来设定计算表达式
 */

// var parser = new Parser()
// var expr = parser.parse('2*x+1');
// console.log("base",expr.evaluate({x:3}))

// expr = Parser.parse("2 ^ x")
// console.log("",expr.evaluate({x:3}))//8

// /**
//  * substitute(variable:string,exptression:Expression|string|number)
//  * 创建一个新的表达式，将指定的变量替换成另一个表达式
//  */
// expr = Parser.parse("2 * x + 1")
// var expr2=expr.substitute("x", "4 * x")
// console.log("sub",expr2.evaluate({ x: 3 }))//25

// //simplify
// /**
//  * simplify
//  * 
//  */
// var sim_expr = Parser.parse("x * (y * atan(1))").simplify({ y: 4 }); //(x*3.141592653589793)
// console.log("simplify expr:",sim_expr)
// console.log("simplify expr.evaluate:",sim_expr.evaluate({x:2}))//6.283185307179586

// //variables
// var var_expr = Parser.parse("x * (y * atan(1))");//(x*(y*atan(1)))
// console.log("variables:",var_expr.variables()) //["x","y"]
// console.log("variables expr.simplify",var_expr.simplify({ y: 4 }).variables())//["x"]

// //symbol

// var sym_expr = Parser.parse("min(x,y,z)")
// console.log("symbol expr:",sym_expr.symbols())//["min", "x", "y", "z"]
// console.log("symbol expr.simplify:",sym_expr.simplify({y:4,z:5}).symbols())// ["min", "x"]

// //默认情况下，当前版本中禁用in运算符。若要使用它，需要先构造一个Parser实例，并将operator.in设置为true
// //toJSFunction
// var func_expr = Parser.parse("x+y+z");
// var f = func_expr.toJSFunction("x,y,z");//function (x, y, z) { return x + y + z; };
// console.log("toJSFunction f1:",f(1,2,3))//6
// var f2 = func_expr.toJSFunction("y,z",{x:100});//function (y, z) { return 100 + y + z; };
// console.log("toJSFunction f2:",f2(2,3))//105


// //测试 多级操作
// var sym_expr = Parser.parse("y.x>z.a.b?true:false")
// console.log("symbol expr:000",sym_expr.evaluate({y:{x:4},z:{a:{b:1}}}))//["min", "x", "y", "z"]
// console.log("symbol expr.simplify 0000:",sym_expr.evaluate({y:{x:4},z:{a:{b:1}}}))// ["min", "x"]






// // 默认情况下，当前版本中禁用in运算符。若要使用它，需要先构造一个Parser实例，并将operator.in设置为true
// var parser = new Parser({
//     operators:{
//         'in':true
//     }
// })//现在parser就可以支持 'x in array'的表达式


// //Custom function
var cus_parser = new Parser();
//新增一个函数
cus_parser.functions.customAddFunction  = function(arg1,arg2){
    return arg1+arg2;
};
// //删除阶乘函数
// delete cus_parser.functions.fac;

// console.log("custom function:",cus_parser.evaluate('customAddFunction(2, 4) == 6'))// true
// //cus_parser.evaluate('fac(3)'); // This will fail


// //constants
// var con_parser = new Parser()
// con_parser.consts.R = 1.236;
// console.log(con_parser.parse('A+B/R').toString());  // ((A + B) / 1.234)

// // 禁用预定义常量，可以替换或删除parser.consts:
// var parser = new Parser();
// parser.consts = {};


//禁止逻辑运算符，但允许in
var parIn = new Parser({
    operators: {
        //默认情况下为true，但包含在显式中
        add: true,//
        concatenate: true,//
        conditional: true,
        divide: true,
        factorial: true,
        multiply: true,
        power: true,
        remainder: true,
        subtract: true,

        //禁止 与and 或or 非not，<,==,!=,etc
        logical: false,
        comparison: false,

        //默认情况下，当前的版本禁用in运算符
        'in': true,
        'like': true
    }
});

async function Eva_in(){
    let result = await parIn.evaluate('3 in array', { array: [ 1, 2, 3 ] })
    console.log("in Array:",result)
    return result
}
Eva_in()

// console.log("in Array",parIn.evaluate('3 in array', { array: [ 1, 2, 3 ] }) )//string 字符串


// console.log("in Array",parIn.evaluate('3 in DJZT', { DJZT:'1,2,3' }) )//string 字符串

//like
// var test = parIn.evaluate('str like "%st%"', { str: 'test' });
// console.log("Like", parIn.evaluate('str like "%st%"', { str: 'test' }))//string 字符串
// console.log("test",test)
// console.log("in Object",parIn.evaluate('"name" in object', { object: {name:"a"} }))

//Name Like "X%" "%X" "%X%"// 前匹配 后匹配 包含匹配 模糊查询
// let a ='1,2,3,4,5,6,0'
// console.log("Min",parIn.evaluate('min(1,2,3,4,5,6,0)'))
// console.log("Date",parIn.parse('a+b+c').variables())//[a,b,c]




// console.log("testMin",parIn.evaluate("min(1,2,3)"))
//获取年份
// console.log("返回日期年:",new Date(x).getFullYear())
//获取星期
// console.log("返回星期几:",new Date(x).getDay())//（0代表周日）
//获取今天几号
// console.log("返回几号:",new Date(x).getDate())//
//获取月份
// console.log("获取月份:",new Date(x).getMonth())//(0 代表1 月)
//日期大小比较
// console.log("大小比较:",new Date(x)<y)
//时间差年数
// console.log("时间差年数:",new Date(x).getFullYear()-y.getFullYear())
//时间差毫秒数
// console.log("时间差毫秒数：",new Date(x).getTime()-y.getTime())


async function test(){
    console.log("=========test==========")
    console.log("random",await parIn.evaluate("Random()+str",{str:2}))
    console.log("sign",await parIn.evaluate('Sign(x)', {x:9}))
    console.log("atan2",await parIn.evaluate('Atan2(x,y)',{x:2.0,y:1.0}))
    console.log("PadLeft",await parIn.evaluate('PadLeft(x,y)',{x:3,y:6}))
    console.log("PadRight",await parIn.evaluate('PadRight(x,y)',{x:3,y:6}))
    console.log("Replace",await parIn.evaluate('Replace(x,y,z)',{x:'Visit Microsoft!',y:/Microsoft/,z:'W3School'}))
    console.log("Trim",await parIn.evaluate('Trim(x)',{x:'   Hello   '}))
    console.log("Lower",await parIn.evaluate('Lower(x)',{x:'HeLLo'}))
    console.log("Upper",await parIn.evaluate('Upper(x)',{x:'HeLLo'}))
    console.log("Substring",await parIn.evaluate('Substring(x,y,z)',{x:'HeLLo',y:2,z:4}))
    console.log("Ceiling",await parIn.evaluate('Ceiling(x)',{x:6.7}))
    console.log("Floor",await parIn.evaluate('Floor(x)',{x:6.7}))
    console.log("Ascii",await parIn.evaluate('Ascii(x)',{x:'a'}))
    console.log("FromCharCode",await parIn.evaluate('FromCharCode(x)',{x:97}))

    console.log("BeginsWith",await parIn.evaluate('BeginsWith(x)',{x:'HeLLo'}))
    console.log("EndsWith",await parIn.evaluate('EndsWith(x)',{x:'HeLLo'}))
    console.log("ToDecimal",await parIn.evaluate('ToDecimal(x)',{x:'0xff'}))
    console.log("ToDouble",await parIn.evaluate('ToDouble(x)',{x:'9.1569874'}))
    console.log("ToFloat",await parIn.evaluate('ToFloat(x)',{x:9.1569874}))
    console.log("ToInt",await parIn.evaluate('ToInt(x)',{x:9.1569874}))
    console.log("ToStr",await parIn.evaluate('ToStr(x)',{x:9.1569874}))
    
    console.log("UtcNow",await parIn.evaluate('UtcNow(x)',{x:9.1569874}))



    







}
test();


//------------------------------------------------日期类测试——-------------------------------------------------------------------
let x ="2019/1/22/13:20:10"// - 空格 /  年份一定是四位数
let y = new Date()
//返回日期部分
async function Eva_GetDate(){
    let result = await parIn.evaluate("GetDate(x)",{x:x})
    console.log("返回日期部分GetDate:",result)
    return result

}
Eva_GetDate()

async function Eva_Year(){
    let result = await parIn.evaluate("Year(x)",{x:x})
    console.log("返回Year:",result)
    return result

}
Eva_Year()

async function Eva_Hour(){
    let result = await parIn.evaluate("Hour(x)",{x:x})
    console.log("返回Hour:",result)
    return result

}
Eva_Hour()

async function Eva_MilliSecond(){
    let result = await parIn.evaluate("MilliSecond(x)",{x:x})
    console.log("返回MilliSecond:",result)
    return result

}
Eva_MilliSecond()

async function Eva_Minute(){
    let result = await parIn.evaluate("Minute(x)",{x:x})
    console.log("返回Minute:",result)
    return result

}
Eva_Minute()


async function Eva_Second(){
    let result = await parIn.evaluate("Second(x)",{x:x})
    console.log("返回Second:",result)
    return result

}
Eva_Second()

async function Eva_Month(){
    let result = await parIn.evaluate("Month(x)",{x:x})
    console.log("返回Month:",result)
    return result

}
Eva_Month()

async function Eva_DayOfWeek(){
    let result = await parIn.evaluate("DayOfWeek(x)",{x:x})
    console.log("返回DayOfWeek:",result)
    return result

}
Eva_DayOfWeek()

//日期类加减运算

async function Eva_AddYears(){
    let result = await parIn.evaluate("AddYears(date,number)",{date:x,number:2})
    console.log("AddYears:",result)
    return result

}
Eva_AddYears()

async function Eva_AddQuarters(){
    let result = await parIn.evaluate("AddQuarters(date,number)",{date:x,number:2})
    console.log("AddQuarters:",result)
    return result

}
Eva_AddQuarters()

async function Eva_AddMonths(){
    let result = await parIn.evaluate("AddMonths(date,number)",{date:x,number:2})
    console.log("AddMonths:",result)
    return result

}
Eva_AddMonths()

async function Eva_AddWeeks(){
    let result = await parIn.evaluate("AddWeeks(date,number)",{date:x,number:2})
    console.log("AddWeeks:",result)
    return result

}
Eva_AddWeeks()

async function Eva_AddDays(){
    let result = await parIn.evaluate("AddDays(date,number)",{date:x,number:2})
    console.log("AddDays:",result)
    return result

}
Eva_AddDays()

async function Eva_AddHours(){
    let result = await parIn.evaluate("AddHours(date,number)",{date:x,number:2})
    console.log("AddHours:",result)
    return result

}
Eva_AddHours()

async function Eva_AddMinutes(){
    let result = await parIn.evaluate("AddMinutes(date,number)",{date:x,number:2})
    console.log("AddMinutes:",result)
    return result

}
Eva_AddMinutes()

async function Eva_AddSeconds(){
    let result = await parIn.evaluate("AddSeconds(date,number)",{date:x,number:2})
    console.log("AddSeconds:",result)
    return result

}
Eva_AddSeconds()


async function Eva_AddMilliSeconds(){
    let result = await parIn.evaluate("AddMilliSeconds(date,number)",{date:x,number:6000})
    console.log("AddMilliSeconds:",result)
    return result

}
Eva_AddMilliSeconds()


//日期类-两个日期运算处理 年 月 日 天 小时 分钟 秒 毫秒


async function Eva_DiffYear(){
    let result = await parIn.evaluate("DiffYear(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffYear:",result)
    return result

}
Eva_DiffYear()

async function Eva_DiffMonth(){
    let result = await parIn.evaluate("DiffMonth(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffMonth:",result)
    return result

}
Eva_DiffMonth()

async function Eva_DiffDay(){
    let result = await parIn.evaluate("DiffDay(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffDay:",result)
    return result

}
Eva_DiffDay()


async function Eva_DiffHour(){
    let result = await parIn.evaluate("DiffHour(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffHour:",result)
    return result

}
Eva_DiffHour()


async function Eva_DiffMinute(){
    let result = await parIn.evaluate("DiffMinute(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffMinute:",result)
    return result

}
Eva_DiffMinute()

async function Eva_DiffSecond(){
    let result = await parIn.evaluate("DiffSecond(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffSecond:",result)
    return result

}
Eva_DiffSecond()

async function Eva_DiffMilliSecond(){
    let result = await parIn.evaluate("DiffMilliSecond(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffMilliSecond:",result)
    return result

}
Eva_DiffMilliSecond()

/**
 * 计算两个日期的时间差（精确到天、小时、分、秒）
 * @param {*} dateOne 
 * @param {*} dateTwo 
 */

async function Eva_DiffDate(){
    let result = await parIn.evaluate("DiffDate(dateOne,dateTwo)",{dateOne:x,dateTwo:y})
    console.log("DiffDate:",result)
    return result

}
Eva_DiffDate()

/**
 * 格式化显示日期
 * @param {*} value 日期
 * @param {*} exp 时间日期显示格式
 */

async function Eva_DateFormat(){
    let result = await parIn.evaluate("DateFormat(value,fmt)",{value:x,fmt:"yyyy-MM-dd hh:mm:ss"})
    console.log("Eva_DateFormat:",result)
    return result

}
Eva_DateFormat()


//日期类-[通用比较逻辑]

async function LaterThisYear(){
    let result = await parIn.evaluate("LaterThisYear(date)",{date:x})
    console.log("LaterThisYear:",result)
    return result
}
LaterThisYear()

async function EarlierThisYear(){
    let result = await parIn.evaluate("EarlierThisYear(date)",{date:x})
    console.log("EarlierThisYear:",result)
    return result
}
EarlierThisYear()

async function PriorThisYear(){
    let result = await parIn.evaluate("PriorThisYear(date)",{date:x})
    console.log("PriorThisYear:",result)
    return result
}
PriorThisYear()

async function NextYear(){
    let result = await parIn.evaluate("NextYear(date)",{date:x})
    console.log("NextYear:",result)
    return result
}
NextYear()

async function IsThisYear(){
    let result = await parIn.evaluate("IsThisYear(date)",{date:x})
    console.log("IsThisYear:",result)
    return result
}
IsThisYear()

async function LaterThisMonth(){
    let result = await parIn.evaluate("LaterThisMonth(date)",{date:x})
    console.log("LaterThisMonth:",result)
    return result
}
LaterThisMonth()


async function EarlierThisMonth(){
    let result = await parIn.evaluate("EarlierThisMonth(date)",{date:x})
    console.log("EarlierThisMonth:",result)
    return result
}
EarlierThisMonth()

async function IsThisMonth(){
    let result = await parIn.evaluate("IsThisMonth(date)",{date:x})
    console.log("IsThisMonth:",result)
    return result
}
IsThisMonth()

async function NextMonth(){
    let result = await parIn.evaluate("NextMonth(date)",{date:x})
    console.log("NextMonth:",result)
    return result
}
NextMonth()

async function EarlierThisWeek(){
    let result = await parIn.evaluate("EarlierThisWeek(date)",{date:x})
    console.log("EarlierThisWeek:",result)
    return result
}
EarlierThisWeek()

async function LaterThisWeek(){
    let result = await parIn.evaluate("LaterThisWeek(date)",{date:x})
    console.log("LaterThisWeek:",result)
    return result
}
LaterThisWeek()


async function LastWeek(){
    let result = await parIn.evaluate("LastWeek(date)",{date:x})
    console.log("LastWeek:",result)
    return result
}
LastWeek()


async function NextWeek(){
    let result = await parIn.evaluate("NextWeek(date)",{date:x})
    console.log("NextWeek:",result)
    return result
}
NextWeek()


async function TwoWeeksAway(){
    let result = await parIn.evaluate("TwoWeeksAway(date)",{date:x})
    console.log("TwoWeeksAway:",result)
    return result
}
TwoWeeksAway()

async function IsThisWeek(){
    let result = await parIn.evaluate("IsThisWeek(date)",{date:x})
    console.log("IsThisWeek:",result)
    return result
}
IsThisWeek()
//124.8769
async function Today(){
    let result = await parIn.evaluate("Today(date)",{date:x})
    console.log("Today:",result)
    return result
}
Today()

async function Tomorrow(){
    let result = await parIn.evaluate("Tomorrow(date)",{date:x})
    console.log("Tomorrow:",result)
    return result
}
Tomorrow()

async function Yesterday(){
    let result = await parIn.evaluate("Yesterday(date)",{date:x})
    console.log("Yesterday:",result)
    return result
}
Yesterday()


async function DayAfterTomorrow(){
    let result = await parIn.evaluate("DayAfterTomorrow(date)",{date:x})
    console.log("DayAfterTomorrow:",result)
    return result
}
DayAfterTomorrow()

























class Test_eval extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Test_eval;

/**
 * 1 异步
 * 2 in 字符串
 * 3 增加谓池：%  运算符重载
 * 4
 */