import {useCount} from "./store";
import {useToken} from "./storeAtom";

export const Button = () => {
  const [state, setState] = useCount();
  
  const [token, setToken] = useToken();
  
  return (
    <div>

      <h1>Token: {token}</h1>

      <button onClick={() => setState((s) => s + 1)}>
        Click me kljlaksdf !!!: {state}
      </button>


      <button onClick={() => setToken("1234")}>
        Set token {token}
      </button>
    </div>
  );
};

export default Button;