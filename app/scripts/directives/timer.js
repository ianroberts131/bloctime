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
                    
                    scope.$watch('currentTime', function() {
                        drawAnalogClock();
                    });
                    
                    
                    var drawAnalogClock = function() {
                        scope.canvas = document.getElementById('canvas');
                        scope.context = scope.canvas.getContext('2d');

                        var angle;
                        var secHandLength = 120;

                        /* Clear out the canvas. Re-draw new elements every second **/
                        scope.context.clearRect(0, 0, scope.canvas.width, scope.canvas.height);

                        OUTER_DIAL1();
                        OUTER_DIAL2();
                        CENTER_DIAL();
                        MARK_THE_MINUTES();
                        MARK_THE_SECONDS();

                        SHOW_SECONDS();
                        SHOW_MINUTES();

                        function OUTER_DIAL1() {
                            scope.context.beginPath();
                            scope.context.arc(scope.canvas.width / 2, scope.canvas.height / 2, secHandLength + 20, 0, Math.PI * 2);
                            scope.context.strokeStyle = '#92949C';
                            scope.context.stroke();
                        }
                        function OUTER_DIAL2() {
                            scope.context.beginPath();
                            scope.context.arc(scope.canvas.width / 2, scope.canvas.height / 2, secHandLength + 14, 0, Math.PI * 2);
                            scope.context.strokeStyle = '#929BAC';
                            scope.context.stroke();
                        }
                        function CENTER_DIAL() {
                            scope.context.beginPath();
                            scope.context.arc(scope.canvas.width / 2, scope.canvas.height / 2, 2, 0, Math.PI * 2);
                            scope.context.lineWidth = 3;
                            scope.context.fillStyle = '#353535';
                            scope.context.strokeStyle = '#0C3D4A';
                            scope.context.stroke();
                        }

                        function MARK_THE_MINUTES() {
                            for (var i = 0; i < 12; i++) {
                                angle = (i - 3) * (Math.PI * 2) / 12;   /* The angle to mark **/
                                scope.context.lineWidth = 1;      /* Hand width **/
                                scope.context.beginPath();

                                var x1 = (scope.canvas.width / 2) + Math.cos(angle) * (secHandLength);
                                var y1 = (scope.canvas.height / 2) + Math.sin(angle) * (secHandLength);
                                var x2 = (scope.canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 7));
                                var y2 = (scope.canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 7));

                                scope.context.moveTo(x1, y1);
                                scope.context.lineTo(x2, y2);

                                scope.context.strokeStyle = '#466B76';
                                scope.context.stroke();
                            }
                        }

                        function MARK_THE_SECONDS() {
                            for (var i = 0; i < 60; i++) {
                                angle = (i - 3) * (Math.PI * 2) / 60;   /* The angle to mark **/
                                scope.context.lineWidth = 1;      /* Hand width **/
                                scope.context.beginPath();

                                var x1 = (scope.canvas.width / 2) + Math.cos(angle) * (secHandLength);
                                var y1 = (scope.canvas.height / 2) + Math.sin(angle) * (secHandLength);
                                var x2 = (scope.canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 30));
                                var y2 = (scope.canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 30));

                                scope.context.moveTo(x1, y1);
                                scope.context.lineTo(x2, y2);

                                scope.context.strokeStyle = '#C4D1D5';
                                scope.context.stroke();
                            }
                        }

                        function SHOW_SECONDS() {
                            minutes = Math.floor(scope.currentTime);
                            seconds = scope.currentTime - (minutes * 60);
                            angle = ((Math.PI * 2) * seconds / 60) - ((Math.PI * 2) / 4);
                            scope.context.lineWidth = 0.5;

                            scope.context.beginPath();
                            scope.context.moveTo(scope.canvas.width / 2, scope.canvas.height / 2); /* Start from center of canvas **/
                            /* Draw the length of the seconds hand **/
                            scope.context.lineTo((scope.canvas.width / 2 + Math.cos(angle) * secHandLength), scope.canvas.height / 2 + Math.sin(angle) * secHandLength);

                            scope.context.moveTo(scope.canvas.width / 2, scope.canvas.height / 2); /* Start from center of canvas **/
                            /* Draw the tail of the seconds hand **/
                            scope.context.lineTo((scope.canvas.width / 2 - Math.cos(angle) * 20), scope.canvas.height / 2 - Math.sin(angle) * 20);
                            scope.context.strokeStyle = '#586A73';
                            scope.context.stroke();

                        }

                        function SHOW_MINUTES() {
                            minutes = Math.floor(scope.currentTime / 60);
                            angle = ((Math.PI * 2) * minutes / 60) - ((Math.PI * 2) / 4);
                            scope.context.lineWidth = 1.5;

                            scope.context.beginPath();
                            scope.context.moveTo(scope.canvas.width / 2, scope.canvas.height / 2); /* Start from center of canvas **/
                            scope.context.lineTo((scope.canvas.width / 2 + Math.cos(angle) * secHandLength / 1.1), scope.canvas.height / 2 + Math.sin(angle) * secHandLength / 1.1);
                            scope.context.strokeStyle = '#999';
                            scope.context.stroke();
                        }
                    }
                
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