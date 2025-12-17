import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors visibleToasts={3} />

      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  );
}
