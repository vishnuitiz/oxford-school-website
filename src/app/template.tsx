import { ViewTransition, type ReactNode } from "react";

// Re-created on every navigation, so the page content (not the header or footer) fades and rises in.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
