import "@radix-ui/themes/components.css";
import "@radix-ui/themes/tokens/base.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/slate.css";
import "@radix-ui/themes/tokens/colors/teal.css";
import "@radix-ui/themes/utilities.css";
import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { MiBaners } from "./demos/Banners";
import { MiDialogos } from "./demos/Dialogos";
import { miTablaDemo } from "./demos/Tablas";
import { MiToast } from "./demos/Toast";
import ConsolaPantalla from "./demos/Consola";
import runApi from "./demos/Api";
import ErrorPage from "./crud/Errores";
import miTablaApiDemo from "./demos/TablaApi";

/**
 * Componente principal
 * 
 * Para probar el componente de toast, se crean 4 botones que al hacer click en ellos, se muestra un message de alert.
 * 
 * @returns 
 */
const App = () => {

  const shouldRenderCrear = 0;

  if (shouldRenderCrear !== 0) {
    return <ErrorPage />
  } else {
  return (
    <Flex direction="column" align="center" gap="4" style={{ padding: "var(--space-4)" }}>
    <ErrorPage />

      <Heading>Tabla con api</Heading>
      {miTablaApiDemo()}

      <Separator size="4" orientation="horizontal" />
      <Heading>Cajas de Dialogo</Heading>
      {MiDialogos()}

      <Separator size="4" orientation="horizontal" />
      <Heading>Banners de Información</Heading>
      {MiBaners()}

      <Separator size="4" orientation="horizontal" />
      <Heading>Ejecutar API</Heading>
      <Button size="3" variant="soft" onClick={runApi}>Ejecutar API</Button>

      <Separator size="4" orientation="horizontal" />
      <Heading>Uso de Toast</Heading>
      {MiToast()}

      <Separator size="4" orientation="horizontal" />
      <Heading>Tabla sin api</Heading>
      {miTablaDemo()}

      {ConsolaPantalla()}

    </Flex>
  );
}
}

export default App
