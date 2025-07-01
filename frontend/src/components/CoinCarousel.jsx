import React, { useState } from "react";

export default function CoinCarousel({ coins = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex(i => (i > 0 ? i - 1 : coins.length - 1));
  const next = () => setActiveIndex(i => (i < coins.length - 1 ? i + 1 : 0));

  return (
    <div className="w-full flex flex-col items-center py-6">
      <div className="relative w-full max-w-6xl h-[360px] flex items-center justify-center overflow-hidden">
        {coins.map((coin, index) => {
          const position = index - activeIndex;
          let transform = "";
          let zIndex = 10;
          let opacity = "opacity-0";
          let pointer = "pointer-events-none";

          if (position === 0) {
            transform = "translate-x-0 scale-100";
            zIndex = 30;
            opacity = "opacity-100";
            pointer = "pointer-events-auto";
          } else if (position === -1 || position === 1) {
            transform = `translate-x-${position * 64} scale-90`;
            zIndex = 20;
            opacity = "opacity-70";
            pointer = "pointer-events-auto";
          } else if (position === -2 || position === 2) {
            transform = `translate-x-${position * 64} scale-75`;
            zIndex = 10;
            opacity = "opacity-40";
          }

          return (
            <div
              key={coin.id}
              className={`absolute transition-all duration-500 ease-in-out transform ${transform} ${opacity} ${pointer}`}
              style={{ zIndex }}
            >
              <div className="w-72 bg-white text-black rounded-2xl shadow-lg border p-5">
                <h2 className="text-xl font-bold">{coin.name}</h2>
                <p className="text-sm text-gray-600 mt-1 mb-3">
                  {coin.description || "No description available."}
                </p>
                <div className="text-sm text-gray-800 space-y-1">
                  <p><strong>Current Price:</strong> {coin.current_price}</p>
                  <p><strong>24h High:</strong> {coin.high_24h}</p>
                  <p><strong>24h Low:</strong> {coin.low_24h}</p>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={prev}
          className="absolute left-4 z-50 bg-white text-black rounded-full shadow p-2 hover:bg-gray-200"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute right-4 z-50 bg-white text-black rounded-full shadow p-2 hover:bg-gray-200"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
