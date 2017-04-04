$(function() {
    var loadingTime = setTimeout(function() {
        $(".loading").hide();

    }, 2000);

    gameFn();

    function gameFn() {
        $(".rule-wrap").show();
        touch.on(".x", "tap", function() {
            $(this).parent().hide();
            $(".footer").show();
            touch.on(".start", "tap", function() {

                $(".first").show();
                var $first = $(".first");
                $first.jQueryTween({
                    from: {
                        translate: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                    },
                    to: {
                        translate: {
                            x: 0,
                            y: 667,
                            z: 0
                        },
                    },
                    duration: 1000,
                    easing: TWEEN.Easing.Bounce.Out, // my favorite
                    delay: 100,
                }, function() {
                    $(".footer").hide();
                });
                touch.on(".firstgame", "tap", function() {
                    $(".first").hide();
                    enterInto();
                });
            });
            touch.on(".rule", "tap", function() {
                $(".footer").hide();
                $(".rule-wrap").show();
            });
        });
    }

    function enterInto() {
        $(".draw").show();
        $(".countdown").css("width", "0%");
        var wW1 = 100;
        var wW1timer = setInterval(function() {
            wW1--;
            $("#content").text(wW1 + "%");
            if (wW1 <= 0) {
                clearInterval(wW1timer);
            }
        }, 100);
        /*---------------------------*/
        var neusoft = {};
        neusoft.matchingGame = {};
        neusoft.matchingGame.cardWidth = 80; //牌宽
        neusoft.matchingGame.cardHeight = 120;
        neusoft.matchingGame.deck = [
                "goretex1", "goretex1",
                "goretex2", "goretex2",
                "goretex3", "goretex3"
            ]
            //随机排序函数，返回-1或1
        function shuffle() {
            //Math.random能返回0~1之间的数
            return Math.random() > 0.5 ? -1 : 1
        }
        //  翻牌功能的实现
        function selectCard() {
            var $fcard = $(".card-flipped");
            //翻了两张牌后退出翻牌
            if ($fcard.length > 1) {
                return;
            }
            //alert($(this).data("pattern"));
            $(this).addClass("card-flipped");
            //    若翻动了两张牌，检测一致性
            var $fcards = $(".card-flipped");
            if ($fcards.length == 2) {
                // checkPattern($fcards);
                setTimeout(function() {
                    checkPattern($fcards);
                }, 700);
            }
        }
        //检测2张牌是否一致
        function checkPattern(cards) {
            var pattern1 = $(cards[0]).data("pattern");
            var pattern2 = $(cards[1]).data("pattern");
            $(cards).removeClass("card-flipped");
            if (pattern1 == pattern2) {
                $(cards).addClass("card-removed")
                    .bind("webkitTransitionEnd", function() {
                        $(this).remove();
                    });
            }
        }

        /*-----------------------*/
        //实现随机洗牌
        neusoft.matchingGame.deck.sort(shuffle);
        //alert(neusoft.matchingGame.deck);
        var $card = $(".card");
        for (var i = 0; i < 5; i++) {
            $card.clone().appendTo($("#cards"));
        }
        //对每张牌进行设置
        $(".card").each(function(index) {
            //调整坐标
            $(this).css({
                "left": (neusoft.matchingGame.cardWidth + 30) * (index % 2) + "px",
                "top": (neusoft.matchingGame.cardHeight + 20) * Math.floor(index / 2) + "px"
            });
            //吐出一个牌号
            var pattern = neusoft.matchingGame.deck.pop();
            //暂存牌号
            $(this).data("pattern", pattern);
            //把其翻牌后的对应牌面附加上去
            $(this).find(".back").addClass(pattern);
            //点击牌的功能函数挂接
            $(this).click(selectCard);
        });
        /*----------------------------*/
        var time1 = 10;
        var gameBol = true;
        if (gameBol) {
            gameBol = false;
            var gameTimer1 = setInterval(function() {
                time1--;
                $("#right").text(time1);
                /*-------------*/
                if (time1 > 0 && $("#cards").find("div").length == 0) {
                    // 恭喜过关下一关
                    $(".next").addClass("mask");
                    $(".next").show();
                    twogame();
                    return false;
                }
                /*-------------*/
                if (time1 <= 0 && $("#cards").find("div").length > 0) {
                    // 闯关失败重新来过
                    $(".lose").addClass("mask");
                    $(".lose").show();
                    touch.on("#loseX", "tap", function() {
                        window.location.href = "index.html";
                    });
                }
                if (time1 <= 0) {
                    clearInterval(gameTimer1);
                }
            }, 1000);


        }

    }
    // 第二关
    function twogame() {
        touch.on("#nextg", "tap", function() {
            $(".next").hide();
            $(".two").show();
            var $two = $(".two");
            $two.jQueryTween({
                from: {
                    translate: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                },
                to: {
                    translate: {
                        x: 0,
                        y: 667,
                        z: 0
                    },
                },
                duration: 1000,
                easing: TWEEN.Easing.Bounce.Out, // my favorite
                delay: 100,
            }, function() {
                $(".draw").hide();
            });
            touch.on(".twogame", "tap", function() {
                // entertwo();
                window.location.href="two.html";
            });
        });
    }

});
