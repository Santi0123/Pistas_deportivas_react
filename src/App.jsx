import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";
import CrearReserva from "./components/CrearReserva";
import UsuarioPage from "./pages/UsuarioPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsuarioForm from "./components/UsuarioForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Ruta por defecto para "/"
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "instalaciones",
        element: <InstalacionesPage />,
      },
      {
        path: "instalacion/add",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/edit/:id", // Usando :id para capturar el parámetro
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/del/:id", // Usando :id para capturar el parámetro
        element: <InstalacionDeletePage />,
      },
      {
        path: "mis-reservas",
        element: <ReservasPage />,
      },
      {
        path: "mis-reservas/add",
        element: <CrearReserva />,
      },
      {
        path: "usuario", // Verifica si esta ruta requiere parámetros
        element: <UsuarioPage />,
      },
      {
        path: "usuario/add",
        element: <UsuarioForm />
      },
      {
        path: "admin/usuario/edit/:id",
        element: <UsuarioForm />
      },
      {
        path: "admin/usuario/del/:id",
        element: <UsuarioForm />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
