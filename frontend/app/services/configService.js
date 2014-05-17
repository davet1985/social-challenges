app.service('configService', [function() {

    var API_END_POINT = 'http://localhost:9393/';

    return{
        API_END_POINT: API_END_POINT
    };
   
}]);