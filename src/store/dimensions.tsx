
import create from "zustand"


interface Dimensions {
    width: number;
    height: number;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;

}

export const useDimensionsStore = create<Dimensions>((set) => ({
        width: window.innerWidth,
        height: window.innerHeight,
        setWidth: (width: number) => {
            set({ width });
        },
        setHeight: (height: number) => {
            set({ height });
        }
}))