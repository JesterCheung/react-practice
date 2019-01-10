#JavaScript Expression Evaluator
解析并赋值数学表达式。相对于JS的eval函数来说，它是一种更加安全、更加数学化的替代方法。
它内置了对常见数学运算和函数的支持。此外，还可以自定义JS函数。表达式可以直接赋值，也可以编译为本机的JS函数。

##Parser
Parser是library中最核心的类。它有单个解析方法和用于解析及己算表达式的静态方法。
###Parse()
构造一个新的`Parser`实例
构造函数采用可选的`options`参数，允许自定义启用或者禁用运算符
eg：创建一个不允许比较或逻辑运算符的`Parser`，但允许`in`:


	var parIn = new Parser({
    	operators:{
        	//默认情况下为trun，但包含在显式中
        	add:true,
        	concatenate:true,
        	conditional:true,
        	divide:true,
        	factorial:true,
        	multiply:true,
        	power:true,
        	remainder:true,
        	subtract:true,

        //禁止 与and 或or 非not，<,==,!=,etc
        	logical:false,
        	comparison:false,

        //默认情况下，当前的版本禁用in运算符
        	'in':true
    	}
	});

###parse(expression:string) 解析（表达式：字符串）
将数学表达式转换为Expression对象
 
###Parser.parse(expression:string) 解析器（表达式：字符串）
Static equivalent of `new Parser().parse(expression)`.

Parser.evaluate(expression:string,variables?:object)
使用变量对象中的值和函数解析并立即计算表达式。
`Parser.evaluate(expr，vars)`等同于：`Parser.parse(expr).evaluate(vars)`

##Expression 表达式
**`Parser.parse(str)`返回一个`Expression`对象**。Expressions（表达式）类似于JS中的函数，即可以使用绑定到传入值得变量调用它们。实际上，它们甚至可以转换为JS函数。

###evaluate(variables?:object) 求值（变量：对象）
**使用绑定到{variables}中的值的变量来计算表达式**。表达式中的每个变量都绑定到第九项的相应成员。如果存在未绑定的变量，则evaluate将引发异常。

    expr = Parser.parse("2 ^ x")
    console.log("",expr.evaluate({x:3}))//8

###substitute(variable:string,exptression:Expression|string|number)  替换（变量：字符串，表达式：表达式|字符串|数字）
**创建一个新的表达式，将指定的变量替换为另一个表达式**。这类似于功能组合。如果表达式是一个字符串或是数字，它将被解析为一个表达式。

    expr = Parser.parse("2 * x + 1")
    var expr2=expr.substitute("x", "4 * x")
    console.log("sub",expr2.evaluate({ x: 3 }))//25



###simplify(variables:object)  简化（变量：对象）
**简化子表达式常量并用文字值替换变量引用**。这基本上一种局部赋值，它使用提供的变量尽可能多的计算。函数调用并不会被计算，因为它们可能是不确定性的。
简化非常简单。例如，它不知道加法和乘法是关联的，除非未x提供值，否则无法简化上一个示例中的`((2*(4*x))+1)`。但是，`2*4*x +1 `可以解析为`(((2*4)*x) +1)`,因此`(2*4)`子表达式将替换成8，从而得到((8*x)+1)


    var sim_expr = Parser.parse("x * (y * atan(1))").simplify({ y: 4 }); //(x*3.141592653589793)
    console.log("simplify expr:",sim_expr)
    console.log("simplify expr.evaluate:",sim_expr.evaluate({x:2}))//6.283185307179586

###variable(options?:object) 变量（选项：对象）
**获取表达式中未绑定变量的数组**。

    var var_expr = Parser.parse("x * (y * atan(1))");//(x*(y*atan(1)))
    console.log("variables:",var_expr.variables()) //["x","y"]
    console.log("variables expr.simplify",var_expr.simplify({ y: 4 }).variables())//["x"]

默认情况下，变量将返回顶级对象，例如：`Parser.parse(x.y.z).variables()`返回`["x"]`。如果想要获得整个对象的成员链，可以使用`{withMembers:true}`来调用它。所以`Parser.parse(x.y.z).variables({withMembers:true})`会返回`["x.y.y"]`

###symbols(options?:object)  符号（选项：对象）
**获取变量数组，包括表达式中使用的任何内置函数**。
    
    var sym_expr = Parser.parse("min(x,y,z)")
    console.log("symbol expr:",sym_expr.symbols())//["min", "x", "y", "z"]
    console.log("symbol expr.simplify:",sym_expr.simplify({y:4,z:5}).symbols())// ["min", "x"]
跟`variables`一样，`symbol`接受选项参数`{withMembers:true}`来包含对象成员。

###toString()
将表达式转换为字符串。toString()用括号括起每个子表达式（文字值、变量和函数调用除外），因此它对调试优先级错误很有用。

###toJSFunction(parameters:array|string,variables?:object)
**将Expression表达式对象转换成可以被调用的JS函数**。parameters是一个参数名称数组或者字符串，名称以逗号分隔。
如果提供了可选变量参数，则将使用绑定到提供的值的变量简化表达式：
    
    var func_expr = Parser.parse("x+y+z");
    var f = func_expr.toJSFunction("x,y,z");//function (x, y, z) { return x + y + z; };
    console.log("toJSFunction f1:",f(1,2,3))//6
    var f2 = func_expr.toJSFunction("y,z",{x:100});//function (y, z) { return 100 + y + z; };
    console.log("toJSFunction f2:",f2(2,3))//105


##表达式语法Expression Syntax

解析器接受一个非常基本的语法。 它与普通的JavaScript表达式类似，但更加面向数学。 例如，^运算符是取幂，而不是xor。


运算符优先级
![](https://i.imgur.com/A5ecGlu.png)

默认情况下，当前版本中禁用in运算符。若要使用它，需要先构造一个Parser实例，并将operator.in设置为true。eg：

    var parser = new Parser({
    	operators:{
    		'in':true
    	}
    })//现在parser就可以支持 'x in array'的表达式

###一元运算符
解析器有几个内置的“函数”，实际上是一元运算符。 这些和函数之间的主要区别在于它们只能接受一个参数，并且括号是可选的。 对于括号，它们具有与函数调用相同的优先级，但没有括号，它们保持其正常优先级（仅在^之下）。 例如，sin（x）^ 2等价于（sin x）^ 2，sin x ^ 2等价于sin（x ^ 2）。

一元+和 - 运算符是一个例外，并且始终具有正常的优先级。

![](https://i.imgur.com/cuNex8G.png)
![](https://i.imgur.com/Wjy2Ed6.png)

### Pre-defined function（预定义函数？？？）
除了操作函数功能以外，还有几个预定义的功能。可以通过将变量绑定到普通的JS函数来提供给自己。这些不是通过简化计算。
![](https://i.imgur.com/j8mvfYT.png)


###Custom functions （自定义功能）
如果您需要开箱即用的其他功能，您可以轻松地将它们添加到您自己的代码中。 Parser类的实例有一个称为函数的属性，它只是一个具有范围内所有函数的对象。 您可以添加，替换或删除任何属性，以自定义表达式中可用的内容。 例如：

    var cus_parser = new Parser();
    //新增一个函数
    cus_parser.functions.customAddFunction  = function(arg1,arg2){
    	return arg1+arg2;
    };
    //删除阶乘函数
    delete cus_parser.functions.fac;
    
    console.log("custom function:",cus_parser.evaluate('customAddFunction(2, 4) == 6'))// true
    //cus_parser.evaluate('fac(3)'); // This will fail

###Contants常量
解析器还包括许多可以在表达式中使用的预定义常量。 这些如下表所示：
![](https://i.imgur.com/FPhiUdL.png)
预定义的常量存储在parser.consts中。 您可以对此属性进行更改以自定义表达式可用的常量。 例如：

    var con_parser = new Parser()
    con_parser.consts.R = 1.236;
    console.log(con_parser.parse('A+B/R').toString());  // ((A + B) / 1.234)
如果需要禁用预定义常量，可以替换或删除parser.consts:

    var parser = new Parser();
    parser.consts = {};
