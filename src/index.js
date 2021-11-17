import ReactDOM from "react-dom";
import { ModalProvider } from "./context/ShowModal";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
