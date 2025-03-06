import { lazy } from "react";

const Button = lazy(() => import("demo_remote/Button"));
const Footer = lazy(() => import("demo_remote/Footer"));

const AppGestor = lazy(() => import("gestor_remote/App"));

export { Button, Footer, AppGestor };
