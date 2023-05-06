import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // config the esbuild service
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
    console.log(service);
  };

  // call the esbuild service at first rendering
  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    console.log(input);
  }
  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(
  rootElement as HTMLElement
);
root.render(<App />);