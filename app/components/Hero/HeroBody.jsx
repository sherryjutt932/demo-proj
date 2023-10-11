import {React, useEffect, useRef, useState} from 'react'
import { BsPlay, BsPause} from "react-icons/bs";
import styles from "./style.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HeroHead() {
    const blob = useRef();
    const heroBody = useRef();
    const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      setIsPlaying(!isPlaying);
    }
  };
    useEffect(() => {
      gsap.set(blob.current, { scale: 1 });
      var tl = gsap.timeline();
      tl.to(blob.current, {
        scale: 15,
        ease: "ease", // Easing function (you can choose a different one)
      });
  
      ScrollTrigger.create({
        trigger: heroBody.current,
        start: "top 70%",
        end: "bottom -300%",
        animation: tl,
        scrub: 2,
      });
  
    }, []);
  return (
    <div ref={heroBody} className={styles.heroBody}>
        <div className={styles.videoWrapper}>
          <video ref={videoRef}>
            <source src="/video1.mp4" type="video/mp4" />
          </video>

          <div className={styles.controls}>
            <button onClick={handlePlayPause}>
            {isPlaying ? <BsPause /> : <BsPlay />}
            </button>
          </div>
        </div>

        <div ref={blob} className={styles.blob}></div>
      </div>
  )
}
