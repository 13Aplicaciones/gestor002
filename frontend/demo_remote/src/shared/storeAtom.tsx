import { atom, useAtom } from "jotai";

const tokenAtom = atom<string | null>(null);

export const useToken = () => useAtom(tokenAtom);
