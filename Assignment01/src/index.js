import React from "react";
import { createRoot } from "react-dom/client"; // React 18 uses createRoot
import FormComponent from "./component/form-component";

import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create root
root.render(<FormComponent />);
