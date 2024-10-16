/*! waitForImages jQuery Plugin - v2.4.0 - 2018-02-13
* https://github.com/alexanderdickson/waitForImages
* Copyright (c) 2018 Alex Dickson; Licensed MIT */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS / nodejs module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Namespace all events.
    var eventNamespace = 'waitForImages';

    // Is srcset supported by this browser?
    var hasSrcset = (function(img) {
        return img.srcset && img.sizes;
    })(new Image());

    // CSS properties which contain references to images.
    $.waitForImages = {
        hasImageProperties: [
            'backgroundImage',
            'listStyleImage',
            'borderImage',
            'borderCornerImage',
            'cursor'
        ],
        hasImageAttributes: ['srcset']
    };

    // Custom selector to find all `img` elements with a valid `src` attribute.
    $.expr.pseudos['has-src'] = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        return $(obj).is('img[src][src!=""]');
    };

    // Custom selector to find images which are not already cached by the
    // browser.
    $.expr.pseudos.uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        if (!$(obj).is(':has-src')) {
            return false;
        }

        return !obj.complete;
    };

    $.fn.waitForImages = function () {

        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();
        var originalCollection = this;
        var allImgs = [];

        // CSS properties which may contain an image.
        var hasImgProperties = $.waitForImages.hasImageProperties || [];
        // Element attributes which may contain an image.
        var hasImageAttributes = $.waitForImages.hasImageAttributes || [];
        // To match `url()` references.
        // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
        var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

        var finishedCallback;
        var eachCallback;
        var waitForAll;

        // Handle options object (if passed).
        if ($.isPlainObject(arguments[0])) {

            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;

        } else {

            // Handle if using deferred object and only one param was passed in.
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }

        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean.
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        this.each(function () {
            // Build a list of all imgs, dependent on what images will
            // be considered.
            var obj = $(this);

            if (waitForAll) {

                // Get all elements (including the original), as any one of
                // them could have a background image.
                obj.find('*').addBack().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in
                    // case it has a background image too.
                    if (element.is('img:has-src') &&
                        !element.is('[srcset]')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });

                    $.each(hasImageAttributes, function (i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;

                        // If it doesn't contain this property, skip.
                        if (!attributeValue) {
                            return true;
                        }

                        allImgs.push({
                            src: element.attr('src'),
                            srcset: element.attr('srcset'),
                            element: element[0]
                        });
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:has-src')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }
        });

        allImgsLength = allImgs.length;
        allImgsLoaded = 0;

        // If no images found, don't bother.
        if (allImgsLength === 0) {
            finishedCallback.call(originalCollection);
            deferred.resolveWith(originalCollection);
        }

        // Now that we've found all imgs in all elements in this,
        // load them and attach callbacks.
        $.each(allImgs, function (i, img) {

            var image = new Image();
            var events =
              'load.' + eventNamespace + ' error.' + eventNamespace;

            // Handle the image loading and error with the same callback.
            $(image).one(events, function me (event) {
                // If an error occurred with loading the image, set the
                // third argument accordingly.
                var eachArguments = [
                    allImgsLoaded,
                    allImgsLength,
                    event.type == 'load'
                ];
                allImgsLoaded++;

                eachCallback.apply(img.element, eachArguments);
                deferred.notifyWith(img.element, eachArguments);

                // Unbind the event listeners. I use this in addition to
                // `one` as one of those events won't be called (either
                // 'load' or 'error' will be called).
                $(this).off(events, me);

                if (allImgsLoaded == allImgsLength) {
                    finishedCallback.call(originalCollection[0]);
                    deferred.resolveWith(originalCollection[0]);
                    return false;
                }

            });

            if (hasSrcset && img.srcset) {
                image.srcset = img.srcset;
                image.sizes = img.sizes;
            }
            image.src = img.src;
        });

        return deferred.promise();

    };
}));

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from being retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,
		checkVisibility: true,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',
		slideTransition: '',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat > 0) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
				repeat -= 1;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			this.$stage.children('.center').removeClass('center');
			if (this.settings.center) {
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Create the stage DOM element
	 */
	Owl.prototype.initializeStage = function() {
		this.$stage = this.$element.find('.' + this.settings.stageClass);

		// if the stage is already in the DOM, grab it and skip stage initialization
		if (this.$stage.length) {
			return;
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + '>', {
			"class": this.settings.stageClass
		}).wrap( $( '<div/>', {
			"class": this.settings.stageOuterClass
		}));

		// append stage
		this.$element.append(this.$stage.parent());
	};

	/**
	 * Create item DOM elements
	 */
	Owl.prototype.initializeItems = function() {
		var $items = this.$element.find('.owl-item');

		// if the items are already in the DOM, grab them and skip item initialization
		if ($items.length) {
			this._items = $items.get().map(function(item) {
				return $(item);
			});

			this._mergers = this._items.map(function() {
				return 1;
			});

			this.refresh();

			return;
		}

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.isVisible()) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);
	};

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.initializeStage();
		this.initializeItems();

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * @returns {Boolean} visibility of $element
	 *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
	 *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
	 */
	Owl.prototype.isVisible = function() {
		return this.settings.checkVisibility
			? this.$element.is(':visible')
			: true;
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.isVisible()) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's' + (
					this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
				)
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			if (iterator) {
				reciprocalItemsWidth = this._items[--iterator].width();
				elementWidth = this.$element.width();
				while (iterator--) {
					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
					if (reciprocalItemsWidth > elementWidth) {
						break;
					}
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.isVisible()) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.remove();
		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.isVisible();
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.isVisible() === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);
					//TODO: Need documentation for this new option
					if (settings.lazyLoadEager > 0) {
						n += settings.lazyLoadEager;
						// If the carousel is looping also preload images that are to the "left"
						if (settings.loop) {
              position -= settings.lazyLoadEager;
              n++;
            }
					}

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false,
		lazyLoadEager: 0
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
                url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src') || $element.attr('data-srcset');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
            } else if ($element.is('source')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
                }, this)).attr('srcset', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		this._previousHeight = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
		this._intervalId = null;
		var refThis = this;

		// These changes have been taken from a PR by gavrochelegnou proposed in #1575
		// and have been made compatible with the latest jQuery version
		$(window).on('load', function() {
			if (refThis._core.settings.autoHeight) {
				refThis.update();
			}
		});

		// Autoresize the height of the carousel when window is resized
		// When carousel has images, the height is dependent on the width
		// and should also change on resize
		$(window).resize(function() {
			if (refThis._core.settings.autoHeight) {
				if (refThis._intervalId != null) {
					clearTimeout(refThis._intervalId);
				}

				refThis._intervalId = setTimeout(function() {
					refThis.update();
				}, 250);
			}
		});

	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			lazyLoadEnabled = this._core.settings.lazyLoad,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
			maxheight = this._previousHeight;
		}

		this._previousHeight = maxheight;

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] !== 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = $('<div/>',{
						"class": 'owl-video-tn ' + lazyClass,
						"srcType": path
					});
				} else {
					tnLink = $( '<div/>', {
						"class": "owl-video-tn",
						"style": 'opacity:1;background-image:url(' + path + ')'
					});
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap( $( '<div/>', {
			"class": "owl-video-wrapper",
			"style": dimensions
		}));

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html,
			iframe;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		html = $( '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>' );
		html.attr( 'height', height );
		html.attr( 'width', width );
		if (video.type === 'youtube') {
			html.attr( 'src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id );
		} else if (video.type === 'vimeo') {
			html.attr( 'src', '//player.vimeo.com/video/' + video.id + '?autoplay=1' );
		} else if (video.type === 'vzaar') {
			html.attr( 'src', '//view.vzaar.com/' + video.id + '/player?autoplay=true' );
		}

		iframe = $(html).wrap( '<div class="owl-video-frame" />' ).insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout id.
		 * @type {Number}
		 */
		this._call = null;

		/**
		 * Depending on the state of the plugin, this variable contains either
		 * the start time of the timer or the current timer value if it's
		 * paused. Since we start in a paused state we initialize the timer
		 * value.
		 * @type {Number}
		 */
		this._time = 0;

		/**
		 * Stores the timeout currently used.
		 * @type {Number}
		 */
		this._timeout = 0;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = true;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position' && this._paused) {
					// Reset the timer. This code is triggered when the position
					// of the carousel was changed through user interaction.
					this._time = 0;
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Transition to the next slide and set a timeout for the next transition.
	 * @private
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype._next = function(speed) {
		this._call = window.setTimeout(
			$.proxy(this._next, this, speed),
			this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()
		);

		if (this._core.is('interacting') || document.hidden) {
			return;
		}
		this._core.next(speed || this._core.settings.autoplaySpeed);
	}

	/**
	 * Reads the current timer value when the timer is playing.
	 * @public
	 */
	Autoplay.prototype.read = function() {
		return new Date().getTime() - this._time;
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		var elapsed;

		if (!this._core.is('rotating')) {
			this._core.enter('rotating');
		}

		timeout = timeout || this._core.settings.autoplayTimeout;

		// Calculate the elapsed time since the last transition. If the carousel
		// wasn't playing this calculation will yield zero.
		elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

		if (this._paused) {
			// Start the clock.
			this._time = this.read();
			this._paused = false;
		} else {
			// Clear the active timeout to allow replacement.
			window.clearTimeout(this._call);
		}

		// Adjust the origin of the timer to match the new timeout value.
		this._time += this.read() % timeout - elapsed;

		this._timeout = timeout;
		this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (this._core.is('rotating')) {
			// Reset the clock.
			this._time = 0;
			this._paused = true;

			window.clearTimeout(this._call);
			this._core.leave('rotating');
		}
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (this._core.is('rotating') && !this._paused) {
			// Pause the clock.
			this._time = this.read();
			this._paused = true;

			window.clearTimeout(this._call);
		}
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [
			'<span aria-label="' + 'Previous' + '">&#x2039;</span>',
			'<span aria-label="' + 'Next' + '">&#x203a;</span>'
		],
		navSpeed: false,
		navElement: 'button type="button" role="presentation"',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [
			'owl-prev',
			'owl-next'
		],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<button role="button">')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		/*$el.on('focusin', function() {
			$(document).off(".carousel");

			$(document).on('keydown.carousel', function(e) {
				if(e.keyCode == 37) {
					$el.trigger('prev.owl')
				}
				if(e.keyCode == 39) {
					$el.trigger('next.owl')
				}
			});
		});*/

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override, settings;
		settings = this._core.settings;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			if (control === '$relative' && settings.navContainer) {
				this._controls[control].html('');
			} else {
				this._controls[control].remove();
			}
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);

/*! owl.carousel2.thumbs - v0.1.8 | (c) 2016 @gijsroge | MIT license | https://github.com/gijsroge/OwlCarousel2-Thumbs */
/**
 * Thumbs Plugin
 * @version 2.0.0
 * @author Gijs RogÃ©
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
    'use strict';

    /**
     * Creates the thumbs plugin.
     * @class The thumbs Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var Thumbs = function (carousel) {


        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this.owl = carousel;


        /**
         * All DOM elements for thumbnails
         * @protected
         * @type {Object}
         */
        this._thumbcontent = [];


        /**
         * Instance identiefier
         * @type {number}
         * @private
         */
        this._identifier = 0;


        /**
         * Return current item regardless of clones
         * @protected
         * @type {Object}
         */
        this.owl_currentitem = this.owl.options.startPosition;


        /**
         * The carousel element.
         * @type {jQuery}
         */
        this.$element = this.owl.$element;


        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */
        this._handlers = {
            'prepared.owl.carousel': $.proxy(function (e) {
                if (e.namespace && this.owl.options.thumbs && !this.owl.options.thumbImage && !this.owl.options.thumbsPrerendered && !this.owl.options.thumbImage) {
                    if ($(e.content).find('[data-thumb]').attr('data-thumb') !== undefined) {
                        this._thumbcontent.push($(e.content).find('[data-thumb]').attr('data-thumb'));
                    }
                } else if (e.namespace && this.owl.options.thumbs && this.owl.options.thumbImage) {
                    var innerImage = $(e.content).find('img');
                    this._thumbcontent.push(innerImage);
                }
            }, this),

            'initialized.owl.carousel': $.proxy(function (e) {
                if (e.namespace && this.owl.options.thumbs) {
                    this.render();
                    this.listen();
                    this._identifier = this.owl.$element.data('slider-id');
                    this.setActive();
                }
            }, this),

            'changed.owl.carousel': $.proxy(function (e) {
                if (e.namespace && e.property.name === 'position' && this.owl.options.thumbs) {
                    this._identifier = this.owl.$element.data('slider-id');
                    this.setActive();
                }
            }, this)
        };

        // set default options
        this.owl.options = $.extend({}, Thumbs.Defaults, this.owl.options);

        // register the event handlers
        this.owl.$element.on(this._handlers);
    };


    /**
     * Default options.
     * @public
     */
    Thumbs.Defaults = {
        thumbs: true,
        thumbImage: false,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item',
        moveThumbsInside: false
    };


    /**
     * Listen for thumbnail click
     * @protected
     */
    Thumbs.prototype.listen = function () {

        //set default options
        var options = this.owl.options;

        if (options.thumbsPrerendered) {
            this._thumbcontent._thumbcontainer = $('.' + options.thumbContainerClass);
        }

        //check what thumbitem has been clicked and move slider to that item
        $(this._thumbcontent._thumbcontainer).on('click', this._thumbcontent._thumbcontainer.children(), $.proxy(function (e) {

            // find relative slider
            this._identifier = $(e.target).closest('.' + options.thumbContainerClass).data('slider-id');

            // get index of clicked thumbnail
            var index = $(e.target).parent().is(this._thumbcontent._thumbcontainer) ? $(e.target).index() : $(e.target).closest('.'+options.thumbItemClass).index();

            if (options.thumbsPrerendered) {
                // slide to slide :)
                $('[data-slider-id=' + this._identifier + ']').trigger('to.owl.carousel', [index, options.dotsSpeed, true]);
            } else {
                this.owl.to(index, options.dotsSpeed);
            }

            e.preventDefault();
        }, this));
    };


    /**
     * Builds thumbnails
     * @protected
     */
    Thumbs.prototype.render = function () {

        //set default options
        var options = this.owl.options;

        //create thumbcontainer
        if (!options.thumbsPrerendered) {
            this._thumbcontent._thumbcontainer = $('<div>').addClass(options.thumbContainerClass).appendTo(this.$element);
        } else {
            this._thumbcontent._thumbcontainer = $('.' + options.thumbContainerClass + '');
            if(options.moveThumbsInside){
                this._thumbcontent._thumbcontainer.appendTo(this.$element);
            }
        }

        //create thumb items
        var i;
        if (!options.thumbImage) {
            for (i = 0; i < this._thumbcontent.length; ++i) {
                this._thumbcontent._thumbcontainer.append('<button class=' + options.thumbItemClass + '>' + this._thumbcontent[i] + '</button>');
            }
        } else {
            for (i = 0; i < this._thumbcontent.length; ++i) {
                this._thumbcontent._thumbcontainer.append('<button class=' + options.thumbItemClass + '><img src="' + this._thumbcontent[i].attr('src') + '" alt="' + this._thumbcontent[i].attr('alt') + '" /></button>');
            }
        }
    };


    /**
     * Updates active class on thumbnails
     * @protected
     */
    Thumbs.prototype.setActive = function () {

        // get startslide
        this.owl_currentitem = this.owl._current - (this.owl._clones.length / 2);
        if (this.owl_currentitem === this.owl._items.length) {
            this.owl_currentitem = 0;
        }

        //set default options
        var options = this.owl.options;

        // set relative thumbnail container
        var thumbContainer = options.thumbsPrerendered ? $('.' + options.thumbContainerClass + '[data-slider-id="' + this._identifier + '"]') : this._thumbcontent._thumbcontainer;
        thumbContainer.children().filter('.active').removeClass('active');
        thumbContainer.children().eq(this.owl_currentitem).addClass('active');
    };


    /**
     * Destroys the plugin.
     * @public
     */
    Thumbs.prototype.destroy = function () {
        var handler, property;
        for (handler in this._handlers) {
            this.owl.$element.off(handler, this._handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] !== 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Thumbs = Thumbs;

})(window.Zepto || window.jQuery, window, document);
"object"==typeof navigator&&function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Plyr",t):(e="undefined"!=typeof globalThis?globalThis:e||self).Plyr=t()}(this,(function(){"use strict";function e(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function t(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var a={addCSS:!0,thumbWidth:15,watch:!0};function l(e,t){return function(){return Array.from(document.querySelectorAll(t)).includes(this)}.call(e,t)}var o=function(e){return null!=e?e.constructor:null},r=function(e,t){return!!(e&&t&&e instanceof t)},c=function(e){return null==e},h=function(e){return o(e)===Object},u=function(e){return o(e)===String},d=function(e){return Array.isArray(e)},m=function(e){return r(e,NodeList)},p=u,g=d,f=m,b=function(e){return r(e,Element)},y=function(e){return r(e,Event)},v=function(e){return c(e)||(u(e)||d(e)||m(e))&&!e.length||h(e)&&!Object.keys(e).length};function w(e,t){if(1>t){var i=function(e){var t="".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0}(t);return parseFloat(e.toFixed(i))}return Math.round(e/t)*t}var T=function(){function e(t,i){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),b(t)?this.element=t:p(t)&&(this.element=document.querySelector(t)),b(this.element)&&v(this.element.rangeTouch)&&(this.config=n({},a,{},i),this.init())}return function(e,i,s){i&&t(e.prototype,i),s&&t(e,s)}(e,[{key:"init",value:function(){e.enabled&&(this.config.addCSS&&(this.element.style.userSelect="none",this.element.style.webKitUserSelect="none",this.element.style.touchAction="manipulation"),this.listeners(!0),this.element.rangeTouch=this)}},{key:"destroy",value:function(){e.enabled&&(this.config.addCSS&&(this.element.style.userSelect="",this.element.style.webKitUserSelect="",this.element.style.touchAction=""),this.listeners(!1),this.element.rangeTouch=null)}},{key:"listeners",value:function(e){var t=this,i=e?"addEventListener":"removeEventListener";["touchstart","touchmove","touchend"].forEach((function(e){t.element[i](e,(function(e){return t.set(e)}),!1)}))}},{key:"get",value:function(t){if(!e.enabled||!y(t))return null;var i,s=t.target,n=t.changedTouches[0],a=parseFloat(s.getAttribute("min"))||0,l=parseFloat(s.getAttribute("max"))||100,o=parseFloat(s.getAttribute("step"))||1,r=s.getBoundingClientRect(),c=100/r.width*(this.config.thumbWidth/2)/100;return 0>(i=100/r.width*(n.clientX-r.left))?i=0:100<i&&(i=100),50>i?i-=(100-2*i)*c:50<i&&(i+=2*(i-50)*c),a+w(i/100*(l-a),o)}},{key:"set",value:function(t){e.enabled&&y(t)&&!t.target.disabled&&(t.preventDefault(),t.target.value=this.get(t),function(e,t){if(e&&t){var i=new Event(t,{bubbles:!0});e.dispatchEvent(i)}}(t.target,"touchend"===t.type?"change":"input"))}}],[{key:"setup",value:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},s=null;if(v(t)||p(t)?s=Array.from(document.querySelectorAll(p(t)?t:'input[type="range"]')):b(t)?s=[t]:f(t)?s=Array.from(t):g(t)&&(s=t.filter(b)),v(s))return null;var o=n({},a,{},i);if(p(t)&&o.watch){var r=new MutationObserver((function(i){Array.from(i).forEach((function(i){Array.from(i.addedNodes).forEach((function(i){b(i)&&l(i,t)&&new e(i,o)}))}))}));r.observe(document.body,{childList:!0,subtree:!0})}return s.map((function(t){return new e(t,i)}))}},{key:"enabled",get:function(){return"ontouchstart"in document.documentElement}}]),e}();const k=e=>null!=e?e.constructor:null,C=(e,t)=>Boolean(e&&t&&e instanceof t),A=e=>null==e,S=e=>k(e)===Object,E=e=>k(e)===String,P=e=>k(e)===Function,M=e=>Array.isArray(e),N=e=>C(e,NodeList),x=e=>A(e)||(E(e)||M(e)||N(e))&&!e.length||S(e)&&!Object.keys(e).length;var I=A,L=S,$=e=>k(e)===Number&&!Number.isNaN(e),_=E,O=e=>k(e)===Boolean,j=P,D=M,q=N,H=e=>null!==e&&"object"==typeof e&&1===e.nodeType&&"object"==typeof e.style&&"object"==typeof e.ownerDocument,R=e=>C(e,Event),F=e=>C(e,KeyboardEvent),V=e=>C(e,TextTrack)||!A(e)&&E(e.kind),B=e=>C(e,Promise)&&P(e.then),U=e=>{if(C(e,window.URL))return!0;if(!E(e))return!1;let t=e;e.startsWith("http://")&&e.startsWith("https://")||(t=`http://${e}`);try{return!x(new URL(t).hostname)}catch(e){return!1}},W=x;const z=(()=>{const e=document.createElement("span"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},i=Object.keys(t).find((t=>void 0!==e.style[t]));return!!_(i)&&t[i]})();function K(e,t){setTimeout((()=>{try{e.hidden=!0,e.offsetHeight,e.hidden=!1}catch(e){}}),t)}const Y={isIE:Boolean(window.document.documentMode),isEdge:window.navigator.userAgent.includes("Edge"),isWebkit:"WebkitAppearance"in document.documentElement.style&&!/Edge/.test(navigator.userAgent),isIPhone:/(iPhone|iPod)/gi.test(navigator.platform),isIos:"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1||/(iPad|iPhone|iPod)/gi.test(navigator.platform)};function Q(e,t){return t.split(".").reduce(((e,t)=>e&&e[t]),e)}function X(e={},...t){if(!t.length)return e;const i=t.shift();return L(i)?(Object.keys(i).forEach((t=>{L(i[t])?(Object.keys(e).includes(t)||Object.assign(e,{[t]:{}}),X(e[t],i[t])):Object.assign(e,{[t]:i[t]})})),X(e,...t)):e}function J(e,t){const i=e.length?e:[e];Array.from(i).reverse().forEach(((e,i)=>{const s=i>0?t.cloneNode(!0):t,n=e.parentNode,a=e.nextSibling;s.appendChild(e),a?n.insertBefore(s,a):n.appendChild(s)}))}function G(e,t){H(e)&&!W(t)&&Object.entries(t).filter((([,e])=>!I(e))).forEach((([t,i])=>e.setAttribute(t,i)))}function Z(e,t,i){const s=document.createElement(e);return L(t)&&G(s,t),_(i)&&(s.innerText=i),s}function ee(e,t,i,s){H(t)&&t.appendChild(Z(e,i,s))}function te(e){q(e)||D(e)?Array.from(e).forEach(te):H(e)&&H(e.parentNode)&&e.parentNode.removeChild(e)}function ie(e){if(!H(e))return;let{length:t}=e.childNodes;for(;t>0;)e.removeChild(e.lastChild),t-=1}function se(e,t){return H(t)&&H(t.parentNode)&&H(e)?(t.parentNode.replaceChild(e,t),e):null}function ne(e,t){if(!_(e)||W(e))return{};const i={},s=X({},t);return e.split(",").forEach((e=>{const t=e.trim(),n=t.replace(".",""),a=t.replace(/[[\]]/g,"").split("="),[l]=a,o=a.length>1?a[1].replace(/["']/g,""):"";switch(t.charAt(0)){case".":_(s.class)?i.class=`${s.class} ${n}`:i.class=n;break;case"#":i.id=t.replace("#","");break;case"[":i[l]=o}})),X(s,i)}function ae(e,t){if(!H(e))return;let i=t;O(i)||(i=!e.hidden),e.hidden=i}function le(e,t,i){if(q(e))return Array.from(e).map((e=>le(e,t,i)));if(H(e)){let s="toggle";return void 0!==i&&(s=i?"add":"remove"),e.classList[s](t),e.classList.contains(t)}return!1}function oe(e,t){return H(e)&&e.classList.contains(t)}function re(e,t){const{prototype:i}=Element;return(i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(){return Array.from(document.querySelectorAll(t)).includes(this)}).call(e,t)}function ce(e){return this.elements.container.querySelectorAll(e)}function he(e){return this.elements.container.querySelector(e)}function ue(e=null,t=!1){H(e)&&(e.focus({preventScroll:!0}),t&&le(e,this.config.classNames.tabFocus))}const de={"audio/ogg":"vorbis","audio/wav":"1","video/webm":"vp8, vorbis","video/mp4":"avc1.42E01E, mp4a.40.2","video/ogg":"theora"},me={audio:"canPlayType"in document.createElement("audio"),video:"canPlayType"in document.createElement("video"),check(e,t,i){const s=Y.isIPhone&&i&&me.playsinline,n=me[e]||"html5"!==t;return{api:n,ui:n&&me.rangeInput&&("video"!==e||!Y.isIPhone||s)}},pip:!(Y.isIPhone||!j(Z("video").webkitSetPresentationMode)&&(!document.pictureInPictureEnabled||Z("video").disablePictureInPicture)),airplay:j(window.WebKitPlaybackTargetAvailabilityEvent),playsinline:"playsInline"in document.createElement("video"),mime(e){if(W(e))return!1;const[t]=e.split("/");let i=e;if(!this.isHTML5||t!==this.type)return!1;Object.keys(de).includes(i)&&(i+=`; codecs="${de[e]}"`);try{return Boolean(i&&this.media.canPlayType(i).replace(/no/,""))}catch(e){return!1}},textTracks:"textTracks"in document.createElement("video"),rangeInput:(()=>{const e=document.createElement("input");return e.type="range","range"===e.type})(),touch:"ontouchstart"in document.documentElement,transitions:!1!==z,reducedMotion:"matchMedia"in window&&window.matchMedia("(prefers-reduced-motion)").matches},pe=(()=>{let e=!1;try{const t=Object.defineProperty({},"passive",{get:()=>(e=!0,null)});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(e){}return e})();function ge(e,t,i,s=!1,n=!0,a=!1){if(!e||!("addEventListener"in e)||W(t)||!j(i))return;const l=t.split(" ");let o=a;pe&&(o={passive:n,capture:a}),l.forEach((t=>{this&&this.eventListeners&&s&&this.eventListeners.push({element:e,type:t,callback:i,options:o}),e[s?"addEventListener":"removeEventListener"](t,i,o)}))}function fe(e,t="",i,s=!0,n=!1){ge.call(this,e,t,i,!0,s,n)}function be(e,t="",i,s=!0,n=!1){ge.call(this,e,t,i,!1,s,n)}function ye(e,t="",i,s=!0,n=!1){const a=(...l)=>{be(e,t,a,s,n),i.apply(this,l)};ge.call(this,e,t,a,!0,s,n)}function ve(e,t="",i=!1,s={}){if(!H(e)||W(t))return;const n=new CustomEvent(t,{bubbles:i,detail:{...s,plyr:this}});e.dispatchEvent(n)}function we(){this&&this.eventListeners&&(this.eventListeners.forEach((e=>{const{element:t,type:i,callback:s,options:n}=e;t.removeEventListener(i,s,n)})),this.eventListeners=[])}function Te(){return new Promise((e=>this.ready?setTimeout(e,0):fe.call(this,this.elements.container,"ready",e))).then((()=>{}))}function ke(e){B(e)&&e.then(null,(()=>{}))}function Ce(e){return D(e)?e.filter(((t,i)=>e.indexOf(t)===i)):e}function Ae(e,t){return D(e)&&e.length?e.reduce(((e,i)=>Math.abs(i-t)<Math.abs(e-t)?i:e)):null}function Se(e){return!(!window||!window.CSS)&&window.CSS.supports(e)}const Ee=[[1,1],[4,3],[3,4],[5,4],[4,5],[3,2],[2,3],[16,10],[10,16],[16,9],[9,16],[21,9],[9,21],[32,9],[9,32]].reduce(((e,[t,i])=>({...e,[t/i]:[t,i]})),{});function Pe(e){if(!(D(e)||_(e)&&e.includes(":")))return!1;return(D(e)?e:e.split(":")).map(Number).every($)}function Me(e){if(!D(e)||!e.every($))return null;const[t,i]=e,s=(e,t)=>0===t?e:s(t,e%t),n=s(t,i);return[t/n,i/n]}function Ne(e){const t=e=>Pe(e)?e.split(":").map(Number):null;let i=t(e);if(null===i&&(i=t(this.config.ratio)),null===i&&!W(this.embed)&&D(this.embed.ratio)&&({ratio:i}=this.embed),null===i&&this.isHTML5){const{videoWidth:e,videoHeight:t}=this.media;i=[e,t]}return Me(i)}function xe(e){if(!this.isVideo)return{};const{wrapper:t}=this.elements,i=Ne.call(this,e);if(!D(i))return{};const[s,n]=Me(i),a=100/s*n;if(Se(`aspect-ratio: ${s}/${n}`)?t.style.aspectRatio=`${s}/${n}`:t.style.paddingBottom=`${a}%`,this.isVimeo&&!this.config.vimeo.premium&&this.supported.ui){const e=100/this.media.offsetWidth*parseInt(window.getComputedStyle(this.media).paddingBottom,10),i=(e-a)/(e/50);this.fullscreen.active?t.style.paddingBottom=null:this.media.style.transform=`translateY(-${i}%)`}else this.isHTML5&&t.classList.add(this.config.classNames.videoFixedRatio);return{padding:a,ratio:i}}function Ie(e,t,i=.05){const s=e/t,n=Ae(Object.keys(Ee),s);return Math.abs(n-s)<=i?Ee[n]:[e,t]}const Le={getSources(){if(!this.isHTML5)return[];return Array.from(this.media.querySelectorAll("source")).filter((e=>{const t=e.getAttribute("type");return!!W(t)||me.mime.call(this,t)}))},getQualityOptions(){return this.config.quality.forced?this.config.quality.options:Le.getSources.call(this).map((e=>Number(e.getAttribute("size")))).filter(Boolean)},setup(){if(!this.isHTML5)return;const e=this;e.options.speed=e.config.speed.options,W(this.config.ratio)||xe.call(e),Object.defineProperty(e.media,"quality",{get(){const t=Le.getSources.call(e).find((t=>t.getAttribute("src")===e.source));return t&&Number(t.getAttribute("size"))},set(t){if(e.quality!==t){if(e.config.quality.forced&&j(e.config.quality.onChange))e.config.quality.onChange(t);else{const i=Le.getSources.call(e).find((e=>Number(e.getAttribute("size"))===t));if(!i)return;const{currentTime:s,paused:n,preload:a,readyState:l,playbackRate:o}=e.media;e.media.src=i.getAttribute("src"),("none"!==a||l)&&(e.once("loadedmetadata",(()=>{e.speed=o,e.currentTime=s,n||ke(e.play())})),e.media.load())}ve.call(e,e.media,"qualitychange",!1,{quality:t})}}})},cancelRequests(){this.isHTML5&&(te(Le.getSources.call(this)),this.media.setAttribute("src",this.config.blankVideo),this.media.load(),this.debug.log("Cancelled network requests"))}};function $e(e,...t){return W(e)?e:e.toString().replace(/{(\d+)}/g,((e,i)=>t[i].toString()))}const _e=(e="",t="",i="")=>e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g,"\\$1"),"g"),i.toString()),Oe=(e="")=>e.toString().replace(/\w\S*/g,(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()));function je(e=""){let t=e.toString();return t=function(e=""){let t=e.toString();return t=_e(t,"-"," "),t=_e(t,"_"," "),t=Oe(t),_e(t," ","")}(t),t.charAt(0).toLowerCase()+t.slice(1)}function De(e){const t=document.createElement("div");return t.appendChild(e),t.innerHTML}const qe={pip:"PIP",airplay:"AirPlay",html5:"HTML5",vimeo:"Vimeo",youtube:"YouTube"},He={get(e="",t={}){if(W(e)||W(t))return"";let i=Q(t.i18n,e);if(W(i))return Object.keys(qe).includes(e)?qe[e]:"";const s={"{seektime}":t.seekTime,"{title}":t.title};return Object.entries(s).forEach((([e,t])=>{i=_e(i,e,t)})),i}};class Re{constructor(t){e(this,"get",(e=>{if(!Re.supported||!this.enabled)return null;const t=window.localStorage.getItem(this.key);if(W(t))return null;const i=JSON.parse(t);return _(e)&&e.length?i[e]:i})),e(this,"set",(e=>{if(!Re.supported||!this.enabled)return;if(!L(e))return;let t=this.get();W(t)&&(t={}),X(t,e);try{window.localStorage.setItem(this.key,JSON.stringify(t))}catch(e){}})),this.enabled=t.config.storage.enabled,this.key=t.config.storage.key}static get supported(){try{if(!("localStorage"in window))return!1;const e="___test";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch(e){return!1}}}function Fe(e,t="text"){return new Promise(((i,s)=>{try{const s=new XMLHttpRequest;if(!("withCredentials"in s))return;s.addEventListener("load",(()=>{if("text"===t)try{i(JSON.parse(s.responseText))}catch(e){i(s.responseText)}else i(s.response)})),s.addEventListener("error",(()=>{throw new Error(s.status)})),s.open("GET",e,!0),s.responseType=t,s.send()}catch(e){s(e)}}))}function Ve(e,t){if(!_(e))return;const i=_(t);let s=!1;const n=()=>null!==document.getElementById(t),a=(e,t)=>{e.innerHTML=t,i&&n()||document.body.insertAdjacentElement("afterbegin",e)};if(!i||!n()){const n=Re.supported,l=document.createElement("div");if(l.setAttribute("hidden",""),i&&l.setAttribute("id",t),n){const e=window.localStorage.getItem(`cache-${t}`);if(s=null!==e,s){const t=JSON.parse(e);a(l,t.content)}}Fe(e).then((e=>{if(!W(e)){if(n)try{window.localStorage.setItem(`cache-${t}`,JSON.stringify({content:e}))}catch(e){}a(l,e)}})).catch((()=>{}))}}const Be=e=>Math.trunc(e/60/60%60,10);function Ue(e=0,t=!1,i=!1){if(!$(e))return Ue(void 0,t,i);const s=e=>`0${e}`.slice(-2);let n=Be(e);const a=(l=e,Math.trunc(l/60%60,10));var l;const o=(e=>Math.trunc(e%60,10))(e);return n=t||n>0?`${n}:`:"",`${i&&e>0?"-":""}${n}${s(a)}:${s(o)}`}const We={getIconUrl(){const e=new URL(this.config.iconUrl,window.location),t=window.location.host?window.location.host:window.top.location.host,i=e.host!==t||Y.isIE&&!window.svg4everybody;return{url:this.config.iconUrl,cors:i}},findElements(){try{return this.elements.controls=he.call(this,this.config.selectors.controls.wrapper),this.elements.buttons={play:ce.call(this,this.config.selectors.buttons.play),pause:he.call(this,this.config.selectors.buttons.pause),restart:he.call(this,this.config.selectors.buttons.restart),rewind:he.call(this,this.config.selectors.buttons.rewind),fastForward:he.call(this,this.config.selectors.buttons.fastForward),mute:he.call(this,this.config.selectors.buttons.mute),pip:he.call(this,this.config.selectors.buttons.pip),airplay:he.call(this,this.config.selectors.buttons.airplay),settings:he.call(this,this.config.selectors.buttons.settings),captions:he.call(this,this.config.selectors.buttons.captions),fullscreen:he.call(this,this.config.selectors.buttons.fullscreen)},this.elements.progress=he.call(this,this.config.selectors.progress),this.elements.inputs={seek:he.call(this,this.config.selectors.inputs.seek),volume:he.call(this,this.config.selectors.inputs.volume)},this.elements.display={buffer:he.call(this,this.config.selectors.display.buffer),currentTime:he.call(this,this.config.selectors.display.currentTime),duration:he.call(this,this.config.selectors.display.duration)},H(this.elements.progress)&&(this.elements.display.seekTooltip=this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)),!0}catch(e){return this.debug.warn("It looks like there is a problem with your custom controls HTML",e),this.toggleNativeControls(!0),!1}},createIcon(e,t){const i="http://www.w3.org/2000/svg",s=We.getIconUrl.call(this),n=`${s.cors?"":s.url}#${this.config.iconPrefix}`,a=document.createElementNS(i,"svg");G(a,X(t,{"aria-hidden":"true",focusable:"false"}));const l=document.createElementNS(i,"use"),o=`${n}-${e}`;return"href"in l&&l.setAttributeNS("http://www.w3.org/1999/xlink","href",o),l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o),a.appendChild(l),a},createLabel(e,t={}){const i=He.get(e,this.config);return Z("span",{...t,class:[t.class,this.config.classNames.hidden].filter(Boolean).join(" ")},i)},createBadge(e){if(W(e))return null;const t=Z("span",{class:this.config.classNames.menu.value});return t.appendChild(Z("span",{class:this.config.classNames.menu.badge},e)),t},createButton(e,t){const i=X({},t);let s=je(e);const n={element:"button",toggle:!1,label:null,icon:null,labelPressed:null,iconPressed:null};switch(["element","icon","label"].forEach((e=>{Object.keys(i).includes(e)&&(n[e]=i[e],delete i[e])})),"button"!==n.element||Object.keys(i).includes("type")||(i.type="button"),Object.keys(i).includes("class")?i.class.split(" ").some((e=>e===this.config.classNames.control))||X(i,{class:`${i.class} ${this.config.classNames.control}`}):i.class=this.config.classNames.control,e){case"play":n.toggle=!0,n.label="play",n.labelPressed="pause",n.icon="play",n.iconPressed="pause";break;case"mute":n.toggle=!0,n.label="mute",n.labelPressed="unmute",n.icon="volume",n.iconPressed="muted";break;case"captions":n.toggle=!0,n.label="enableCaptions",n.labelPressed="disableCaptions",n.icon="captions-off",n.iconPressed="captions-on";break;case"fullscreen":n.toggle=!0,n.label="enterFullscreen",n.labelPressed="exitFullscreen",n.icon="enter-fullscreen",n.iconPressed="exit-fullscreen";break;case"play-large":i.class+=` ${this.config.classNames.control}--overlaid`,s="play",n.label="play",n.icon="play";break;default:W(n.label)&&(n.label=s),W(n.icon)&&(n.icon=e)}const a=Z(n.element);return n.toggle?(a.appendChild(We.createIcon.call(this,n.iconPressed,{class:"icon--pressed"})),a.appendChild(We.createIcon.call(this,n.icon,{class:"icon--not-pressed"})),a.appendChild(We.createLabel.call(this,n.labelPressed,{class:"label--pressed"})),a.appendChild(We.createLabel.call(this,n.label,{class:"label--not-pressed"}))):(a.appendChild(We.createIcon.call(this,n.icon)),a.appendChild(We.createLabel.call(this,n.label))),X(i,ne(this.config.selectors.buttons[s],i)),G(a,i),"play"===s?(D(this.elements.buttons[s])||(this.elements.buttons[s]=[]),this.elements.buttons[s].push(a)):this.elements.buttons[s]=a,a},createRange(e,t){const i=Z("input",X(ne(this.config.selectors.inputs[e]),{type:"range",min:0,max:100,step:.01,value:0,autocomplete:"off",role:"slider","aria-label":He.get(e,this.config),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0},t));return this.elements.inputs[e]=i,We.updateRangeFill.call(this,i),T.setup(i),i},createProgress(e,t){const i=Z("progress",X(ne(this.config.selectors.display[e]),{min:0,max:100,value:0,role:"progressbar","aria-hidden":!0},t));if("volume"!==e){i.appendChild(Z("span",null,"0"));const t={played:"played",buffer:"buffered"}[e],s=t?He.get(t,this.config):"";i.innerText=`% ${s.toLowerCase()}`}return this.elements.display[e]=i,i},createTime(e,t){const i=ne(this.config.selectors.display[e],t),s=Z("div",X(i,{class:`${i.class?i.class:""} ${this.config.classNames.display.time} `.trim(),"aria-label":He.get(e,this.config)}),"00:00");return this.elements.display[e]=s,s},bindMenuItemShortcuts(e,t){fe.call(this,e,"keydown keyup",(i=>{if(!["Space","ArrowUp","ArrowDown","ArrowRight"].includes(i.key))return;if(i.preventDefault(),i.stopPropagation(),"keydown"===i.type)return;const s=re(e,'[role="menuitemradio"]');if(!s&&["Space","ArrowRight"].includes(i.key))We.showMenuPanel.call(this,t,!0);else{let t;"Space"!==i.key&&("ArrowDown"===i.key||s&&"ArrowRight"===i.key?(t=e.nextElementSibling,H(t)||(t=e.parentNode.firstElementChild)):(t=e.previousElementSibling,H(t)||(t=e.parentNode.lastElementChild)),ue.call(this,t,!0))}}),!1),fe.call(this,e,"keyup",(e=>{"Return"===e.key&&We.focusFirstMenuItem.call(this,null,!0)}))},createMenuItem({value:e,list:t,type:i,title:s,badge:n=null,checked:a=!1}){const l=ne(this.config.selectors.inputs[i]),o=Z("button",X(l,{type:"button",role:"menuitemradio",class:`${this.config.classNames.control} ${l.class?l.class:""}`.trim(),"aria-checked":a,value:e})),r=Z("span");r.innerHTML=s,H(n)&&r.appendChild(n),o.appendChild(r),Object.defineProperty(o,"checked",{enumerable:!0,get:()=>"true"===o.getAttribute("aria-checked"),set(e){e&&Array.from(o.parentNode.children).filter((e=>re(e,'[role="menuitemradio"]'))).forEach((e=>e.setAttribute("aria-checked","false"))),o.setAttribute("aria-checked",e?"true":"false")}}),this.listeners.bind(o,"click keyup",(t=>{if(!F(t)||"Space"===t.key){switch(t.preventDefault(),t.stopPropagation(),o.checked=!0,i){case"language":this.currentTrack=Number(e);break;case"quality":this.quality=e;break;case"speed":this.speed=parseFloat(e)}We.showMenuPanel.call(this,"home",F(t))}}),i,!1),We.bindMenuItemShortcuts.call(this,o,i),t.appendChild(o)},formatTime(e=0,t=!1){if(!$(e))return e;return Ue(e,Be(this.duration)>0,t)},updateTimeDisplay(e=null,t=0,i=!1){H(e)&&$(t)&&(e.innerText=We.formatTime(t,i))},updateVolume(){this.supported.ui&&(H(this.elements.inputs.volume)&&We.setRange.call(this,this.elements.inputs.volume,this.muted?0:this.volume),H(this.elements.buttons.mute)&&(this.elements.buttons.mute.pressed=this.muted||0===this.volume))},setRange(e,t=0){H(e)&&(e.value=t,We.updateRangeFill.call(this,e))},updateProgress(e){if(!this.supported.ui||!R(e))return;let t=0;const i=(e,t)=>{const i=$(t)?t:0,s=H(e)?e:this.elements.display.buffer;if(H(s)){s.value=i;const e=s.getElementsByTagName("span")[0];H(e)&&(e.childNodes[0].nodeValue=i)}};if(e)switch(e.type){case"timeupdate":case"seeking":case"seeked":s=this.currentTime,n=this.duration,t=0===s||0===n||Number.isNaN(s)||Number.isNaN(n)?0:(s/n*100).toFixed(2),"timeupdate"===e.type&&We.setRange.call(this,this.elements.inputs.seek,t);break;case"playing":case"progress":i(this.elements.display.buffer,100*this.buffered)}var s,n},updateRangeFill(e){const t=R(e)?e.target:e;if(H(t)&&"range"===t.getAttribute("type")){if(re(t,this.config.selectors.inputs.seek)){t.setAttribute("aria-valuenow",this.currentTime);const e=We.formatTime(this.currentTime),i=We.formatTime(this.duration),s=He.get("seekLabel",this.config);t.setAttribute("aria-valuetext",s.replace("{currentTime}",e).replace("{duration}",i))}else if(re(t,this.config.selectors.inputs.volume)){const e=100*t.value;t.setAttribute("aria-valuenow",e),t.setAttribute("aria-valuetext",`${e.toFixed(1)}%`)}else t.setAttribute("aria-valuenow",t.value);Y.isWebkit&&t.style.setProperty("--value",t.value/t.max*100+"%")}},updateSeekTooltip(e){var t,i;if(!this.config.tooltips.seek||!H(this.elements.inputs.seek)||!H(this.elements.display.seekTooltip)||0===this.duration)return;const s=this.elements.display.seekTooltip,n=`${this.config.classNames.tooltip}--visible`,a=e=>le(s,n,e);if(this.touch)return void a(!1);let l=0;const o=this.elements.progress.getBoundingClientRect();if(R(e))l=100/o.width*(e.pageX-o.left);else{if(!oe(s,n))return;l=parseFloat(s.style.left,10)}l<0?l=0:l>100&&(l=100);const r=this.duration/100*l;s.innerText=We.formatTime(r);const c=null===(t=this.config.markers)||void 0===t||null===(i=t.points)||void 0===i?void 0:i.find((({time:e})=>e===Math.round(r)));c&&s.insertAdjacentHTML("afterbegin",`${c.label}<br>`),s.style.left=`${l}%`,R(e)&&["mouseenter","mouseleave"].includes(e.type)&&a("mouseenter"===e.type)},timeUpdate(e){const t=!H(this.elements.display.duration)&&this.config.invertTime;We.updateTimeDisplay.call(this,this.elements.display.currentTime,t?this.duration-this.currentTime:this.currentTime,t),e&&"timeupdate"===e.type&&this.media.seeking||We.updateProgress.call(this,e)},durationUpdate(){if(!this.supported.ui||!this.config.invertTime&&this.currentTime)return;if(this.duration>=2**32)return ae(this.elements.display.currentTime,!0),void ae(this.elements.progress,!0);H(this.elements.inputs.seek)&&this.elements.inputs.seek.setAttribute("aria-valuemax",this.duration);const e=H(this.elements.display.duration);!e&&this.config.displayDuration&&this.paused&&We.updateTimeDisplay.call(this,this.elements.display.currentTime,this.duration),e&&We.updateTimeDisplay.call(this,this.elements.display.duration,this.duration),this.config.markers.enabled&&We.setMarkers.call(this),We.updateSeekTooltip.call(this)},toggleMenuButton(e,t){ae(this.elements.settings.buttons[e],!t)},updateSetting(e,t,i){const s=this.elements.settings.panels[e];let n=null,a=t;if("captions"===e)n=this.currentTrack;else{if(n=W(i)?this[e]:i,W(n)&&(n=this.config[e].default),!W(this.options[e])&&!this.options[e].includes(n))return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);if(!this.config[e].options.includes(n))return void this.debug.warn(`Disabled value of '${n}' for ${e}`)}if(H(a)||(a=s&&s.querySelector('[role="menu"]')),!H(a))return;this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML=We.getLabel.call(this,e,n);const l=a&&a.querySelector(`[value="${n}"]`);H(l)&&(l.checked=!0)},getLabel(e,t){switch(e){case"speed":return 1===t?He.get("normal",this.config):`${t}&times;`;case"quality":if($(t)){const e=He.get(`qualityLabel.${t}`,this.config);return e.length?e:`${t}p`}return Oe(t);case"captions":return Ye.getLabel.call(this);default:return null}},setQualityMenu(e){if(!H(this.elements.settings.panels.quality))return;const t="quality",i=this.elements.settings.panels.quality.querySelector('[role="menu"]');D(e)&&(this.options.quality=Ce(e).filter((e=>this.config.quality.options.includes(e))));const s=!W(this.options.quality)&&this.options.quality.length>1;if(We.toggleMenuButton.call(this,t,s),ie(i),We.checkMenu.call(this),!s)return;const n=e=>{const t=He.get(`qualityBadge.${e}`,this.config);return t.length?We.createBadge.call(this,t):null};this.options.quality.sort(((e,t)=>{const i=this.config.quality.options;return i.indexOf(e)>i.indexOf(t)?1:-1})).forEach((e=>{We.createMenuItem.call(this,{value:e,list:i,type:t,title:We.getLabel.call(this,"quality",e),badge:n(e)})})),We.updateSetting.call(this,t,i)},setCaptionsMenu(){if(!H(this.elements.settings.panels.captions))return;const e="captions",t=this.elements.settings.panels.captions.querySelector('[role="menu"]'),i=Ye.getTracks.call(this),s=Boolean(i.length);if(We.toggleMenuButton.call(this,e,s),ie(t),We.checkMenu.call(this),!s)return;const n=i.map(((e,i)=>({value:i,checked:this.captions.toggled&&this.currentTrack===i,title:Ye.getLabel.call(this,e),badge:e.language&&We.createBadge.call(this,e.language.toUpperCase()),list:t,type:"language"})));n.unshift({value:-1,checked:!this.captions.toggled,title:He.get("disabled",this.config),list:t,type:"language"}),n.forEach(We.createMenuItem.bind(this)),We.updateSetting.call(this,e,t)},setSpeedMenu(){if(!H(this.elements.settings.panels.speed))return;const e="speed",t=this.elements.settings.panels.speed.querySelector('[role="menu"]');this.options.speed=this.options.speed.filter((e=>e>=this.minimumSpeed&&e<=this.maximumSpeed));const i=!W(this.options.speed)&&this.options.speed.length>1;We.toggleMenuButton.call(this,e,i),ie(t),We.checkMenu.call(this),i&&(this.options.speed.forEach((i=>{We.createMenuItem.call(this,{value:i,list:t,type:e,title:We.getLabel.call(this,"speed",i)})})),We.updateSetting.call(this,e,t))},checkMenu(){const{buttons:e}=this.elements.settings,t=!W(e)&&Object.values(e).some((e=>!e.hidden));ae(this.elements.settings.menu,!t)},focusFirstMenuItem(e,t=!1){if(this.elements.settings.popup.hidden)return;let i=e;H(i)||(i=Object.values(this.elements.settings.panels).find((e=>!e.hidden)));const s=i.querySelector('[role^="menuitem"]');ue.call(this,s,t)},toggleMenu(e){const{popup:t}=this.elements.settings,i=this.elements.buttons.settings;if(!H(t)||!H(i))return;const{hidden:s}=t;let n=s;if(O(e))n=e;else if(F(e)&&"Escape"===e.key)n=!1;else if(R(e)){const s=j(e.composedPath)?e.composedPath()[0]:e.target,a=t.contains(s);if(a||!a&&e.target!==i&&n)return}i.setAttribute("aria-expanded",n),ae(t,!n),le(this.elements.container,this.config.classNames.menu.open,n),n&&F(e)?We.focusFirstMenuItem.call(this,null,!0):n||s||ue.call(this,i,F(e))},getMenuSize(e){const t=e.cloneNode(!0);t.style.position="absolute",t.style.opacity=0,t.removeAttribute("hidden"),e.parentNode.appendChild(t);const i=t.scrollWidth,s=t.scrollHeight;return te(t),{width:i,height:s}},showMenuPanel(e="",t=!1){const i=this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);if(!H(i))return;const s=i.parentNode,n=Array.from(s.children).find((e=>!e.hidden));if(me.transitions&&!me.reducedMotion){s.style.width=`${n.scrollWidth}px`,s.style.height=`${n.scrollHeight}px`;const e=We.getMenuSize.call(this,i),t=e=>{e.target===s&&["width","height"].includes(e.propertyName)&&(s.style.width="",s.style.height="",be.call(this,s,z,t))};fe.call(this,s,z,t),s.style.width=`${e.width}px`,s.style.height=`${e.height}px`}ae(n,!0),ae(i,!1),We.focusFirstMenuItem.call(this,i,t)},setDownloadUrl(){const e=this.elements.buttons.download;H(e)&&e.setAttribute("href",this.download)},create(e){const{bindMenuItemShortcuts:t,createButton:i,createProgress:s,createRange:n,createTime:a,setQualityMenu:l,setSpeedMenu:o,showMenuPanel:r}=We;this.elements.controls=null,D(this.config.controls)&&this.config.controls.includes("play-large")&&this.elements.container.appendChild(i.call(this,"play-large"));const c=Z("div",ne(this.config.selectors.controls.wrapper));this.elements.controls=c;const h={class:"plyr__controls__item"};return Ce(D(this.config.controls)?this.config.controls:[]).forEach((l=>{if("restart"===l&&c.appendChild(i.call(this,"restart",h)),"rewind"===l&&c.appendChild(i.call(this,"rewind",h)),"play"===l&&c.appendChild(i.call(this,"play",h)),"fast-forward"===l&&c.appendChild(i.call(this,"fast-forward",h)),"progress"===l){const t=Z("div",{class:`${h.class} plyr__progress__container`}),i=Z("div",ne(this.config.selectors.progress));if(i.appendChild(n.call(this,"seek",{id:`plyr-seek-${e.id}`})),i.appendChild(s.call(this,"buffer")),this.config.tooltips.seek){const e=Z("span",{class:this.config.classNames.tooltip},"00:00");i.appendChild(e),this.elements.display.seekTooltip=e}this.elements.progress=i,t.appendChild(this.elements.progress),c.appendChild(t)}if("current-time"===l&&c.appendChild(a.call(this,"currentTime",h)),"duration"===l&&c.appendChild(a.call(this,"duration",h)),"mute"===l||"volume"===l){let{volume:t}=this.elements;if(H(t)&&c.contains(t)||(t=Z("div",X({},h,{class:`${h.class} plyr__volume`.trim()})),this.elements.volume=t,c.appendChild(t)),"mute"===l&&t.appendChild(i.call(this,"mute")),"volume"===l&&!Y.isIos){const i={max:1,step:.05,value:this.config.volume};t.appendChild(n.call(this,"volume",X(i,{id:`plyr-volume-${e.id}`})))}}if("captions"===l&&c.appendChild(i.call(this,"captions",h)),"settings"===l&&!W(this.config.settings)){const s=Z("div",X({},h,{class:`${h.class} plyr__menu`.trim(),hidden:""}));s.appendChild(i.call(this,"settings",{"aria-haspopup":!0,"aria-controls":`plyr-settings-${e.id}`,"aria-expanded":!1}));const n=Z("div",{class:"plyr__menu__container",id:`plyr-settings-${e.id}`,hidden:""}),a=Z("div"),l=Z("div",{id:`plyr-settings-${e.id}-home`}),o=Z("div",{role:"menu"});l.appendChild(o),a.appendChild(l),this.elements.settings.panels.home=l,this.config.settings.forEach((i=>{const s=Z("button",X(ne(this.config.selectors.buttons.settings),{type:"button",class:`${this.config.classNames.control} ${this.config.classNames.control}--forward`,role:"menuitem","aria-haspopup":!0,hidden:""}));t.call(this,s,i),fe.call(this,s,"click",(()=>{r.call(this,i,!1)}));const n=Z("span",null,He.get(i,this.config)),l=Z("span",{class:this.config.classNames.menu.value});l.innerHTML=e[i],n.appendChild(l),s.appendChild(n),o.appendChild(s);const c=Z("div",{id:`plyr-settings-${e.id}-${i}`,hidden:""}),h=Z("button",{type:"button",class:`${this.config.classNames.control} ${this.config.classNames.control}--back`});h.appendChild(Z("span",{"aria-hidden":!0},He.get(i,this.config))),h.appendChild(Z("span",{class:this.config.classNames.hidden},He.get("menuBack",this.config))),fe.call(this,c,"keydown",(e=>{"ArrowLeft"===e.key&&(e.preventDefault(),e.stopPropagation(),r.call(this,"home",!0))}),!1),fe.call(this,h,"click",(()=>{r.call(this,"home",!1)})),c.appendChild(h),c.appendChild(Z("div",{role:"menu"})),a.appendChild(c),this.elements.settings.buttons[i]=s,this.elements.settings.panels[i]=c})),n.appendChild(a),s.appendChild(n),c.appendChild(s),this.elements.settings.popup=n,this.elements.settings.menu=s}if("pip"===l&&me.pip&&c.appendChild(i.call(this,"pip",h)),"airplay"===l&&me.airplay&&c.appendChild(i.call(this,"airplay",h)),"download"===l){const e=X({},h,{element:"a",href:this.download,target:"_blank"});this.isHTML5&&(e.download="");const{download:t}=this.config.urls;!U(t)&&this.isEmbed&&X(e,{icon:`logo-${this.provider}`,label:this.provider}),c.appendChild(i.call(this,"download",e))}"fullscreen"===l&&c.appendChild(i.call(this,"fullscreen",h))})),this.isHTML5&&l.call(this,Le.getQualityOptions.call(this)),o.call(this),c},inject(){if(this.config.loadSprite){const e=We.getIconUrl.call(this);e.cors&&Ve(e.url,"sprite-plyr")}this.id=Math.floor(1e4*Math.random());let e=null;this.elements.controls=null;const t={id:this.id,seektime:this.config.seekTime,title:this.config.title};let i=!0;j(this.config.controls)&&(this.config.controls=this.config.controls.call(this,t)),this.config.controls||(this.config.controls=[]),H(this.config.controls)||_(this.config.controls)?e=this.config.controls:(e=We.create.call(this,{id:this.id,seektime:this.config.seekTime,speed:this.speed,quality:this.quality,captions:Ye.getLabel.call(this)}),i=!1);let s;i&&_(this.config.controls)&&(e=(e=>{let i=e;return Object.entries(t).forEach((([e,t])=>{i=_e(i,`{${e}}`,t)})),i})(e)),_(this.config.selectors.controls.container)&&(s=document.querySelector(this.config.selectors.controls.container)),H(s)||(s=this.elements.container);if(s[H(e)?"insertAdjacentElement":"insertAdjacentHTML"]("afterbegin",e),H(this.elements.controls)||We.findElements.call(this),!W(this.elements.buttons)){const e=e=>{const t=this.config.classNames.controlPressed;Object.defineProperty(e,"pressed",{enumerable:!0,get:()=>oe(e,t),set(i=!1){le(e,t,i)}})};Object.values(this.elements.buttons).filter(Boolean).forEach((t=>{D(t)||q(t)?Array.from(t).filter(Boolean).forEach(e):e(t)}))}if(Y.isEdge&&K(s),this.config.tooltips.controls){const{classNames:e,selectors:t}=this.config,i=`${t.controls.wrapper} ${t.labels} .${e.hidden}`,s=ce.call(this,i);Array.from(s).forEach((e=>{le(e,this.config.classNames.hidden,!1),le(e,this.config.classNames.tooltip,!0)}))}},setMediaMetadata(){try{"mediaSession"in navigator&&(navigator.mediaSession.metadata=new window.MediaMetadata({title:this.config.mediaMetadata.title,artist:this.config.mediaMetadata.artist,album:this.config.mediaMetadata.album,artwork:this.config.mediaMetadata.artwork}))}catch(e){}},setMarkers(){var e,t;if(!this.duration||this.elements.markers)return;const i=null===(e=this.config.markers)||void 0===e||null===(t=e.points)||void 0===t?void 0:t.filter((({time:e})=>e>0&&e<this.duration));if(null==i||!i.length)return;const s=document.createDocumentFragment(),n=document.createDocumentFragment();let a=null;const l=`${this.config.classNames.tooltip}--visible`,o=e=>le(a,l,e);i.forEach((e=>{const t=Z("span",{class:this.config.classNames.marker},""),i=e.time/this.duration*100+"%";a&&(t.addEventListener("mouseenter",(()=>{e.label||(a.style.left=i,a.innerHTML=e.label,o(!0))})),t.addEventListener("mouseleave",(()=>{o(!1)}))),t.addEventListener("click",(()=>{this.currentTime=e.time})),t.style.left=i,n.appendChild(t)})),s.appendChild(n),this.config.tooltips.seek||(a=Z("span",{class:this.config.classNames.tooltip},""),s.appendChild(a)),this.elements.markers={points:n,tip:a},this.elements.progress.appendChild(s)}};function ze(e,t=!0){let i=e;if(t){const e=document.createElement("a");e.href=i,i=e.href}try{return new URL(i)}catch(e){return null}}function Ke(e){const t=new URLSearchParams;return L(e)&&Object.entries(e).forEach((([e,i])=>{t.set(e,i)})),t}const Ye={setup(){if(!this.supported.ui)return;if(!this.isVideo||this.isYouTube||this.isHTML5&&!me.textTracks)return void(D(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&We.setCaptionsMenu.call(this));var e,t;if(H(this.elements.captions)||(this.elements.captions=Z("div",ne(this.config.selectors.captions)),e=this.elements.captions,t=this.elements.wrapper,H(e)&&H(t)&&t.parentNode.insertBefore(e,t.nextSibling)),Y.isIE&&window.URL){const e=this.media.querySelectorAll("track");Array.from(e).forEach((e=>{const t=e.getAttribute("src"),i=ze(t);null!==i&&i.hostname!==window.location.href.hostname&&["http:","https:"].includes(i.protocol)&&Fe(t,"blob").then((t=>{e.setAttribute("src",window.URL.createObjectURL(t))})).catch((()=>{te(e)}))}))}const i=Ce((navigator.languages||[navigator.language||navigator.userLanguage||"en"]).map((e=>e.split("-")[0])));let s=(this.storage.get("language")||this.config.captions.language||"auto").toLowerCase();"auto"===s&&([s]=i);let n=this.storage.get("captions");if(O(n)||({active:n}=this.config.captions),Object.assign(this.captions,{toggled:!1,active:n,language:s,languages:i}),this.isHTML5){const e=this.config.captions.update?"addtrack removetrack":"removetrack";fe.call(this,this.media.textTracks,e,Ye.update.bind(this))}setTimeout(Ye.update.bind(this),0)},update(){const e=Ye.getTracks.call(this,!0),{active:t,language:i,meta:s,currentTrackNode:n}=this.captions,a=Boolean(e.find((e=>e.language===i)));this.isHTML5&&this.isVideo&&e.filter((e=>!s.get(e))).forEach((e=>{this.debug.log("Track added",e),s.set(e,{default:"showing"===e.mode}),"showing"===e.mode&&(e.mode="hidden"),fe.call(this,e,"cuechange",(()=>Ye.updateCues.call(this)))})),(a&&this.language!==i||!e.includes(n))&&(Ye.setLanguage.call(this,i),Ye.toggle.call(this,t&&a)),this.elements&&le(this.elements.container,this.config.classNames.captions.enabled,!W(e)),D(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&We.setCaptionsMenu.call(this)},toggle(e,t=!0){if(!this.supported.ui)return;const{toggled:i}=this.captions,s=this.config.classNames.captions.active,n=I(e)?!i:e;if(n!==i){if(t||(this.captions.active=n,this.storage.set({captions:n})),!this.language&&n&&!t){const e=Ye.getTracks.call(this),t=Ye.findTrack.call(this,[this.captions.language,...this.captions.languages],!0);return this.captions.language=t.language,void Ye.set.call(this,e.indexOf(t))}this.elements.buttons.captions&&(this.elements.buttons.captions.pressed=n),le(this.elements.container,s,n),this.captions.toggled=n,We.updateSetting.call(this,"captions"),ve.call(this,this.media,n?"captionsenabled":"captionsdisabled")}setTimeout((()=>{n&&this.captions.toggled&&(this.captions.currentTrackNode.mode="hidden")}))},set(e,t=!0){const i=Ye.getTracks.call(this);if(-1!==e)if($(e))if(e in i){if(this.captions.currentTrack!==e){this.captions.currentTrack=e;const s=i[e],{language:n}=s||{};this.captions.currentTrackNode=s,We.updateSetting.call(this,"captions"),t||(this.captions.language=n,this.storage.set({language:n})),this.isVimeo&&this.embed.enableTextTrack(n),ve.call(this,this.media,"languagechange")}Ye.toggle.call(this,!0,t),this.isHTML5&&this.isVideo&&Ye.updateCues.call(this)}else this.debug.warn("Track not found",e);else this.debug.warn("Invalid caption argument",e);else Ye.toggle.call(this,!1,t)},setLanguage(e,t=!0){if(!_(e))return void this.debug.warn("Invalid language argument",e);const i=e.toLowerCase();this.captions.language=i;const s=Ye.getTracks.call(this),n=Ye.findTrack.call(this,[i]);Ye.set.call(this,s.indexOf(n),t)},getTracks(e=!1){return Array.from((this.media||{}).textTracks||[]).filter((t=>!this.isHTML5||e||this.captions.meta.has(t))).filter((e=>["captions","subtitles"].includes(e.kind)))},findTrack(e,t=!1){const i=Ye.getTracks.call(this),s=e=>Number((this.captions.meta.get(e)||{}).default),n=Array.from(i).sort(((e,t)=>s(t)-s(e)));let a;return e.every((e=>(a=n.find((t=>t.language===e)),!a))),a||(t?n[0]:void 0)},getCurrentTrack(){return Ye.getTracks.call(this)[this.currentTrack]},getLabel(e){let t=e;return!V(t)&&me.textTracks&&this.captions.toggled&&(t=Ye.getCurrentTrack.call(this)),V(t)?W(t.label)?W(t.language)?He.get("enabled",this.config):e.language.toUpperCase():t.label:He.get("disabled",this.config)},updateCues(e){if(!this.supported.ui)return;if(!H(this.elements.captions))return void this.debug.warn("No captions element to render to");if(!I(e)&&!Array.isArray(e))return void this.debug.warn("updateCues: Invalid input",e);let t=e;if(!t){const e=Ye.getCurrentTrack.call(this);t=Array.from((e||{}).activeCues||[]).map((e=>e.getCueAsHTML())).map(De)}const i=t.map((e=>e.trim())).join("\n");if(i!==this.elements.captions.innerHTML){ie(this.elements.captions);const e=Z("span",ne(this.config.selectors.caption));e.innerHTML=i,this.elements.captions.appendChild(e),ve.call(this,this.media,"cuechange")}}},Qe={enabled:!0,title:"",debug:!1,autoplay:!1,autopause:!0,playsinline:!0,seekTime:10,volume:1,muted:!1,duration:null,displayDuration:!0,invertTime:!0,toggleInvert:!0,ratio:null,clickToPlay:!0,hideControls:!0,resetOnEnd:!1,disableContextMenu:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/3.7.2/plyr.svg",blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:576,options:[4320,2880,2160,1440,1080,720,576,480,360,240],forced:!1,onChange:null},loop:{active:!1},speed:{selected:1,options:[.5,.75,1,1.25,1.5,1.75,2,4]},keyboard:{focused:!0,global:!1},tooltips:{controls:!1,seek:!0},captions:{active:!1,language:"auto",update:!1},fullscreen:{enabled:!0,fallback:!0,iosNative:!1},storage:{enabled:!0,key:"plyr"},controls:["play-large","play","progress","current-time","mute","volume","captions","settings","pip","airplay","fullscreen"],settings:["captions","quality","speed"],i18n:{restart:"Restart",rewind:"Rewind {seektime}s",play:"Play",pause:"Pause",fastForward:"Forward {seektime}s",seek:"Seek",seekLabel:"{currentTime} of {duration}",played:"Played",buffered:"Buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",mute:"Mute",unmute:"Unmute",enableCaptions:"Enable captions",disableCaptions:"Disable captions",download:"Download",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",frameTitle:"Player for {title}",captions:"Captions",settings:"Settings",pip:"PIP",menuBack:"Go back to previous menu",speed:"Speed",normal:"Normal",quality:"Quality",loop:"Loop",start:"Start",end:"End",all:"All",reset:"Reset",disabled:"Disabled",enabled:"Enabled",advertisement:"Ad",qualityBadge:{2160:"4K",1440:"HD",1080:"HD",720:"HD",576:"SD",480:"SD"}},urls:{download:null,vimeo:{sdk:"https://player.vimeo.com/api/player.js",iframe:"https://player.vimeo.com/video/{0}?{1}",api:"https://vimeo.com/api/oembed.json?url={0}"},youtube:{sdk:"https://www.youtube.com/iframe_api",api:"https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"},googleIMA:{sdk:"https://imasdk.googleapis.com/js/sdkloader/ima3.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,fastForward:null,mute:null,volume:null,captions:null,download:null,fullscreen:null,pip:null,airplay:null,speed:null,quality:null,loop:null,language:null},events:["ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied","ratechange","cuechange","download","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled","languagechange","controlshidden","controlsshown","ready","statechange","qualitychange","adsloaded","adscontentpause","adscontentresume","adstarted","adsmidpoint","adscomplete","adsallcomplete","adsimpression","adsclick"],selectors:{editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',fastForward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',download:'[data-plyr="download"]',fullscreen:'[data-plyr="fullscreen"]',pip:'[data-plyr="pip"]',airplay:'[data-plyr="airplay"]',settings:'[data-plyr="settings"]',loop:'[data-plyr="loop"]'},inputs:{seek:'[data-plyr="seek"]',volume:'[data-plyr="volume"]',speed:'[data-plyr="speed"]',language:'[data-plyr="language"]',quality:'[data-plyr="quality"]'},display:{currentTime:".plyr__time--current",duration:".plyr__time--duration",buffer:".plyr__progress__buffer",loop:".plyr__progress__loop",volume:".plyr__volume--display"},progress:".plyr__progress",captions:".plyr__captions",caption:".plyr__caption"},classNames:{type:"plyr--{0}",provider:"plyr--{0}",video:"plyr__video-wrapper",embed:"plyr__video-embed",videoFixedRatio:"plyr__video-wrapper--fixed-ratio",embedContainer:"plyr__video-embed__container",poster:"plyr__poster",posterEnabled:"plyr__poster-enabled",ads:"plyr__ads",control:"plyr__control",controlPressed:"plyr__control--pressed",playing:"plyr--playing",paused:"plyr--paused",stopped:"plyr--stopped",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",cues:"plyr__cues",marker:"plyr__progress__marker",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",uiSupported:"plyr--full-ui",noTransition:"plyr--no-transition",display:{time:"plyr__time"},menu:{value:"plyr__menu__value",badge:"plyr__badge",open:"plyr--menu-open"},captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",fallback:"plyr--fullscreen-fallback"},pip:{supported:"plyr--pip-supported",active:"plyr--pip-active"},airplay:{supported:"plyr--airplay-supported",active:"plyr--airplay-active"},tabFocus:"plyr__tab-focus",previewThumbnails:{thumbContainer:"plyr__preview-thumb",thumbContainerShown:"plyr__preview-thumb--is-shown",imageContainer:"plyr__preview-thumb__image-container",timeContainer:"plyr__preview-thumb__time-container",scrubbingContainer:"plyr__preview-scrubbing",scrubbingContainerShown:"plyr__preview-scrubbing--is-shown"}},attributes:{embed:{provider:"data-plyr-provider",id:"data-plyr-embed-id",hash:"data-plyr-embed-hash"}},ads:{enabled:!1,publisherId:"",tagUrl:""},previewThumbnails:{enabled:!1,src:""},vimeo:{byline:!1,portrait:!1,title:!1,speed:!0,transparent:!1,customControls:!0,referrerPolicy:null,premium:!1},youtube:{rel:0,showinfo:0,iv_load_policy:3,modestbranding:1,customControls:!0,noCookie:!1},mediaMetadata:{title:"",artist:"",album:"",artwork:[]},markers:{enabled:!1,points:[]}},Xe="picture-in-picture",Je="inline",Ge={html5:"html5",youtube:"youtube",vimeo:"vimeo"},Ze="audio",et="video";const tt=()=>{};class it{constructor(e=!1){this.enabled=window.console&&e,this.enabled&&this.log("Debugging enabled")}get log(){return this.enabled?Function.prototype.bind.call(console.log,console):tt}get warn(){return this.enabled?Function.prototype.bind.call(console.warn,console):tt}get error(){return this.enabled?Function.prototype.bind.call(console.error,console):tt}}class st{constructor(t){e(this,"onChange",(()=>{if(!this.enabled)return;const e=this.player.elements.buttons.fullscreen;H(e)&&(e.pressed=this.active);const t=this.target===this.player.media?this.target:this.player.elements.container;ve.call(this.player,t,this.active?"enterfullscreen":"exitfullscreen",!0)})),e(this,"toggleFallback",((e=!1)=>{if(e?this.scrollPosition={x:window.scrollX||0,y:window.scrollY||0}:window.scrollTo(this.scrollPosition.x,this.scrollPosition.y),document.body.style.overflow=e?"hidden":"",le(this.target,this.player.config.classNames.fullscreen.fallback,e),Y.isIos){let t=document.head.querySelector('meta[name="viewport"]');const i="viewport-fit=cover";t||(t=document.createElement("meta"),t.setAttribute("name","viewport"));const s=_(t.content)&&t.content.includes(i);e?(this.cleanupViewport=!s,s||(t.content+=`,${i}`)):this.cleanupViewport&&(t.content=t.content.split(",").filter((e=>e.trim()!==i)).join(","))}this.onChange()})),e(this,"trapFocus",(e=>{if(Y.isIos||!this.active||"Tab"!==e.key)return;const t=document.activeElement,i=ce.call(this.player,"a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),[s]=i,n=i[i.length-1];t!==n||e.shiftKey?t===s&&e.shiftKey&&(n.focus(),e.preventDefault()):(s.focus(),e.preventDefault())})),e(this,"update",(()=>{if(this.enabled){let e;e=this.forceFallback?"Fallback (forced)":st.native?"Native":"Fallback",this.player.debug.log(`${e} fullscreen enabled`)}else this.player.debug.log("Fullscreen not supported and fallback disabled");le(this.player.elements.container,this.player.config.classNames.fullscreen.enabled,this.enabled)})),e(this,"enter",(()=>{this.enabled&&(Y.isIos&&this.player.config.fullscreen.iosNative?this.player.isVimeo?this.player.embed.requestFullscreen():this.target.webkitEnterFullscreen():!st.native||this.forceFallback?this.toggleFallback(!0):this.prefix?W(this.prefix)||this.target[`${this.prefix}Request${this.property}`]():this.target.requestFullscreen({navigationUI:"hide"}))})),e(this,"exit",(()=>{if(this.enabled)if(Y.isIos&&this.player.config.fullscreen.iosNative)this.target.webkitExitFullscreen(),ke(this.player.play());else if(!st.native||this.forceFallback)this.toggleFallback(!1);else if(this.prefix){if(!W(this.prefix)){const e="moz"===this.prefix?"Cancel":"Exit";document[`${this.prefix}${e}${this.property}`]()}}else(document.cancelFullScreen||document.exitFullscreen).call(document)})),e(this,"toggle",(()=>{this.active?this.exit():this.enter()})),this.player=t,this.prefix=st.prefix,this.property=st.property,this.scrollPosition={x:0,y:0},this.forceFallback="force"===t.config.fullscreen.fallback,this.player.elements.fullscreen=t.config.fullscreen.container&&function(e,t){const{prototype:i}=Element;return(i.closest||function(){let e=this;do{if(re.matches(e,t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}).call(e,t)}(this.player.elements.container,t.config.fullscreen.container),fe.call(this.player,document,"ms"===this.prefix?"MSFullscreenChange":`${this.prefix}fullscreenchange`,(()=>{this.onChange()})),fe.call(this.player,this.player.elements.container,"dblclick",(e=>{H(this.player.elements.controls)&&this.player.elements.controls.contains(e.target)||this.player.listeners.proxy(e,this.toggle,"fullscreen")})),fe.call(this,this.player.elements.container,"keydown",(e=>this.trapFocus(e))),this.update()}static get native(){return!!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)}get usingNative(){return st.native&&!this.forceFallback}static get prefix(){if(j(document.exitFullscreen))return"";let e="";return["webkit","moz","ms"].some((t=>!(!j(document[`${t}ExitFullscreen`])&&!j(document[`${t}CancelFullScreen`]))&&(e=t,!0))),e}static get property(){return"moz"===this.prefix?"FullScreen":"Fullscreen"}get enabled(){return(st.native||this.player.config.fullscreen.fallback)&&this.player.config.fullscreen.enabled&&this.player.supported.ui&&this.player.isVideo}get active(){if(!this.enabled)return!1;if(!st.native||this.forceFallback)return oe(this.target,this.player.config.classNames.fullscreen.fallback);const e=this.prefix?this.target.getRootNode()[`${this.prefix}${this.property}Element`]:this.target.getRootNode().fullscreenElement;return e&&e.shadowRoot?e===this.target.getRootNode().host:e===this.target}get target(){return Y.isIos&&this.player.config.fullscreen.iosNative?this.player.media:this.player.elements.fullscreen||this.player.elements.container}}function nt(e,t=1){return new Promise(((i,s)=>{const n=new Image,a=()=>{delete n.onload,delete n.onerror,(n.naturalWidth>=t?i:s)(n)};Object.assign(n,{onload:a,onerror:a,src:e})}))}const at={addStyleHook(){le(this.elements.container,this.config.selectors.container.replace(".",""),!0),le(this.elements.container,this.config.classNames.uiSupported,this.supported.ui)},toggleNativeControls(e=!1){e&&this.isHTML5?this.media.setAttribute("controls",""):this.media.removeAttribute("controls")},build(){if(this.listeners.media(),!this.supported.ui)return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`),void at.toggleNativeControls.call(this,!0);H(this.elements.controls)||(We.inject.call(this),this.listeners.controls()),at.toggleNativeControls.call(this),this.isHTML5&&Ye.setup.call(this),this.volume=null,this.muted=null,this.loop=null,this.quality=null,this.speed=null,We.updateVolume.call(this),We.timeUpdate.call(this),We.durationUpdate.call(this),at.checkPlaying.call(this),le(this.elements.container,this.config.classNames.pip.supported,me.pip&&this.isHTML5&&this.isVideo),le(this.elements.container,this.config.classNames.airplay.supported,me.airplay&&this.isHTML5),le(this.elements.container,this.config.classNames.isIos,Y.isIos),le(this.elements.container,this.config.classNames.isTouch,this.touch),this.ready=!0,setTimeout((()=>{ve.call(this,this.media,"ready")}),0),at.setTitle.call(this),this.poster&&at.setPoster.call(this,this.poster,!1).catch((()=>{})),this.config.duration&&We.durationUpdate.call(this),this.config.mediaMetadata&&We.setMediaMetadata.call(this)},setTitle(){let e=He.get("play",this.config);if(_(this.config.title)&&!W(this.config.title)&&(e+=`, ${this.config.title}`),Array.from(this.elements.buttons.play||[]).forEach((t=>{t.setAttribute("aria-label",e)})),this.isEmbed){const e=he.call(this,"iframe");if(!H(e))return;const t=W(this.config.title)?"video":this.config.title,i=He.get("frameTitle",this.config);e.setAttribute("title",i.replace("{title}",t))}},togglePoster(e){le(this.elements.container,this.config.classNames.posterEnabled,e)},setPoster(e,t=!0){return t&&this.poster?Promise.reject(new Error("Poster already set")):(this.media.setAttribute("data-poster",e),this.elements.poster.removeAttribute("hidden"),Te.call(this).then((()=>nt(e))).catch((t=>{throw e===this.poster&&at.togglePoster.call(this,!1),t})).then((()=>{if(e!==this.poster)throw new Error("setPoster cancelled by later call to setPoster")})).then((()=>(Object.assign(this.elements.poster.style,{backgroundImage:`url('${e}')`,backgroundSize:""}),at.togglePoster.call(this,!0),e))))},checkPlaying(e){le(this.elements.container,this.config.classNames.playing,this.playing),le(this.elements.container,this.config.classNames.paused,this.paused),le(this.elements.container,this.config.classNames.stopped,this.stopped),Array.from(this.elements.buttons.play||[]).forEach((e=>{Object.assign(e,{pressed:this.playing}),e.setAttribute("aria-label",He.get(this.playing?"pause":"play",this.config))})),R(e)&&"timeupdate"===e.type||at.toggleControls.call(this)},checkLoading(e){this.loading=["stalled","waiting"].includes(e.type),clearTimeout(this.timers.loading),this.timers.loading=setTimeout((()=>{le(this.elements.container,this.config.classNames.loading,this.loading),at.toggleControls.call(this)}),this.loading?250:0)},toggleControls(e){const{controls:t}=this.elements;if(t&&this.config.hideControls){const i=this.touch&&this.lastSeekTime+2e3>Date.now();this.toggleControls(Boolean(e||this.loading||this.paused||t.pressed||t.hover||i))}},migrateStyles(){Object.values({...this.media.style}).filter((e=>!W(e)&&_(e)&&e.startsWith("--plyr"))).forEach((e=>{this.elements.container.style.setProperty(e,this.media.style.getPropertyValue(e)),this.media.style.removeProperty(e)})),W(this.media.style)&&this.media.removeAttribute("style")}};class lt{constructor(t){e(this,"firstTouch",(()=>{const{player:e}=this,{elements:t}=e;e.touch=!0,le(t.container,e.config.classNames.isTouch,!0)})),e(this,"setTabFocus",(e=>{const{player:t}=this,{elements:i}=t,{key:s,type:n,timeStamp:a}=e;if(clearTimeout(this.focusTimer),"keydown"===n&&"Tab"!==s)return;"keydown"===n&&(this.lastKeyDown=a);const l=a-this.lastKeyDown<=20;("focus"!==n||l)&&((()=>{const e=t.config.classNames.tabFocus;le(ce.call(t,`.${e}`),e,!1)})(),"focusout"!==n&&(this.focusTimer=setTimeout((()=>{const e=document.activeElement;i.container.contains(e)&&le(document.activeElement,t.config.classNames.tabFocus,!0)}),10)))})),e(this,"global",((e=!0)=>{const{player:t}=this;t.config.keyboard.global&&ge.call(t,window,"keydown keyup",this.handleKey,e,!1),ge.call(t,document.body,"click",this.toggleMenu,e),ye.call(t,document.body,"touchstart",this.firstTouch),ge.call(t,document.body,"keydown focus blur focusout",this.setTabFocus,e,!1,!0)})),e(this,"container",(()=>{const{player:e}=this,{config:t,elements:i,timers:s}=e;!t.keyboard.global&&t.keyboard.focused&&fe.call(e,i.container,"keydown keyup",this.handleKey,!1),fe.call(e,i.container,"mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",(t=>{const{controls:n}=i;n&&"enterfullscreen"===t.type&&(n.pressed=!1,n.hover=!1);let a=0;["touchstart","touchmove","mousemove"].includes(t.type)&&(at.toggleControls.call(e,!0),a=e.touch?3e3:2e3),clearTimeout(s.controls),s.controls=setTimeout((()=>at.toggleControls.call(e,!1)),a)}));const n=()=>{if(!e.isVimeo||e.config.vimeo.premium)return;const t=i.wrapper,{active:s}=e.fullscreen,[n,a]=Ne.call(e),l=Se(`aspect-ratio: ${n} / ${a}`);if(!s)return void(l?(t.style.width=null,t.style.height=null):(t.style.maxWidth=null,t.style.margin=null));const[o,r]=[Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)],c=o/r>n/a;l?(t.style.width=c?"auto":"100%",t.style.height=c?"100%":"auto"):(t.style.maxWidth=c?r/a*n+"px":null,t.style.margin=c?"0 auto":null)},a=()=>{clearTimeout(s.resized),s.resized=setTimeout(n,50)};fe.call(e,i.container,"enterfullscreen exitfullscreen",(t=>{const{target:s}=e.fullscreen;if(s!==i.container)return;if(!e.isEmbed&&W(e.config.ratio))return;n();("enterfullscreen"===t.type?fe:be).call(e,window,"resize",a)}))})),e(this,"media",(()=>{const{player:e}=this,{elements:t}=e;if(fe.call(e,e.media,"timeupdate seeking seeked",(t=>We.timeUpdate.call(e,t))),fe.call(e,e.media,"durationchange loadeddata loadedmetadata",(t=>We.durationUpdate.call(e,t))),fe.call(e,e.media,"ended",(()=>{e.isHTML5&&e.isVideo&&e.config.resetOnEnd&&(e.restart(),e.pause())})),fe.call(e,e.media,"progress playing seeking seeked",(t=>We.updateProgress.call(e,t))),fe.call(e,e.media,"volumechange",(t=>We.updateVolume.call(e,t))),fe.call(e,e.media,"playing play pause ended emptied timeupdate",(t=>at.checkPlaying.call(e,t))),fe.call(e,e.media,"waiting canplay seeked playing",(t=>at.checkLoading.call(e,t))),e.supported.ui&&e.config.clickToPlay&&!e.isAudio){const i=he.call(e,`.${e.config.classNames.video}`);if(!H(i))return;fe.call(e,t.container,"click",(s=>{([t.container,i].includes(s.target)||i.contains(s.target))&&(e.touch&&e.config.hideControls||(e.ended?(this.proxy(s,e.restart,"restart"),this.proxy(s,(()=>{ke(e.play())}),"play")):this.proxy(s,(()=>{ke(e.togglePlay())}),"play")))}))}e.supported.ui&&e.config.disableContextMenu&&fe.call(e,t.wrapper,"contextmenu",(e=>{e.preventDefault()}),!1),fe.call(e,e.media,"volumechange",(()=>{e.storage.set({volume:e.volume,muted:e.muted})})),fe.call(e,e.media,"ratechange",(()=>{We.updateSetting.call(e,"speed"),e.storage.set({speed:e.speed})})),fe.call(e,e.media,"qualitychange",(t=>{We.updateSetting.call(e,"quality",null,t.detail.quality)})),fe.call(e,e.media,"ready qualitychange",(()=>{We.setDownloadUrl.call(e)}));const i=e.config.events.concat(["keyup","keydown"]).join(" ");fe.call(e,e.media,i,(i=>{let{detail:s={}}=i;"error"===i.type&&(s=e.media.error),ve.call(e,t.container,i.type,!0,s)}))})),e(this,"proxy",((e,t,i)=>{const{player:s}=this,n=s.config.listeners[i];let a=!0;j(n)&&(a=n.call(s,e)),!1!==a&&j(t)&&t.call(s,e)})),e(this,"bind",((e,t,i,s,n=!0)=>{const{player:a}=this,l=a.config.listeners[s],o=j(l);fe.call(a,e,t,(e=>this.proxy(e,i,s)),n&&!o)})),e(this,"controls",(()=>{const{player:e}=this,{elements:t}=e,i=Y.isIE?"change":"input";if(t.buttons.play&&Array.from(t.buttons.play).forEach((t=>{this.bind(t,"click",(()=>{ke(e.togglePlay())}),"play")})),this.bind(t.buttons.restart,"click",e.restart,"restart"),this.bind(t.buttons.rewind,"click",(()=>{e.lastSeekTime=Date.now(),e.rewind()}),"rewind"),this.bind(t.buttons.fastForward,"click",(()=>{e.lastSeekTime=Date.now(),e.forward()}),"fastForward"),this.bind(t.buttons.mute,"click",(()=>{e.muted=!e.muted}),"mute"),this.bind(t.buttons.captions,"click",(()=>e.toggleCaptions())),this.bind(t.buttons.download,"click",(()=>{ve.call(e,e.media,"download")}),"download"),this.bind(t.buttons.fullscreen,"click",(()=>{e.fullscreen.toggle()}),"fullscreen"),this.bind(t.buttons.pip,"click",(()=>{e.pip="toggle"}),"pip"),this.bind(t.buttons.airplay,"click",e.airplay,"airplay"),this.bind(t.buttons.settings,"click",(t=>{t.stopPropagation(),t.preventDefault(),We.toggleMenu.call(e,t)}),null,!1),this.bind(t.buttons.settings,"keyup",(t=>{["Space","Enter"].includes(t.key)&&("Enter"!==t.key?(t.preventDefault(),t.stopPropagation(),We.toggleMenu.call(e,t)):We.focusFirstMenuItem.call(e,null,!0))}),null,!1),this.bind(t.settings.menu,"keydown",(t=>{"Escape"===t.key&&We.toggleMenu.call(e,t)})),this.bind(t.inputs.seek,"mousedown mousemove",(e=>{const i=t.progress.getBoundingClientRect(),s=100/i.width*(e.pageX-i.left);e.currentTarget.setAttribute("seek-value",s)})),this.bind(t.inputs.seek,"mousedown mouseup keydown keyup touchstart touchend",(t=>{const i=t.currentTarget,s="play-on-seeked";if(F(t)&&!["ArrowLeft","ArrowRight"].includes(t.key))return;e.lastSeekTime=Date.now();const n=i.hasAttribute(s),a=["mouseup","touchend","keyup"].includes(t.type);n&&a?(i.removeAttribute(s),ke(e.play())):!a&&e.playing&&(i.setAttribute(s,""),e.pause())})),Y.isIos){const t=ce.call(e,'input[type="range"]');Array.from(t).forEach((e=>this.bind(e,i,(e=>K(e.target)))))}this.bind(t.inputs.seek,i,(t=>{const i=t.currentTarget;let s=i.getAttribute("seek-value");W(s)&&(s=i.value),i.removeAttribute("seek-value"),e.currentTime=s/i.max*e.duration}),"seek"),this.bind(t.progress,"mouseenter mouseleave mousemove",(t=>We.updateSeekTooltip.call(e,t))),this.bind(t.progress,"mousemove touchmove",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.startMove(t)})),this.bind(t.progress,"mouseleave touchend click",(()=>{const{previewThumbnails:t}=e;t&&t.loaded&&t.endMove(!1,!0)})),this.bind(t.progress,"mousedown touchstart",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.startScrubbing(t)})),this.bind(t.progress,"mouseup touchend",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.endScrubbing(t)})),Y.isWebkit&&Array.from(ce.call(e,'input[type="range"]')).forEach((t=>{this.bind(t,"input",(t=>We.updateRangeFill.call(e,t.target)))})),e.config.toggleInvert&&!H(t.display.duration)&&this.bind(t.display.currentTime,"click",(()=>{0!==e.currentTime&&(e.config.invertTime=!e.config.invertTime,We.timeUpdate.call(e))})),this.bind(t.inputs.volume,i,(t=>{e.volume=t.target.value}),"volume"),this.bind(t.controls,"mouseenter mouseleave",(i=>{t.controls.hover=!e.touch&&"mouseenter"===i.type})),t.fullscreen&&Array.from(t.fullscreen.children).filter((e=>!e.contains(t.container))).forEach((i=>{this.bind(i,"mouseenter mouseleave",(i=>{t.controls&&(t.controls.hover=!e.touch&&"mouseenter"===i.type)}))})),this.bind(t.controls,"mousedown mouseup touchstart touchend touchcancel",(e=>{t.controls.pressed=["mousedown","touchstart"].includes(e.type)})),this.bind(t.controls,"focusin",(()=>{const{config:i,timers:s}=e;le(t.controls,i.classNames.noTransition,!0),at.toggleControls.call(e,!0),setTimeout((()=>{le(t.controls,i.classNames.noTransition,!1)}),0);const n=this.touch?3e3:4e3;clearTimeout(s.controls),s.controls=setTimeout((()=>at.toggleControls.call(e,!1)),n)})),this.bind(t.inputs.volume,"wheel",(t=>{const i=t.webkitDirectionInvertedFromDevice,[s,n]=[t.deltaX,-t.deltaY].map((e=>i?-e:e)),a=Math.sign(Math.abs(s)>Math.abs(n)?s:n);e.increaseVolume(a/50);const{volume:l}=e.media;(1===a&&l<1||-1===a&&l>0)&&t.preventDefault()}),"volume",!1)})),this.player=t,this.lastKey=null,this.focusTimer=null,this.lastKeyDown=null,this.handleKey=this.handleKey.bind(this),this.toggleMenu=this.toggleMenu.bind(this),this.setTabFocus=this.setTabFocus.bind(this),this.firstTouch=this.firstTouch.bind(this)}handleKey(e){const{player:t}=this,{elements:i}=t,{key:s,type:n,altKey:a,ctrlKey:l,metaKey:o,shiftKey:r}=e,c="keydown"===n,h=c&&s===this.lastKey;if(a||l||o||r)return;if(!s)return;if(c){const n=document.activeElement;if(H(n)){const{editable:s}=t.config.selectors,{seek:a}=i.inputs;if(n!==a&&re(n,s))return;if("Space"===e.key&&re(n,'button, [role^="menuitem"]'))return}switch(["Space","ArrowLeft","ArrowUp","ArrowRight","ArrowDown","0","1","2","3","4","5","6","7","8","9","c","f","k","l","m"].includes(s)&&(e.preventDefault(),e.stopPropagation()),s){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":h||(u=parseInt(s,10),t.currentTime=t.duration/10*u);break;case"Space":case"k":h||ke(t.togglePlay());break;case"ArrowUp":t.increaseVolume(.1);break;case"ArrowDown":t.decreaseVolume(.1);break;case"m":h||(t.muted=!t.muted);break;case"ArrowRight":t.forward();break;case"ArrowLeft":t.rewind();break;case"f":t.fullscreen.toggle();break;case"c":h||t.toggleCaptions();break;case"l":t.loop=!t.loop}"Escape"===s&&!t.fullscreen.usingNative&&t.fullscreen.active&&t.fullscreen.toggle(),this.lastKey=s}else this.lastKey=null;var u}toggleMenu(e){We.toggleMenu.call(this.player,e)}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var ot=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e,t){e.exports=function(){var e=function(){},t={},i={},s={};function n(e,t){e=e.push?e:[e];var n,a,l,o=[],r=e.length,c=r;for(n=function(e,i){i.length&&o.push(e),--c||t(o)};r--;)a=e[r],(l=i[a])?n(a,l):(s[a]=s[a]||[]).push(n)}function a(e,t){if(e){var n=s[e];if(i[e]=t,n)for(;n.length;)n[0](e,t),n.splice(0,1)}}function l(t,i){t.call&&(t={success:t}),i.length?(t.error||e)(i):(t.success||e)(t)}function o(t,i,s,n){var a,l,r=document,c=s.async,h=(s.numRetries||0)+1,u=s.before||e,d=t.replace(/[\?|#].*$/,""),m=t.replace(/^(css|img)!/,"");n=n||0,/(^css!|\.css$)/.test(d)?((l=r.createElement("link")).rel="stylesheet",l.href=m,(a="hideFocus"in l)&&l.relList&&(a=0,l.rel="preload",l.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d)?(l=r.createElement("img")).src=m:((l=r.createElement("script")).src=t,l.async=void 0===c||c),l.onload=l.onerror=l.onbeforeload=function(e){var r=e.type[0];if(a)try{l.sheet.cssText.length||(r="e")}catch(e){18!=e.code&&(r="e")}if("e"==r){if((n+=1)<h)return o(t,i,s,n)}else if("preload"==l.rel&&"style"==l.as)return l.rel="stylesheet";i(t,r,e.defaultPrevented)},!1!==u(t,l)&&r.head.appendChild(l)}function r(e,t,i){var s,n,a=(e=e.push?e:[e]).length,l=a,r=[];for(s=function(e,i,s){if("e"==i&&r.push(e),"b"==i){if(!s)return;r.push(e)}--a||t(r)},n=0;n<l;n++)o(e[n],s,i)}function c(e,i,s){var n,o;if(i&&i.trim&&(n=i),o=(n?s:i)||{},n){if(n in t)throw"LoadJS";t[n]=!0}function c(t,i){r(e,(function(e){l(o,e),t&&l({success:t,error:i},e),a(n,e)}),o)}if(o.returnPromise)return new Promise(c);c()}return c.ready=function(e,t){return n(e,(function(e){l(t,e)})),c},c.done=function(e){a(e,[])},c.reset=function(){t={},i={},s={}},c.isDefined=function(e){return e in t},c}()}));function rt(e){return new Promise(((t,i)=>{ot(e,{success:t,error:i})}))}function ct(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,ve.call(this,this.media,e?"play":"pause"))}const ht={setup(){const e=this;le(e.elements.wrapper,e.config.classNames.embed,!0),e.options.speed=e.config.speed.options,xe.call(e),L(window.Vimeo)?ht.ready.call(e):rt(e.config.urls.vimeo.sdk).then((()=>{ht.ready.call(e)})).catch((t=>{e.debug.warn("Vimeo SDK (player.js) failed to load",t)}))},ready(){const e=this,t=e.config.vimeo,{premium:i,referrerPolicy:s,...n}=t;let a=e.media.getAttribute("src"),l="";W(a)?(a=e.media.getAttribute(e.config.attributes.embed.id),l=e.media.getAttribute(e.config.attributes.embed.hash)):l=function(e){const t=e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);return t&&5===t.length?t[4]:null}(a);const o=l?{h:l}:{};i&&Object.assign(n,{controls:!1,sidedock:!1});const r=Ke({loop:e.config.loop.active,autoplay:e.autoplay,muted:e.muted,gesture:"media",playsinline:!this.config.fullscreen.iosNative,...o,...n}),c=W(h=a)?null:$(Number(h))?h:h.match(/^.*(vimeo.com\/|video\/)(\d+).*/)?RegExp.$2:h;var h;const u=Z("iframe"),d=$e(e.config.urls.vimeo.iframe,c,r);if(u.setAttribute("src",d),u.setAttribute("allowfullscreen",""),u.setAttribute("allow",["autoplay","fullscreen","picture-in-picture","encrypted-media","accelerometer","gyroscope"].join("; ")),W(s)||u.setAttribute("referrerPolicy",s),i||!t.customControls)u.setAttribute("data-poster",e.poster),e.media=se(u,e.media);else{const t=Z("div",{class:e.config.classNames.embedContainer,"data-poster":e.poster});t.appendChild(u),e.media=se(t,e.media)}t.customControls||Fe($e(e.config.urls.vimeo.api,d)).then((t=>{!W(t)&&t.thumbnail_url&&at.setPoster.call(e,t.thumbnail_url).catch((()=>{}))})),e.embed=new window.Vimeo.Player(u,{autopause:e.config.autopause,muted:e.muted}),e.media.paused=!0,e.media.currentTime=0,e.supported.ui&&e.embed.disableTextTrack(),e.media.play=()=>(ct.call(e,!0),e.embed.play()),e.media.pause=()=>(ct.call(e,!1),e.embed.pause()),e.media.stop=()=>{e.pause(),e.currentTime=0};let{currentTime:m}=e.media;Object.defineProperty(e.media,"currentTime",{get:()=>m,set(t){const{embed:i,media:s,paused:n,volume:a}=e,l=n&&!i.hasPlayed;s.seeking=!0,ve.call(e,s,"seeking"),Promise.resolve(l&&i.setVolume(0)).then((()=>i.setCurrentTime(t))).then((()=>l&&i.pause())).then((()=>l&&i.setVolume(a))).catch((()=>{}))}});let p=e.config.speed.selected;Object.defineProperty(e.media,"playbackRate",{get:()=>p,set(t){e.embed.setPlaybackRate(t).then((()=>{p=t,ve.call(e,e.media,"ratechange")})).catch((()=>{e.options.speed=[1]}))}});let{volume:g}=e.config;Object.defineProperty(e.media,"volume",{get:()=>g,set(t){e.embed.setVolume(t).then((()=>{g=t,ve.call(e,e.media,"volumechange")}))}});let{muted:f}=e.config;Object.defineProperty(e.media,"muted",{get:()=>f,set(t){const i=!!O(t)&&t;e.embed.setVolume(i?0:e.config.volume).then((()=>{f=i,ve.call(e,e.media,"volumechange")}))}});let b,{loop:y}=e.config;Object.defineProperty(e.media,"loop",{get:()=>y,set(t){const i=O(t)?t:e.config.loop.active;e.embed.setLoop(i).then((()=>{y=i}))}}),e.embed.getVideoUrl().then((t=>{b=t,We.setDownloadUrl.call(e)})).catch((e=>{this.debug.warn(e)})),Object.defineProperty(e.media,"currentSrc",{get:()=>b}),Object.defineProperty(e.media,"ended",{get:()=>e.currentTime===e.duration}),Promise.all([e.embed.getVideoWidth(),e.embed.getVideoHeight()]).then((t=>{const[i,s]=t;e.embed.ratio=Ie(i,s),xe.call(this)})),e.embed.setAutopause(e.config.autopause).then((t=>{e.config.autopause=t})),e.embed.getVideoTitle().then((t=>{e.config.title=t,at.setTitle.call(this)})),e.embed.getCurrentTime().then((t=>{m=t,ve.call(e,e.media,"timeupdate")})),e.embed.getDuration().then((t=>{e.media.duration=t,ve.call(e,e.media,"durationchange")})),e.embed.getTextTracks().then((t=>{e.media.textTracks=t,Ye.setup.call(e)})),e.embed.on("cuechange",(({cues:t=[]})=>{const i=t.map((e=>function(e){const t=document.createDocumentFragment(),i=document.createElement("div");return t.appendChild(i),i.innerHTML=e,t.firstChild.innerText}(e.text)));Ye.updateCues.call(e,i)})),e.embed.on("loaded",(()=>{if(e.embed.getPaused().then((t=>{ct.call(e,!t),t||ve.call(e,e.media,"playing")})),H(e.embed.element)&&e.supported.ui){e.embed.element.setAttribute("tabindex",-1)}})),e.embed.on("bufferstart",(()=>{ve.call(e,e.media,"waiting")})),e.embed.on("bufferend",(()=>{ve.call(e,e.media,"playing")})),e.embed.on("play",(()=>{ct.call(e,!0),ve.call(e,e.media,"playing")})),e.embed.on("pause",(()=>{ct.call(e,!1)})),e.embed.on("timeupdate",(t=>{e.media.seeking=!1,m=t.seconds,ve.call(e,e.media,"timeupdate")})),e.embed.on("progress",(t=>{e.media.buffered=t.percent,ve.call(e,e.media,"progress"),1===parseInt(t.percent,10)&&ve.call(e,e.media,"canplaythrough"),e.embed.getDuration().then((t=>{t!==e.media.duration&&(e.media.duration=t,ve.call(e,e.media,"durationchange"))}))})),e.embed.on("seeked",(()=>{e.media.seeking=!1,ve.call(e,e.media,"seeked")})),e.embed.on("ended",(()=>{e.media.paused=!0,ve.call(e,e.media,"ended")})),e.embed.on("error",(t=>{e.media.error=t,ve.call(e,e.media,"error")})),t.customControls&&setTimeout((()=>at.build.call(e)),0)}};function ut(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,ve.call(this,this.media,e?"play":"pause"))}function dt(e){return e.noCookie?"https://www.youtube-nocookie.com":"http:"===window.location.protocol?"http://www.youtube.com":void 0}const mt={setup(){if(le(this.elements.wrapper,this.config.classNames.embed,!0),L(window.YT)&&j(window.YT.Player))mt.ready.call(this);else{const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{j(e)&&e(),mt.ready.call(this)},rt(this.config.urls.youtube.sdk).catch((e=>{this.debug.warn("YouTube API failed to load",e)}))}},getTitle(e){Fe($e(this.config.urls.youtube.api,e)).then((e=>{if(L(e)){const{title:t,height:i,width:s}=e;this.config.title=t,at.setTitle.call(this),this.embed.ratio=Ie(s,i)}xe.call(this)})).catch((()=>{xe.call(this)}))},ready(){const e=this,t=e.config.youtube,i=e.media&&e.media.getAttribute("id");if(!W(i)&&i.startsWith("youtube-"))return;let s=e.media.getAttribute("src");W(s)&&(s=e.media.getAttribute(this.config.attributes.embed.id));const n=W(a=s)?null:a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?RegExp.$2:a;var a;const l=Z("div",{id:`${e.provider}-${Math.floor(1e4*Math.random())}`,"data-poster":t.customControls?e.poster:void 0});if(e.media=se(l,e.media),t.customControls){const t=e=>`https://i.ytimg.com/vi/${n}/${e}default.jpg`;nt(t("maxres"),121).catch((()=>nt(t("sd"),121))).catch((()=>nt(t("hq")))).then((t=>at.setPoster.call(e,t.src))).then((t=>{t.includes("maxres")||(e.elements.poster.style.backgroundSize="cover")})).catch((()=>{}))}e.embed=new window.YT.Player(e.media,{videoId:n,host:dt(t),playerVars:X({},{autoplay:e.config.autoplay?1:0,hl:e.config.hl,controls:e.supported.ui&&t.customControls?0:1,disablekb:1,playsinline:e.config.fullscreen.iosNative?0:1,cc_load_policy:e.captions.active?1:0,cc_lang_pref:e.config.captions.language,widget_referrer:window?window.location.href:null},t),events:{onError(t){if(!e.media.error){const i=t.data,s={2:"The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",5:"The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",100:"The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",101:"The owner of the requested video does not allow it to be played in embedded players.",150:"The owner of the requested video does not allow it to be played in embedded players."}[i]||"An unknown error occured";e.media.error={code:i,message:s},ve.call(e,e.media,"error")}},onPlaybackRateChange(t){const i=t.target;e.media.playbackRate=i.getPlaybackRate(),ve.call(e,e.media,"ratechange")},onReady(i){if(j(e.media.play))return;const s=i.target;mt.getTitle.call(e,n),e.media.play=()=>{ut.call(e,!0),s.playVideo()},e.media.pause=()=>{ut.call(e,!1),s.pauseVideo()},e.media.stop=()=>{s.stopVideo()},e.media.duration=s.getDuration(),e.media.paused=!0,e.media.currentTime=0,Object.defineProperty(e.media,"currentTime",{get:()=>Number(s.getCurrentTime()),set(t){e.paused&&!e.embed.hasPlayed&&e.embed.mute(),e.media.seeking=!0,ve.call(e,e.media,"seeking"),s.seekTo(t)}}),Object.defineProperty(e.media,"playbackRate",{get:()=>s.getPlaybackRate(),set(e){s.setPlaybackRate(e)}});let{volume:a}=e.config;Object.defineProperty(e.media,"volume",{get:()=>a,set(t){a=t,s.setVolume(100*a),ve.call(e,e.media,"volumechange")}});let{muted:l}=e.config;Object.defineProperty(e.media,"muted",{get:()=>l,set(t){const i=O(t)?t:l;l=i,s[i?"mute":"unMute"](),s.setVolume(100*a),ve.call(e,e.media,"volumechange")}}),Object.defineProperty(e.media,"currentSrc",{get:()=>s.getVideoUrl()}),Object.defineProperty(e.media,"ended",{get:()=>e.currentTime===e.duration});const o=s.getAvailablePlaybackRates();e.options.speed=o.filter((t=>e.config.speed.options.includes(t))),e.supported.ui&&t.customControls&&e.media.setAttribute("tabindex",-1),ve.call(e,e.media,"timeupdate"),ve.call(e,e.media,"durationchange"),clearInterval(e.timers.buffering),e.timers.buffering=setInterval((()=>{e.media.buffered=s.getVideoLoadedFraction(),(null===e.media.lastBuffered||e.media.lastBuffered<e.media.buffered)&&ve.call(e,e.media,"progress"),e.media.lastBuffered=e.media.buffered,1===e.media.buffered&&(clearInterval(e.timers.buffering),ve.call(e,e.media,"canplaythrough"))}),200),t.customControls&&setTimeout((()=>at.build.call(e)),50)},onStateChange(i){const s=i.target;clearInterval(e.timers.playing);switch(e.media.seeking&&[1,2].includes(i.data)&&(e.media.seeking=!1,ve.call(e,e.media,"seeked")),i.data){case-1:ve.call(e,e.media,"timeupdate"),e.media.buffered=s.getVideoLoadedFraction(),ve.call(e,e.media,"progress");break;case 0:ut.call(e,!1),e.media.loop?(s.stopVideo(),s.playVideo()):ve.call(e,e.media,"ended");break;case 1:t.customControls&&!e.config.autoplay&&e.media.paused&&!e.embed.hasPlayed?e.media.pause():(ut.call(e,!0),ve.call(e,e.media,"playing"),e.timers.playing=setInterval((()=>{ve.call(e,e.media,"timeupdate")}),50),e.media.duration!==s.getDuration()&&(e.media.duration=s.getDuration(),ve.call(e,e.media,"durationchange")));break;case 2:e.muted||e.embed.unMute(),ut.call(e,!1);break;case 3:ve.call(e,e.media,"waiting")}ve.call(e,e.elements.container,"statechange",!1,{code:i.data})}}})}},pt={setup(){this.media?(le(this.elements.container,this.config.classNames.type.replace("{0}",this.type),!0),le(this.elements.container,this.config.classNames.provider.replace("{0}",this.provider),!0),this.isEmbed&&le(this.elements.container,this.config.classNames.type.replace("{0}","video"),!0),this.isVideo&&(this.elements.wrapper=Z("div",{class:this.config.classNames.video}),J(this.media,this.elements.wrapper),this.elements.poster=Z("div",{class:this.config.classNames.poster}),this.elements.wrapper.appendChild(this.elements.poster)),this.isHTML5?Le.setup.call(this):this.isYouTube?mt.setup.call(this):this.isVimeo&&ht.setup.call(this)):this.debug.warn("No media element found!")}};class gt{constructor(t){e(this,"load",(()=>{this.enabled&&(L(window.google)&&L(window.google.ima)?this.ready():rt(this.player.config.urls.googleIMA.sdk).then((()=>{this.ready()})).catch((()=>{this.trigger("error",new Error("Google IMA SDK failed to load"))})))})),e(this,"ready",(()=>{var e;this.enabled||((e=this).manager&&e.manager.destroy(),e.elements.displayContainer&&e.elements.displayContainer.destroy(),e.elements.container.remove()),this.startSafetyTimer(12e3,"ready()"),this.managerPromise.then((()=>{this.clearSafetyTimer("onAdsManagerLoaded()")})),this.listeners(),this.setupIMA()})),e(this,"setupIMA",(()=>{this.elements.container=Z("div",{class:this.player.config.classNames.ads}),this.player.elements.container.appendChild(this.elements.container),google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED),google.ima.settings.setLocale(this.player.config.ads.language),google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline),this.elements.displayContainer=new google.ima.AdDisplayContainer(this.elements.container,this.player.media),this.loader=new google.ima.AdsLoader(this.elements.displayContainer),this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,(e=>this.onAdsManagerLoaded(e)),!1),this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,(e=>this.onAdError(e)),!1),this.requestAds()})),e(this,"requestAds",(()=>{const{container:e}=this.player.elements;try{const t=new google.ima.AdsRequest;t.adTagUrl=this.tagUrl,t.linearAdSlotWidth=e.offsetWidth,t.linearAdSlotHeight=e.offsetHeight,t.nonLinearAdSlotWidth=e.offsetWidth,t.nonLinearAdSlotHeight=e.offsetHeight,t.forceNonLinearFullSlot=!1,t.setAdWillPlayMuted(!this.player.muted),this.loader.requestAds(t)}catch(e){this.onAdError(e)}})),e(this,"pollCountdown",((e=!1)=>{if(!e)return clearInterval(this.countdownTimer),void this.elements.container.removeAttribute("data-badge-text");this.countdownTimer=setInterval((()=>{const e=Ue(Math.max(this.manager.getRemainingTime(),0)),t=`${He.get("advertisement",this.player.config)} - ${e}`;this.elements.container.setAttribute("data-badge-text",t)}),100)})),e(this,"onAdsManagerLoaded",(e=>{if(!this.enabled)return;const t=new google.ima.AdsRenderingSettings;t.restoreCustomPlaybackStateOnAdBreakComplete=!0,t.enablePreloading=!0,this.manager=e.getAdsManager(this.player,t),this.cuePoints=this.manager.getCuePoints(),this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,(e=>this.onAdError(e))),Object.keys(google.ima.AdEvent.Type).forEach((e=>{this.manager.addEventListener(google.ima.AdEvent.Type[e],(e=>this.onAdEvent(e)))})),this.trigger("loaded")})),e(this,"addCuePoints",(()=>{W(this.cuePoints)||this.cuePoints.forEach((e=>{if(0!==e&&-1!==e&&e<this.player.duration){const t=this.player.elements.progress;if(H(t)){const i=100/this.player.duration*e,s=Z("span",{class:this.player.config.classNames.cues});s.style.left=`${i.toString()}%`,t.appendChild(s)}}}))})),e(this,"onAdEvent",(e=>{const{container:t}=this.player.elements,i=e.getAd(),s=e.getAdData();switch((e=>{ve.call(this.player,this.player.media,`ads${e.replace(/_/g,"").toLowerCase()}`)})(e.type),e.type){case google.ima.AdEvent.Type.LOADED:this.trigger("loaded"),this.pollCountdown(!0),i.isLinear()||(i.width=t.offsetWidth,i.height=t.offsetHeight);break;case google.ima.AdEvent.Type.STARTED:this.manager.setVolume(this.player.volume);break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:this.player.ended?this.loadAds():this.loader.contentComplete();break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:this.pauseContent();break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:this.pollCountdown(),this.resumeContent();break;case google.ima.AdEvent.Type.LOG:s.adError&&this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`)}})),e(this,"onAdError",(e=>{this.cancel(),this.player.debug.warn("Ads error",e)})),e(this,"listeners",(()=>{const{container:e}=this.player.elements;let t;this.player.on("canplay",(()=>{this.addCuePoints()})),this.player.on("ended",(()=>{this.loader.contentComplete()})),this.player.on("timeupdate",(()=>{t=this.player.currentTime})),this.player.on("seeked",(()=>{const e=this.player.currentTime;W(this.cuePoints)||this.cuePoints.forEach(((i,s)=>{t<i&&i<e&&(this.manager.discardAdBreak(),this.cuePoints.splice(s,1))}))})),window.addEventListener("resize",(()=>{this.manager&&this.manager.resize(e.offsetWidth,e.offsetHeight,google.ima.ViewMode.NORMAL)}))})),e(this,"play",(()=>{const{container:e}=this.player.elements;this.managerPromise||this.resumeContent(),this.managerPromise.then((()=>{this.manager.setVolume(this.player.volume),this.elements.displayContainer.initialize();try{this.initialized||(this.manager.init(e.offsetWidth,e.offsetHeight,google.ima.ViewMode.NORMAL),this.manager.start()),this.initialized=!0}catch(e){this.onAdError(e)}})).catch((()=>{}))})),e(this,"resumeContent",(()=>{this.elements.container.style.zIndex="",this.playing=!1,ke(this.player.media.play())})),e(this,"pauseContent",(()=>{this.elements.container.style.zIndex=3,this.playing=!0,this.player.media.pause()})),e(this,"cancel",(()=>{this.initialized&&this.resumeContent(),this.trigger("error"),this.loadAds()})),e(this,"loadAds",(()=>{this.managerPromise.then((()=>{this.manager&&this.manager.destroy(),this.managerPromise=new Promise((e=>{this.on("loaded",e),this.player.debug.log(this.manager)})),this.initialized=!1,this.requestAds()})).catch((()=>{}))})),e(this,"trigger",((e,...t)=>{const i=this.events[e];D(i)&&i.forEach((e=>{j(e)&&e.apply(this,t)}))})),e(this,"on",((e,t)=>(D(this.events[e])||(this.events[e]=[]),this.events[e].push(t),this))),e(this,"startSafetyTimer",((e,t)=>{this.player.debug.log(`Safety timer invoked from: ${t}`),this.safetyTimer=setTimeout((()=>{this.cancel(),this.clearSafetyTimer("startSafetyTimer()")}),e)})),e(this,"clearSafetyTimer",(e=>{I(this.safetyTimer)||(this.player.debug.log(`Safety timer cleared from: ${e}`),clearTimeout(this.safetyTimer),this.safetyTimer=null)})),this.player=t,this.config=t.config.ads,this.playing=!1,this.initialized=!1,this.elements={container:null,displayContainer:null},this.manager=null,this.loader=null,this.cuePoints=null,this.events={},this.safetyTimer=null,this.countdownTimer=null,this.managerPromise=new Promise(((e,t)=>{this.on("loaded",e),this.on("error",t)})),this.load()}get enabled(){const{config:e}=this;return this.player.isHTML5&&this.player.isVideo&&e.enabled&&(!W(e.publisherId)||U(e.tagUrl))}get tagUrl(){const{config:e}=this;if(U(e.tagUrl))return e.tagUrl;return`https://go.aniview.com/api/adserver6/vast/?${Ke({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:e.publisherId})}`}}function ft(e=0,t=0,i=255){return Math.min(Math.max(e,t),i)}const bt=e=>{const t=[];return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e=>{const i={};e.split(/\r\n|\n|\r/).forEach((e=>{if($(i.startTime)){if(!W(e.trim())&&W(i.text)){const t=e.trim().split("#xywh=");[i.text]=t,t[1]&&([i.x,i.y,i.w,i.h]=t[1].split(","))}}else{const t=e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);t&&(i.startTime=60*Number(t[1]||0)*60+60*Number(t[2])+Number(t[3])+Number(`0.${t[4]}`),i.endTime=60*Number(t[6]||0)*60+60*Number(t[7])+Number(t[8])+Number(`0.${t[9]}`))}})),i.text&&t.push(i)})),t},yt=(e,t)=>{const i={};return e>t.width/t.height?(i.width=t.width,i.height=1/e*t.width):(i.height=t.height,i.width=e*t.height),i};class vt{constructor(t){e(this,"load",(()=>{this.player.elements.display.seekTooltip&&(this.player.elements.display.seekTooltip.hidden=this.enabled),this.enabled&&this.getThumbnails().then((()=>{this.enabled&&(this.render(),this.determineContainerAutoSizing(),this.loaded=!0)}))})),e(this,"getThumbnails",(()=>new Promise((e=>{const{src:t}=this.player.config.previewThumbnails;if(W(t))throw new Error("Missing previewThumbnails.src config attribute");const i=()=>{this.thumbnails.sort(((e,t)=>e.height-t.height)),this.player.debug.log("Preview thumbnails",this.thumbnails),e()};if(j(t))t((e=>{this.thumbnails=e,i()}));else{const e=(_(t)?[t]:t).map((e=>this.getThumbnail(e)));Promise.all(e).then(i)}})))),e(this,"getThumbnail",(e=>new Promise((t=>{Fe(e).then((i=>{const s={frames:bt(i),height:null,urlPrefix:""};s.frames[0].text.startsWith("/")||s.frames[0].text.startsWith("http://")||s.frames[0].text.startsWith("https://")||(s.urlPrefix=e.substring(0,e.lastIndexOf("/")+1));const n=new Image;n.onload=()=>{s.height=n.naturalHeight,s.width=n.naturalWidth,this.thumbnails.push(s),t()},n.src=s.urlPrefix+s.frames[0].text}))})))),e(this,"startMove",(e=>{if(this.loaded&&R(e)&&["touchmove","mousemove"].includes(e.type)&&this.player.media.duration){if("touchmove"===e.type)this.seekTime=this.player.media.duration*(this.player.elements.inputs.seek.value/100);else{var t,i;const s=this.player.elements.progress.getBoundingClientRect(),n=100/s.width*(e.pageX-s.left);this.seekTime=this.player.media.duration*(n/100),this.seekTime<0&&(this.seekTime=0),this.seekTime>this.player.media.duration-1&&(this.seekTime=this.player.media.duration-1),this.mousePosX=e.pageX,this.elements.thumb.time.innerText=Ue(this.seekTime);const a=null===(t=this.player.config.markers)||void 0===t||null===(i=t.points)||void 0===i?void 0:i.find((({time:e})=>e===Math.round(this.seekTime)));a&&this.elements.thumb.time.insertAdjacentHTML("afterbegin",`${a.label}<br>`)}this.showImageAtCurrentTime()}})),e(this,"endMove",(()=>{this.toggleThumbContainer(!1,!0)})),e(this,"startScrubbing",(e=>{(I(e.button)||!1===e.button||0===e.button)&&(this.mouseDown=!0,this.player.media.duration&&(this.toggleScrubbingContainer(!0),this.toggleThumbContainer(!1,!0),this.showImageAtCurrentTime()))})),e(this,"endScrubbing",(()=>{this.mouseDown=!1,Math.ceil(this.lastTime)===Math.ceil(this.player.media.currentTime)?this.toggleScrubbingContainer(!1):ye.call(this.player,this.player.media,"timeupdate",(()=>{this.mouseDown||this.toggleScrubbingContainer(!1)}))})),e(this,"listeners",(()=>{this.player.on("play",(()=>{this.toggleThumbContainer(!1,!0)})),this.player.on("seeked",(()=>{this.toggleThumbContainer(!1)})),this.player.on("timeupdate",(()=>{this.lastTime=this.player.media.currentTime}))})),e(this,"render",(()=>{this.elements.thumb.container=Z("div",{class:this.player.config.classNames.previewThumbnails.thumbContainer}),this.elements.thumb.imageContainer=Z("div",{class:this.player.config.classNames.previewThumbnails.imageContainer}),this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);const e=Z("div",{class:this.player.config.classNames.previewThumbnails.timeContainer});this.elements.thumb.time=Z("span",{},"00:00"),e.appendChild(this.elements.thumb.time),this.elements.thumb.imageContainer.appendChild(e),H(this.player.elements.progress)&&this.player.elements.progress.appendChild(this.elements.thumb.container),this.elements.scrubbing.container=Z("div",{class:this.player.config.classNames.previewThumbnails.scrubbingContainer}),this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)})),e(this,"destroy",(()=>{this.elements.thumb.container&&this.elements.thumb.container.remove(),this.elements.scrubbing.container&&this.elements.scrubbing.container.remove()})),e(this,"showImageAtCurrentTime",(()=>{this.mouseDown?this.setScrubbingContainerSize():this.setThumbContainerSizeAndPos();const e=this.thumbnails[0].frames.findIndex((e=>this.seekTime>=e.startTime&&this.seekTime<=e.endTime)),t=e>=0;let i=0;this.mouseDown||this.toggleThumbContainer(t),t&&(this.thumbnails.forEach(((t,s)=>{this.loadedImages.includes(t.frames[e].text)&&(i=s)})),e!==this.showingThumb&&(this.showingThumb=e,this.loadImage(i)))})),e(this,"loadImage",((e=0)=>{const t=this.showingThumb,i=this.thumbnails[e],{urlPrefix:s}=i,n=i.frames[t],a=i.frames[t].text,l=s+a;if(this.currentImageElement&&this.currentImageElement.dataset.filename===a)this.showImage(this.currentImageElement,n,e,t,a,!1),this.currentImageElement.dataset.index=t,this.removeOldImages(this.currentImageElement);else{this.loadingImage&&this.usingSprites&&(this.loadingImage.onload=null);const i=new Image;i.src=l,i.dataset.index=t,i.dataset.filename=a,this.showingThumbFilename=a,this.player.debug.log(`Loading image: ${l}`),i.onload=()=>this.showImage(i,n,e,t,a,!0),this.loadingImage=i,this.removeOldImages(i)}})),e(this,"showImage",((e,t,i,s,n,a=!0)=>{this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}`),this.setImageSizeAndOffset(e,t),a&&(this.currentImageContainer.appendChild(e),this.currentImageElement=e,this.loadedImages.includes(n)||this.loadedImages.push(n)),this.preloadNearby(s,!0).then(this.preloadNearby(s,!1)).then(this.getHigherQuality(i,e,t,n))})),e(this,"removeOldImages",(e=>{Array.from(this.currentImageContainer.children).forEach((t=>{if("img"!==t.tagName.toLowerCase())return;const i=this.usingSprites?500:1e3;if(t.dataset.index!==e.dataset.index&&!t.dataset.deleting){t.dataset.deleting=!0;const{currentImageContainer:e}=this;setTimeout((()=>{e.removeChild(t),this.player.debug.log(`Removing thumb: ${t.dataset.filename}`)}),i)}}))})),e(this,"preloadNearby",((e,t=!0)=>new Promise((i=>{setTimeout((()=>{const s=this.thumbnails[0].frames[e].text;if(this.showingThumbFilename===s){let n;n=t?this.thumbnails[0].frames.slice(e):this.thumbnails[0].frames.slice(0,e).reverse();let a=!1;n.forEach((e=>{const t=e.text;if(t!==s&&!this.loadedImages.includes(t)){a=!0,this.player.debug.log(`Preloading thumb filename: ${t}`);const{urlPrefix:e}=this.thumbnails[0],s=e+t,n=new Image;n.src=s,n.onload=()=>{this.player.debug.log(`Preloaded thumb filename: ${t}`),this.loadedImages.includes(t)||this.loadedImages.push(t),i()}}})),a||i()}}),300)})))),e(this,"getHigherQuality",((e,t,i,s)=>{if(e<this.thumbnails.length-1){let n=t.naturalHeight;this.usingSprites&&(n=i.h),n<this.thumbContainerHeight&&setTimeout((()=>{this.showingThumbFilename===s&&(this.player.debug.log(`Showing higher quality thumb for: ${s}`),this.loadImage(e+1))}),300)}})),e(this,"toggleThumbContainer",((e=!1,t=!1)=>{const i=this.player.config.classNames.previewThumbnails.thumbContainerShown;this.elements.thumb.container.classList.toggle(i,e),!e&&t&&(this.showingThumb=null,this.showingThumbFilename=null)})),e(this,"toggleScrubbingContainer",((e=!1)=>{const t=this.player.config.classNames.previewThumbnails.scrubbingContainerShown;this.elements.scrubbing.container.classList.toggle(t,e),e||(this.showingThumb=null,this.showingThumbFilename=null)})),e(this,"determineContainerAutoSizing",(()=>{(this.elements.thumb.imageContainer.clientHeight>20||this.elements.thumb.imageContainer.clientWidth>20)&&(this.sizeSpecifiedInCSS=!0)})),e(this,"setThumbContainerSizeAndPos",(()=>{const{imageContainer:e}=this.elements.thumb;if(this.sizeSpecifiedInCSS){if(e.clientHeight>20&&e.clientWidth<20){const t=Math.floor(e.clientHeight*this.thumbAspectRatio);e.style.width=`${t}px`}else if(e.clientHeight<20&&e.clientWidth>20){const t=Math.floor(e.clientWidth/this.thumbAspectRatio);e.style.height=`${t}px`}}else{const t=Math.floor(this.thumbContainerHeight*this.thumbAspectRatio);e.style.height=`${this.thumbContainerHeight}px`,e.style.width=`${t}px`}this.setThumbContainerPos()})),e(this,"setThumbContainerPos",(()=>{const e=this.player.elements.progress.getBoundingClientRect(),t=this.player.elements.container.getBoundingClientRect(),{container:i}=this.elements.thumb,s=t.left-e.left+10,n=t.right-e.left-i.clientWidth-10,a=this.mousePosX-e.left-i.clientWidth/2,l=ft(a,s,n);i.style.left=`${l}px`,i.style.setProperty("--preview-arrow-offset",a-l+"px")})),e(this,"setScrubbingContainerSize",(()=>{const{width:e,height:t}=yt(this.thumbAspectRatio,{width:this.player.media.clientWidth,height:this.player.media.clientHeight});this.elements.scrubbing.container.style.width=`${e}px`,this.elements.scrubbing.container.style.height=`${t}px`})),e(this,"setImageSizeAndOffset",((e,t)=>{if(!this.usingSprites)return;const i=this.thumbContainerHeight/t.h;e.style.height=e.naturalHeight*i+"px",e.style.width=e.naturalWidth*i+"px",e.style.left=`-${t.x*i}px`,e.style.top=`-${t.y*i}px`})),this.player=t,this.thumbnails=[],this.loaded=!1,this.lastMouseMoveTime=Date.now(),this.mouseDown=!1,this.loadedImages=[],this.elements={thumb:{},scrubbing:{}},this.load()}get enabled(){return this.player.isHTML5&&this.player.isVideo&&this.player.config.previewThumbnails.enabled}get currentImageContainer(){return this.mouseDown?this.elements.scrubbing.container:this.elements.thumb.imageContainer}get usingSprites(){return Object.keys(this.thumbnails[0].frames[0]).includes("w")}get thumbAspectRatio(){return this.usingSprites?this.thumbnails[0].frames[0].w/this.thumbnails[0].frames[0].h:this.thumbnails[0].width/this.thumbnails[0].height}get thumbContainerHeight(){if(this.mouseDown){const{height:e}=yt(this.thumbAspectRatio,{width:this.player.media.clientWidth,height:this.player.media.clientHeight});return e}return this.sizeSpecifiedInCSS?this.elements.thumb.imageContainer.clientHeight:Math.floor(this.player.media.clientWidth/this.thumbAspectRatio/4)}get currentImageElement(){return this.mouseDown?this.currentScrubbingImageElement:this.currentThumbnailImageElement}set currentImageElement(e){this.mouseDown?this.currentScrubbingImageElement=e:this.currentThumbnailImageElement=e}}const wt={insertElements(e,t){_(t)?ee(e,this.media,{src:t}):D(t)&&t.forEach((t=>{ee(e,this.media,t)}))},change(e){Q(e,"sources.length")?(Le.cancelRequests.call(this),this.destroy.call(this,(()=>{this.options.quality=[],te(this.media),this.media=null,H(this.elements.container)&&this.elements.container.removeAttribute("class");const{sources:t,type:i}=e,[{provider:s=Ge.html5,src:n}]=t,a="html5"===s?i:"div",l="html5"===s?{}:{src:n};Object.assign(this,{provider:s,type:i,supported:me.check(i,s,this.config.playsinline),media:Z(a,l)}),this.elements.container.appendChild(this.media),O(e.autoplay)&&(this.config.autoplay=e.autoplay),this.isHTML5&&(this.config.crossorigin&&this.media.setAttribute("crossorigin",""),this.config.autoplay&&this.media.setAttribute("autoplay",""),W(e.poster)||(this.poster=e.poster),this.config.loop.active&&this.media.setAttribute("loop",""),this.config.muted&&this.media.setAttribute("muted",""),this.config.playsinline&&this.media.setAttribute("playsinline","")),at.addStyleHook.call(this),this.isHTML5&&wt.insertElements.call(this,"source",t),this.config.title=e.title,pt.setup.call(this),this.isHTML5&&Object.keys(e).includes("tracks")&&wt.insertElements.call(this,"track",e.tracks),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&at.build.call(this),this.isHTML5&&this.media.load(),W(e.previewThumbnails)||(Object.assign(this.config.previewThumbnails,e.previewThumbnails),this.previewThumbnails&&this.previewThumbnails.loaded&&(this.previewThumbnails.destroy(),this.previewThumbnails=null),this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))),this.fullscreen.update()}),!0)):this.debug.warn("Invalid source format")}};class Tt{constructor(t,i){if(e(this,"play",(()=>j(this.media.play)?(this.ads&&this.ads.enabled&&this.ads.managerPromise.then((()=>this.ads.play())).catch((()=>ke(this.media.play()))),this.media.play()):null)),e(this,"pause",(()=>this.playing&&j(this.media.pause)?this.media.pause():null)),e(this,"togglePlay",(e=>(O(e)?e:!this.playing)?this.play():this.pause())),e(this,"stop",(()=>{this.isHTML5?(this.pause(),this.restart()):j(this.media.stop)&&this.media.stop()})),e(this,"restart",(()=>{this.currentTime=0})),e(this,"rewind",(e=>{this.currentTime-=$(e)?e:this.config.seekTime})),e(this,"forward",(e=>{this.currentTime+=$(e)?e:this.config.seekTime})),e(this,"increaseVolume",(e=>{const t=this.media.muted?0:this.volume;this.volume=t+($(e)?e:0)})),e(this,"decreaseVolume",(e=>{this.increaseVolume(-e)})),e(this,"airplay",(()=>{me.airplay&&this.media.webkitShowPlaybackTargetPicker()})),e(this,"toggleControls",(e=>{if(this.supported.ui&&!this.isAudio){const t=oe(this.elements.container,this.config.classNames.hideControls),i=void 0===e?void 0:!e,s=le(this.elements.container,this.config.classNames.hideControls,i);if(s&&D(this.config.controls)&&this.config.controls.includes("settings")&&!W(this.config.settings)&&We.toggleMenu.call(this,!1),s!==t){const e=s?"controlshidden":"controlsshown";ve.call(this,this.media,e)}return!s}return!1})),e(this,"on",((e,t)=>{fe.call(this,this.elements.container,e,t)})),e(this,"once",((e,t)=>{ye.call(this,this.elements.container,e,t)})),e(this,"off",((e,t)=>{be(this.elements.container,e,t)})),e(this,"destroy",((e,t=!1)=>{if(!this.ready)return;const i=()=>{document.body.style.overflow="",this.embed=null,t?(Object.keys(this.elements).length&&(te(this.elements.buttons.play),te(this.elements.captions),te(this.elements.controls),te(this.elements.wrapper),this.elements.buttons.play=null,this.elements.captions=null,this.elements.controls=null,this.elements.wrapper=null),j(e)&&e()):(we.call(this),Le.cancelRequests.call(this),se(this.elements.original,this.elements.container),ve.call(this,this.elements.original,"destroyed",!0),j(e)&&e.call(this.elements.original),this.ready=!1,setTimeout((()=>{this.elements=null,this.media=null}),200))};this.stop(),clearTimeout(this.timers.loading),clearTimeout(this.timers.controls),clearTimeout(this.timers.resized),this.isHTML5?(at.toggleNativeControls.call(this,!0),i()):this.isYouTube?(clearInterval(this.timers.buffering),clearInterval(this.timers.playing),null!==this.embed&&j(this.embed.destroy)&&this.embed.destroy(),i()):this.isVimeo&&(null!==this.embed&&this.embed.unload().then(i),setTimeout(i,200))})),e(this,"supports",(e=>me.mime.call(this,e))),this.timers={},this.ready=!1,this.loading=!1,this.failed=!1,this.touch=me.touch,this.media=t,_(this.media)&&(this.media=document.querySelectorAll(this.media)),(window.jQuery&&this.media instanceof jQuery||q(this.media)||D(this.media))&&(this.media=this.media[0]),this.config=X({},Qe,Tt.defaults,i||{},(()=>{try{return JSON.parse(this.media.getAttribute("data-plyr-config"))}catch(e){return{}}})()),this.elements={container:null,fullscreen:null,captions:null,buttons:{},display:{},progress:{},inputs:{},settings:{popup:null,menu:null,panels:{},buttons:{}}},this.captions={active:null,currentTrack:-1,meta:new WeakMap},this.fullscreen={active:!1},this.options={speed:[],quality:[]},this.debug=new it(this.config.debug),this.debug.log("Config",this.config),this.debug.log("Support",me),I(this.media)||!H(this.media))return void this.debug.error("Setup failed: no suitable element passed");if(this.media.plyr)return void this.debug.warn("Target already setup");if(!this.config.enabled)return void this.debug.error("Setup failed: disabled by config");if(!me.check().api)return void this.debug.error("Setup failed: no support");const s=this.media.cloneNode(!0);s.autoplay=!1,this.elements.original=s;const n=this.media.tagName.toLowerCase();let a=null,l=null;switch(n){case"div":if(a=this.media.querySelector("iframe"),H(a)){if(l=ze(a.getAttribute("src")),this.provider=function(e){return/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e)?Ge.youtube:/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e)?Ge.vimeo:null}(l.toString()),this.elements.container=this.media,this.media=a,this.elements.container.className="",l.search.length){const e=["1","true"];e.includes(l.searchParams.get("autoplay"))&&(this.config.autoplay=!0),e.includes(l.searchParams.get("loop"))&&(this.config.loop.active=!0),this.isYouTube?(this.config.playsinline=e.includes(l.searchParams.get("playsinline")),this.config.youtube.hl=l.searchParams.get("hl")):this.config.playsinline=!0}}else this.provider=this.media.getAttribute(this.config.attributes.embed.provider),this.media.removeAttribute(this.config.attributes.embed.provider);if(W(this.provider)||!Object.values(Ge).includes(this.provider))return void this.debug.error("Setup failed: Invalid provider");this.type=et;break;case"video":case"audio":this.type=n,this.provider=Ge.html5,this.media.hasAttribute("crossorigin")&&(this.config.crossorigin=!0),this.media.hasAttribute("autoplay")&&(this.config.autoplay=!0),(this.media.hasAttribute("playsinline")||this.media.hasAttribute("webkit-playsinline"))&&(this.config.playsinline=!0),this.media.hasAttribute("muted")&&(this.config.muted=!0),this.media.hasAttribute("loop")&&(this.config.loop.active=!0);break;default:return void this.debug.error("Setup failed: unsupported type")}this.supported=me.check(this.type,this.provider,this.config.playsinline),this.supported.api?(this.eventListeners=[],this.listeners=new lt(this),this.storage=new Re(this),this.media.plyr=this,H(this.elements.container)||(this.elements.container=Z("div",{tabindex:0}),J(this.media,this.elements.container)),at.migrateStyles.call(this),at.addStyleHook.call(this),pt.setup.call(this),this.config.debug&&fe.call(this,this.elements.container,this.config.events.join(" "),(e=>{this.debug.log(`event: ${e.type}`)})),this.fullscreen=new st(this),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&at.build.call(this),this.listeners.container(),this.listeners.global(),this.config.ads.enabled&&(this.ads=new gt(this)),this.isHTML5&&this.config.autoplay&&this.once("canplay",(()=>ke(this.play()))),this.lastSeekTime=0,this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))):this.debug.error("Setup failed: no support")}get isHTML5(){return this.provider===Ge.html5}get isEmbed(){return this.isYouTube||this.isVimeo}get isYouTube(){return this.provider===Ge.youtube}get isVimeo(){return this.provider===Ge.vimeo}get isVideo(){return this.type===et}get isAudio(){return this.type===Ze}get playing(){return Boolean(this.ready&&!this.paused&&!this.ended)}get paused(){return Boolean(this.media.paused)}get stopped(){return Boolean(this.paused&&0===this.currentTime)}get ended(){return Boolean(this.media.ended)}set currentTime(e){if(!this.duration)return;const t=$(e)&&e>0;this.media.currentTime=t?Math.min(e,this.duration):0,this.debug.log(`Seeking to ${this.currentTime} seconds`)}get currentTime(){return Number(this.media.currentTime)}get buffered(){const{buffered:e}=this.media;return $(e)?e:e&&e.length&&this.duration>0?e.end(0)/this.duration:0}get seeking(){return Boolean(this.media.seeking)}get duration(){const e=parseFloat(this.config.duration),t=(this.media||{}).duration,i=$(t)&&t!==1/0?t:0;return e||i}set volume(e){let t=e;_(t)&&(t=Number(t)),$(t)||(t=this.storage.get("volume")),$(t)||({volume:t}=this.config),t>1&&(t=1),t<0&&(t=0),this.config.volume=t,this.media.volume=t,!W(e)&&this.muted&&t>0&&(this.muted=!1)}get volume(){return Number(this.media.volume)}set muted(e){let t=e;O(t)||(t=this.storage.get("muted")),O(t)||(t=this.config.muted),this.config.muted=t,this.media.muted=t}get muted(){return Boolean(this.media.muted)}get hasAudio(){return!this.isHTML5||(!!this.isAudio||(Boolean(this.media.mozHasAudio)||Boolean(this.media.webkitAudioDecodedByteCount)||Boolean(this.media.audioTracks&&this.media.audioTracks.length)))}set speed(e){let t=null;$(e)&&(t=e),$(t)||(t=this.storage.get("speed")),$(t)||(t=this.config.speed.selected);const{minimumSpeed:i,maximumSpeed:s}=this;t=ft(t,i,s),this.config.speed.selected=t,setTimeout((()=>{this.media&&(this.media.playbackRate=t)}),0)}get speed(){return Number(this.media.playbackRate)}get minimumSpeed(){return this.isYouTube?Math.min(...this.options.speed):this.isVimeo?.5:.0625}get maximumSpeed(){return this.isYouTube?Math.max(...this.options.speed):this.isVimeo?2:16}set quality(e){const t=this.config.quality,i=this.options.quality;if(!i.length)return;let s=[!W(e)&&Number(e),this.storage.get("quality"),t.selected,t.default].find($),n=!0;if(!i.includes(s)){const e=Ae(i,s);this.debug.warn(`Unsupported quality option: ${s}, using ${e} instead`),s=e,n=!1}t.selected=s,this.media.quality=s,n&&this.storage.set({quality:s})}get quality(){return this.media.quality}set loop(e){const t=O(e)?e:this.config.loop.active;this.config.loop.active=t,this.media.loop=t}get loop(){return Boolean(this.media.loop)}set source(e){wt.change.call(this,e)}get source(){return this.media.currentSrc}get download(){const{download:e}=this.config.urls;return U(e)?e:this.source}set download(e){U(e)&&(this.config.urls.download=e,We.setDownloadUrl.call(this))}set poster(e){this.isVideo?at.setPoster.call(this,e,!1).catch((()=>{})):this.debug.warn("Poster can only be set for video")}get poster(){return this.isVideo?this.media.getAttribute("poster")||this.media.getAttribute("data-poster"):null}get ratio(){if(!this.isVideo)return null;const e=Me(Ne.call(this));return D(e)?e.join(":"):e}set ratio(e){this.isVideo?_(e)&&Pe(e)?(this.config.ratio=Me(e),xe.call(this)):this.debug.error(`Invalid aspect ratio specified (${e})`):this.debug.warn("Aspect ratio can only be set for video")}set autoplay(e){this.config.autoplay=O(e)?e:this.config.autoplay}get autoplay(){return Boolean(this.config.autoplay)}toggleCaptions(e){Ye.toggle.call(this,e,!1)}set currentTrack(e){Ye.set.call(this,e,!1),Ye.setup.call(this)}get currentTrack(){const{toggled:e,currentTrack:t}=this.captions;return e?t:-1}set language(e){Ye.setLanguage.call(this,e,!1)}get language(){return(Ye.getCurrentTrack.call(this)||{}).language}set pip(e){if(!me.pip)return;const t=O(e)?e:!this.pip;j(this.media.webkitSetPresentationMode)&&this.media.webkitSetPresentationMode(t?Xe:Je),j(this.media.requestPictureInPicture)&&(!this.pip&&t?this.media.requestPictureInPicture():this.pip&&!t&&document.exitPictureInPicture())}get pip(){return me.pip?W(this.media.webkitPresentationMode)?this.media===document.pictureInPictureElement:this.media.webkitPresentationMode===Xe:null}setPreviewThumbnails(e){this.previewThumbnails&&this.previewThumbnails.loaded&&(this.previewThumbnails.destroy(),this.previewThumbnails=null),Object.assign(this.config.previewThumbnails,e),this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))}static supported(e,t,i){return me.check(e,t,i)}static loadSprite(e,t){return Ve(e,t)}static setup(e,t={}){let i=null;return _(e)?i=Array.from(document.querySelectorAll(e)):q(e)?i=Array.from(e):D(e)&&(i=e.filter(H)),W(i)?null:i.map((e=>new Tt(e,t)))}}var kt;return Tt.defaults=(kt=Qe,JSON.parse(JSON.stringify(kt))),Tt}));