import React from "react";
import { Link } from "react-router-dom";
import loginBg from "../assets/principal.jpg";

const Login = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-end items-center"
      style={{ backgroundImage: url(${loginBg}) }}
    >
      {/* Botón de iniciar sesión */}
      <Link
        to="/perfil"
        className="mb-16 w-3/4 bg-blue-600 text-white text-center py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </Link>
    </div>
  );
};

export default Login;