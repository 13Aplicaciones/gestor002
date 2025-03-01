/**
 * Definicion de los tipos de dato que se van a manejar en el Global Store
 */
export type State = {
    sharedData: string;
};

/**
 * Definicion de los tipos de dato que se van a manejar en el Global Store
 */
type Listener = (state: State) => void;

/**
 * Class para representar o Global Store
 * 
 * @author omargo33
 * @since 2025-02-13
 */
class GlobalStore {
    private state: State;
    private channel: BroadcastChannel;
    private listeners: Set<Listener>;

    /**
     * Constructor de la clase GlobalStore
     * 
     * Inicializa el estado, el canal de comunicacion y los listeners
     */
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

    /**
     * Se obtiene el estado actual
     * 
     * @returns 
     */
    getState(): State {
        return this.state;
    }

    /**
     * Se actualiza el estado
     * 
     * Y se envia un mensaje al canal de comunicacion
     * Y se notifica a los listeners
     * 
     * @param newState 
     */
    setState(newState: Partial<State>): void {
        this.state = { ...this.state, ...newState };
        this.channel.postMessage({ type: 'UPDATE_STATE', payload: newState });
        this.notifyListeners();
    }

    /**
     * Se suscribe un listener al Global Store
     *  
     * @param listener 
     * @returns 
     */
    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /**
     * Se notifica a los listeners
     */
    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener(this.state));
    }
}

export const globalStore = new GlobalStore();
