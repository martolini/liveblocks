import { RoomProvider, useMap, useRedo, useUndo } from "@liveblocks/react";
import React from "react";
import randomNumber from "../../utils/randomNumber";

export default function Home() {
  return (
    <RoomProvider id="e2e-storage-map">
      <Sandbox />
    </RoomProvider>
  );
}

function Sandbox() {
  const undo = useUndo();
  const redo = useRedo();
  const map = useMap("map");

  if (map == null) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>useMap sandbox</h1>
      <button
        id="set"
        onClick={() => {
          map.set(`key:${randomNumber(10)}`, `value:${randomNumber(10)}`);
        }}
      >
        Set
      </button>

      <button
        id="delete"
        onClick={() => {
          if (map.size > 0) {
            const index = randomNumber(map.size);
            map.delete(Array.from(map.keys())[index]);
          }
        }}
      >
        Delete
      </button>

      <button
        id="clear"
        onClick={() => {
          while (map.size > 0) {
            map.delete(Array.from(map.keys())[0]);
          }
        }}
      >
        Clear
      </button>

      <button id="undo" onClick={undo}>
        Undo
      </button>

      <button id="redo" onClick={redo}>
        Redo
      </button>

      <h2>Items</h2>
      <div id="items" style={{ whiteSpace: "pre" }}>
        {JSON.stringify(Object.fromEntries(map), null, 2)}
      </div>
    </div>
  );
}
