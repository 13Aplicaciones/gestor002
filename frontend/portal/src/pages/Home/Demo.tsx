import { lazy } from "react";

//const Title = lazy(() => import("gestor_remote/Origin"));
const Button = lazy(() => import("demo_remote/Button"));
const Footer = lazy(() => import("demo_remote/Footer"));

export { Button, Footer};
