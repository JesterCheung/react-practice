import React, { Component } from 'react';
import fs from 'fs-'

//例子
// var result = function(){
//     if("抢红包结束") return 5
// }
// console.log(result())


//回调函数callback
var call_result = function(callback){
	setTimeout(()=>{
		callback("callback",5)
	},1000)
}

call_result(console.log)

//用一个真实的io调用替代抢红包，新建一个numbers.txt文件，在里面写若干个红包金额
// const fs = require('fs');
// const readFileAsArray = function(file,cb){
    
//     fs.readFile(file,(err,data)=>{
//         console.log("fs",file)
//         if(err) return cb(err);
//         const lines = data.toString().trim().split('\n');
//         cb(null,lines)
//     })
// }
// readFileAsArray('./numbers.txt', (err, lines) => {
//     if (err) throw err;
//     const numbers = lines.map(Number);
//     console.log(`分别抢到了${numbers}块红包`);
// })

fs.readFile('./numbers.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
 });

// var reader = new FileReader();
// reader.onload = function (event) {
//     // event.target.result就是文件文本内容
//     // 然后你就可以为所欲为了
//     // 例如如果是JSON数据可以解析
//     // 如果是HTML数据，可以直接插入到页面中
//     // 甚至字幕文件，各种滤镜，自定义文件格式，都可以玩弄于鼓掌之间……
// };
// reader.readAsText('C:\JesterCheung\React\antd-demo\src\async\numbers.txt');




class Async_test extends Component {
    render() {
        return (
            <h1>
                Async Test
            </h1>
        );
    }
}

export default Async_test;