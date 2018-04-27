/**
 * Created by Administrator on 2018/4/22 0022.
 */

//ajax 封装

// type async data url
//function ajax(object){
//
//    var promise = new Promise(function (resolve, reject){
//        object.type = object.type || 'get';
//
//        if(!object.async){
//            object.async = false;
//        }else{
//            object.async = true;
//        }
//
//        object.data = object.data || '';
//
//        if(typeof object.data == 'object' && typeof object.data != 'number'){
//            object.data = data2string(object.data)
//        }else if(typeof object.data == 'string'){
//            object.data = object.data;
//        }else{
//            throw new Error('你输入的数据有误，请重新输入！')
//        }
//
//        if(object.type == 'get' && object.data){
//            object.url += '?' + object.data;
//        }
//
//        var xml = null;
//        try{
//            xml = new XMLHttpRequest()
//        }catch(e){
//            xml = new ActiveXObject('Microsoft.XMLHTTP')
//        }
//
//        xml.open(object.type, object.data, object.async)
//
//        if(object.type == 'get'){
//            xml.send()
//        }else{
//            xml.setRequestHeader('content-type','application/x-www-form-urlencoded')
//            xml.send(object.data)
//        }
//
//        if(!object.async){
//            resolve(xml.responseText)
//            //object.success && object.success(xml.responseText)
//        }else{
//            xml.onreadystatechange = function(){
//                if(xml.readyState == 4){
//                    if(xml.status == 200){
//                        resolve(xml.responseText)
//                        //object.success && object.success(xml.responseText)
//                    }else{
//                        reject(xml.status)
//                        //object.error && object.error(xml.status)
//                    }
//                }
//            }
//        }
//    })
//
//    return promise;
//
//    function data2string(obj){
//        var arr = [];
//        for(var i in obj){
//            arr.push(i + "=" + obj[i])
//        }
//        return arr.join('&')
//    }
//}
//
//var options = {
//    type: 'get',
//    url: 'xxxx',
//    data: '',
//    async: false
//}
//ajax(options).then(function(res){
//
//}).then(function(){
//
//}).catch(function(err){
//
//})


/*
 * jsonp 封装
 * 1.url
 * 2.data
 * */
function jsonp(object){
    if(!object.url)
        return;
    var promise = new Promise(function(resolve, reject){

        object.data = object.data || {};

        if(typeof object.data == 'object' && typeof object.data != 'number'){
            object.data = data2string(object.data)
        }else if(typeof object.data == 'string'){
            object.data = object.data;
        }else{
            throw new Error('输入的参数有误')
        }

        var datas ;

        object.url += '?' + object.data + '&jsonpCallback=fn';

        var JsonpScript = document.createElement('script');

        JsonpScript.src = object.url;

        document.body.appendChild(JsonpScript);

        window.fn = function(data){
            datas = data;
        }

        JsonpScript.onload = function (res) {
            document.body.removeChild(JsonpScript);
            resolve(datas)
        }
        JsonpScript.onerror =function(res){
            document.body.removeChild(JsonpScript);
            reject(res)
        }
    })

    return promise;

    function data2string(obj){
        var arr = [];
        for(var i in obj){
            arr.push(i + "=" + obj[i])
        }
        return arr.join('&')
    }
}

jsonp({
    url:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data:{
        platform:'h5',
        uin:0,
        needNewCode:1
    }
}).then(function(res){
    console.log(res)
}).catch(function(e){
    console.log(2)
})