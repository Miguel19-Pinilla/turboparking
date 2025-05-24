/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Estas rutas le dicen a Tailwind dónde buscar las clases CSS.
    // Asegúrate de que cubran todos tus archivos JSX.
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Si estás usando DaisyUI, DESCOMENTA la siguiente línea:
    // require('daisyui'),
  ],
  // Si estás usando DaisyUI, DESCOMENTA y configura la siguiente sección:
  // daisyui: {
  //   themes: ["light", "dark", "cupcake", "dracula", "night"], // Puedes agregar o quitar temas aquí
  // },
};