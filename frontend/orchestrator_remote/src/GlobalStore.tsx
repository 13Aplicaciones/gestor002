type State = {
    sharedData: string;
};

type Listener = (state: State) => void;

class GlobalStore {
    private state: State;
    private channel: BroadcastChannel;
    private listeners: Set<Listener>;

    constructor() {
        this.state = { sharedData: "Initial Data" };
        this.channel = new BroadcastChannel("global-store");
        this.listeners = new Set();
        this.channel.onmessage = (event: MessageEvent) => {
            if (event.data.type === "UPDATE_STATE") {
                this.state = { ...this.state, ...event.data.payload };
                this.notifyListeners();
            }
        };
    }

    getState(): State {
        return this.state;
    }

    setState(newState: Partial<State>): void {
        this.state = { ...this.state, ...newState };
        this.channel.postMessage({ type: 'UPDATE_STATE', payload: newState });
        this.notifyListeners();
    }

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener(this.state));
    }
}

export const globalStore = new GlobalStore();