jQuery(function ($) {

    window.isMobile = function() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            $('body').addClass("disable-cursor");
            return true
            
        }
        else {
            if ($(window).width() <= 1024) {
                $('body').addClass("disable-cursor");
                return true 
            }		
        };
        return false
    };

    /*--------------------------------------------------
    Function Core
    ---------------------------------------------------*/
    window.Core = function() {

        // gsap.defaults({overwrite: "auto"});	
        // gsap.registerPlugin(ScrollMagic, ScrollTrigger, ScrollToPlugin, Draggable);
        // gsap.config({nullTargetWarn: false});
        // $(document).on("mousemove mouseenter", function(e) {
        //     const pointer = $("#magic-cursor");
        //     const follower = $("#ball");
        //     TweenMax.to(pointer, 0.8, {
        //       left: e.clientX,
        //       top: e.clientY,
        //       ease: Expo.easeOut
        //     });
        //     TweenMax.to(follower, 1.5, {
        //       left: e.clientX,
        //       top: e.clientY,
        //       ease: Expo.easeOut
        //     });
        //   });
        if (!isMobile() && !$('body').hasClass("disable-cursor")) {
            // gsap.defaults({overwrite: "auto"});	
            // gsap.registerPlugin(ScrollMagic, ScrollTrigger, ScrollToPlugin, Draggable);
            // gsap.config({nullTargetWarn: false});
            // var mouse = { x: 0, y: 0 };
            var pos = { x: 0, y: 0 };
            // var ratio = 0.65;			
            // var active = false;			
            // var ball = document.getElementById("ball");
            // var ballloader = document.getElementById("ball-loader");
            // var offsetX = 40;
            
            
            // gsap.set(ball, { xPercent: -50, yPercent: -50, scale:0.5, borderWidth: '4px' });
            
            // document.addEventListener("mousemove", mouseMove);
            
            // function mouseMove(e) {
            //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            //     mouse.x = e.pageX;
            //     mouse.y = e.pageY - scrollTop;
    
            // }
    
           
            
            // gsap.ticker.add(updatePosition);
            
            // function updatePosition() {
            //     if (!active) {
            //         pos.x += (mouse.x - pos.x) * ratio;
            //         pos.y += (mouse.y - pos.y) * ratio;
            
            //         gsap.to(ball, { duration: 0.4, x: pos.x, y: pos.y });
            //     }
            // }
        }
    }// End Core

});

var isMobile = window.isMobile;
var Core = window.Core;	

jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
	  if ($(window).width() <= 1024) {
      $('body').addClass("disable-cursor");
		
    } else {
      cussorAnim();
      // cussorButtonAnim();
    }
    heroImageScrolled();
    heroImage();
		sectionHeaderAnim();
		sectionImgAnim();
    projectsAnim();
    commonSectionAnim();
    carouselAnim();
		boxesAnim();
		showCase();
		horizontalSlider();
		StdlFaqAmin();
		serviceArchive();
		stdlTesimonials();
	});

    function cussorAnim() {
        var pos = { x: 0, y: 0 };
        gsap.defaults({overwrite: "auto"});	
        gsap.registerPlugin(ScrollMagic, ScrollTrigger, ScrollToPlugin, Draggable);
        gsap.config({nullTargetWarn: false});
        $(document).on("mousemove mouseenter", function(e) {
            const pointer = $(".pointer");
            const follower = $("#ball");
            TweenMax.to(pointer, 0.8, {
              left: e.clientX,
              top: e.clientY,
              ease: Expo.easeOut
            });
            TweenMax.to(follower, 1.5, {
              left: e.clientX,
              top: e.clientY,
              ease: Expo.easeOut
            });
          });

          // $(".parallax-wrap").mousemove(function(e) {
          //   parallaxCursor(e, this, 2);
          //   callParallax(e, this);
          // });
          // function callParallax(e, parent) {
          //   parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
          // }
        
          // function parallaxIt(e, parent, target, movement) {
          //   var boundingRect = parent.getBoundingClientRect();
          //   var relX = e.pageX - boundingRect.left;
          //   var relY = e.pageY - boundingRect.top;
          //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
          //   gsap.to(target, {
          //       duration: 0.3,
          //       x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
          //       y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
          //       ease: Power2.easeOut
          //   });
          // }
        
          // function parallaxCursor(e, parent, movement) {
          //   var rect = parent.getBoundingClientRect();
          //   var relX = e.pageX - rect.left;
          //   var relY = e.pageY - rect.top;
          //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          //   pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
          //   pos.y = rect.top + rect.height / 2  + (relY - rect.height / 2 - scrollTop)  / movement ;
          //   // gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
          // }

          // $('.stdl-section-btn').each(function() {
          //   $(this).on('mousemove', function(e) {
          //     const pos = this.getBoundingClientRect();
          //     const mx = e.clientX - pos.left - pos.width / 2;
          //     const my = e.clientY - pos.top - pos.height / 2;
              
          //     $(this).css('transform', 'translate(' + mx * 0.15 + 'px, ' + my * 0.3 + 'px)');
          //     $(this).css('transform', $(this).css('transform') + ' rotate3d(' + mx * -0.1 + ', ' + my * -0.3 + ', 0, 12deg)');
          //     $(this).children().first().css('transform', 'translate(' + mx * 0.025 + 'px, ' + my * 0.075 + 'px)');
          //   });
          
          //   $(this).on('mouseleave', function() {
          //     $(this).css('transform', 'translate3d(0px, 0px, 0px)');
          //     $(this).css('transform', $(this).css('transform') + ' rotate3d(0, 0, 0, 0deg)');
          //     $(this).children().first().css('transform', 'translate3d(0px, 0px, 0px)');
          //   });
          // });
          
          // // --- CURSOR
          // $(document).on('mousemove', function(e) {
          //   $('.cursor').css({
          //     left: (e.pageX - 25) + 'px',
          //     top: (e.pageY - 25) + 'px'
          //   });
          // });

         

    }

    function cussorButtonAnim() {
      // var magnets = document.querySelectorAll('.stdl-section-btn')
      // var strength = 50

      // magnets.forEach( (magnet) => {
      //   magnet.addEventListener('mousemove', moveMagnet );
      //   magnet.addEventListener('mouseout', function(event) {
      //     TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
      //   } );
      // });

      // function moveMagnet(event) {
      //   var magnetButton = event.currentTarget
      //   var bounding = magnetButton.getBoundingClientRect()

      //   //console.log(magnetButton, bounding)

      //   TweenMax.to( magnetButton, 1, {
      //     x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
      //     y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
      //     ease: Power4.easeOut
      //   })

      //   //magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
      // }
      // Utility functions for selecting elements
// Utility functions for selecting elements
const select = (selector, context = document) => context.querySelector(selector);
const selectAll = (selector, context = document) => context.querySelectorAll(selector);

// Function to handle mousemove event on buttons
const handleButtonMouseMove = (event) => {
  const buttonRect = event.currentTarget.getBoundingClientRect();
  const mouseX = event.clientX - buttonRect.left - buttonRect.width / 2;
  const mouseY = event.clientY - buttonRect.top - buttonRect.height / 2;

  event.currentTarget.style.transform = `translate(${mouseX * 0.15}px, ${mouseY * 0.3}px)`;
  event.currentTarget.style.transform += ` rotate3d(${mouseX * -0.1}, ${mouseY * -0.3}, 0, 12deg)`;

  const firstChild = event.currentTarget.children[0];
  if (firstChild) {
    firstChild.style.transform = `translate(${mouseX * 0.025}px, ${mouseY * 0.075}px)`;
  }
};

// Function to handle mouseleave event on buttons
const handleButtonMouseLeave = (event) => {
  event.currentTarget.style.transform = 'translate3d(0px, 0px, 0px)';
  event.currentTarget.style.transform += ' rotate3d(0, 0, 0, 0deg)';

  const firstChild = event.currentTarget.children[0];
  if (firstChild) {
    firstChild.style.transform = 'translate3d(0px, 0px, 0px)';
  }
};

// Add event listeners to buttons
selectAll('.stdl-section-btn').forEach(button => {
  button.addEventListener('mousemove', handleButtonMouseMove);
  button.addEventListener('mouseleave', handleButtonMouseLeave);
});

// Function to handle mousemove event for custom cursor
const handleCursorMouseMove = (event) => {
  const cursor = select('#ball');
  if (cursor) {
    cursor.style.left = `${event.pageX - 25}px`;
    cursor.style.top = `${event.pageY - 25}px`;
  }
};

// Add event listener to document for custom cursor
document.addEventListener('mousemove', handleCursorMouseMove);

    }

    function sectionHeaderAnim() {
      
      //   Projects Content - Animation
      const stdSectionHeader = gsap.utils.toArray(".section-header");
      const stdSectionDescription = gsap.utils.toArray(".section-header-wrapper, .wp-block-columns > .wp-block-column:not(.section-header)");

      if (!stdSectionHeader.length) {
        return;
      }

      stdSectionHeader.forEach(item => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 100%",
            end: "top 35%",
            scrub: 0.3
          }
        }).from(item.querySelector(".stdl-tagline"), {
          autoAlpha: 0,
          top: 50
        }).from(item.querySelector("h2.stdl-title"), {
          autoAlpha: 0,
          y: 50
        }, "-=0.2").from(item.querySelectorAll("h2.stdl-title ~ *"), {
          autoAlpha: 0,
          y: 50,
          stagger: 0.2
        }, "-=0.4");
      });

      if (!stdSectionDescription.length) {
        return;
      }

      stdSectionDescription.forEach(item => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 100%",
            end: "top 25%",
            scrub: 0.2
          }
        }).from(item.querySelectorAll(".stdl-description, p.block_decs, p.block-text, h2.stdl-title ~ *"), {
          autoAlpha: 0,
          top: 50
        });
      });

      
    }

    function heroImage() {
        const imageLeft = $('.img-left').find('img');
        const imageRight = $('.img-right').find('img');
        const anim = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0 });
        anim.to(imageLeft, {
            y: -30,
            duration: 2,
            ease: 'power1.inOut',
        });
        anim.to(imageRight, {
            y: 30,
            duration: 2, 
            ease: 'power1.inOut',
        }, 0);
        anim.to([imageLeft, imageRight], {
            y: 0,
            duration: 2,
            ease: 'power1.inOut',
        }, "+=0");
        anim.to({}, { duration: 0, onComplete: () => anim.play(0) });
        anim.play(0);
    }
    function heroImageScrolled() {
        
        gsap.registerPlugin(ScrollTrigger);

        const additionalY = { val: 0 };
        let additionalYAnim;
        let offset = 0;
        const cols = gsap.utils.toArray(".hero-grid-items .col");

        cols.forEach((col, i) => {
          const images = col.childNodes;

          // DUPLICATE IMAGES FOR LOOP
          images.forEach((image) => {
            var clone = image.cloneNode(true);
            col.appendChild(clone);
          });

          // SET ANIMATION
          images.forEach((item) => {
            let columnHeight = item.parentElement.clientHeight;
            let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

            gsap.to(item, {
              y: direction + Number(columnHeight / 2),
              duration: 66,
              repeat: -1,
              ease: "none",
              modifiers: {
                y: gsap.utils.unitize((y) => {
                  if (direction == "+=") {
                    offset += additionalY.val;
                    y = (parseFloat(y) - offset) % (columnHeight * 0.5);
                  } else {
                    offset += additionalY.val;
                    y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
                  }

                  return y;
                })
              }
            });
          });
        });

        var sectionWrapper = $('.stdl-section-hero.hero-v2');
        var sectionWrapperID = $(sectionWrapper).attr('id');

        const imagesScrollerTrigger = ScrollTrigger.create({
          trigger: sectionWrapperID,
          start: "top 50%",
          end: "bottom 50%",
          onUpdate: function (self) {
            const velocity = self.getVelocity();
            if (velocity > 0) {
              if (additionalYAnim) additionalYAnim.kill();
              additionalY.val = -velocity / 50000;
              additionalYAnim = gsap.to(additionalY, { val: 0 });
            }
            if (velocity < 0) {
              if (additionalYAnim) additionalYAnim.kill();
              additionalY.val = -velocity / 50000;
              additionalYAnim = gsap.to(additionalY, { val: 0 });
            }
          }
        });


    }
  

    function sectionImgAnim() {
        // gsap.timeline({
        //     scrollTrigger: {
        //       trigger: ".stdl-featured-projects .featured-project__thumb",
        //       start: "top 80%",
        //       end: "top 50%",
        //       scrub: 0.3
        //     }
        //   }).from(".stdl-featured-projects .featured-project__thumb", {
        //     autoAlpha: 0,
        //     scale: 0.5
        //   });

        //   Projects Image - Animation
          const stdlProjects = gsap.utils.toArray(".std-amin-img-content .std-amin-item");

          if (!stdlProjects.length) {
            return;
          }
  
          stdlProjects.forEach(group => {
            const stdlProjectsItems = gsap.timeline({
              scrollTrigger: {
                trigger: group,
                start: "top 80%",
                end: "top 50%",
                scrub: 0.3,
              }
            });
            group.querySelectorAll(".std-amin-img").forEach((el, i) => {
              stdlProjectsItems.from(el, {
                autoAlpha: 0,
                scale: 0.5
              });
            });
          });
    }

    function projectsAnim() {
        //   Projects Content - Animation
        const stdlProjectsTextContent = gsap.utils.toArray(".std-amin-img-content .std-amin-content");

        if (!stdlProjectsTextContent.length) {
          return;
        }

        stdlProjectsTextContent.forEach(box => {
          gsap.timeline({
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
            
            }
          }).from(box.querySelector(".project-type"), {
            autoAlpha: 0,
            top: 50
          }).from(box.querySelector("h2"), {
            autoAlpha: 0,
            y: 50
          }, "-=0.4").from(box.querySelectorAll("h2 ~ .block_decs, h2 ~ .stdl-content__text"), {
            autoAlpha: 0,
            y: 50,
            stagger: 0.2
          }, "-=0.6").from(box.querySelectorAll(".block_decs ~ .block_link"), {
            autoAlpha: 1,
            y: 0,
            stagger: 0.2
          }, "-=0.6");
        });
    }

    function commonSectionAnim() {
        //   Projects Image - Animation
        const stdlCommonSection = gsap.utils.toArray(".std-amin-common-section .std-amin-common-content");

        if (!stdlCommonSection.length) {
            return;
        }

        stdlCommonSection.forEach(box => {
            gsap.timeline({
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.3
              
              }
            }).from(box.querySelector(".std-amin-common-section .block_title"), {
              autoAlpha: 0,
              top: 50
            }).from(box.querySelector(".std-amin-common-section .block_decs"), {
              autoAlpha: 0,
              y: 50
            }, "-=0.2").from(box.querySelectorAll(".std-amin-common-section .block_decs ~ *"), {
              autoAlpha: 0,
              y: 50,
              stagger: 0.2
            }, "-=0.4").from(box.querySelectorAll(".std-amin-common-section .section-btn-warp"), {
              autoAlpha: 0,
              y: 50,
              stagger: 0.4
            }, "-=0.4");
          });

        //   Gravity Form - Animation

        gsap.timeline({
            scrollTrigger: {
              trigger: ".std-amin-common-section .stdl-contact_gravity",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3
            }
          }).from(".std-amin-common-section .stdl-contact_gravity", {
            autoAlpha: 0,
            scale: 0.5
        });
    }

    function carouselAnim() {
      //   Carousel Boxes - Animation
          //   Projects Content - Animation
          const stdlFLogoTitle = gsap.utils.toArray(".section-stdl-featured-logo .stdl-title-wrap, .stdl-section-brand-logo .stdl-title-wrap");

          if (!stdlFLogoTitle.length) {
            return;
          }
  
          stdlFLogoTitle.forEach(box => {
            gsap.timeline({
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.3
              }
            }).from(box.querySelector(".stdl-title"), {
              autoAlpha: 0,
              y: 50
            });
          });

      const stdlCarouseleBoxes = gsap.utils.toArray(".owl-carousel.owl-theme");

      if (!stdlCarouseleBoxes.length) {
        return;
      }

      stdlCarouseleBoxes.forEach(box => {
        gsap.timeline({
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.3
          }
        }).from(box.querySelector(".owl-stage-outer"), {
          autoAlpha: 0,
          y: 50
        });
      });
      // stdlCarouseleBoxes.forEach(group => {
      //   const carouselItems = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: group,
      //       start: "top 85%",
      //       end: "top 15%",
      //       scrub: 0.3
      //     }
      //   });
      //   group.querySelectorAll(".owl-item").forEach((el, i) => {
      //     const pos = i === 0 ? "" : "< +=0.2";
      //     carouselItems.from(el, {
      //       autoAlpha: 0
      //     }, pos).from(el, {
      //       y: 50
      //     }, "<");
      //   });
      // });
    }

    function StdlFaqAmin() {
      gsap.registerPlugin(ScrollTrigger);
   
        //   Faq Content - Animation
        const stdlSecFaqitems = gsap.utils.toArray(".stdl-section-faq .stdl-faq-items");

        if (!stdlSecFaqitems.length) {
          return;
        }

        stdlSecFaqitems.forEach(box => {
          gsap.timeline({
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3
            }
          }).from(box.querySelector(".stdl-faq-item"), {
            autoAlpha: 0,
            top: 50
          }, "-=0.4").from(box.querySelectorAll(".stdl-faq-item ~ .stdl-faq-item"), {
            autoAlpha: 0,
            y: 50,
            stagger: 0.2
          }, "-=0.6");
        });
    }
    
    function boxesAnim() {
      // Boxes Animation
       
        const stdlServiceBoxes = gsap.utils.toArray(".section-stdl-service .service-items, .stdl-section-our-services .service-items, .stdl-section-simplify .simplify-items, .stdl-section-client-fbk .client-fbk-items, .stdl-section-team .stdl-team-items");

        if (!stdlServiceBoxes.length) {
          return;
        }

        stdlServiceBoxes.forEach(group => {
          const servicesItems = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              end: "top 15%",
              scrub: 0.3
            }
          });
          group.querySelectorAll(".service-item, .simplify-item, .client-fbk-item, .stdl-team-item").forEach((el, i) => {
            const pos = i === 0 ? "" : "< +=0.2";
            servicesItems.from(el, {
              autoAlpha: 0
            }, pos).from(el, {
              y: 50
            }, "<");
          });
        });  

        const stdlSecBtn = gsap.utils.toArray(".section-stdl-service .section-btn-warp, .stdl-section-our-services .section-btn-warp, .stdl-section-simplify .section-btn-warp, .stdl-section-client-fbk .section-btn-warp, .std-amin-img-content .section-btn-warp");

        if (!stdlSecBtn.length) {
          return;
        }

        stdlSecBtn.forEach(btn => {
          gsap.timeline({
            scrollTrigger: {
              trigger: btn,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3
            }
          }).from(btn.querySelector("a.stdl-section-btn"), {
            autoAlpha: 0,
            top: 20
          }, "-=0.4").from(btn.querySelectorAll("a.stdl-section-btn ~ a.stdl-section-btn"), {
            autoAlpha: 0,
            y: 10,
            stagger: 0.2
          }, "-=0.6");
        });
    }

    function serviceArchive() {

      gsap.registerPlugin(ScrollTrigger);

      const stdlServiceArch = gsap.utils.toArray(".stdl-section-archive-services .article-wrapper");

      if (!stdlServiceArch.length) {
        return;
      }

      stdlServiceArch.forEach(item => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.3
          }
        }).from(item.querySelector(".grid-article"), {
          autoAlpha: 0,
          top: 20
        }, "-=0.4").from(item.querySelectorAll(".grid-article ~ .grid-article"), {
          autoAlpha: 0,
          y: 10,
          stagger: 0.2
        }, "-=0.6");
      });
    
    }

    function stdlTesimonials() {

      // //   Faq Content - Animation
      // const stdlTesimonials = gsap.utils.toArray(".stdl-section-testimonials .stdl-reviews");

      // if (!stdlTesimonials.length) {
      //   return;
      // }

      // stdlTesimonials.forEach(box => {
      //   gsap.timeline({
      //     scrollTrigger: {
      //       trigger: box,
      //       start: "top 85%",
      //       end: "top 35%",
      //       scrub: 0.3
      //     }
      //   }).from(box.querySelector(".stdl-review-item"), {
      //     autoAlpha: 0,
      //     top: 50
      //   }, "-=0.4").from(box.querySelectorAll(".stdl-review-item ~ .stdl-review-item"), {
      //     autoAlpha: 0,
      //     y: 50,
      //     stagger: 0.2
      //   }, "-=0.6");
      // });

    }
    function showCase() {

        if ($('.stdl-section-showcase').hasClass('parallax-two-grid')) {						
            if ($(window).width() > 767) {		
                $('.stdl-section-showcase').waitForImages({
                    finished: function() {
                        gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement, index) => {
                            const parallaxElementChild = parallaxElement.querySelector(".parallax-item-active");
                            const offsetParallax = parallaxElementChild.offsetHeight;					
                            gsap.fromTo( parallaxElementChild, { y: offsetParallax * 0.3 },	{ y: -offsetParallax, 
                                ease: "none",
                                    scrollTrigger: {
                                        trigger: parallaxElement,
                                        scrub: 1,
                                    }
                                }
                            );
                        });
                    },
                    waitForAll: true
                });
            }
        
            if (!isMobile()) {
				
				$(".item-parallax").on('mouseenter', function() {
					gsap.set($(this).find('.item-arrow i'), {y:30, opacity:0, });
					gsap.set($(this).find('.stdl-client-name'), {y:30, opacity:0, });
					gsap.set($(this).find('.stdl-project-name'), {y:60, opacity:0, });
					gsap.to($(this).find('.item-arrow i'), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeInOut});
					gsap.to($(this).find('.stdl-client-name'), {duration: 0.3, y:0, opacity:1, delay:0, stagger: 0, ease:Power2.easeInOut});
					gsap.to($(this).find('.stdl-project-name'), {duration: 0.5, y:0, opacity:1, delay:0.1, stagger: 0.05, ease:Power2.easeOut});							
				});

                $(".item-parallax").on('mouseleave', function() {	
					gsap.to($(this).find('.item-arrow i'), {duration: 0.3, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
					gsap.to($(this).find('.stdl-client-name'), {duration: 0.3, y:-30, opacity:0, delay:0, stagger: 0, ease:Power2.easeInOut});
					gsap.to($(this).find('.stdl-project-name'), {duration: 0.5, y:-60, opacity:0, delay:0.1, stagger: 0.05, ease:Power2.easeOut});								
				});
				
				$(".item-parallax").mouseenter(function(e) {
					var $this = $(this);					
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.7, borderColor:$this.parent().data('color'), backgroundColor:$this.parent().data('color')});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.parent().data("firstline") + '</p>' + '<p>' + $this.parent().data("secondline") + '</p>' );
					// $this.closest('.item').find('video').each(function() {
					// 	$(this).get(0).play();
					// });
				});

                $(".item-parallax").mouseleave(function(e) {
					var $this = $(this);					
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale:1, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 0, left: 0});
					$('#ball p').remove();
					// $this.closest('.item').find('video').each(function() {
					// 	$(this).get(0).pause();
					// });
				});
            }
        }
    }

	 // Horizontal Slider
    function horizontalSlider() {
        const panelsSections = gsap.utils.toArray( ".container-full" );
        for (var i = 0; i < panelsSections.length; i++){
            
            var thePanelsSection = panelsSections[i];
            const panels = gsap.utils.toArray(".stdl-panels-wrapper .stdl-panel-item", thePanelsSection );
            const panelsContainer = thePanelsSection.querySelector(".stdl-panels-wrapper");
            
            gsap.set(panelsContainer, { height:window.innerHeight});
            gsap.set(panels, { height:window.innerHeight});
                    
            var totalPanelsWidth = 0;
            panels.forEach(function( panel )  {
                totalPanelsWidth += $(panel).width();
            });
            
            gsap.set(panelsContainer, {width:totalPanelsWidth});
            gsap.to(panels, {
                x: - totalPanelsWidth + innerWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: panelsContainer,
                    pin: true,
                    start: "top top",
                    scrub: 1,
                    end: ( st ) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
                }
            });
            
            if (!isMobile()) {				
                $(".stdl-panel-item .panel-item__img").mouseenter(function(e) {
                    var $this = $(this);					
                    gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.7, borderColor:$this.parent().data('color'), backgroundColor:$this.parent().data('color')});
                    gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
                    $( "#ball" ).append( '<p class="first">' + $this.parent().data("firstline") + '</p>' + '<p>' + $this.parent().data("secondline") + '</p>' );
                });
                                
                $(".stdl-panel-item .panel-item__img").mouseleave(function(e) {
                    var $this = $(this);					
                    gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale:1, borderColor:'#999999', backgroundColor:'transparent'});
                    gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 0, left: 0});
                    $('#ball p').remove();
                });
            }
                            
        }
    }

    window.LoadViaAjax = function() {		
						
		showCase();
	
		
	}//End Load Via Ajax
	
});	

var LoadViaAjax = window.LoadViaAjax;