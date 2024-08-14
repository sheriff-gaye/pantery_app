"use client"
import { Button } from '@/components/ui/button';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <div className="py-36 space-y-5 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="text-primary">
          <Typewriter
            options={{
              strings: ['AI Pantry', 'Inventory Management'],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div className="text-black dark:text-white">
          Empowering Smart Inventory
        </div>
      </div>

      <div className="text-sm md:text-xl dark:text-white/80 text-black font-normal">
        Optimize your inventory with AI-driven precision. Streamline operations, reduce waste, and enhance efficiency. AI Pantry provides real-time insights and recommendations, ensuring your inventory is always in check. Join us and revolutionize your inventory management today!
      </div>
      <Button size="lg">Get Sarted Now</Button>
    </div>
  );
};

export default Hero