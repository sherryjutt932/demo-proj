import React from 'react'
import styles from "./style.module.scss"
import pic1 from "@/app/assets/dp1.png"
import pic2 from "@/app/assets/dp2.png"
import pic3 from "@/app/assets/dp3.png"
import Image from 'next/image'

export default function index() {
  return (
    <div className={styles.Fallbox}>
        <div className={styles.wrapper}> 
            <div>
                <h1>Trusted by</h1>
            </div>
            <div>
                <h1>6000+ sales reps</h1>
                <span>
                    <Image src={pic1} alt="dp" />
                    <Image src={pic2} alt="dp" />
                    <Image src={pic3} alt="dp" />
                </span>
            </div>
        </div>
    </div>
  )
}
