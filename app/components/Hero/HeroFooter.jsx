import {React, useEffect, useRef} from 'react'
import styles from "./style.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HeroHead() {
  const heroFooter = useRef();
  const wrapper = useRef();

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
  
    }, []);
  return (
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
  )
}
