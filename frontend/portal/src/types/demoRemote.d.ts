
declare module "demo_remote/Button" {
    const Button: React.ComponentType;
    export default Button;
}

declare module "demo_remote/store" {
    const useCount: () => [number, (count: number) => void];
    export default useCount;
}

declare module "demo_remote/storage" {
    const countAtom: Atom<number>;
    export {countAtom};
}

declare module "demo_remote/storeAtom" {
    const useToken: () => [string, (token: string) => void];
    export default useToken;
}

declare module "demo_remote/Footer" {
    const Footer: React.ComponentType;
    export default Footer;
}
