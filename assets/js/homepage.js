(function ($) {
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $(function() {
        var $counter = $('#preventable-counter');
        var limit = 0;
        var countInterval = setInterval(function() {
            var currentVal = parseInt($counter.data('count')) || 0;
            var nextVal = currentVal + 63;

            if (limit > 0 && nextVal >= limit) {
                clearInterval(countInterval);
                $counter.text(formatNumber(limit));

                return;
            }

            $counter
                .data('count', nextVal)
                .text(formatNumber(nextVal))
            ;
        }, 1);

        $.getJSON('https://us-central1-ess-help.cloudfunctions.net/getInvolvedInAccidentCount').done(function(resp) {
            limit = resp.count;
            var currentCount = parseInt($counter.data('count')) || 0;

            if (currentCount >= limit) {
                clearInterval(countInterval);

                $counter.text(formatNumber(limit));
            }
        })
    });
})(jQuery);
