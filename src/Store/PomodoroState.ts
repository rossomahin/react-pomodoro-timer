import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PomodoroState {
    time: number; // текущее время таймера
    runTime: number;
    shortTime: number;
    longTime: number;
    isRunning: boolean;
    cycles: number;
    mode: "Run" | "Short Break" | "Long Break";
    start: () => void;
    pause: () => void;
    reset: () => void;
    setMode: (mode: PomodoroState["mode"]) => void;
    incrementCycle: () => void;
    tick: () => void;
    resetCycles: () => void;
}

export const usePomodoroState = create<PomodoroState>()(
    persist(
        (set, get) => ({
            runTime: 25 * 60,
            shortTime: 5 * 60,
            longTime: 15 * 60,
            time: 25 * 60,
            isRunning: false,
            cycles: 0,
            mode: "Run",
            start: () => set({ isRunning: true }),
            pause: () => set({ isRunning: false }),
            reset: () => {
                const state = get();
                let newTime =
                    state.mode === "Run"
                        ? state.runTime
                        : state.mode === "Short Break"
                        ? state.shortTime
                        : state.longTime;
                set({ time: newTime, isRunning: false });
            },
            setMode: (mode) => set({ mode }),
            incrementCycle: () => set({ cycles: get().cycles + 1 }),
            resetCycles: () => set({ cycles: 0 }),

            tick: () => {
                const state = get();
                if (state.time > 0) {
                    set({ time: state.time - 1})
                    return;
                }

                if (state.mode === "Run") {
                    const newCycles = state.cycles + 1;
                    const nextMode = newCycles % 4 === 0 ? "Long Break" : "Short Break";
                    set({
                        time:
                            nextMode === "Long Break"
                                ? state.longTime
                                : state.shortTime,
                        mode: nextMode,
                        isRunning: false,
                        cycles: newCycles
                    });
                } else {
                    set({
                        time: state.runTime,
                        mode: "Run",
                        isRunning: false,
                    })
                }
            }
        }),
        {
            name: "pomodoro-storage",
            partialize: (state) => ({ cycles: state.cycles }),
        }
    )
);