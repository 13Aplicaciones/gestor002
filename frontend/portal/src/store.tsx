import { atom, useAtom } from "jotai";

export const countAtom = atom(0);

export const useCount = () => useAtom(countAtom);