import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import styles from "./style.module.scss";

export default function FallingLabels() {
  const matterContainer = useRef(null);
  const engine = useRef(null);
  const render = useRef(null);
  const runner = useRef(null);
  const box = useRef(null);

  function getRandomColor() {
    // List of colors excluding white
    const colors = [
      "#A1E8AF",
      "#D72638",
      "#12355B",
      "#FF661F",
      "#DDAE7E",
      "#F3A712",
    ];

    // Get a random index from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  function createImage(string, width, height) {
    let w = width + width/1.5;
    let h = height + 26;
    let borderRadius = 35; // Set the border radius
  
    let drawing = document.createElement("canvas");
    drawing.width = w;
    drawing.height = h;
    let ctx = drawing.getContext("2d");
  
    // Draw rounded rectangle with a black background
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(w, 0, w, h, borderRadius);
    ctx.arcTo(w, h, 0, h, borderRadius);
    ctx.arcTo(0, h, 0, 0, borderRadius);
    ctx.arcTo(0, 0, w, 0, borderRadius);
    ctx.closePath();
    ctx.fill();
  
    // Set up text properties
    ctx.fillStyle = "#fff";
    ctx.font = "20pt sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    // Use w/2 and h/2 as the center for positioning the text
    ctx.fillText(string, w / 2, h / 2);
  
    // Return the data URL of the canvas as a PNG image
    return drawing.toDataURL("image/png");
  }

  useEffect(() => {
    // Initialize Matter.js engine
    engine.current = Matter.Engine.create();

    // Set gravity (adjust as needed)
    engine.current.world.gravity.y = 0.5; // positive value for gravity in the downward direction


    //chaning gravity
    // setInterval( () => {
    //   engine.current.world.gravity.y = 2
    // }, 3000);
    // setInterval( () => {
    //   engine.current.world.gravity.y = -2
    // }, 6000);


    // Create a renderer
    render.current = Matter.Render.create({
      element: matterContainer.current,
      engine: engine.current,
      options: {
        width: matterContainer.current.clientWidth,
        height: matterContainer.current.clientHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    // add bodies
    const stack = Matter.Composites.stack(20, -20, 7, 3, 30, 0, function (x, y) {
      // round the edges of some bodies
      let chamfer = {
        radius: 20,
      };

      let angleInDegrees = Matter.Common.random(-45, 50);
      let randomHeight = Matter.Common.random(
        // -1000,
        // -200,
        0,
        matterContainer.current.clientHeight
      );
      let angleInRadians = (angleInDegrees * Math.PI) / 180;

      switch (Math.round(Matter.Common.random(2,2))) {
        case 0:
          let width = Matter.Common.random(140, 160);

          const rectangle = Matter.Bodies.rectangle(
            x,
            randomHeight,
            width,
            40,
            {
              chamfer: chamfer,
              // angle: angleInRadians,
              restitution: 1,
              timeScale: 0.2,
              frictionAir: 0,
              friction: 0,
              render: {
                fillStyle: getRandomColor(),
              },
            }
          );

          const text = Matter.Bodies.rectangle(x, randomHeight, width, 40, {
            isStatic: true, // Ensure the text doesn't fall under gravity
            background: "transparent",
            chamfer: chamfer,
            // angle: angleInRadians,
            render: {
              sprite: {
                texture: createImage("hellooo", Math.round(width), 40),
                xScale: 0.6, // Adjust the scale as needed
                yScale: 0.6,
              },
            },
          });

          const compositeBody = Matter.Body.create({
            parts: [rectangle, text],
            restitution: 1,
            timeScale: 0.2,
            frictionAir: 0,
            friction: 0,
          });

          return compositeBody;
        case 1:
          return Matter.Bodies.circle(x, randomHeight, 30, {});
        case 2:
          let rw = Matter.Common.random(120, 160);
          let slomo = Matter.Common.random(30, 50)/100;
          console.log(slomo);
          let imageWidth = Math.round(rw);
          let imageHeight = 40;

          let b = Matter.Bodies.rectangle(x, randomHeight, imageWidth, imageHeight, {
            background: "transparent",
            chamfer: chamfer,
            angle: angleInRadians,
            restitution: .4,
            timeScale: slomo.toFixed(2),
            friction: 0.1,
            render: {
              sprite: {
                texture: createImage("hellooo", imageWidth, imageHeight),
                xScale: 0.6, // Adjust the scale as needed
                yScale: 0.6,
              },
            },
          });

          return b;
        case 3:
          return Matter.Bodies.rectangle(x, matterContainer.current.clientHeight-200, 150, 40, {
            chamfer: chamfer,
            restitution: .4,
          })
      }
    });

    //Matter.Composite.add(engine.current.world, stack);


    const columns = 20;
    const bodyWidth = 26;
    const startX = matterContainer.current.clientWidth / 2 - (columns * bodyWidth + (columns - 1) * 0) / 2;
    const opt = {
      restitution: .3,
      timeScale:0.6,
      frictionAir: 0.1,
      friction: 0.1,
      density: 1,
    }
    
    //stack
    const stack2 = Matter.Composites.stack(startX, 0, columns, 2, 0, 0, function (x, y) {
      return Matter.Bodies.rectangle(x, y, bodyWidth, 40);
    });

    //pyramid
    const pyramid = Matter.Composites.pyramid(startX, 0, columns, 10, 0, 0, function (x, y) {
      return Matter.Bodies.circle(x, y, bodyWidth/2, opt);
      // return Matter.Bodies.rectangle(x, y, bodyWidth, 40);
    });


    Matter.World.add(engine.current.world, stack);


    const THICCNESS = 60;

    const ground = Matter.Bodies.rectangle(
      matterContainer.current.clientWidth / 2,
      matterContainer.current.clientHeight + THICCNESS / 2 + 2,
      27184,
      THICCNESS,
      { isStatic: true }
    );

    const top = Matter.Bodies.rectangle(
      matterContainer.current.clientWidth / 2,
      0 - THICCNESS / 2,
      27184,
      THICCNESS,
      { isStatic: true }
    );

    const leftWall = Matter.Bodies.rectangle(
      0 - THICCNESS / 2,
      matterContainer.current.clientHeight / 2,
      THICCNESS,
      matterContainer.current.clientHeight * 5,
      {
        isStatic: true,
      }
    );

    const rightWall = Matter.Bodies.rectangle(
      matterContainer.current.clientWidth + THICCNESS / 2 + 2,
      matterContainer.current.clientHeight / 2,
      THICCNESS,
      matterContainer.current.clientHeight * 5,
      { isStatic: true }
    );

    // Add bodies to the world
    Matter.Composite.add(engine.current.world, [
      ground,
      top,
      leftWall,
      rightWall,
    ]);

    // Create mouse and mouseConstraint
    const mouse = Matter.Mouse.create(render.current.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.Composite.add(engine.current.world, mouseConstraint);

    // Allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    // Run the renderer
    Matter.Render.run(render.current);

    // Create runner
    runner.current = Matter.Runner.create();

    // Run the engine
    Matter.Runner.run(runner.current, engine.current);

    // Handle resize
    const handleResize = () => {
      const containerWidth = matterContainer.current.clientWidth;
      const containerHeight = matterContainer.current.clientHeight;

      // Set canvas size to new values
      render.current.canvas.width = containerWidth;
      render.current.canvas.height = containerHeight;

      // Reposition ground
      Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
          containerWidth / 2,
          containerHeight + THICCNESS / 2
        )
      );

      // Reposition right wall
      Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
          containerWidth + THICCNESS / 2,
          containerHeight / 2
        )
      );
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Function to handle the scroll event
    function handleScroll() {}

    // Add a scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Function to update gravity based on mouse position
    function updateGravity() {
      const mouseX = mouse.position.x;
      const mouseY = mouse.position.y;
    
      const halfWidth = matterContainer.current.clientWidth / 2;
      const halfHeight = matterContainer.current.clientHeight / 2;
    
      let gravityX = 0;
      let gravityY = 0;
    
      if (mouseX < halfWidth) {
        gravityX = -2;
      } else {
        gravityX = 2;
      }
    
      if (mouseY < halfHeight) {
        gravityY = -2;
      } else {
        gravityY = 2;
      }
    
      engine.current.world.gravity.x = gravityX;
      engine.current.world.gravity.y = gravityY;
    }
    
    // Start updating gravity
    document.addEventListener('mousemove', (event) => {
      updateGravity();
    });

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render.current);
      Matter.Runner.stop(runner.current);
    };
  }, []); // run only once on component mount

  return <div ref={matterContainer} className={styles.container}></div>;
}
