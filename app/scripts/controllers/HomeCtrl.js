(function() {
    function HomeCtrl($scope, Tasks) {
        $scope.tasks = Tasks;
        
        $scope.addTask = function() {
            $scope.tasks.$add({
                text: $scope.task
            });
            
            $scope.task = "";
        };
    };
    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$scope', 'Tasks', HomeCtrl]);
})();