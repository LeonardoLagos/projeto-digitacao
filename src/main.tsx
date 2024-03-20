import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import { HistoricoProvider } from "./contexts/historicoContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UserProvider>
    <ToastProvider>
      <HistoricoProvider>
        <RouterProvider router={router} />
      </HistoricoProvider>
    </ToastProvider>
  </UserProvider>
  //</React.StrictMode>
);
