(function() {
    function Tasks($firebaseArray) {
        var ref = firebase.database().ref();
        
        var tasks = $firebaseArray(ref);
        
        return tasks;
    }
    
    angular
        .module('bloctime')
        .factory('Tasks', ['$firebaseArray', Tasks]);
})();