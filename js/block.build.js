/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_times__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_times___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_times__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_memize__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_memize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_memize__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = jQuery;


var __ = wp.i18n.__;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    AlignmentToolbar = _wp$editor.AlignmentToolbar,
    BlockControls = _wp$editor.BlockControls,
    InspectorControls = _wp$editor.InspectorControls,
    PanelColorSettings = _wp$editor.PanelColorSettings,
    InnerBlocks = _wp$editor.InnerBlocks;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl,
    ServerSideRender = _wp$components.ServerSideRender,
    CheckboxControl = _wp$components.CheckboxControl,
    Button = _wp$components.Button;
var _wp$richText = wp.richText,
    registerFormatType = _wp$richText.registerFormatType,
    toggleFormat = _wp$richText.toggleFormat,
    insert = _wp$richText.insert;
var createElement = wp.element.createElement;
var _wp$editor2 = wp.editor,
    RichTextToolbarButton = _wp$editor2.RichTextToolbarButton,
    RichTextShortcut = _wp$editor2.RichTextShortcut;
var Popover = wp.components.Popover;
var getRectangleFromRange = wp.dom.getRectangleFromRange;
var applyFilters = wp.hooks.applyFilters;

var mdFaq = function (_Component) {
    _inherits(mdFaq, _Component);

    function mdFaq() {
        _classCallCheck(this, mdFaq);

        var _this = _possibleConstructorReturn(this, (mdFaq.__proto__ || Object.getPrototypeOf(mdFaq)).apply(this, arguments));

        _this.state = {
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            close: false,
            taxonomies: [],
            taxonomiesObj: {},
            termsObj: {},
            ids: '',
            filterTermsObj: {}
        };

        _this.addFaq = _this.addFaq.bind(_this);
        _this.onNextClickHandler = _this.onNextClickHandler.bind(_this);
        _this.onBackClickHandler = _this.onBackClickHandler.bind(_this);
        _this.onDoneClickHandler = _this.onDoneClickHandler.bind(_this);
        _this.onClickEditHandler = _this.onClickEditHandler.bind(_this);
        _this.onPopupCloseHandler = _this.onPopupCloseHandler.bind(_this);
        return _this;
    }

    _createClass(mdFaq, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                _props$attributes = _props.attributes,
                step = _props$attributes.step,
                selectedPost = _props$attributes.selectedPost,
                faqSortList = _props$attributes.faqSortList,
                setAttributes = _props.setAttributes;

            switch (step) {
                case 1:
                    this.setState({ step1: true });
                    break;
                case 2:
                    wp.apiFetch({ path: '/wp/v2/all-terms' }).then(function (terms) {
                        _this2.setState({
                            termsObj: terms,
                            filterTermsObj: terms,
                            taxonomies: ['wpbricks_faq_cat', 'wpbricks_faq_tag']
                        });
                    });
                    this.setState({ step2: true });
                    break;
                case 3:
                    this.setState({ step3: true });
                    break;
                case 4:
                    this.setState({ step4: true });
                    break;
                default:
                    this.setState({ step1: true });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this3 = this;

            if (4 === this.props.attributes.step) {
                if (prevState.step4 !== this.state.step4) {
                    setTimeout(function () {
                        var checkedIds = [];
                        var els = document.querySelectorAll('#block-' + _this3.props.clientId + ' .faq-list-item');
                        for (var i = 0; i < els.length; i++) {
                            checkedIds.push(els[i].getAttribute('data-sort-id'));
                        }
                        _this3.props.setAttributes({ selectedPost: JSON.stringify(checkedIds), faqSortList: JSON.stringify(checkedIds) });
                    }, 5000);
                    return false;
                }
            } else {
                return false;
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(obj) {
            var key = void 0;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'filterTerms',
        value: function filterTerms(value, taxonomy) {
            var _this4 = this;

            var filterTerms = {};
            this.state.taxonomies.map(function (tax) {
                if (taxonomy === tax) {
                    filterTerms[tax] = _this4.state.termsObj[tax].filter(function (term) {
                        return -1 < term.name.toLowerCase().indexOf(value.toLowerCase());
                    });
                } else {
                    filterTerms[tax] = _this4.state.termsObj[tax];
                }
            });
            this.setState({ filterTermsObj: filterTerms });
        }
    }, {
        key: 'getPosts',
        value: function getPosts(value) {
            var idsStr = this.state.ids;
            var idsArray = idsStr.split(',');

            if (-1 !== idsArray.indexOf(value.toString())) {
                idsArray.splice(idsArray.indexOf(value.toString()), 1);
            } else {
                idsArray.push(value.toString());
            }

            var resultIds = idsArray.join();
            this.setState({ ids: resultIds });
        }
    }, {
        key: 'addFaq',
        value: function addFaq() {
            var _this5 = this;

            var _props2 = this.props,
                _props2$attributes = _props2.attributes,
                step = _props2$attributes.step,
                terms = _props2$attributes.terms,
                setAttributes = _props2.setAttributes;

            // Fetch all terms

            wp.apiFetch({ path: '/wp/v2/all-terms' }).then(function (terms) {
                _this5.setState({
                    termsObj: terms,
                    filterTermsObj: terms,
                    taxonomies: ['wpbricks_faq_cat', 'wpbricks_faq_tag']
                });
            });

            this.setState({
                step1: false,
                step2: true
            });
            setAttributes({ step: 2, terms: {} });
        }
    }, {
        key: 'onBackClickHandler',
        value: function onBackClickHandler(event) {
            var _this6 = this;

            var _props3 = this.props,
                step = _props3.attributes.step,
                setAttributes = _props3.setAttributes,
                clientId = _props3.clientId;


            wp.apiFetch({ path: '/wp/v2/all-terms' }).then(function (terms) {
                _this6.setState({
                    termsObj: terms,
                    filterTermsObj: terms,
                    taxonomies: ['wpbricks_faq_cat', 'wpbricks_faq_tag']
                });
            });

            //const divs = document.getElementsByClassName('faq-list-item');
            var divs = document.querySelectorAll('#block-' + clientId + ' .faq-list-item');
            var sortedElement = [];
            for (var i = 0; i < divs.length; i++) {
                sortedElement.push(divs[i].getAttribute('data-sort-id'));
            }
            setAttributes({ faqSortList: JSON.stringify(sortedElement), selectedPost: JSON.stringify(sortedElement), step: 2 });
            this.setState({ step2: true, step3: false });
        }
    }, {
        key: 'onNextClickHandler',
        value: function onNextClickHandler() {
            var _props4 = this.props,
                _props4$attributes = _props4.attributes,
                step = _props4$attributes.step,
                selectedPost = _props4$attributes.selectedPost,
                deSelectedPost = _props4$attributes.deSelectedPost,
                setAttributes = _props4.setAttributes,
                clientId = _props4.clientId;

            if (this.state.step2) {
                var checkedIds = [];
                var uncheckedIds = [];
                var els = document.querySelectorAll('#block-' + clientId + ' .post_title');
                for (var i = 0; i < els.length; i++) {
                    if (els[i].checked) {
                        checkedIds.push(els[i].id.replace('id_', ''));
                    } else {
                        uncheckedIds.push(els[i].id.replace('id_', ''));
                    }
                }
                setAttributes({ selectedPost: JSON.stringify(checkedIds), deSelectedPost: JSON.stringify(uncheckedIds), faqSortList: JSON.stringify(checkedIds) });
            }
            setAttributes({ step: 3 });
            this.setState({
                step1: false,
                step2: false,
                step4: false,
                step3: true
            });
        }
    }, {
        key: 'onDoneClickHandler',
        value: function onDoneClickHandler() {
            var _props5 = this.props,
                _props5$attributes = _props5.attributes,
                step = _props5$attributes.step,
                selectedPost = _props5$attributes.selectedPost,
                deSelectedPost = _props5$attributes.deSelectedPost,
                setAttributes = _props5.setAttributes,
                clientId = _props5.clientId;

            var divs = document.querySelectorAll('#block-' + clientId + ' .faq-list-item');
            var sortedElement = [];
            for (var i = 0; i < divs.length; i++) {
                sortedElement.push(divs[i].getAttribute('data-sort-id'));
            }
            this.props.setAttributes({ faqSortList: JSON.stringify(sortedElement), selectedPost: JSON.stringify(sortedElement), step: 4 });
            this.setState({
                step3: false,
                step4: true
            });
        }
    }, {
        key: 'onClickEditHandler',
        value: function onClickEditHandler() {
            var _this7 = this;

            var _props6 = this.props,
                _props6$attributes = _props6.attributes,
                step = _props6$attributes.step,
                selectedPost = _props6$attributes.selectedPost,
                setAttributes = _props6.setAttributes,
                clientId = _props6.clientId;

            wp.apiFetch({ path: '/wp/v2/all-terms' }).then(function (terms) {
                _this7.setState({
                    termsObj: terms,
                    filterTermsObj: terms,
                    taxonomies: ['wpbricks_faq_cat', 'wpbricks_faq_tag']
                });
            });
            var checkedIds = [];
            var els = document.querySelectorAll('#block-' + clientId + ' .faq-list-item');
            for (var i = 0; i < els.length; i++) {
                checkedIds.push(els[i].getAttribute('data-sort-id'));
            }
            setAttributes({ step: 2 });
            setAttributes({ selectedPost: JSON.stringify(checkedIds) });
            this.setState({
                step2: true,
                step4: false,
                close: true
            });
        }
    }, {
        key: 'onPopupCloseHandler',
        value: function onPopupCloseHandler() {
            this.setState({
                step1: false,
                step2: false,
                step3: false,
                step4: true,
                close: false
            });
            this.props.setAttributes({ step: 4 });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var _props7 = this.props,
                _props7$attributes = _props7.attributes,
                terms = _props7$attributes.terms,
                taxonomies = _props7$attributes.taxonomies,
                step = _props7$attributes.step,
                selectedPost = _props7$attributes.selectedPost,
                deSelectedPost = _props7$attributes.deSelectedPost,
                faqSortList = _props7$attributes.faqSortList,
                setAttributes = _props7.setAttributes,
                className = _props7.className,
                clientId = _props7.clientId;


            var isCheckedTerms = {};
            if (!this.isEmpty(terms) && terms.constructor !== Object) {
                isCheckedTerms = JSON.parse(terms);
            }
            if (this.state.step2) {
                setTimeout(function () {
                    var checkboxesFaq = document.querySelectorAll('#block-' + clientId + ' .post_title');
                    var checkBoxAll = document.querySelector('#block-' + clientId + ' #check_all');
                    var count = 0;
                    for (var i = 0; i < checkboxesFaq.length; i++) {
                        if ('checkbox' == checkboxesFaq[i].type && true === checkboxesFaq[i].checked) {
                            count++;
                        }
                    }
                    var button = document.querySelector('#block-' + clientId + ' #next-btn');
                    if (0 < count) {
                        button.disabled = false;
                    } else {
                        button.disabled = true;
                    }
                    null !== checkBoxAll && checkBoxAll.addEventListener('click', function () {
                        var count = 0;
                        if (checkBoxAll.checked) {
                            for (var _i = 0; _i < checkboxesFaq.length; _i++) {
                                if ('checkbox' == checkboxesFaq[_i].type) {
                                    checkboxesFaq[_i].checked = true;
                                    count++;
                                }
                            }
                        } else {
                            for (var _i2 = 0; _i2 < checkboxesFaq.length; _i2++) {
                                if ('checkbox' == checkboxesFaq[_i2].type) {
                                    checkboxesFaq[_i2].checked = false;
                                }
                            }
                        }
                        var button = document.querySelector('#block-' + clientId + ' #next-btn');
                        if (0 < count) {
                            button.disabled = false;
                        } else {
                            button.disabled = true;
                        }
                    });
                    for (var _i3 = 0; _i3 < checkboxesFaq.length; _i3++) {
                        checkboxesFaq[_i3].addEventListener('click', function () {
                            var count = 0;
                            for (var _i4 = 0; _i4 < checkboxesFaq.length; _i4++) {
                                if ('checkbox' == checkboxesFaq[_i4].type && true === checkboxesFaq[_i4].checked) {
                                    count++;
                                }
                            }
                            if (count === checkboxesFaq.length) {
                                checkBoxAll.checked = true;
                            } else {
                                checkBoxAll.checked = false;
                            }
                            var button = document.querySelector('#block-' + clientId + ' #next-btn');
                            if (0 < count) {
                                button.disabled = false;
                            } else {
                                button.disabled = true;
                            }
                        });
                    }
                }, 8000);
            }
            if (this.state.step3) {
                setTimeout(function () {
                    jQuery('#sortable').sortable();
                    jQuery('#sortable').disableSelection();

                    var ele = document.querySelectorAll('#block-' + clientId + ' .faq-list-item');
                    var deleteEle = document.querySelectorAll('#block-' + clientId + ' .dashicons-no-alt');
                    var deSelectFaqArr = [];
                    if (0 < deSelectedPost.length) {
                        var deSelectFaqStr = deSelectedPost.replace(/['"]+/g, '').replace('[', '').replace(']', '');
                        deSelectFaqArr = deSelectFaqStr.split(',');
                    }
                    for (var i = 0; i < deleteEle.length; i++) {
                        deleteEle[i].addEventListener('click', function (e) {
                            var deleteId = e.currentTarget.parentNode.parentNode.parentNode.attributes.getNamedItem('data-sort-id').value;
                            deSelectFaqArr.push(deleteId);
                            e.currentTarget.parentNode.parentNode.parentNode.remove();
                            var divs = document.querySelectorAll('#block-' + clientId + ' .faq-list-item');
                            var sortedElement = [];
                            for (var _i5 = 0; _i5 < divs.length; _i5++) {
                                sortedElement.push(divs[_i5].getAttribute('data-sort-id'));
                            }
                            setAttributes({ faqSortList: JSON.stringify(sortedElement), selectedPost: JSON.stringify(sortedElement), deSelectedPost: JSON.stringify(deSelectFaqArr) });
                        });
                    }
                }, 5000);
            }
            if (this.state.step4) {

                /* Accordion Js */
                setTimeout(function () {
                    var acc = document.querySelectorAll('#block-' + clientId + ' .faq-accordion-header');
                    var i = void 0;
                    for (i = 0; i < acc.length; i++) {
                        acc[i].addEventListener('click', function () {
                            this.classList.toggle('active');

                            var panel = this.nextElementSibling;
                            if ('block' === panel.style.display) {
                                panel.style.display = 'none';
                            } else {
                                panel.style.display = 'block';
                            }
                        });
                    }
                }, 5000);
            }
            return wp.element.createElement(
                Fragment,
                null,
                wp.element.createElement(
                    'div',
                    { className: className },
                    wp.element.createElement(
                        'div',
                        { className: 'faq-screens-main' },
                        (this.state.step1 || this.state.step2 || this.state.step3) && this.state.close ? wp.element.createElement('span', { 'class': 'dashicon dashicons-no-alt main-clearbtn', onClick: this.onPopupCloseHandler.bind(this) }) : '',
                        this.state.step1 && wp.element.createElement(
                            'div',
                            { className: 'faq-screen-add' },
                            wp.element.createElement(
                                'div',
                                { className: 'faq-screen-outer' },
                                wp.element.createElement(
                                    'h4',
                                    null,
                                    'Add FAQ'
                                ),
                                wp.element.createElement('span', { className: 'dashicons dashicons-plus', onClick: this.addFaq.bind(this) })
                            )
                        ),
                        this.state.step2 && wp.element.createElement(
                            'div',
                            { className: 'faq-selection' },
                            wp.element.createElement(
                                'div',
                                { className: 'faq-selection-outer' },
                                wp.element.createElement(
                                    'h4',
                                    null,
                                    'Select Category and Tag'
                                ),
                                wp.element.createElement(
                                    'div',
                                    { className: 'tag-category-wrapper' },
                                    0 < this.state.taxonomies.length && wp.element.createElement(
                                        Fragment,
                                        null,
                                        this.state.taxonomies.map(function (taxonomy, index) {
                                            return undefined !== _this8.state.filterTermsObj[taxonomy] && wp.element.createElement(
                                                'div',
                                                { className: 'faq-tag' },
                                                wp.element.createElement(
                                                    'div',
                                                    { className: 'tag-wrapper' },
                                                    wp.element.createElement(
                                                        'div',
                                                        { className: 'input-faq', onClick: function onClick(e) {
                                                                return e.currentTarget.classList.add('active');
                                                            } },
                                                        wp.element.createElement('i', { className: 'faq-selection-arrow-icon fa fa-chevron-down', onClick: function onClick(e) {
                                                                return e.currentTarget.parentElement.classList.toggle('faq-selection-arrow-active');
                                                            } }),
                                                        wp.element.createElement(TextControl, {
                                                            type: 'string',
                                                            name: taxonomy,
                                                            placeHolder: 'Search ' + taxonomy,
                                                            onChange: function onChange(value) {
                                                                return _this8.filterTerms(value, taxonomy);
                                                            }
                                                        })
                                                    ),
                                                    wp.element.createElement(
                                                        'ul',
                                                        { className: 'dropdown-list tag-dropdown-list' },
                                                        wp.element.createElement(
                                                            'li',
                                                            { role: 'option', className: 'dropdown-item' },
                                                            wp.element.createElement(
                                                                'span',
                                                                { className: 'filterOption' },
                                                                _this8.state.filterTermsObj[taxonomy].map(function (term, index) {
                                                                    return wp.element.createElement(
                                                                        Fragment,
                                                                        { key: index },
                                                                        wp.element.createElement(CheckboxControl, {
                                                                            checked: isCheckedTerms[taxonomy] !== undefined && -1 < isCheckedTerms[taxonomy].indexOf(term.slug),
                                                                            label: term.name,
                                                                            name: taxonomy + '[]',
                                                                            value: term.slug,
                                                                            className: 'checkbox-input',
                                                                            onChange: function onChange(isChecked) {
                                                                                var index = void 0,
                                                                                    tempTerms = terms;
                                                                                if (!_this8.isEmpty(tempTerms)) {
                                                                                    tempTerms = JSON.parse(tempTerms);
                                                                                }
                                                                                if (isChecked) {
                                                                                    if (tempTerms[taxonomy] === undefined) {
                                                                                        tempTerms[taxonomy] = [term.slug];
                                                                                    } else {
                                                                                        tempTerms[taxonomy].push(term.slug);
                                                                                    }
                                                                                } else {
                                                                                    index = tempTerms[taxonomy].indexOf(term.slug);
                                                                                    tempTerms[taxonomy].splice(index, 1);
                                                                                }
                                                                                tempTerms = JSON.stringify(tempTerms);
                                                                                _this8.props.setAttributes({
                                                                                    terms: tempTerms
                                                                                });
                                                                                _this8.getPosts(term.term_id);
                                                                            }
                                                                        })
                                                                    );
                                                                })
                                                            )
                                                        )
                                                    )
                                                )
                                            );
                                        })
                                    )
                                ),
                                wp.element.createElement(
                                    'div',
                                    { className: 'faq-listing' },
                                    wp.element.createElement(ServerSideRender, {
                                        block: 'fsb/faq-screen',
                                        attributes: {
                                            terms: terms,
                                            step: step,
                                            selectedPost: selectedPost,
                                            faqSortList: faqSortList
                                        }
                                    })
                                ),
                                wp.element.createElement(
                                    'div',
                                    { className: 'button-wrapper next-step', id: 'next-step' },
                                    wp.element.createElement(
                                        'button',
                                        { id: 'next-btn', className: 'next-btn components-button editor-post-preview is-button is-default is-large', step: '2', onClick: this.onNextClickHandler.bind(this) },
                                        'Next'
                                    )
                                )
                            )
                        ),
                        this.state.step3 && wp.element.createElement(
                            'div',
                            { className: 'filtered-faq-main' },
                            wp.element.createElement(
                                'h4',
                                null,
                                'Manage FAQ'
                            ),
                            wp.element.createElement(ServerSideRender, {
                                block: 'fsb/faq-screen',
                                attributes: {
                                    terms: terms,
                                    step: step,
                                    deSelectedPost: deSelectedPost,
                                    faqSortList: faqSortList
                                }
                            }),
                            wp.element.createElement(
                                'div',
                                { className: 'button-wrapper' },
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'components-button editor-post-preview is-button is-default is-large back-btn', step: '3', onClick: this.onBackClickHandler.bind(this) },
                                    'Back'
                                ),
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'done-btn components-button editor-post-preview is-button is-default is-large', onClick: this.onDoneClickHandler.bind(this) },
                                    'Done'
                                )
                            ),
                            wp.element.createElement(
                                'div',
                                { className: 'drag-drop-note' },
                                wp.element.createElement(
                                    'span',
                                    null,
                                    '*Drag-Drop element for sorting.'
                                )
                            )
                        )
                    )
                ),
                this.state.step4 && wp.element.createElement(
                    'div',
                    { className: 'all-faq-list-main' },
                    wp.element.createElement(
                        'div',
                        { className: 'edit-faq' },
                        wp.element.createElement('span', { className: 'dashicons dashicons-edit', title: 'Edit FAQ',
                            onClick: this.onClickEditHandler.bind(this) }),
                        wp.element.createElement('span', { 'class': 'dashicons dashicons-admin-generic', title: 'Manage FAQ',
                            onClick: this.onNextClickHandler.bind(this) })
                    ),
                    wp.element.createElement(ServerSideRender, {
                        block: 'fsb/faq-screen',
                        attributes: {
                            terms: terms,
                            step: step,
                            deSelectedPost: deSelectedPost,
                            faqSortList: faqSortList
                        }
                    })
                )
            );
        }
    }]);

    return mdFaq;
}(Component);

var custom_icon = wp.element.createElement(
    'svg',
    { version: '1.0', xmlns: 'http://www.w3.org/2000/svg',
        width: '24', height: '24', viewBox: '0 0 512.000000 512.000000',
        preserveAspectRatio: 'xMidYMid meet' },
    wp.element.createElement(
        'metadata',
        null,
        'Created by potrace 1.16, written by Peter Selinger 2001-2019'
    ),
    wp.element.createElement(
        'g',
        { transform: 'translate(0.000000,512.000000) scale(0.100000,-0.100000)',
            fill: '#000000', stroke: 'none' },
        wp.element.createElement('path', { d: 'M1207 3846 c-32 -14 -77 -37 -98 -52 -77 -53 -155 -174 -178 -275 -7\r\n-27 -11 -309 -11 -745 0 -612 2 -707 16 -755 39 -134 129 -246 244 -302 l65\r\n-32 1033 -5 1034 -5 206 -455 207 -455 3 456 2 457 73 4 c171 9 325 145 381\r\n337 14 48 16 143 16 755 0 447 -4 717 -11 746 -29 127 -125 252 -240 311 l-64\r\n34 -1310 2 -1310 3 -58 -24z m2463 -576 l0 -100 -1110 0 -1110 0 0 100 0 100\r\n1110 0 1110 0 0 -100z m0 -525 l0 -105 -1110 0 -1110 0 0 105 0 105 1110 0\r\n1110 0 0 -105z m0 -510 l0 -95 -1110 0 -1110 0 0 95 0 95 1110 0 1110 0 0 -95z' })
    )
);

/* FAQ Screen Block */
registerBlockType('fsb/faq-screen', {
    title: __('FAQ Addon'),
    description: __('This is custom faq screen block.'),
    category: 'bricksblocks',
    icon: custom_icon,
    attributes: {
        terms: {
            type: 'string',
            default: {}
        },
        taxonomies: {
            type: 'array',
            default: []
        },
        selectedPost: {
            type: 'string',
            default: {}
        },
        deSelectedPost: {
            type: 'string',
            default: {}
        },
        faqSortList: {
            type: 'string',
            default: {}
        },
        step: {
            type: 'number',
            default: 1
        }
    },
    edit: mdFaq,
    save: function save(props) {
        if (4 === props.attributes.step) {
            return null;
        }
    }
});

/*
$(document).on('click', '#sortable li .faq-accordion-header .dashicons-no-alt', function(){
    $(this).parents('li').remove();
});*/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(12);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(3),
    castFunction = __webpack_require__(4),
    toInteger = __webpack_require__(6);

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument; (index).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.times(3, String);
 * // => ['0', '1', '2']
 *
 *  _.times(4, _.constant(0));
 * // => [0, 0, 0, 0]
 */
function times(n, iteratee) {
  n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH,
      length = nativeMin(n, MAX_ARRAY_LENGTH);

  iteratee = castFunction(iteratee);
  n -= MAX_ARRAY_LENGTH;

  var result = baseTimes(length, iteratee);
  while (++index < n) {
    iteratee(index);
  }
  return result;
}

module.exports = times;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(5);

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(7);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(8);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9),
    isSymbol = __webpack_require__(10);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(11),
    isObjectLike = __webpack_require__(17);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1),
    getRawTag = __webpack_require__(15),
    objectToString = __webpack_require__(16);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(13);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = function memize( fn, options ) {
	var size = 0,
		maxSize, head, tail;

	if ( options && options.maxSize ) {
		maxSize = options.maxSize;
	}

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				node.prev.next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				head.prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args )
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === maxSize ) {
			tail = tail.prev;
			tail.next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( process.env.NODE_ENV === 'test' ) {
		// Cache is not exposed in the public API, but used in tests to ensure
		// expected list progression
		memoized.getCache = function() {
			return [ head, tail, size ];
		};
	}

	return memoized;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);