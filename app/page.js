'use client'
import Nav from "@/app/components/Nav"
import Hero from "@/app/components/Hero"
import Fallbox from "@/app/components/Fallbox"
import FallingLabels from "@/app/components/FallingLabels"
import CircleCursor from './components/ui/CircleCursor'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    function handleMouseMove() {
      setMouseY(window.scrollY);
    }

    document.addEventListener("scroll", handleMouseMove);
    return () => {
      document.removeEventListener("scroll", handleMouseMove);
    };
  }, []);

  return (
    <reactStrictMode>
    <main className="">
    <CircleCursor />
      <Nav/>
      {/* <Hero/>
      <Fallbox/> */}
      <FallingLabels/>
    </main>
    </reactStrictMode>
  )
}
