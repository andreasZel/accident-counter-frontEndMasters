import { useReducer } from "react";

type InitialState = {
  count: number;
};

const initialState: InitialState = {
  count: 0
};

const reducer = (state = initialState, action: { type: 'increment' | 'decrement' | 'reset' | 'updateByValue', payload?: number }) => {
  const { count } = state;

  if (action.type === 'increment') {
    const newCount = count + 1;
    return { count: newCount };
  }

  if (action.type === 'decrement') {
    const newCount = count - 1;
    return { count: newCount };
  }

  if (action.type === 'reset') {
    return { count: 0 };
  }

  if (action.type === 'updateByValue') {
    return { count: Number(action.payload) };
  }

  return state;
};

const Counter = () => {
  const [{ count }, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: 'decrement' })}>➖ Decrement</button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>➕ Increment</button>
      </div>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const counterValue = formData.get('counterValue');
          dispatch({ type: 'updateByValue', payload: Number(counterValue) });
          e.currentTarget.reset();
        }}>
          <input type="number" name="counterValue" defaultValue={0} />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
