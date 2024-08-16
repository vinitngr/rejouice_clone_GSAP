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
    ".tva>span",
    {
      stagger: 0.1,
      opacity: 0,
      duration: 0.5,
    },
    "a"
  );

  let menu = document.querySelector("#menu");
  menu.addEventListener("click", () => {
    let menubar = document.querySelector("#menubar");
    gsap.to(menubar, {
      height: "calc(100vh - 15vw)",
      duration: 0.5,
      ease: "power1.out",
    });
  });

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
// loco();
cursor();
page1Animation();

function page2Animation(){

}
page2Animation()
