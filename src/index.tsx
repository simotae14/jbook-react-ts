import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // config the esbuild service
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
    
  };

  // call the esbuild service at first rendering
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    //console.log(result);

    setCode(result.outputFiles[0].text);
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