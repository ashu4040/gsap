const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// time();

let timeout;

function small_circle() {
  let xscale = 1;
  let yscale = 1;
  let prevx = 0;
  let prevy = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    let xdiff = dets.clientX - prevx;
    let ydiff = dets.clientY - prevy;
    prevy = dets.clientY;

    prevx = dets.clientX;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    criclemove(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#circle"
      ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)
       scale(1,1)`;
    }, 100);
  });
}

function first_animation() {
  let tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  tl.to(".boundingelem", {
    y: "0",
    // opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
    delay: -1,

    stagger: 0.2,
  });

  tl.from("#footer", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
  });
}

function criclemove(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#circle"
    ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)
     scale(${xscale}, ${yscale})
     `;
  });
}

let diff = 0;
let rotate = 0;
document.querySelectorAll(".t_elem").forEach(function (t_elem) {
  t_elem.addEventListener("mouseleave", function (dets) {
    // console.log(difff);
    gsap.to(t_elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  t_elem.addEventListener("mousemove", function (dets) {
    let difff = dets.clientY - t_elem.getBoundingClientRect().top;

    diff = dets.clientX - rotate;
    rotate = dets.clientX;

    // console.log(difff);
    gsap.to(t_elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: difff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff),
    });
  });
});

criclemove();
first_animation();
small_circle();
