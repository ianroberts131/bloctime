(function() {
    function timer($interval, INTERVALS) {
        
        return {
            templateUrl: '/templates/directives/timer.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                
                var session;
                
                var workSessionCounter = 0;
                
                scope.workSessionText = "Start Work Session";
                scope.breakText = "Take a Break";
                
                scope.workSession = false;
                scope.onBreak = false;
                
                scope.currentTime = INTERVALS.WORK_SESSION_TIME;
                
                var dingSound = new buzz.sound('/assets/sounds/chinese-gong-sound.mp3', {
                    preload: true
                });
                
                scope.$watch('currentTime', function() {
                    if (scope.currentTime == 0) {
                        dingSound.play();
                    }
                });
                
                var decrementTimer = function() {
                    scope.currentTime --;
                    if (scope.workSession == true && scope.currentTime < 0) {
                        $interval.cancel(session);
                        scope.workSession = false;
                        scope.onBreak = true;
                        workSessionCounter ++;
                        if (workSessionCounter == 4) {
                            scope.currentTime = INTERVALS.LONG_BREAK_SESSION_TIME;
                            workSessionCounter == 0;
                        } else {
                            scope.currentTime = INTERVALS.BREAK_SESSION_TIME;
                        };
                    } else if (scope.onBreak == true && scope.currentTime < 0) {
                        $interval.cancel(session);
                        scope.onBreak = false;
                        scope.currentTime = INTERVALS.WORK_SESSION_TIME;
                        scope.workSessionText = "Start Work Session";
                    };
                };

                scope.toggleTimer = function () {
                    if (scope.workSession == false && scope.onBreak == false) {
                        scope.workSession = true;
                        scope.workSessionText = "Reset Work Session";
                        session = $interval(decrementTimer, INTERVALS.ONE_SECOND);
                    } else if (scope.workSession == true && scope.onBreak == false) {
                        scope.workSession = false;
                        scope.workSessionText = "Start Work Session";
                        $interval.cancel(session);
                        scope.currentTime = INTERVALS.WORK_SESSION_TIME;
                    } else {
                        session = $interval(decrementTimer, INTERVALS.ONE_SECOND);
                    }
                            
                };
                
            }
        };
    };
    angular
        .module('bloctime')
        .constant('INTERVALS', {
            'WORK_SESSION_TIME': 25 * 60,
            'BREAK_SESSION_TIME': 5 * 60,
            'LONG_BREAK_SESSION_TIME': 30 * 60,
            'ONE_SECOND': 1000
        })
        .directive('timer', ['$interval', 'INTERVALS', timer]);
})();