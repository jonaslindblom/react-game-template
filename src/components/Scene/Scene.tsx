import styles from "./Scene.module.css";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { registerListener } from "lib/utils";
import { Size } from "lib/types";

export type RefType = {
  update: () => void;
} | null;

const Scene = forwardRef<RefType>((props, ref) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [tics, setTicks] = useState(0);

  function onResize() {
    if (!sceneRef.current) return;
    const { width, height } = sceneRef.current.getBoundingClientRect();
    setSize({ width: width, height: height });
  }

  /**
   * depending on hardware, update typically gets called 60 times / second
   */
  function update() {
    setTicks(tics + 1);
  }

  // Init effect
  useEffect(() => {
    console.log("running init effect");
    const unregisterResizeListener = registerListener("resize", onResize);
    onResize();
    return unregisterResizeListener;
  }, []);

  useImperativeHandle(ref, () => ({
    update,
  }));

  return (
    <div className={styles.root}>
      <div className={styles.scene} ref={sceneRef}>
        <div>
          scene size: {Math.round(size.width)} x {Math.round(size.height)}
        </div>
        <div>tics: {tics}</div>
        {/* Put your canvas or SVG below */}
        <svg className={styles.canvas} width={size.width} height={size.height}>
          <circle cx={tics} cy={tics} r={20} fill="green"></circle>
        </svg>
      </div>
    </div>
  );
});

export default Scene;
