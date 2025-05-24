import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TURBOPARKING
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link to="/iniciarsesion" className="btn btn-outline btn-sm">
          Ingresar
        </Link>
        <Link to="/registrarse" className="btn btn-primary btn-sm">
          Registrarme
        </Link>
      </div>
    </div>
  );
};

export default Navbar;