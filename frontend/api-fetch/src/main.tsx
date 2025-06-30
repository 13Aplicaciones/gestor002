import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/ConfigStore.tsx";
import { StrictMode } from "react";
import App from "./App.tsx";

/**
 * Componente principal de la aplicación
 *
 * Para ver el uso de compontes toas ver el siguiente link
 * @link ./demos/Toast.tsx
 *
 * @author @omargo33
 * @since 2025-01-10
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
