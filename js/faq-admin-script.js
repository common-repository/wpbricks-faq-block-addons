/**
 * Customizer controls toggles
 *
 * @package WPBricks
 */

(function ($) {
    "use strict";
    var WPBricks = {
        init: function () {
            this.startInit();
        },
        startInit: function () {
            $(document).on("click", ".faqaddon-message-cls .notice-dismiss", WPBricks.dismissNotice);
            $(document).on("click", ".faqaddon-install-recommended-plugin", WPBricks.installPlugin);
            $(document).on("click", ".faqaddon-activate-recommended-plugin", WPBricks.activePlugin);
            $(document).on("wp-plugin-install-success", WPBricks.activePlugin);
            $(document).on("wp-plugin-install-error", WPBricks.installError);
            $(document).on("wp-plugin-installing", WPBricks.pluginInstalling);
            $(document).on("faqaddon-active-after-plugin", WPBricks.redirectToPlugin);
        },
        redirectToPlugin: function (event, WpBricksLink, activatedSlug) {
            event.preventDefault();

            if (activatedSlug.indexOf("wpbricks") >= 0) {
                window.location.href = WpBricksLink;
            }

        },
        dismissNotice: function (event) {
            event.preventDefault();
            WPBricks.ajaxCall();
        },
        installError: function (event, response) {
            var $card = jQuery(".faqaddon-install-recommended-plugin");
            $card
                .removeClass("updating-message button-primary")
                .addClass("disabled")
                .html(wp.updates.l10n.installFailedShort);
        },
        pluginInstalling: function (event, args) {
            event.preventDefault();
            var slug = args.slug;
            var $card = jQuery(".faqaddon-install-recommended-plugin");
            var activatingText = faqNotices.recommendedPluiginInstallingText;
            $card.each(function (index, element) {
                element = jQuery(element);
                if (element.data("slug") === slug) {
                    element.addClass("updating-message");
                    element.html(activatingText);
                }
            });
        },
        installPlugin: function (event) {
            event.preventDefault();

            var $button = jQuery(event.target),
                $document = jQuery(document);

            if ($button.hasClass("updating-message") || $button.hasClass("button-disabled")) {
                return;
            }

            if (wp.updates.shouldRequestFilesystemCredentials && !wp.updates.ajaxLocked) {
                wp.updates.requestFilesystemCredentials(event);

                $document.on("credential-modal-cancel", function () {
                    var $message = $(".faqaddon-install-recommended-plugin.updating-message");

                    $message
                        .addClass("faqaddon-activate-recommended-plugin")
                        .removeClass("updating-message faqaddon-install-recommended-plugin")
                        .text(wp.updates.l10n.installNow);

                    wp.a11y.speak(wp.updates.l10n.updateCancel, "polite");
                });
            }

            wp.updates.installPlugin({
                slug: $button.data("slug")
            });
        },
        activePlugin: function (event, response) {
            event.preventDefault();
            var $message = jQuery(event.target);
            var $init = $message.data("init");
            var activatedSlug;

            if (typeof $init === "undefined") {
                var $message = jQuery(".faqaddon-install-recommended-plugin[data-slug=" + response.slug + "]");
                activatedSlug = response.slug;
            } else {
                activatedSlug = $init;
            }

            var $init = $message.data("init");
            var activatingText = faqNotices.recommendedPluiginActivatingText;
            var WPBricksSitesLink = faqNotices.WPBricksSitesLink;
            var SitesLinkTitle = faqNotices.WPBricksSitesLinkTitle;
            var SitesLinkTitleRecommandation = faqNotices.WPBricksSitesLinkTitleRecommandation;

            $message.removeClass("install-now installed button-disabled updated-message")
                .addClass("updating-message")
                .html(activatingText);

            setTimeout(function () {
                $.ajax({
                    url: faqNotices.ajaxUrl,
                    type: "POST",
                    data: {
                        "action": "faqafw-recommedade-plugin",
                        "init": $init,
                    },
                    success: function (result) {
                        if (result.success) {
                            $(".faqaddon-review-notice-container a").attr("href", WPBricksSitesLink);
                            $(".faqaddon-review-notice-container a").html(SitesLinkTitle);
                            $(".br_sub_content a.faqaddon-install-btn").attr("href", WPBricksSitesLink);
                            $(".br_sub_content a.faqaddon-install-btn").html(SitesLinkTitleRecommandation);
                            $message.removeClass("faqaddon-install-recommended-plugin updating-message");
                            WPBricks.ajaxCall();
                            jQuery(document).trigger("faqaddon-active-after-plugin", [WPBricksSitesLink, activatedSlug]);
                        } else {
                            $message.removeClass("updating-message");
                        }
                    }
                })
            }, 1200);
        },
        ajaxCall: function () {
            $.ajax({
                url: faqNotices.ajaxUrl,
                type: "POST",
                data: {
                    action: "faqafw-notice-dismiss",
                    nonce: faqNotices.faqaddon_notice_nonce,
                },
                success: function (result) {
                    //console.log(result);
                }
            });
        },
    }
    $(function () {
        WPBricks.init();
    });
})(jQuery);