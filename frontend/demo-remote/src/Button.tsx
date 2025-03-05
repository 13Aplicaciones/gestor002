/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { globalStore } from "orchestrator_remote/globalStore";

export const Button = () => {
  const [sharedData, setSharedData] = useState(
    globalStore.getState().sharedData
  );

  useEffect(() => {
    const unsubscribe = globalStore.subscribe((state: { sharedData: any }) => {
      setSharedData(state.sharedData);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    globalStore.setState({ sharedData: e.target.value });
  };

  return (
    <div>
      <h2>Microfrontend A</h2>
      <input
        type="text"
        value={sharedData}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      <p>Datos compartidos: {sharedData}</p>
    </div>
  );
};

export default Button;
