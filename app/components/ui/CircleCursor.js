import React, { useState, useEffect } from 'react';

const CircleCursor = () => {
  // const [cursorX, setCursorX] = useState(0);
  // const [cursorY, setCursorY] = useState(0);
  // const [targetX, setTargetX] = useState(0);
  // const [targetY, setTargetY] = useState(0);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setTargetX(event.clientX);
  //     setTargetY(event.clientY);
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);

  //   const updateCursor = () => {
  //     setCursorX((prevX) => prevX + (targetX - prevX) * 0.6);
  //     setCursorY((prevY) => prevY + (targetY - prevY) * 0.6);
  //     requestAnimationFrame(updateCursor);
  //   };

  //   requestAnimationFrame(updateCursor);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, [targetX, targetY]);

  const [mouseX, setMouseX] = useState(500);
  const [mouseY, setMouseY] = useState(-50);
  const [xp, setXp] = useState(500);
  const [yp, setYp] = useState(-50);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function handleMouseMove(e) {
      setMouseX(e.pageX);
      setMouseY(e.pageY);
    }

    function handleMouseLeave() {
      setIsVisible(false);
    }

    function handleMouseEnter() {
      setIsVisible(true);
    }


    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);


  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
  window.addEventListener('mousemove', handleMouseMove);

    const updateCursor = () => {
      setXp((prevX) => prevX + (mouseX - prevX) * 0.6);
      setYp((prevY) => prevY + (mouseY - prevY) * 0.6);
      requestAnimationFrame(updateCursor);
    };

    requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);



  return (
    <>
      <style jsx global>{`
        .circle {
          width: 15px;
          height: 15px;
          border-radius: 50px;
          background-color: #6e24a7;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
        #circle {
          width: 15px;
          height: 15px;
          border-radius: 50px;
          background-color: #6e24a7;
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
        }
      `}</style>
      {/* <div className="circle" style={{ left: cursorX, top: cursorY }}></div> */}
      {isVisible && (
        <div id="circle" style={{ left: xp + 'px', top: yp + 'px' }}></div>
      )}
    </>
  );
};

export default CircleCursor;
