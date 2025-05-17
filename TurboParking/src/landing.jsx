import { Link } from "react-router-dom";
import principal from "./assets/principal.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#1e3a8a] flex items-center justify-center">
      <div className="relative w-[360px] h-[740px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={principal}
          alt="Pantalla principal"
          className="w-full h-full object-cover"
        />

        {/* Botones con posición absoluta sobre la imagen */}
        <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Link
            to="/ingresar"
            className="bg-white text-[#1e3a8a] font-semibold px-4 py-2 rounded-md shadow"
          >
            Ingresar
          </Link>
          <Link
            to="/registrarme"
            className="bg-[#1e3a8a] border border-white text-white font-semibold px-4 py-2 rounded-md"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;