(function() {
    function timer($interval) {
        
        return {
            templateUrl: '/templates/directives/timer.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                
                var session;
                
                scope.workSessionText = "Start Work Session";
                scope.resetText = "Reset Work Session";
                scope.breakText = "Take a Break";
                
                scope.workSession = false;
                scope.breakSession = false;
                
                
                scope.currentTime = 25 * 60;
                
                var timerFunction = function() {
                    scope.currentTime --;
                };

                scope.toggleTimer = function () {
                    if (scope.workSession == false) {
                        scope.workSession = true;
                        session = $interval(timerFunction, 1000);
                    } else {
                        scope.workSession = false;
                        $interval.cancel(session);
                        scope.currentTime = 25 * 60;
                    }
                };
                
            }
        };
    };
    angular
        .module('bloctime')
        .directive('timer', ['$interval', timer]);
})();