import {React, useEffect, useRef} from 'react'
import styles from "./style.module.scss";
import BtnSlide from "@/app/components/ui/BtnSlide"
import { gsap } from "gsap";

export default function HeroHead() {
    const cont = useRef();
    useEffect(() => {
        // Animation for mounting the element
        const mountAnimation = gsap.fromTo(
            cont.current.children,
            {
              opacity: 0,
              yPercent:100,
              scale: 0.8,
              rotationX: 45, // Initial rotation towards the bottom
              transformOrigin: 'center center',
            },
            {
              opacity: 1,
              yPercent:0,
              scale: 1,
              rotationX: 0, // Rotate towards the front
              stagger: 0.3,
              duration: 1, // Adjust the duration as needed
              ease: 'power1.inOut',
            }
          );
    
        // Cleanup function
        return () => {
          // Kill the animation when the component unmounts
          mountAnimation.kill();
        };
      }, []);

  return (
    <div ref={cont} className={styles.heroHead}>
    <h1>
      Personalize
    </h1>
    <h1>
      videos at scale
    </h1>

    <p>
      Simplify video prospecting and boost response rates <br />
      by up to 500% with impactful sales videos
    </p>

    <BtnSlide full={true} icon={true}/>
  </div>
  )
}
