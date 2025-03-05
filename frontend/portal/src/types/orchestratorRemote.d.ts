/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'orchestrator_remote/globalStore' {
  import { GlobalStore } from 'orchestrator_remote/globalStore';
  export const globalStore: GlobalStore;
  export type State = State;
}

declare module 'orchestrator_remote/userStore' {
  import { UserStore } from 'orchestrator_remote/userStore';
  export const userStore: UserStore;
  export type State = State;
}

declare module 'orchestrator_remote/structureStore' {
  import { StructureStore } from 'orchestrator_remote/structureStore';
  export const structureStore: StructureStore;
  export type State = State;
}

declare module 'orchestrator_remote/service/Structure' {
  import { StructureService } from 'orchestrator_remote/service/Structure';
  export const structureService: StructureService;
  export function getFirtsModule(): Promise<any>;
  export function getStructure(): Promise<any>;
  export function refreshStructure(): Promise<any>;
  export function setSelectModule(index: string): void; 
  export function getSelectModule(): Promise<any>;
  export function setSelectMenu(index: string): void; 
  export function getSelectMenu(): Promise<any>;
}

declare module 'orchestrator_remote/service/Statics' {
  export function getStatic( index: string): Promise<any>;
}

declare module 'orchestrator_remote/service/Tokens' {
  import { TokensService } from 'orchestrator_remote/service/Tokens';
  export const tokensService: TokensService;
  export function addToken({token}:{ token: any}): Promise<any>;
  export function getToken(): Promise<any>;
  export function refreshToken(): Promise<any>;  
  export type ITokenRoot = ITokenRoot; 
}
