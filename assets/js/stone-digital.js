(function (window, document, $, undefined) {
    'use strict';

    var stoneDL = {
        i: function (e) {
            stoneDL.d();
            stoneDL.methods();
        },
        d: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function (e) {
            stoneDL.stdlProgressTracker();
            stoneDL.colorModeScheme();
            stoneDL.stickyHeaderMenu();
            stoneDL.testsmoothScroll();
            stoneDL.popupMobileMenu();
            stoneDL.owlCarouselInit();
            stoneDL.STDLFaq();
            stoneDL.STDLVideoPlyr();
            stoneDL.inputField();
            stoneDL.stdlAjaxLoadPost();
            stoneDL.stdlCustomSelect();
            stoneDL.stdIsotopFilter();
            stoneDL.stdPopUpModule();
            stoneDL.stdAjaxPopUpModule();
            stoneDL.stdLoadMoreReview();
            stoneDL.stdlBgMarque();
            stoneDL.stdlHobbyGallery();
            stoneDL.tableofContentforMobile();
            stoneDL.nitropack_load();

            // stoneDL.aviOwlCarousel();
            // stoneDL.avifancybox();
        },
        stdlProgressTracker: function() {
            $(document).ready(function() {
                var svgPath = document.querySelector(".progress-wrap path"), 
                    pTracker = svgPath.getTotalLength();
                    svgPath.style.transition = svgPath.style.WebkitTransition = "none",
                    svgPath.style.strokeDasharray = pTracker + " " + pTracker,
                    svgPath.style.strokeDashoffset = pTracker,
                    svgPath.getBoundingClientRect(),
                    svgPath.style.transition = svgPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
                var Tracker = function() {
                    var Tracker = $(window).scrollTop(), 
                    range = $(document).height() - $(window).height(), 
                    line = pTracker - Tracker * pTracker / range;
                    svgPath.style.strokeDashoffset = line
                };
                Tracker(),
                $(window).scroll(Tracker);
                $(window).on("scroll", function() {
                    $(this).scrollTop() > 50 ? $(".progress-wrap").addClass("active-progress") : $(".progress-wrap").removeClass("active-progress")
                }),
                $(".progress-wrap").on("click", function(event) {
                    return event.preventDefault(),
                    $("html, body").animate({
                        scrollTop: 0
                    }, 550),
                    !1
                })
            })
        },
        stickyHeaderMenu: function() {
            $(window).on('load', function(){

                var header_area = $('.stdl-header');
                var main_area = header_area.find('.stdl-sticky-header');
                var zero = 0;
                var navbarSticky = $('.navbar-sticky');
            
                $(window).scroll(function(){
                  var st = $(this).scrollTop();
                  if (st > zero){
                    main_area.addClass('navbar-scrollup');
                  } else {
                    main_area.removeClass('navbar-scrollup');
                  }
                  zero = st;
            
                  if(main_area.hasClass('navbar-sticky') && ( $(this).scrollTop() <= 600 || $(this).width() <= 300)){
                    main_area.removeClass('navbar-scrollup');
                    main_area.removeClass('navbar-sticky').appendTo(header_area);
                    header_area.css('height', 'auto');
                  }else if( !main_area.hasClass('navbar-sticky') && $(this).width() > 300 && $(this).scrollTop() > 600 ){
                    header_area.css('height', header_area.height());
                    main_area.addClass('navbar-scrollup');
                    main_area.css({'opacity': '0'}).addClass('navbar-sticky');
                    main_area.appendTo($('body')).animate({'opacity': 1});
                  }
                });
            
                $(window).trigger('resize');
                $(window).trigger('scroll');
              });
            
        },    
        
        colorModeScheme: function() {
         
        },  
        
        testsmoothScroll: function() {
         
        },

        popupMobileMenu: function (e) {

            // dropdown/megamenu indicators
            let mobileMenu = $('ul.stdl-mobile-menu-wrapper');
            mobileMenu.on('click', '.menu-item > a .stdl-nav-icon', function (e) {
     
                var animationSpeed = 500,
                    subMenuSelector = '.stdl-dropdown',
                    $this = $(this).parent(),
                    checkElement = $this.next();
                  
                if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass('open');
                        $(this).removeClass('active');
                    });
                    checkElement.parent(".menu-item").removeClass("active");
                } else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
                    var parent = $this.parents('ul').first();
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    ul.removeClass('open');
                    $(this).removeClass('active');
                    var parent_li = $this.parent("li");
                    checkElement.slideDown(animationSpeed, function () {
                        checkElement.addClass('open');
                        $(this).addClass('active');
                        parent.find('.menu-item.active').removeClass('active');
                        parent_li.addClass('active');
                    });
                }
                if (checkElement.is(subMenuSelector)) {
                    e.preventDefault();
                }
    
        });
            

          //Mobile Nav Hide/ Show
            if ($(".stdl-toggle_menu").length) {
                // var mobileMenuContent = $("header.stdl-header .stdl-header__menu .main-navigation").html();
                var mobileNavContainer = $(".mobile-nav__container");
                // mobileNavContainer.append(mobileMenuContent);
                //Menu Toggle Btn
                $(".stdl-toggle-action").on("click", function () {
                $(".stdl-toggle_menu").addClass("active");
                });

                $(".toggle_menu-overlay,.stdl-close_btn").on(
                "click",function (e) {
                    $(".stdl-toggle_menu").removeClass("active");
                    e.preventDefault();
                });
            }

        },

        owlCarouselInit: function (e) {
            
              //  featured Logo Js
              var featuredLogoBlockWrapper = $('.section-stdl-featured-logo');
              var featuredLogoCarousel = featuredLogoBlockWrapper.find('.featured-logo-carousel');
              if (featuredLogoCarousel.length) {
                  featuredLogoCarousel.owlCarousel({
                      loop:false,
                      margin:15,
                      nav:false,
                      items:2,
                      dots:false,
                      navText: [
                        `<span class="icon"><svg class="left-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.25 12H3.75M3.75 12L10.5 5.25M3.75 12L10.5 18.75" stroke="#c1c1c1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
                        `<span class="icon"><svg class="right-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" stroke="#c1c1c1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
                      ],
                      responsive:{
                          0:{
                              items:1,
                              dots:true
                          },
                          600:{
                              items:3
                          },
                          769:{
                              items:3
                          },
                          1251:{
                              items:3
                          }
                      }
                  });
              }

            //  featured Logo Js
            var brandLogoBlockWrapper = $('.stdl-brand-logo');
            var brandLogoCarousel = brandLogoBlockWrapper.find('.stdl-brand-logo-carousel');
            if (brandLogoCarousel.length) {
                brandLogoCarousel.owlCarousel({
                    center: true,
                    loop:true,
                    margin:15,
                    nav:false,
                    items:2,
                    dots:false,
                    autoplay:true,
                    slideTransition: 'linear',
                    autoplayTimeout: 6000,
                    autoplaySpeed: 6000,
                    autoplayHoverPause: true,
                    responsive:{
                        0:{
                            items:2,
                            dots:false
                        },
                        600:{
                            items:3
                        },
                        769:{
                            items:4
                        },
                        1251:{
                            items:6
                        }
                    }
                });
            }     
            
            //  Post carousel / Grid Js
            var postBlockWrapper = $('.stdl-section-post-content');
            var postCarousel = postBlockWrapper.find('.stdl-post__carousel');
            if (postCarousel.length) {
                postCarousel.owlCarousel({
                    center: false,
                    loop:true,
                    margin:15,
                    nav:true,
                    items:1,
                    dots:false,
                    autoPlay: true,
                    // autoHeight: true,
                    navText: [
                        `<span class="icon"><svg class="left-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.25 12H3.75M3.75 12L10.5 5.25M3.75 12L10.5 18.75" stroke="#c1c1c1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
                        `<span class="icon"><svg class="right-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" stroke="#c1c1c1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
                    ],
                    responsive:{
                        600:{
                            items:3
                        },
                        769:{
                            items:3
                        },
                        1251:{
                            items:3
                        }
                    }
                });
            } 
            //  Team carousel / Grid Js
            var teamBlockWrapper = $('.stdl-section-team');
            var teamCarousel = teamBlockWrapper.find('.stdl-our-team__carousel');
            if (teamCarousel.length) {
                teamCarousel.owlCarousel({
                    center: false,
                    loop:true,
                    margin:16,
                    nav:false,
                    items:1,
                    dots:false,
                    autoPlay: true,
                    responsive:{
                        0:{
                            items:1,
                            dots:true
                        },
                        600:{
                            items:2
                        },
                        769:{
                            items:2
                        },
                        1251:{
                            items:2
                        }
                    }
                });

                 // Custom nav
                jQuery('.team-next-btn').click(function() {
                    teamCarousel.trigger('next.owl.carousel');
                });
                jQuery('.team-prev-btn').click(function() {
                    teamCarousel.trigger('prev.owl.carousel');
                });
            }   
            
            //  Reviewer Carousel Js
            var reviewsBlockWrapper = $('.stdl-section-reviews');
            var reviewCarousel = reviewsBlockWrapper.find('.stdl-review-carousel');
            if (reviewCarousel.length) {
                reviewCarousel.owlCarousel({
                    center: false,
                    loop:true,
                    margin:16,
                    nav:false,
                    items:1,
                    dots:false,
                    autoPlay: true,
                    responsive:{
                        0:{
                            items:1,
                            dots:true
                        },
                        600:{
                            items:1
                        },
                        769:{
                            items:1
                        },
                        1251:{
                            items:1
                        }
                    }
                });

                 // Custom nav
                jQuery('.review-next-btn').click(function() {
                    reviewCarousel.trigger('next.owl.carousel');
                });
                jQuery('.review-prev-btn').click(function() {
                    reviewCarousel.trigger('prev.owl.carousel');
                });
            }

        },
        STDLFaq: function (e) {
            // var accordionTitle = $('.stdl-faq-items').find( '.stdl-faq-item__title' );

            var accordionTitle = $('.stdl-faq-items').find( '.stdl-faq-item__title' );
    
            // Open default actived tab
            accordionTitle.each(function(){
                if($(this).hasClass( 'active-default' ) ){
                    $(this).addClass( 'active' );
                    $(this).next( '.stdl-faq-item__content' ).slideDown();
                }
            });
            
            // Remove multiple click event for nested accordion
            accordionTitle.unbind( 'click' );
        
            accordionTitle.click(function(e){
                e.preventDefault();
                if ($(this).hasClass( 'active' ) ) {
                    $(this).removeClass( 'active' );
                    $(this).parent().removeClass( 'active' );
                    $(this).next().slideUp(300);
                } else {
                    $('.stdl-faq-item').not($(this).parent()).removeClass( 'active' );
                    $(this).parent().parent().find( '.stdl-faq-item__title' ).removeClass( 'active' );
                    $(this).parent().parent().find( '.stdl-faq-item__content' ).slideUp(300);
                    $(this).toggleClass( 'active' );
                    $(this).parent().addClass( 'active' );
                    $(this).next().slideToggle(300);
                }	
            } );  
        },
        STDLVideoPlyr: function (e) {
            var stdlVideoPlyr = $('.stdl-video-content');
            if(stdlVideoPlyr.length){
                setTimeout(function() {
                    var player = new Plyr('#stdl-video-player', {
                    debug: true,
                    volume: 0,
                    autoplay: false,
                    muted: true
                    });
                    player.play();
                }, 2000);
                
            }  
        },
        inputField: function() { 
            let Selectortext = $('.ginput_complex').find('input[type="text"]');
            Selectortext.on("click", function (e) {
                e.preventDefault();
                let parentElement = $(this).parent().parent().parent();
                parentElement.find('.stdl-icon svg path').css('stroke', 'var(--color-white)');
            });   
            
            let Selector = $('.gfield').find('input:not([type="checkbox"]):not([type="radio"]), textarea');
            Selector.on("click", function (e) {
                e.preventDefault();
                let parentElement = $(this).parent().parent();
                parentElement.find('.stdl-icon svg path').css('stroke', 'var(--color-white)');
            });
        },
        stdlAjaxLoadPost: function() {
            let container = $('.stdl-section-archive-blog').find('.stdl-post__grid'),
                actionBtn = $('.stdl-section-archive-blog').find('.stdl-load-post'),
                btnText = actionBtn.text(),
                PrNewsPostType = 'post',
                PrNewsPostTaxSlug= 'category',
                PrNewsPostTermId = null;
                let currentPage = 1;
            $(document).on('click', '.stdl-section-archive-blog .stdl-load-post', function(e) {
                e.preventDefault();
                var page = 2;
                currentPage++; 

                if($('.stdl-terms-wrapper li').hasClass('active')) {
                    var that = $('.stdl-terms-wrapper li.active'); 
                    PrNewsPostType = $(that).data('post-type'); 
                    PrNewsPostTaxSlug = $(that).data('taxonomy'); 
                    PrNewsPostTermId = $(that).data('id'); 
                }
                $.ajax({
                    url: stdl_ajax_object.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'load_more_post',
                        paged : currentPage,
                        postType: PrNewsPostType,
                        postTypeTax: PrNewsPostTaxSlug,
                        taxId: PrNewsPostTermId,
                    },
                    beforeSend : function ( xhr ) {
                        actionBtn.text('Loading...');
                    },
                    success: function( html ) {
                  
                        if( html.length && html != 0 ){
                            actionBtn.text(btnText);
                            container.append(html);
                            page++;
                        } else {
                            actionBtn.remove();
                        }
                    },
                    complete: function () {
                     
                    },
                    error: function (html) {
                    
                    },
                });
            });

            let projectContainer = $('.stdl-section-archive-project').find('.article-wrapper.article-project'),
                actionBtnProject = $('.stdl-section-archive-project').find('a.stdl-load-project'),
                btnTextProject = actionBtnProject.text();

            let taxonomyName = null,
                TaxSlug = null,
                TaxId = null,
                projectPage = 1,
                ldMoreTermsPage = 1,
                maxNum = 1;

            $(document).on('click', '.stdl-section-archive-project a.stdl-load-project', function(e) {
                e.preventDefault();
                projectPage++;
                taxonomyName = $(this).data('taxonomy');
                TaxSlug = $(this).data('TaxSlug');
                TaxId = $(this).data('taxid');
                maxNum = $(this).data('max-num');

                $.ajax({
                    url: stdl_ajax_object.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'load_more_projects',
                        paged : projectPage,
                        taxonomyName : taxonomyName,
                        termSlug : TaxSlug,
                        termID : TaxId,
                    },
                    beforeSend : function ( xhr ) {
                        actionBtnProject.text('Loading...');
                    },
                    success: function( html ) {
                        if(projectPage >= maxNum) {
                            actionBtnProject.remove();
                        }
                        if( html.length && html != 0 ){
                            actionBtnProject.text(btnTextProject);
                            projectContainer.append(html);
                        } else {
                            actionBtnProject.remove();
                  
                        }
                    },
                    complete: function () {
                     
                    },
                    error: function (html) {
                    
                    },
                });
            });

            let categoryContainer = $('.stdl-section-archive-post').find('.stdl-post__grid'),
                actionBtnCategory = $('.stdl-section-archive-post').find('a.stdl-loadmore-terms'),
                btnTextCategory = actionBtnCategory.text();

            $(document).on('click', '.stdl-section-archive-post a.stdl-loadmore-terms', function(e) {
                e.preventDefault();
                ldMoreTermsPage++;
                taxonomyName = $(this).data('taxonomy');
                TaxSlug = $(this).data('taxslug');
                TaxId = $(this).data('taxid');

                $.ajax({
                    url: stdl_ajax_object.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'load_more_terms',
                        paged : ldMoreTermsPage,
                        taxonomyName : taxonomyName,
                        termSlug : TaxSlug,
                        termID : TaxId,
                    },
                    beforeSend : function ( xhr ) {
                        actionBtnCategory.text('Loading...');
                    },
                    success: function( html ) {
                      
                        if( html.length && html != 0 ){
                            actionBtnCategory.text(btnTextCategory);
                            categoryContainer.append(html);
                        } else {
                            actionBtnCategory.remove();
                  
                        }
                    },
                    complete: function () {
                     
                    },
                    error: function (html) {
                    
                    },
                });
            });
        },  
        stdlCustomSelect: function() {
            let postArContainer = $('.stdl-section-archive-blog').find('.stdl-post__grid');
            let getReSourceSearchVal = null,
                PrNewsPostType = 'post',
                PrNewsPostTaxSlug= 'category',
                PrNewsPostTermId = null,
                actionBtn = $('.stdl-section-archive-blog').find('.stdl-load-post'),
                btnText = actionBtn.text();
            $(document).on('keyup','#stdl-resourcesearch',function(e) {
                e.preventDefault();
                var typedSearch = $(this).val();
                var finalSearchVal = $('#stdl-researchedtext').attr('class',typedSearch);
                if (typedSearch.length){
                    getReSourceSearchVal = typedSearch;
                } else {
                    getReSourceSearchVal = null;
                }
                
                if($('.stdl-terms-wrapper li').hasClass('active')) {
                    var that = $('.stdl-terms-wrapper li.active'); 
                    PrNewsPostType = $(that).data('post-type'); 
                    PrNewsPostTaxSlug = $(that).data('taxonomy'); 
                    PrNewsPostTermId = $(that).data('id'); 
                }
                $.ajax({
                    url: stdl_ajax_object.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'load_more_post',
                        postType: PrNewsPostType,
                        postTypeTax: PrNewsPostTaxSlug,
                        taxId: PrNewsPostTermId,
                        keyword: getReSourceSearchVal
                    },
                    beforeSend : function ( xhr ) {
                        actionBtn.text('Loading...');
                 
                    },
                    success: function( response ) {
                       
                        if( response.length && response != 0 ){
                            postArContainer.html(response);
                          
                        } else {
                            actionBtn.remove();
                        }
                    },
                    complete: function () {
                     
                    },
                    error: function (html) {
                    
                    },
                });
            });

     
            let page = 1;
            $('.stdl-custom-select').on('click', function (e) {
                $(this).toggleClass('active');
              });
        
            //   $( ".stdl-terms-list li" ).each(function(index) {
                $('.stdl-terms-list li').on("click", function(e){
                    
                    e.preventDefault();
                    // Get the href attribute of the clicked item
                    let pageLink = $(this).find('a').attr('href');
                    // Navigate to the selected page
                    window.location.href = pageLink;
                    // Update the selected item's style
                    $(this).addClass('active').siblings('li').removeClass('active');
                    $(this).parent().addClass('active');
                    // Update the custom dropdown button text
                    let updateSelected = $(this).text();
                    let setInnerText = $('.stdl-custom-select .select-btn').find('.sBtn-text');
                    setInnerText.html(updateSelected);
                    // Close the dropdown
                    $(this).parent().removeClass('active');

                });

                    page++;
                    let getSearchVal = jQuery('#stdl-resourcesearch').val();
    
                    $('.ajax-action.stdl-terms-list li').on("click", function(e){
                        var loadTotal = $(this).parent().data('total-post');
                        var selectedTerm = $(this).data('id'); 
                        PrNewsPostType = $(this).data('post-type'); 
                        PrNewsPostTaxSlug = $(this).data('taxonomy'); 
                        PrNewsPostTermId = $(this).data('id'); 
                        e.preventDefault();
                    $.ajax({
                        url: stdl_ajax_object.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'load_more_post',
                            paged: page,
                            postType: PrNewsPostType,
                            postTypeTax: PrNewsPostTaxSlug,
                            taxId: selectedTerm,
                            keyword: getSearchVal
                        },
                        beforeSend : function ( xhr ) {
                            actionBtn.text('Loading...');
                            // postArContainer.empty();
                     
                        },
                        success: function( response ) {
                           
                            if( response.length && response != 0 ){
                                actionBtn.text(btnText);
                                postArContainer.html(response);
                                page++;
                            } else {
                                actionBtn.remove();
                      
                            }
                        },
                        complete: function () {
                         
                        },
                        error: function (html) {
                        
                        },
                    });
                });
            // });
            $('.stdl-custom-select .select-btn svg').on('click', function (e) {
                $('.stdl-custom-select').removeClass("active");
            });
        },
        stdIsotopFilter: function() {
            $('.stdl-page-projects .stdl-filterable-menu-test li').on('click', function (e) {
                e.preventDefault();
                $(this).addClass('active').siblings('li.filter-item').removeClass('active');
                let selectedLocation = $(this).attr('data-filter');
                $('.article-wrapper .grid-article').each(function() {
                    if (!$(this).hasClass(selectedLocation) && selectedLocation != 'all') {
                        $(this).addClass('hide');
                    } else {
                        $(this).removeClass('hide');
                    }
                });
            });
        },
        stdPopUpModule: function() {
            var body = $('body');
            var modalAction = $('body').find('a.popup-action');
    
            modalAction.each(function (e) {
                $(this).off('click');
                $(this).on('click', function (e) {
                e.preventDefault();
                let selectorId = $(this).data('action-id'),
                    modalmainWrapper = $('.stdl-popup.'+ selectorId ),
                    // selectorContent = $('#' + selectorId ).html(),
                    modalWrapper = modalmainWrapper.find('.stdl-popup-module'),
                    modalContainer = modalWrapper.find('.stdl-popup-content'),
                    modalOverlayWrapper = body.find('.stdl-popup-overlay'),
                    closeButton = modalWrapper.find('.stdl-close-btn');
                    modalWrapper.css('display', 'block');
                    body.addClass('modal-opened');
                    modalWrapper.addClass('active');
                    modalOverlayWrapper.addClass('active');
                    closeButton.click(function () {
                        modalOverlayWrapper.removeClass('active');
                        modalWrapper.removeClass('active');
                        body.removeClass('modal-opened');
                    });
                    modalOverlayWrapper.click(function () {
                        $(this).removeClass('active');
                        modalWrapper.removeClass('active');
                        body.removeClass('modal-opened');
                    });
                    
                });
            });
        },
        stdAjaxPopUpModule: function() {
            var body = $('body');
            var modalAction = $('body').find('a.popup-ajax-action');

                $(modalAction).on('click', function (e) {
             
                let selectorId = $(this).data('action-id'),
                    modalmainWrapper = $('.stdl-popup'),
                    selectorContent = $('#' + selectorId ).html(),
                    modalWrapper = modalmainWrapper.find('.stdl-popup-module'),
                    modalContainer = modalWrapper.find('.stdl-popup-content'),
                    modalOverlayWrapper = body.find('.stdl-popup-overlay'),
                    closeButton = modalWrapper.find('.stdl-close-btn');
                    modalWrapper.css('display', 'block');
          
                    body.addClass('modal-opened');
                    modalOverlayWrapper.addClass('active');
                    e.preventDefault();
                    $.ajax({
                        url: stdl_ajax_object.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'load_popup_content',
                            popUpId : selectorId,
                        },
                        beforeSend : function ( xhr ) {
                            // actionBtnProject.text('Loading...');
                            modalOverlayWrapper.addClass('active stdl-loading');
                            modalOverlayWrapper.html('<div class="stdl-loader-wrap"><div class="stdl-loader"><div></div></div></div>');
                        },
                        success: function( response ) {
                            setTimeout(function () {
                                modalWrapper.slideDown("slow", function () {
                                    body.addClass('modal-opened');
                                    modalWrapper.addClass('active');
                                    modalOverlayWrapper.addClass('active');
                                    modalContainer.html(response);
                                    closeButton.addClass('active').show();
                                });
                            }, 300);
                        },
                        complete: function () {
                            modalOverlayWrapper.removeClass('stdl-loading');
                            modalOverlayWrapper.empty();
                        },
                        error: function (xhr) {
                            console.log("Quick View Not Loaded" + xhr.statusText + xhr.responseText);
                        },
                    });

                    closeButton.click(function () {
                        modalOverlayWrapper.removeClass('active');
                        modalWrapper.removeClass('active');
                        body.removeClass('modal-opened');
                    });
                    modalOverlayWrapper.click(function () {
                        $(this).removeClass('active');
                        modalWrapper.removeClass('active');
                        body.removeClass('modal-opened');
                    });
                    
                });
        },
        stdLoadMoreReview: function() {

            
                var itemsToShow = 3;
                var visibleItems = itemsToShow;
                var gridContainer = $(".client-fbk-items");
                var loadMoreBtn = $(".stdl-section-client-fbk").find('a.btn-primary');
                gridContainer.find(`.client-fbk-item:nth-child(n + ${visibleItems + 1})`).hide();
                if (visibleItems >= gridContainer.children().length) {
                    loadMoreBtn.hide();
                }
                loadMoreBtn.click(function() {
                var hiddenItems = gridContainer.find(`.client-fbk-item:hidden`).slice(0, itemsToShow);
                hiddenItems.show();
                visibleItems += itemsToShow;
                if (visibleItems >= gridContainer.children().length) {
                    loadMoreBtn.hide();
                }
            });


            var testimonialItems = $(".stdl-section-testimonials").find('.stdl-review-item');
            var readMoreBtn = testimonialItems.find(".stdl-review-item__text .read-more");
            let contentLengthThreshold = 100; // Adjust as needed

            // $('.stdl-review-item').each(function() {
            //     let selector = $(this).find('.stdl-review-item__text .review-text');
        
            //     // Set a threshold for content length
            //     var contentLengthThreshold = 100; // Adjust as needed
        
            //     // Check if initial content height exceeds the threshold
            //     if (selector[0].scrollHeight > contentLengthThreshold) {
            //         readMoreBtn.show();
            //     } else {
            //         // If content is shorter than the threshold, hide the button
            //         readMoreBtn.hide();
            //     }
            // });
            $('.stdl-section-testimonials .stdl-review-item').each(function() {
                let thisparent = $(this);
                let selector = thisparent.find('.stdl-review-item__text .review-text');
                let readMoreBtn = thisparent.find('a.read-more'); // Assuming .read-more-btn is the class of your "Read More" button
            
                // Set a threshold for content length
                var contentLengthThreshold = 100; // Adjust as needed
               
                // Check if initial content height exceeds the threshold
                if (selector[0].scrollHeight > 120) {
                    readMoreBtn.show();
                } else {
                    // If content is shorter than the threshold, hide the button
                    $(readMoreBtn).addClass('hide').hide();  
                }
            });
        
            $(readMoreBtn).on('click', function (e) {
                let thisparent = $(this).parents('.stdl-review-item');
                let selector = thisparent.find('.stdl-review-item__text .review-text');
                
                thisparent.toggleClass("expanded");
                var isExpanded = thisparent.hasClass("expanded");
        
                selector.css("max-height", isExpanded ? selector[0].scrollHeight + "px" : contentLengthThreshold + "px");
                $(this).text(isExpanded ? "Read Less" : "Read More");
            });
        
        },
        stdlBgMarque: function () {
            $('.background-marque').each(function () {
                var t = 0;
                var i = 1;
                var $this = $(this);
                setInterval(function () {
                    t += i;
                    $this.css('background-position-x', -t + "px");
                }, 10);
            });
        },   
        stdlHobbyGallery: function () {
            // var $gallery = $('.stdl-hobbies-gallery');
            // var $items = $gallery.find('.stdl-hobbies-gallery__item');
            // var currentIndex = 0;
        
            // function setInitialPositions() {
            //     $items.each(function(index) {
            //         var $item = $(this);
            //         var rotation_angle = 0;
            //         if (index % 2 === 0) {
            //             rotation_angle = -5 * Math.ceil(index / 2);
            //         } else if (index > 1) {
            //             rotation_angle = 5 * Math.floor((index + 1) / 2);
            //         }
        
            //         var z_index = 100 - index;
            //         $item.css({
            //             'transform': 'rotate(' + rotation_angle + 'deg)',
            //             'z-index': z_index
            //         });
            //     });
            // }
        
            // function updatePositions() {
            //     $items.each(function(index) {
            //         var $item = $(this);
            //         var z_index = 100 - index;
            //         $item.css('z-index', z_index);
            //     });
        
            //     // Move the current item to the front
            //     var $currentItem = $items.eq(currentIndex);
            //     $currentItem.css({
            //         'z-index': 101,
            //         'transform': 'rotate(0deg)'
            //     });
            // }
        
            // function nextItem() {
            //     currentIndex = (currentIndex + 1) % $items.length;
            //     var $firstItem = $items.first();
            //     $items = $items.slice(1).add($firstItem);
            //     $gallery.append($firstItem);
            //     updatePositions();
            // }
        
            // // Initial positions update
            // setInitialPositions();
            // updatePositions();
        
            // // Set interval for slider
            // setInterval(nextItem, 2000);

        }, 
        tableofContentforMobile: function () {
            jQuery(document).ready(function($) {
               // Function to set the widget-title text

                // Function to set the widget-title text
                function setWidgetTitleText(text) {
                    $('.table-of-contents-mobile .widget-title').text(text);
                }

                // // On page load, set the widget-title text to the first li text
                // setTimeout(function() {
                //     setWidgetTitleText($('.table-of-contents-mobile li:first-child a').text());
                // }, 1200);

                // Event handler for dropdown click
                
                    $('.table-of-contents-mobile .widget-title').click(function(event) {
                        var $this = $(this);
                        if ($this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').hasClass('show')) {
                            $this.removeClass('accordion-open');
                            $this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').removeClass('show');
                            $this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').slideUp(350);
                        } else {
                            $this.parents('.table-of-contents-mobile').find('.widget-title').removeClass('accordion-open');
                            $this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').removeClass('show').slideUp(350);
                            $this.addClass('accordion-open');
                            $this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').addClass('show');
                            $this.parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').slideToggle(350);
                        }
                    });

                //     // Event handler for li click
                    setTimeout(function () {
                        $('.table-of-contents-mobile').on('click', 'li a', function(event) {
                            // event.preventDefault(); // Prevent default action
                            var newTitle = $(this).text();
                            console.log("text:", newTitle)
                            setWidgetTitleText(newTitle); // Update the widget-title text
                            // // Optionally close the dropdown after selection
                            $(this).parents('.table-of-contents-mobile').find('.widget-title').removeClass('accordion-open');
                            $(this).parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').removeClass('show');
                            $(this).parents('.table-of-contents-mobile').find('.table-of-contents__wrapper').slideToggle(350);
                        });
                    }, 800);
                
                const tocContainer = document.getElementById('toc-content');
                // const tocToggle = document.getElementById('toc-toggle');
                const contentParent = document.querySelector('.stdl-post-content-left');

                // Function to generate the ToC
                function generateToC() {
                    if (!contentParent) {
                        return;
                    }
                    const headings = contentParent.querySelectorAll('h2, h3, h4, h5, h6');
                    const ul = document.createElement('ul');

                    headings.forEach(heading => {
                        const id = heading.id;
                        if (id) {  // Only create links for headings with IDs
                            const li = document.createElement('li');
                            const link = document.createElement('a');
                            link.textContent = heading.textContent;
                            link.href = `#${id}`;
                            link.classList.add('toc-link');

                            li.appendChild(link);
                            ul.appendChild(li);
                        }
                    });

                    tocContainer.appendChild(ul);
                }

                // // Toggle ToC visibility
                // tocToggle.addEventListener('click', function () {
                //     tocContainer.classList.toggle('hidden');
                // });

                setTimeout(function(){
                    generateToC();
                    setWidgetTitleText($('.table-of-contents-mobile li:first-child a').text());
                }, 1200);
            });
        }, 
        nitropack_load: function () {
            setTimeout(function(){
                var tag_new = jQuery("template").last().attr("id");
        
                jQuery("#" + tag_new).css("display", "none");
                jQuery("#" + tag_new).next().next().css("display", "none");
            }, 100);
        }
    
    }

    stoneDL.i();

})(window, document, jQuery);

jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
        

    
    });
	
});

// Function to toggle the theme
function themeToggle() {
    const element = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark-theme') {
        element.classList.remove('dark_theme');
        element.classList.add('light_theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        element.classList.remove('light_theme');
        element.classList.add('dark_theme');
        localStorage.setItem('theme', 'dark-theme');
    }
}

// Check for the user's preference and set the initial theme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const element = document.body;
if (savedTheme === 'dark-theme' || !savedTheme) {
    element.classList.add('dark_theme');
} else {
    element.classList.add('light_theme');
}