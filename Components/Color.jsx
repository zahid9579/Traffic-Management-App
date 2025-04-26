import React, { useEffect, useState } from "react";

const Color = () => {
  const [signal, setSignal] = useState("red");
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (signal === "red") {
      setTimeLeft(30);
    } else if (signal === "yellow") {
      setTimeLeft(10);
    } else if (signal === "green") {
      setTimeLeft(30);
    }
  }, [signal]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (signal === "red") {
        setSignal("yellow");
      } else if (signal === "yellow") {
        setSignal("green");
      } else if (signal === "green") {
        setSignal("red");
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timeLeft, signal]);

  // Helper function to get color
  const getColor = (current) => {
    if (signal === current) {
      if (current === "red") return "bg-red-500";
      if (current === "yellow") return "bg-yellow-500";
      if (current === "green") return "bg-green-500";
    }
    return "bg-black"; // inactive signals are black
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <h1 className="font-semibold text-3xl text-black mb-8">
        Please Follow the Traffic Rules ✌️
      </h1>

      <div className="flex flex-col items-center gap-6">
        {/* Red Signal */}
        <div className={`w-24 h-24 rounded-full ${getColor("red")} flex flex-col items-center justify-center text-white font-bold`}>
          <div>STOP</div>
          {signal === "red" && <div>{timeLeft}s</div>}
        </div>

       

        {/* Green Signal */}
        <div className={`w-24 h-24 rounded-full ${getColor("green")} flex flex-col items-center justify-center text-white font-bold`}>
          <div>GO</div>
          {signal === "green" && <div>{timeLeft}s</div>}
        </div>

         {/* Yellow Signal */}
         <div className={`w-24 h-24 rounded-full ${getColor("yellow")} flex flex-col items-center justify-center text-white font-bold`}>
          <div>SLOW</div>
          {signal === "yellow" && <div>{timeLeft}s</div>}
        </div>


      </div>
    </div>
  );
};

export default Color;
