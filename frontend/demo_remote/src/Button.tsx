import useCount from "./store";

export const Button = () => {
  const [state, setState] = useCount();
  return (
    <div>
      <button onClick={() => setState((s) => s + 1)}>
        Click me kljlaksdf !!!: {state}
      </button>
    </div>
  );
};

export default Button;