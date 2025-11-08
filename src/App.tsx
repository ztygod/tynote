import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { useBearStore } from "./store";

export default function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  function BearCounter() {
    const bears = useBearStore((state) => state.bears);
    return <h1>{bears} around here ...</h1>;
  }

  function Controls() {
    const increasePopulation = useBearStore(
      (state) => state.increasePopulation
    );

    const clean = useBearStore((state) => state.removeAllBears);
    return (
      <>
        <Button onClick={increasePopulation}>one up</Button>
        <Button onClick={clean}> Clean </Button>
      </>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <BearCounter />
      <Controls />
    </div>
  );
}
