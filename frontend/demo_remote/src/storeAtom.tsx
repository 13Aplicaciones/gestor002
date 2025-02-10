import { atom, useAtom } from "jotai";

const tokenAtom = atom<string | null>(null);


const useToken = () => useAtom(tokenAtom);

export { useToken };