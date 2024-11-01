<?php
/**
 * Define all global constants.
 *
 */
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FAQ_POSTTYPE' ) ) {
	define( 'FAQ_POSTTYPE', 'wpbricks_faq' );
}
if ( ! defined( 'FAQ_CAT' ) ) {
	define( 'FAQ_CAT', 'wpbricks_faq_cat' );
}
if ( ! defined( 'FAQ_TAG' ) ) {
	define( 'FAQ_TAG', 'wpbricks_faq_tag' );
}

add_action( 'rest_api_init', 'faqafw_term_api_endpoints_register' );
/**
 * Register endpoint for get all terms from FAQ post type.
 *
 * @since 1.0
 */
function faqafw_term_api_endpoints_register() {
	register_rest_route( 'wp/v2', 'all-terms', array(
			'methods'  => 'GET',
			'callback' => 'faqafw_get_all_terms',
		)
	);
}

add_action( 'rest_api_init', 'faqafw_select_post_callback' );
/**
 * Register endpoint for get all posts from FAQ post type.
 *
 * @since 1.0
 */
function faqafw_select_post_callback() {
	register_rest_route( 'wp/v2', 'faq-posts', array(
			'methods'  => 'GET',
			'callback' => 'faqafw_faq_select_post',
		)
	);
}

/**
 * get all terms from FAQ post type.
 *
 * @since 1.0
 */
function faqafw_get_all_terms() {
	$return = [];
	// get all terms.
	$terms = get_terms( array( 'taxonomy' => array( 'wpbricks_faq_cat', 'wpbricks_faq_tag' ) ) );
	// arrange term according to taxonomy.
	foreach ( $terms as $term ) {
		$return[ $term->taxonomy ][] = [
			'term_id' => $term->term_id,
			'name'    => html_entity_decode( $term->name ),
			'slug'    => $term->slug,
		];
	}

	return new WP_REST_Response( $return, 200 );
}

/**
 * get all posts from FAQ post type.
 *
 * @since 1.0
 */
function faqafw_faq_select_post() {
	$term                        = stripslashes( filter_input( INPUT_GET, 'term', FILTER_SANITIZE_STRING ) );
	$term                        = html_entity_decode( $term );
	$term                        = trim( $term, '"' );
	$taxonomies                  = [ 'wpbricks_faq_cat', 'wpbricks_faq_tag' ];
	$terms                       = isset( $term ) && ! empty( $term ) ? json_decode( $term, true ) : [];
	$args                        = [
		'post_type'              => 'wpbricks_faq',
		'posts_per_page'         => 100,
		'post_status'            => 'publish',
		'no_found_rows'          => true,
		'update_post_meta_cache' => false,
	];
	$latest_posts_tax_query_args = [ 'relation' => 'OR' ];
	foreach ( $taxonomies as $taxonomy ) {
		if ( count( $terms[ $taxonomy ] ) > 0 ) {
			$latest_posts_tax_query_args[] = [
				'taxonomy' => $taxonomy,
				'field'    => 'slug',
				'terms'    => $terms[ $taxonomy ],
			];
		}
	}
	$count_latest_posts_query_args = count( $latest_posts_tax_query_args );
	if ( $count_latest_posts_query_args > 0 ) {
		$args['tax_query'] = $latest_posts_tax_query_args;
	}
	$related_posts_query = new WP_Query( $args );
	$post_arr            = array();
	$cnt                 = 0;
	if ( $related_posts_query->have_posts() ) {
		while ( $related_posts_query->have_posts() ) {
			$related_posts_query->the_post();
			$post_arr[ $cnt ]['ID']        = get_the_ID();
			$post_arr[ $cnt ]['postTitle'] = html_entity_decode( get_the_title() );
			$faq_answer                    = get_the_content( get_the_ID() );
			$post_arr[ $cnt ]['faqAnswer'] = $faq_answer;
			$cnt ++;
		}
	}

	return new WP_REST_Response( $post_arr, 200 );
}

add_action( 'init', 'faqafw_register_plugin_post_type' );
/**
 * Register FAQs post type and taxonomies.
 *
 * @since 1.0
 */
function faqafw_register_plugin_post_type() {
	$labels = array(
		'name'                  => __( 'WPBricks FAQs', 'wpbricks-faq-block-addons' ),
		'singular_name'         => __( 'WPBricks FAQ', 'wpbricks-faq-block-addons' ),
		'menu_name'             => __( 'WPBricks FAQs', 'wpbricks-faq-block-addons' ),
		'name_admin_bar'        => __( 'WPBricks FAQ', 'wpbricks-faq-block-addons' ),
		'add_new'               => __( 'Add New', 'wpbricks-faq-block-addons' ),
		'add_new_item'          => __( 'Add New FAQ', 'wpbricks-faq-block-addons' ),
		'new_item'              => __( 'New FAQ', 'wpbricks-faq-block-addons' ),
		'edit_item'             => __( 'Edit FAQ', 'wpbricks-faq-block-addons' ),
		'view_item'             => __( 'View FAQ', 'wpbricks-faq-block-addons' ),
		'all_items'             => __( 'All FAQs', 'wpbricks-faq-block-addons' ),
		'search_items'          => __( 'Search FAQs', 'wpbricks-faq-block-addons' ),
		'parent_item_colon'     => __( 'Parent FAQs:', 'wpbricks-faq-block-addons' ),
		'not_found'             => __( 'No books found.', 'wpbricks-faq-block-addons' ),
		'not_found_in_trash'    => __( 'No books found in Trash.', 'wpbricks-faq-block-addons' ),
		'featured_image'        => __( 'FAQ Cover Image', 'wpbricks-faq-block-addons' ),
		'set_featured_image'    => __( 'Set cover image', 'wpbricks-faq-block-addons' ),
		'remove_featured_image' => __( 'Remove cover image', 'wpbricks-faq-block-addons' ),
		'use_featured_image'    => __( 'Use as cover image', 'wpbricks-faq-block-addons' ),
		'archives'              => __( 'FAQ archives', 'wpbricks-faq-block-addons' ),
		'insert_into_item'      => __( 'Insert into faq', 'wpbricks-faq-block-addons' ),
		'uploaded_to_this_item' => __( 'Uploaded to this book', 'wpbricks-faq-block-addons' ),
		'filter_items_list'     => __( 'Filter faqs list', 'wpbricks-faq-block-addons' ),
		'items_list_navigation' => __( 'FAQs list navigation', 'wpbricks-faq-block-addons' ),
		'items_list'            => __( 'FAQs list', 'wpbricks-faq-block-addons' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'wpbricks_faq' ),
		'taxonomies'         => array( 'wpbricks_faq_cat', 'wpbricks_faq_tag' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 250,
		'menu_icon'          => 'dashicons-testimonial',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
	);

	register_post_type( 'wpbricks_faq', $args );

	$cat_labels = array(
		'name'                       => __( 'FAQ CATs', 'wpbricks-faq-block-addons' ),
		'singular_name'              => __( 'FAQ CAT', 'wpbricks-faq-block-addons' ),
		'search_items'               => __( 'Search FAQ CATs' ),
		'popular_items'              => __( 'Popular FAQ CATs' ),
		'all_items'                  => __( 'All FAQ CATs' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit FAQ CAT' ),
		'update_item'                => __( 'Update FAQ CAT' ),
		'add_new_item'               => __( 'Add New FAQ CAT' ),
		'new_item_name'              => __( 'New FAQ CAT Name' ),
		'separate_items_with_commas' => __( 'Separate FAQ CATs with commas' ),
		'add_or_remove_items'        => __( 'Add or remove FAQ CATs' ),
		'choose_from_most_used'      => __( 'Choose from the most used FAQ CATs' ),
		'menu_name'                  => __( 'FAQ CATs' ),
	);

	register_taxonomy(
		'wpbricks_faq_cat',
		'wpbricks_faq',
		array(
			'hierarchical'          => false,
			'labels'                => $cat_labels,
			'show_ui'               => true,
			'show_admin_column'     => true,
			'update_count_callback' => '_update_post_term_count',
			'query_var'             => true,
			'rewrite'               => array( 'slug' => 'wpbricks_faq_cat' ),
		)
	);

	$tag_labels = array(
		'name'                       => __( 'FAQ TAGs', 'wpbricks-faq-block-addons' ),
		'singular_name'              => __( 'FAQ TAG', 'wpbricks-faq-block-addons' ),
		'search_items'               => __( 'Search FAQ TAGs' ),
		'popular_items'              => __( 'Popular FAQ TAGs' ),
		'all_items'                  => __( 'All FAQ TAGs' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit FAQ TAG' ),
		'update_item'                => __( 'Update FAQ TAG' ),
		'add_new_item'               => __( 'Add New FAQ TAG' ),
		'new_item_name'              => __( 'New FAQ TAG Name' ),
		'separate_items_with_commas' => __( 'Separate FAQ TAGs with commas' ),
		'add_or_remove_items'        => __( 'Add or remove FAQ TAGs' ),
		'choose_from_most_used'      => __( 'Choose from the most used FAQ TAGs' ),
		'menu_name'                  => __( 'FAQ TAGs' ),
	);

	register_taxonomy(
		'wpbricks_faq_tag',
		'wpbricks_faq',
		array(
			'hierarchical'          => false,
			'labels'                => $tag_labels,
			'show_ui'               => true,
			'update_count_callback' => '_update_post_term_count',
			'query_var'             => true,
			'rewrite'               => array( 'slug' => 'wpbricks_faq_tag' ),
		)
	);
}


add_action( 'init', 'faqafw_block_jsx_backend_enqueue' );
/**
 * Enqueue js and css for editor.
 *
 * @since 1.0
 */
function faqafw_block_jsx_backend_enqueue() {

	wp_register_script( 'fsb-block-backend-script', FAQAFW_PLUGIN_PATH . "js/block.build.js", array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-editor'
	), '1' );
	wp_register_script( 'jquery-ui-js', "https://code.jquery.com/ui/1.12.1/jquery-ui.js", array( 'jquery' ), '', true );
	wp_register_style( 'fsb-faq-editor-css', FAQAFW_PLUGIN_PATH . "css/faq-editor-style.css" );
	register_block_type( 'fsb/faq-screen', [
			'editor_style'    => 'fsb-faq-editor-css',
			'editor_script'   => 'fsb-block-backend-script',
			'attributes'      => [
				'postType'       => [
					'type'    => 'string',
					'default' => 'post',
				],
				'terms'          => [
					'type' => 'string'
				],
				'selectedPost'   => [
					'type' => 'string'
				],
				'deSelectedPost' => [
					'type' => 'string'
				],
				'faqSortList'    => [
					'type' => 'string'
				],
				'step'           => [
					'type' => 'number'
				]
			],
			'render_callback' => 'faqafw_faq_render_callback'
		]
	);
	wp_enqueue_style( 'font-awesome-css', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css', false, '1.0.0' );
}

/**
 * Function to get the FAQ list.
 *
 * @param $attributes
 *
 * @return false|string
 *
 * @since 1.0
 */
function faqafw_faq_render_callback( $attributes ) {

	$taxonomies     = [ 'wpbricks_faq_cat', 'wpbricks_faq_tag' ];
	$terms          = isset( $attributes['terms'] ) && ! empty( $attributes['terms'] ) ? json_decode( $attributes['terms'], true ) : [];
	$step           = isset( $attributes['step'] ) ? $attributes['step'] : 1;
	$selectedPost   = isset( $attributes['selectedPost'] ) && ! empty( $attributes['selectedPost'] ) ? json_decode( $attributes['selectedPost'], true ) : [];
	$deSelectedPost = isset( $attributes['deSelectedPost'] ) && ! empty( $attributes['deSelectedPost'] ) ? json_decode( $attributes['deSelectedPost'], true ) : [];
	$faqSortList    = isset( $attributes['faqSortList'] ) && ! empty( $attributes['faqSortList'] ) ? json_decode( $attributes['faqSortList'], true ) : [];
	if ( ! empty( $terms ) && ( ! empty( $terms['wpbricks_faq_cat'] ) || ! empty( $terms['wpbricks_faq_tag'] ) ) ) {
		$args = [
			'post_type'              => 'wpbricks_faq',
			'posts_per_page'         => - 1,
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'post__not_in'           => $deSelectedPost,
		];

		$latest_posts_tax_query_args = [ 'relation' => 'AND' ];

		foreach ( $taxonomies as $taxonomy ) {
			if ( isset( $terms[ $taxonomy ] ) && count( $terms[ $taxonomy ] ) > 0 ) {
				$latest_posts_tax_query_args[] = [
					'taxonomy' => $taxonomy,
					'field'    => 'slug',
					'terms'    => $terms[ $taxonomy ],
				];
			}
		}

		$count_latest_posts_query_args = count( $latest_posts_tax_query_args );

		if ( $count_latest_posts_query_args > 0 ) {
			$args['tax_query'] = $latest_posts_tax_query_args;
		}
		$getPostIds          = array();
		$related_posts_query = new WP_Query( $args );
		while ( $related_posts_query->have_posts() ) {
			$related_posts_query->the_post();
			$getPostIds[] = get_the_ID();
		}

		if ( sizeof( $faqSortList ) > 0 ) {
			$finalPostIds = array_unique( array_merge( $faqSortList, $getPostIds ) );
		} else {
			$finalPostIds = $getPostIds;
		}

		$html = '';
		ob_start();

		if ( $related_posts_query->have_posts() ) {
			if ( 2 === intval( $step ) ) { ?>
                <div class='faq-list-outer'>
                    <div class="check_all_faq">
                    <span>
                        <?php if ( sizeof( $selectedPost ) === sizeof( $finalPostIds ) ) { ?>
                            <input type="checkbox" id="check_all" name="check_all" class="check_all" checked>
                        <?php } else { ?>
                            <input type="checkbox" id="check_all" name="check_all" class="check_all">
                        <?php } ?>
                        <label for="check_all"><?php echo esc_html__( 'Check All', 'wpbricks-faq-block-addons' ); ?></label>
                    </span>
                    </div>
                    <ul class='faq-list'>
						<?php
						foreach ( $getPostIds as $id ) {
							$postId = $id;
							if ( 'publish' === get_page( $postId )->post_status ) {
								$postTite = get_the_title( $postId );;
								?>
                                <div class="faq-list-check-item">
                            <span>
                                <?php if ( in_array( $postId, $selectedPost, false ) ) { ?>
                                    <input type="checkbox" id="id_<?php echo esc_attr( $postId ); ?>" name="post_title"
                                           class="post_title" checked>
                                <?php } else { ?>
                                    <input type="checkbox" id="id_<?php echo esc_attr( $postId ); ?>" name="post_title"
                                           class="post_title">
                                <?php } ?>
                                    <label for="id_<?php echo esc_attr( $postId ); ?>"><?php echo esc_html( $postTite ); ?></label>
                            </span>
                                </div>
								<?php
							}
						} ?>
                    </ul>
                </div>
			<?php } elseif ( 3 === intval( $step ) ) { ?>
                <div class='faq-list-outer'>
                    <ul class='faq-list' id="sortable">
						<?php
						foreach ( $finalPostIds as $id ) {
							$postId = $id;
							if ( 'publish' === get_page( $postId )->post_status ) {
								$postTite = get_the_title( $postId );;
								?>
                                <li data-sort-id="<?php echo esc_attr( $postId ); ?>" class="faq-list-item">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 18 18" role="img" aria-hidden="true" focusable="false">
                                        <path d="M13,8c0.6,0,1-0.4,1-1s-0.4-1-1-1s-1,0.4-1,1S12.4,8,13,8z M5,6C4.4,6,4,6.4,4,7s0.4,1,1,1s1-0.4,1-1S5.6,6,5,6z M5,10 c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S5.6,10,5,10z M13,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S13.6,10,13,10z M9,6 C8.4,6,8,6.4,8,7s0.4,1,1,1s1-0.4,1-1S9.6,6,9,6z M9,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S9.6,10,9,10z"></path>
                                    </svg>
                                    <div class="faq-accordion-main">
                                        <div class="faq-accordion-header">
                                            <span class="dashicon dashicons-no-alt"></span>
                                            <h4>
                                                <a class="mdinc-faq-open-link" href="javascript:void(0)">
													<?php
													echo esc_html( $postTite )
													?>
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </li>
							<?php }
						} ?>
                    </ul>
                </div>
			<?php } else { ?>
                <div class='all-faq-list'>
                    <ul class='faq-list'>
						<?php
						foreach ( $finalPostIds as $postId ) {
							if ( 'publish' === get_page( $postId )->post_status ) {
								$postTite   = get_the_title( $postId );
								$postAnswer = apply_filters( 'the_content', get_post_field( 'post_content', $postId ) );
								?>
                                <li data-sort-id="<?php echo esc_attr( $postId ); ?>" class="faq-list-item">
                                    <div class="faq-accordion-main">
                                        <div class="faq-accordion-header">
                                            <h4>
												<?php if ( 1 === sizeof( $terms['wpbricks_faq_cat'] ) ){
												?>
                                                <a class="mdinc-faq-open-link"
                                                   href="#<?php echo "faq_" . esc_attr( $terms['wpbricks_faq_cat'][0] ) . "_" . esc_attr( $postId ); ?>">

													<?php }else{ ?>
                                                    <a class="mdinc-faq-open-link"
                                                       href="#<?php echo "faq_" . esc_attr( $postId ); ?>">
														<?php } ?>
                                                        <!--<i class="fa fa-chevron-down"></i>-->
                                                        <span class="copy-chevron-down-box"></span>
														<?php
														echo esc_html( $postTite )
														?>
                                                    </a>
                                            </h4>
                                        </div>
                                        <div class="faq-accordion-body"
                                             data-id="<?php echo esc_attr( $postId ); ?>">
											<?php echo wp_kses_post( $postAnswer ); ?>
                                        </div>
                                    </div>
                                </li>
							<?php }
						}
						?>
                    </ul>
                </div>
			<?php }
		}
	} else {
		$html = '';
		ob_start();
		?>
        <div class='faq-list-outer no-result'><?php echo esc_html__( 'Please select Category or Tag', 'wpbricks-faq-block-addons' ); ?></div>
	<?php }

	$html .= ob_get_clean();

	return $html;
}

add_action( 'wp_enqueue_scripts', 'faqafw_frontend_script_enqueue' );
/**
 * Enqueue js and css for frontend.
 *
 * @since 1.0
 */
function faqafw_frontend_script_enqueue() {
	// register faq-frontend-style.css
	wp_enqueue_style( 'fsb-faq-front-css', FAQAFW_PLUGIN_PATH . "css/faq-frontend-style.css" );
	wp_enqueue_script( 'fsb-faq-front-js', FAQAFW_PLUGIN_PATH . "js/faq-frontend-script.js", array( 'jquery' ), '', true );
}