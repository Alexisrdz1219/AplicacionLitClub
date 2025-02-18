import { useState, useEffect } from "react";

export const HorrorWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("horrorWarningLastShown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > 600000) { // 10 minutos en milisegundos
      setShowWarning(true);
      localStorage.setItem("horrorWarningLastShown", now.toString());

      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 4000); // Se oculta después de 4 segundos

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showWarning) return null;

  return <div className="horror-warning">¡Cuidado! Estos libros pueden provocar pesadillas...</div>;
};
