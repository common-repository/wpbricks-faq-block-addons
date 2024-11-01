<?php
/**
 * Plugin Name: WPBricks FAQ Block Addons
 * Version: 1.0.3
 * Author: theDotstore
 * Author URI: https://profiles.wordpress.org/dots
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wpbricks-faq-block-addons
 * Description: Create an effective and dynamic FAQ (Frequently Asked Questions) section on your website. It allows you to add multiple FAQs and filter by category and tag-based
 * @link: https://www.thedotstore.com/
 * @since: 1.0
 * @package WPBricks FAQ Block Addons
 */

/**
 * Define all global constants.
 *
 * @since 1.0
 */
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FAQAFW_VERSION' ) ) {
	define( 'FAQAFW_VERSION', '1.0.3' ); // Plugin version
}
if ( ! defined( 'FAQAFW_PLUGIN_PATH' ) ) {
	define( 'FAQAFW_PLUGIN_PATH', plugin_dir_url( __FILE__ ) ); // Plugin version
}

register_activation_hook( __FILE__, 'faqafw_activation' );
/**
 * Call the function when plugin activate.
 *
 * @since 1.0
 */
function faqafw_activation() {

	if ( in_array( 'wpbricks/wpbricks.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
		if ( is_plugin_installed( 'wpbricks' ) && ! is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
			$initial_check = 'installed';
		} else if ( is_plugin_installed( 'wpbricks' ) && is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
			$initial_check = 'yes';
		}
	} else {
		$initial_check = 'no';
	}
	update_option( 'wpbricks_inital_check', $initial_check );
}

add_action( 'admin_notices', 'faqafw_register_notices' );
/**
 * Register notice when active plugin.
 *
 * @since 1.0
 */
function faqafw_register_notices() {
	$initial_check = get_option( 'wpbricks_inital_check' );
	?>
    <div id="faqaddon-message" class="notice is-dismissible notice-info faqaddon-message-cls"
         data-repeat-notice-after="">
        <div class="notice-container">
            <div class="notice-image">
                <img src="<?php echo esc_url( FAQAFW_PLUGIN_PATH . "assets/Bricks_Logo_icon.svg" ); ?>"
                     class="custom-logo"
                     alt="Faq Addon for WPBricks">
            </div>
            <div class="notice-content">
				<?php
				if ( ( 'no' === $initial_check ) || ( 'installed' === $initial_check ) ) {
					?>
                    <h2 class="notice-heading">
						<?php esc_html_e( 'FAQ Block Addons plugin required WPBricks Manager plugin', 'wpbricks-faq-block-addons' ); ?>
                    </h2>
					<?php
				} else {
					?>
                    <h2 class="notice-heading">
						<?php esc_html_e( 'Thank you for installing WPBricks FAQ Block Addons!', 'wpbricks-faq-block-addons' ); ?>
                    </h2>
					<?php
				}
				?>
                <p>
                   <?php 
						echo  sprintf( 
							wp_kses( 
								__( 'FAQ Addons perfectly work with the <a href="https://wordpress.org/themes/wpbricks/" target="_blank">WPBricks theme</a> and <a href="https://wordpress.org/plugins/wpbricks/" target="_blank">WPBricks Manager Plugin</a>. It provides 100+ readymade Custom Gutenberg blocks design options to build awesome websites with just a few clicks.', 'wpbricks-faq-block-addons' ), 
								array(
								    'a' => array(
								        'href' => array(),
								        'target' => array()
								    ),
								) 
							) 
						) ;
					?>
                </p>
                <div class="faqaddon-review-notice-container">
					<?php
					if ( 'no' === $initial_check ) {
						?>
                        <a class="faqaddon-install-recommended-plugin button button-primary"
                           href="javascript:void(0);" data-slug="wpbricks" data-init="/wpbricks/wpbricks.php">
							<?php esc_html_e( 'Install WPBricks Manager Plugin', 'wpbricks-faq-block-addons' ); ?>
                        </a>
						<?php
					} else if ( 'installed' === $initial_check ) {
						?>
                        <a class="faqaddon-activate-recommended-plugin button button-primary"
                           href="javascript:void(0);" data-slug="wpbricks" data-init="/wpbricks/wpbricks.php">
							<?php esc_html_e( 'Install WPBricks Manager Plugin', 'wpbricks-faq-block-addons' ); ?>
                        </a>
						<?php
					} else {
						$url = add_query_arg(
							array(
								'page' => 'bricks-manager',
								'tab'  => 'addons_lib',
							),
							admin_url( 'index.php' )
						);
						?>
                        <a class="button button-primary"
                           href="<?php echo esc_url( $url ); ?>">
							<?php esc_html_e( 'WPBricks Addons', 'wpbricks-faq-block-addons' ); ?>
                        </a>
						<?php
					}
					?>
                </div>
            </div>

        </div>
    </div>
	<?php
}

add_action( 'init', 'faqafw_admin_enqueue' );
/**
 * Enquque block editor assets.
 *
 * @since 1.0
 */
function faqafw_admin_enqueue() {
	wp_enqueue_style( 'fsb-faq-admin-style-css', FAQAFW_PLUGIN_PATH . 'css/faq-admin-style.css' );
	wp_enqueue_script( 'faq-admin-script', FAQAFW_PLUGIN_PATH . 'js/faq-admin-script.js', array(
		'jquery',
		'wp-util',
		'updates'
	), '', false );
	wp_localize_script(
		'faq-admin-script',
		'faqNotices',
		array(
			'ajaxUrl'                              => admin_url( 'admin-ajax.php' ),
			'faqaddon_notice_nonce'                => wp_create_nonce( 'faqaddon-notices' ),
			'faqaddon_recommand_nonce'             => wp_create_nonce( 'faqaddon-recommand' ),
			'WPBricksSitesLink'                    => admin_url( 'admin.php?page=bricks-manager&tab=addons_lib' ),
			'WPBricksSitesLinkTitle'               => __( 'WPBricks Addons', 'wpbricks-faq-block-addons' ),
			'WPBricksSitesLinkTitleRecommandation' => __( 'Try one of our WPBricks Addon', 'wpbricks-faq-block-addons' ),
			'recommendedPluiginInstallingText'     => __( 'Installing', 'wpbricks-faq-block-addons' ) . '&hellip;',
			'recommendedPluiginActivatingText'     => __( 'Activating', 'wpbricks-faq-block-addons' ) . '&hellip;',
		)
	);
}

add_action( 'wp_ajax_faqafw-notice-dismiss', 'faqafw_dismiss_notice' );
/**
 * Dismiss plugin notice click on close icon.
 *
 * @since 1.0
 */
function faqafw_dismiss_notice() {
	$nonce = filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_STRING );
	if ( false === wp_verify_nonce( $nonce, 'faqaddon-notices' ) ) {
		wp_send_json_error( esc_html_e( 'Some issue with nonce.', 'wpbricks-faq-block-addons' ) );
	}
	$check_update = update_option( 'wpbricks_inital_check', 'no' );
	if ( $check_update ) {
		wp_send_json_success();
	}
	wp_die();
}

add_action( 'wp_ajax_faqafw-recommedade-plugin', 'faqafw_recommedade_plugin' );
/**
 * Call th plugin action when plugin install, activate.
 *
 * @since 1.0
 */
function faqafw_recommedade_plugin() {
	$init = filter_input( INPUT_POST, 'init', FILTER_SANITIZE_STRING );
	if ( ! current_user_can( 'install_plugins' ) || ! isset( $init ) || ! $init ) {
		wp_send_json_error(
			array(
				'success' => false,
				'message' => __( 'No plugin specified', 'wpbricks-faq-block-addons' ),
			)
		);
	}
	$plugin_init = ( isset( $init ) ) ? esc_attr( $init ) : '';
	$activate    = activate_plugin( $plugin_init, '', false, true );
	if ( is_wp_error( $activate ) ) {
		wp_send_json_error(
			array(
				'success' => false,
				'message' => $activate->get_error_message(),
			)
		);
	}
	wp_send_json_success(
		array(
			'success' => true,
			'message' => __( 'Plugin Successfully Activated', 'wpbricks-faq-block-addons' ),
		)
	);
}

/**
 * Check plugin installed or not.
 *
 * @param $slug
 *
 * @return bool
 *
 * @since 1.0.0
 */
function is_plugin_installed( $slug ) {
	if ( ! function_exists( 'get_plugins' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}
	$all_plugins = get_plugins();

	if ( ! empty( $all_plugins[ $slug ] ) ) {
		return true;
	} else {
		return false;
	}
}

if ( in_array( 'wpbricks/wpbricks.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	$initial_check = 'yes';
} else {
	if ( is_plugin_installed( 'wpbricks/wpbricks.php' ) && ! is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
		$initial_check = 'installed';
	} else {
		$initial_check = 'no';
	}
}
update_option( 'wpbricks_inital_check', $initial_check );
$initial_check = get_option( 'wpbricks_inital_check' );
if ( 'yes' === $initial_check ) {
	include_once plugin_dir_path( __FILE__ ) . 'wpbricks-faq-block-addons-init.php';
}