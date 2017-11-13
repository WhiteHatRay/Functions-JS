/**
 * URL解析
 * @param {String} url 要解析的URL
 * @returns 解析结果OBJECT/ARRAY
 */
function analyseUrl(url){
	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var analyseResult = parse_url.exec(url);
	var fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
	var result = new Object();
	$.each(fields, function(n, item){
		result[item] = analyseResult[n];
	});
	return result;
}

/**
 * 查询/判断url是否有某个参数,如果有该参数，返回参数的值；没有返回null 
 * @param {String} url 要查询的url
 * @param {String} name 要查询的参数名
 * @return {String} 参数的值
 */
function hasParameter(url, name){
    var urlAnalyse = analyseUrl(url);
    var urlParam = urlAnalyse.query;
    if(typeof(urlParam) != 'undefined'){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = urlParam.match(reg);
        if (r != null){
            return unescape(r[2]);
        }
        //有该参数，但是值为null
        return "";
    }
    //没有该参数
    return null;
}

/**
 * url增加参数
 * @param {String} url 要修改的url
 * @param {String} name 要增加的参数名
 * @param {String} value 对应的参数值
 * @return {String} 修改后的结果
 */
function addParameter(url, name, value){
    var newUrl = url;
    var paremeter = name + "=" + value;
    if (url.match("[\?]")) {
        //存在其他参数，用&连接
        newUrl = url + "&" + paremeter;
    } else {
        //没有参数，用?连接
        newUrl = url + "?" + paremeter;
    }
    return newUrl;
}

/**
 * 替换Url参数
 * @param {String} url 要修改的Url
 * @param {String} name 要修改的参数名
 * @param {String} value 对应的参数的值
 * @return {String} 修改后的Url
 */
function replaceParameter(url, name, value) {
    var newUrl = url;
    if(hasParameter(url, name)){
        //有该参数，修改
        var replacedPar = eval('/(' + name + '=)([^&]*)/gi');
        newUrl = url.replace(replacedPar, name + '=' + value);
    } else {
        //没有该参数，增加
        newUrl = addParameter(url, name, value);
    }
    return newUrl;
}

(function($) {
	/**
	 * 小数位数限制
	 * @param {unsigned int} n 小数位数
	 */
	$.fn.formatDecimal = function(n){
		this.each(function(i) {
			if(isNan(parseFloat( this.value ))) return;
			if(this.value.toString().split(".")[1].length > n){
				this.value = parseFloat(this.value).toFixed(n)
			}
		});
		return this;
	}
})( jQuery );

