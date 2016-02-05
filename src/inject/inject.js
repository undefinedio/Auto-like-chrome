chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was sent from scripts/inject.js");
            // ----------------------------------------------------------

            //var likes = $('.UFILikeLink').not(".UFILinkBright");

            // var likes = document.getElementsByClassName("UFILikeLink");

            likeAll();

            function likeAll() {
                console.log('check for likes');

                var likes = $('.UFILikeLink').not(".UFILinkBright").not(".liked").attr("data-ft", "['{\"tn\":\"?\"}']");

                console.log('likes found', likes.length);

                if (likes.length) {
                    like(likes);
                }

                window.setTimeout(function () {
                    likeAll();
                }, 1200);
            }

            function like(array) {
                if (array.length) {
                    var next = array[0];

                    array.splice(0, 1);

                    if (isScrolledIntoView(next)) {
                        var scroll = $(window).scrollTop();

                        eventFire(next, 'click');

                        window.scrollTo(0, scroll);

                        $(next).addClass('liked');
                    } else {
                        like(array);
                    }
                }
            }

            function isScrolledIntoView(elem) {
                var $elem = $(elem);
                var $window = $(window);

                var docViewTop = $window.scrollTop();
                var docViewBottom = docViewTop + $window.height();

                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();

                return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            }

            function eventFire(el, etype) {
                if (el.fireEvent) {
                    el.fireEvent('on' + etype);
                } else {
                    var evObj = document.createEvent('Events');
                    evObj.initEvent(etype, true, false);
                    el.dispatchEvent(evObj);
                }
            }
        }
    }, 10);
});