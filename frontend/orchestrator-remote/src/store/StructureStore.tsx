/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Definicion de los tipos de dato que se van a manejar en el Structure Store
 */
export type State = {
    sharedStructure: Record<string, any>;
}


/**
 * Definicion de los tipos de dato que se van a manejar en el Structure Store
 */
type Listener = (state: State) => void;

/**
 * Class para representar o Structure Store
 * 
 * @author omargo33
 * @since 2025-02-27
 */
class StructureStore {
    private state: State;
    private channel: BroadcastChannel;
    private listeners: Set<Listener>;

    /**
     * Constructor de la clase StructureStore
     * 
     * Inicializa el estado, el canal de comunicacion y los listeners
     */
    constructor() {
        this.state = { sharedStructure: {} };
        this.channel = new BroadcastChannel("structure-store");
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
    setState(newState: Partial<State[]>): void {
        this.state = { ...this.state, ...newState };
        this.channel.postMessage({ type: 'UPDATE_STATE', payload: newState });
        this.notifyListeners();
    }

    /**
    * Se agrega un listener
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

export const structureStore = new StructureStore();