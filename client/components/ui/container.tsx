import React from "react";

export const Container = (props: { children: React.ReactNode }) => (
  <div className="max-w-2xl mx-auto">{props.children}</div>
);
