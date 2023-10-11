"use client";
import { React, useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import styles from "./style.module.scss";
import { gsap } from "gsap";

export default function index({ icon, full }) {
  const [isHovered, setIsHovered] = useState(false);
  const slider1 = useRef();
  const slider2 = useRef();
  const btn = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.fromTo(
      [slider1.current, slider2.current],
      {
        xPercent: 0,
      },
      {
        xPercent: 101,
        ease: "power3",
        stagger: 0.2,
        duration: 0.7,
      }
    );
    gsap.fromTo(
      btn.current,
      {
        scaleX: 1,
      },
      {
        scaleX: 1.04,
        ease: "bounce.out",
        duration: 0.5,
      }
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.fromTo(
      [slider1.current, slider2.current],
      {
        xPercent: 101,
      },
      {
        xPercent: 201,
        stagger: -0.2,
        ease: "power3",
        duration: 0.7,
      }
    );
    gsap.fromTo(
      btn.current,
      {
        scaleX: 1.04,
      },
      {
        scaleX: 1,
        ease: "bounce.out",
        duration: 0.5,
      }
    );
  };

  return (
    <button
      ref={btn}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      className={styles.btn}
      style={{
        height: full ? "110px" : "46px",
        width: full ? "320px" : "164px",
      }}
    >
      <div ref={slider1} className={styles.slider}></div>
      <div ref={slider2} className={styles.slider}></div>
      <span>
        book {isHovered ? <></> : <></>} a demo{" "}
        {icon ? <FiArrowRight /> : <></>}
      </span>
    </button>
  );
}
