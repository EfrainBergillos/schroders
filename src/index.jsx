import React from "react";
import { createRoot } from "react-dom/client";
import { SchrodersApp } from "@modules/components";

const root = createRoot(document.getElementById("schroders-app"));
root.render(<SchrodersApp></SchrodersApp>);
