import { createSignal } from "solid-js";

export default function Counter({ children }: any) {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);

  return (
    <>
      <div class="flex justify-evenly mt-4 place-items-center text-2xl">
        <button onClick={subtract}>-</button>
        <pre>{count()}</pre>
        <button onClick={add}>+</button>
      </div>
      <div>{children}</div>
    </>
  );
}
