import { useEffect } from "react";
import CardGeneric from "./layout/card-generic";
import { usePomodoroState } from "@/Store/PomodoroState";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

export default function PomodoroCard() {
  const {
    time,
    isRunning,
    mode,
    start,
    pause,
    reset,
    setMode,
    incrementCycle,
    resetCycles,
    cycles,
  } = usePomodoroState();

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      usePomodoroState.getState().tick();
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, incrementCycle, setMode]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  const handleButtonClick = () => {
    isRunning ? pause() : start();
  };

  return (
    <CardGeneric
      title={<span className="sm:text-5xl">{`Pomodoro - ${mode}`}</span>}
      description={
        <span className="sm:text-3xl">{`Cycles: ${
          usePomodoroState.getState().cycles
        }`}</span>
      }
      action={
        <Button
          className="sm:h-14! h-10! sm:w-14! w-10! flex justify-center items-center"
          variant="ghost"
          onClick={() => {
            resetCycles();
            setMode("Run");
            reset();
          }}
        >
          <RefreshCcw className="sm:h-10! h-8! sm:w-10! w-6!" />
        </Button>
      }
      content={
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl sm:text-8xl font-bold">
            {minutes}:{seconds}
          </span>
        </div>
      }
      footer={
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 mb-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 sm:w-10 sm:h-10 rounded-full border ${
                  index < cycles % 4
                    ? "bg-green-900 border-b-green-950"
                    : "bg-gray-900"
                } `}
              ></div>
            ))}
          </div>
          <Button
            className={`sm:min-w-75 sm:min-h-30 min-w-30 min-h-15 border bg-transparent rounded-4xl py-10 text-2xl text-white font-bold transition-all duration-200 hover:scale-105 active:scale-90 ${
              isRunning
                ? "border-gray-800 hover:bg-gray-600"
                : "border-green-800 hover:bg-green-950"
            }`}
            onClick={handleButtonClick}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>
      }
    ></CardGeneric>
  );
}
