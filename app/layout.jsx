export const metadata = {
  title: "Quiz GIC",
  description: "Quiz interactivo para estudiar globalización y datos personales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
