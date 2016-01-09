app.filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
}).filter('moment', function () {
  return function (input, momentFn) {
    var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input);
    return momentObj[momentFn].apply(momentObj, args);
  };
})
.filter('decodeHtml',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
})
;