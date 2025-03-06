import "@radix-ui/themes/styles.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme
      accentColor="teal"
      grayColor="auto"
      scaling="100%"
      radius="medium"
      panelBackground="translucent"
      appearance="light">
      <App />
    </Theme>
  </StrictMode>
);
