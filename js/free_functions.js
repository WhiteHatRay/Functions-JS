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
});
