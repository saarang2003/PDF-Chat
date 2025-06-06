"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from "framer-motion";

// ContainerScroll
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // triggers over full viewport height
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Transform values
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]); // ← this is the fix
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.95, 1] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [20, 0]); // slight rise

  return (
    <div className="min-h-[100vh] text-white px-4 py-4">
      <div
        className="h-[20rem] md:h-[40rem] flex items-center justify-center relative p-2 md:p-12"
        ref={containerRef}
      >
        <div className="py-4 md:py-12 w-full relative" style={{ perspective: "1000px" }}>
          <Header translate={translate} titleComponent={titleComponent} />
          <Card rotate={rotate} translate={translate} scale={scale}>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

// Header
export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate }}
    className="max-w-5xl mx-auto text-center mb-2"
  >
    {titleComponent}
  </motion.div>
);

// Card
export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      translateY: translate,
    }}
    className="max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 p-4">
      {children}
    </div>
  </motion.div>
);
