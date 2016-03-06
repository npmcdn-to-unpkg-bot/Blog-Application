/**
 * Created by Raphson on 3/5/16.
 */
angular.module('blogger.admin.filters', []).filter('permalink', function(){
    return function(title){
        return title === undefined ? '' : title.toLowerCase().replace(/[\s]/g, '-');
    }
});