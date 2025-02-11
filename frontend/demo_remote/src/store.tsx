import {useAtom} from "jotai";
import {countAtom} from "./shared/store";

export const useCount = () => useAtom(countAtom)