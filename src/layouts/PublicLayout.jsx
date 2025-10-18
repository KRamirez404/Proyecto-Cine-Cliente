import { Outlet } from 'react-router-dom';

/**
 * PublicLayout
 * 
 * Layout mínimo para páginas públicas (Login, Registro).
 * Sin header completo, solo logo y título de la app.
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">CineApp</h1>
              <p className="text-xs text-neutral-500">Sistema de Reservas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
          <p>&copy; 2025 CineApp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
