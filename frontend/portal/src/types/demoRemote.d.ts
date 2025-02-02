declare module "demo_remote/Button" {
    const Button: React.ComponentType;
    export default Button;
}

declare module "demo_remote/store" {
    const useStore: () => [number, (count: number) => void];
    export default useStore;
}

declare module "demo_remote/Footer" {
    const Footer: React.ComponentType;
    export default Footer;
}
