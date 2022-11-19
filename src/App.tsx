import { useEffect, useCallback, useRef } from "react";
import "./App.css";
import Scene, { RefType } from "./components/Scene/Scene";

function App() {
  const updateRef = useRef<RefType>(null);
  const update = useCallback((time: number) => {
    if (updateRef.current) {
      updateRef.current.update();
    }
    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    requestAnimationFrame(update);
  }, [update]);

  return <Scene ref={updateRef} />;
}

export default App;
