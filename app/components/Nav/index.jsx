import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { Logo } from "@/app/assets/logo.jsx";
import BtnSlide from "@/app/components/ui/BtnSlide";

export default function index() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.links}>
        <Link href="/">Pricing</Link>
        <Link href="/">Testimonials</Link>
        <Link href="/">Examples</Link>
        <Link href="/">Login</Link>
      </div>
      <div>
        <BtnSlide full={false} icon={false} />
      </div>
    </nav>
  );
}
