declare module 'orchestrator_remote/globalStore' {
  import { GlobalStore } from 'orchestrator_remote/globalStore';
  export const globalStore: GlobalStore;
}

declare module 'orchestrator_remote/userStore' {
  import { UserStore } from 'orchestrator_remote/userStore';
  export const userStore: UserStore;
  export type State = State;
}

