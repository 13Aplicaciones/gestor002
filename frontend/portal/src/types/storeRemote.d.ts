// filepath: /home/ovelez/Documentos/clientes/13Aplicaciones/gestor002/frontend/portal/src/types/demoRemote.d.ts

declare module "demo_remote/store" {
    const useCount: () => [number, (count: number) => void];
    export default useCount;
}

declare module "shared/atoms" {
    const countAtom: Atom<number>;
    export { countAtom };
}