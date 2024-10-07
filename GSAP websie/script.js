
function locoScroll(){
    
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoScroll()

function cursorEffect() {
    var page1Content = document.querySelector("#page1-content")
    var cursor = document.querySelector("#cursor")

    page1Content.addEventListener("mousemove", function (dets) {
        //     cursor.style.left = dets.x+"px"
        //     cursor.style.top = dets.y+"px"
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y,
        })

    })
    page1Content.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1,
        })
    })
    page1Content.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0,
        })
    })
}
cursorEffect()

function page2TopAnim(){
    gsap.from(".first-text h3, .second-text h3", {
      y: 60,
      scrollTrigger:{
        scroller:"#main",
        trigger:".first-text h3,.second-text h3",
        start:"top 100%",
        end:"top 98%",
        duration:.8,
        scrub:1
      }
    });
    gsap.to(".page2-top-border", {
      width: 94+"vw",
      scrollTrigger:{
        scroller:"#main",
        trigger:".page2-top-border",
        start:"top 92%",
        end:"top 89%",
        duration:5,
        scrub:1
      }
    });
    gsap.from(".page2 .page2-bottom .btm-text h2 .up span",{
      y:200,
      scrollTrigger:{
        scroller:"#main",
        trigger:".page2 .page2-bottom .btm-text h2 .up span",
        start:"top 103%",
        end:"top 98%",
        scrub:2,
        stagger:.1
      }
  })
  }
page2TopAnim ()

function swiper(){
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
swiper()

var tl =  gsap.timeline()

tl.from("#loader h3",{
  x:50,
  opacity:0,
  duration:1,
  stagger:0.1,
})

tl.to("#loader h3",{
  opacity:0,
  x:-30,
  duration:1,
  stagger:0.1,
})

tl.to ("#loader",{
  opacity:0,
})

tl.from("#page1-content h1 span",{
  y:100,
  opacity:0,
  stagger:0.1,
  duration:0.5,
delay:-0.5,  
})

tl.to ("#loader",{
 display:"none",

})
