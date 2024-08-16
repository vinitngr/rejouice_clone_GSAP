function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// loco();

function page1Animation() {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from(
    ".headline > span",
    {
      y: 150,
      stagger: 0.1,
      opacity: 0,
      duration: 0.5,
    },
    "a"
  );
  tl.from(
    ".tva > span",
    {
      x: 100,
      stagger: 0.1,
      opacity: 0,
      duration: 0.5,
    },
    "a"
  );
  let click = document.querySelector(".click");
  click.addEventListener("click", () => {
    console.log("hi");
    let reelbox = document.querySelector(".reelbox");
    gsap.to(reelbox, {
      width: "100%",
      duration: 0.5,
      ease: "power1.out",
    });
  });
}
function cursor() {
  const page1 = document.querySelector(".page1content");
  const cursor = document.querySelector(".click");
  page1.addEventListener("mouseenter", function (e) {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
    });
  });
  page1.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.pageX - 20,
      y: e.pageY - 20,
    });
  });
  page1.addEventListener("mouseleave", function (e) {
    gsap.to(cursor, {
      opacity: 0,
      scale: 0,
    });
  });
}
cursor();
page1Animation();

function menuAnimation() {
  const menu = document.querySelector("#menu");
  const close = document.querySelector("#close");
  const animation2 = gsap.fromTo('.video-container video',
    {
      scale: 0,
    },
    {
      scale: 1, 
      duration: 0.6,
      ease: 'power1.out',
      paused: true 
    }
  ); 
  const animation = gsap.fromTo(
    ".right_mc div",
    {
      y: 80,
      opacity: 0,
      stagger: 0.2,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.3,
      delay: 0.2,
      paused: true,
    }
  );

  menu.addEventListener("click", () => {

    let tl = gsap.timeline()
    tl.to("#menubar", {
      height: "calc(100vh - 12vw)",
      duration: 0.7,
      ease: "power1.out",
    });
    tl.from('.quote span' , {
      x: 80 ,
    }, 's')
    tl.from('.quote span' , {
      opacity:0 ,
      stagger:0.1 
    }, 's')
    tl.from('.social div' , {
      x: 80 ,
      y: 10,
      delay: -0.2 ,
      opacity: 0 ,
      stagger:0.05 
    } , 's')

    animation.play();

    gsap.set(".line", { width: "0%" });

    gsap.to(".line", {
      width: "100%",
      delay: 0.3,
      duration: 1,
    });
    
    gsap.from(".buttondiv button", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.4,
    });
   
   animation2.play()
  });

  close.addEventListener("click", () => {
    gsap.to("#menubar", {
      height: 0,
      duration: 0.7,
      ease: "power1.out",
    });
    gsap.to('.video-container video' ,{
      scale: 0.1 ,
      duration:0.6 ,
      ease: 'power1.out'
    })

    animation.vars.stagger= 0;
    animation.reverse();
    animation2.reverse()
  });
}
function socialSectionHover(){
  let forhovers = document.querySelectorAll('.social div');

  forhovers.forEach((forhover) => {
    forhover.addEventListener('mouseover', () => {
      let svg = forhover.querySelector('svg');
        svg.style.transform = 'rotate(45deg)';
      // console.log(svg.parentElement)
    });
  
    forhover.addEventListener('mouseout', () => {
      let svg = forhover.querySelector('svg');
        svg.style.transform = '';
    });
  });
}
menuAnimation();
socialSectionHover();



