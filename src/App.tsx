import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function App() {
  const [greetMsg, setGreetMsg] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return <></>;
}
