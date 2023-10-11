"use client";
import { React, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { BsArrowDown } from "react-icons/bs";

import { Line } from "@/app/assets/line.jsx";

import HeroHead from "./HeroHead";
import HeroBody from "./HeroBody";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function index() {
  const line = useRef();
  const hero = useRef();
  const heroFooter = useRef();
  const wrapper = useRef();

  useEffect(() => {
    const last = gsap.fromTo(
      hero.current,
      {
        marginLeft: "0",
        marginRight: "0",
      },
      {
        marginLeft: "20px",
        marginRight: "20px",
        ease: "ease",
        scrollTrigger: {
          trigger: hero.current,
          start: "bottom bottom",
          end: "bottom 97%",
          scrub: 1,
          pin: false,
          //   end: () => `+=${wrapper.current.offsetWidth}`,
        },
      }
    );

    return () => {
      last.kill();
    };
  }, []);

 

  useEffect(() => {
    const pin = gsap.fromTo(
      wrapper.current,
      {
        translateX: "100vw",
      },
      {
        translateX: "-100vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: wrapper.current,
          //   start: "top top",
          //   end: "2000 top",
          scrub: 1,
          snap: 1 / 3,
          pin: true,
          //   end: () => `+=${wrapper.current.offsetWidth}`,
          end: "+=1000",
        },
      }
    );

    // Scroll animation for hero footer
    const sections = gsap.utils.toArray(wrapper.current.children);
    gsap.set(sections, { opacity: 0.5 });
    gsap.set(sections[0], { opacity: 1 });

    var opacityTimeline = gsap.timeline({
      defaults: {
        ease: "power3",
      },
    });

    opacityTimeline
      .to(
        sections[0],
        {
          opacity: 1,
        },
        "a"
      )
      .to(
        sections[0],
        {
          opacity: 0.5,
        },
        "a+=1"
      ) // Run 1 second after "a"

      .to(
        sections[1],
        {
          opacity: 1,
        },
        "b+=1"
      ) // Run 1 second after "b"
      .to(
        sections[1],
        {
          opacity: 0.5,
        },
        "b+=2"
      ) // Run 2 seconds after "b"

      .to(
        sections[2],
        {
          opacity: 1,
        },
        "c+=2"
      );

    ScrollTrigger.create({
      trigger: wrapper.current,
      start: "top top",
      end: "+=1000",
      animation: opacityTimeline,
      scrub: 1,
    });

    //line animation

    const lineanim = gsap.fromTo(
      "#linepath",
      {
        strokeDasharray: "0px, 3003.71px",
      },
      {
        strokeDasharray: "5003.15px, 3003.71px",
        ease: "none",
        duration: 0.1,
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "+=1000",
          scrub: 0,
        },
      }
    );

    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill();
    };
  }, []);

  return (
    <div ref={hero} className={styles.hero}>
      <div className={styles.line}>
        <Line ref={line} />
      </div>

      <div className={styles.icon}>
        <BsArrowDown />
      </div>

      <HeroHead />
      <HeroBody />

      <div ref={heroFooter} className={styles.heroFooter}>
        <div ref={wrapper} className={styles.wrapper}>
          <div className={styles.text}>
            <span className="texteffect">
              Book more <br />
              meetings
            </span>
          </div>
          <div className={styles.text}>
            <span className="texteffect">
              Convert <br />
              more sales
            </span>
          </div>
          <div className={styles.text}>
            <span className="texteffect">
              Build <br />
              more trust
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
