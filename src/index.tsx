import { createRoot } from "react-dom/client";

const App = () => {
  return <div>
    <h1>Hi there!</h1>
  </div>
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(
  rootElement as HTMLElement
);
root.render(<App />);