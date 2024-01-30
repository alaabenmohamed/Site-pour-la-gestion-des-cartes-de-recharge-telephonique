import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Index from "./pages/AppDrawer/Index";
import IndexHome from "./pages/Stockage/IndexStockage";
import Client from './pages/client/Client';
import Historique from './pages/historique/Historique';
import StatistiqueIndex from './pages/Statistique/StatistiqueIndex';

const router = createBrowserRouter(


  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<IndexHome />} />
      <Route  path="client" element={<Client />} />
      <Route  path="historique" element={<Historique />} />
      <Route  path="statique" element={<StatistiqueIndex />} />



    
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
