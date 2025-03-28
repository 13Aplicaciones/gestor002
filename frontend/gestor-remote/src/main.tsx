import "@radix-ui/themes/styles.css";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { StrictMode } from "react";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import i18next from "./i18n";
import { ToastContextProvider } from "ux-ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="indigo" grayColor="auto" scaling="100%" radius="medium" panelBackground="translucent" appearance="light">
      <I18nextProvider i18n={i18next}>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </I18nextProvider>
    </Theme>
  </StrictMode>
);
