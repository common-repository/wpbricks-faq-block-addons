jQuery(document).ready(function () {
    jQuery('.faq-accordion-main').append('<span class="copy-clipboard-link-box"></span>');
    var currentHash = window.location.hash;
    if ( '' !== currentHash ){
        jQuery('html, body').animate({
            scrollTop: jQuery('[href="'+currentHash+'"]').offset().top - jQuery('.mdinc-container').outerHeight()
        }, 'slow');
    }
    jQuery(document).on('click', '.faq-accordion-header', function() {
        jQuery(this).toggleClass('active');
        jQuery(this).parents('li').toggleClass('active');
        jQuery(this).parent().find('.faq-accordion-body').toggleClass('active');
    });

    jQuery(document).on('click', '.copy-clipboard-link-box', function() {
        var currentUrl = window.location.href;
        var element = jQuery(this).parent().find('.mdinc-faq-open-link');
        var $temp = jQuery('<input>');
        jQuery('body').append($temp);
        $temp.val(currentUrl+jQuery(element).attr('href')).select();
        document.execCommand('copy');
        $temp.remove();
    });

    jQuery(document).on('click', '.mdinc-faq-open-link', function(e) {
        e.preventDefault();
    });
});


