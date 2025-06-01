import "@radix-ui/themes/styles.css";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { StrictMode } from "react";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import i18next from "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme
      accentColor="cyan"
      grayColor="auto"
      scaling="100%"
      radius="full"
      panelBackground="solid"
      appearance="dark"
    >
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Theme>
  </StrictMode>
);
