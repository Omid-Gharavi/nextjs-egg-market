import React from "react";

export default function Badge({ text }) {
  return (
    <div className="text-purple-900 px-3 text-sm py-1 bg-default-200 border border-default-300 rounded-3xl">
      {text}
    </div>
  );
}
