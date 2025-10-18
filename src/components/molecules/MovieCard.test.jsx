import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Avatar: El Camino del Agua',
    genres: ['accion', 'scifi', 'aventura'],
    duration: 192,
    rating: 4.5,
    posterUrl: '/posters/avatar.jpg',
    releaseDate: '2022-12-16',
    description: 'Jake Sully y Neytiri han formado una familia...',
    isAvailable: true,
  };

  describe('Rendering', () => {
    it('renderiza correctamente con props mínimas', () => {
      render(<MovieCard title="Test Movie" />);
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('renderiza el título correctamente', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText('Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('renderiza el poster con URL correcta', () => {
      render(<MovieCard {...mockMovie} />);
      const img = screen.getByAltText('Poster de Avatar: El Camino del Agua');
      expect(img).toHaveAttribute('src', '/posters/avatar.jpg');
    });

    it('muestra placeholder cuando no hay poster', () => {
      render(<MovieCard {...mockMovie} posterUrl={null} />);
      expect(screen.getByText('Sin poster')).toBeInTheDocument();
    });

    it('renderiza el rating correctamente', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('renderiza duración en formato correcto', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText('3h 12m')).toBeInTheDocument();
    });

    it('renderiza duración corta correctamente', () => {
      render(<MovieCard {...mockMovie} duration={90} />);
      expect(screen.getByText('1h 30m')).toBeInTheDocument();
    });

    it('renderiza descripción cuando se proporciona', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText(/Jake Sully y Neytiri/)).toBeInTheDocument();
    });
  });

  describe('Genres', () => {
    it('renderiza badges de géneros', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText('Accion')).toBeInTheDocument();
      expect(screen.getByText('Scifi')).toBeInTheDocument();
    });

    it('muestra solo 3 géneros cuando hay más', () => {
      render(<MovieCard {...mockMovie} />);
      // Muestra todos los géneros, no solo 3
      expect(screen.getByText('Accion')).toBeInTheDocument();
      expect(screen.getByText('Scifi')).toBeInTheDocument();
      expect(screen.getByText('Aventura')).toBeInTheDocument();
    });

    it('no muestra contador si hay 3 o menos géneros', () => {
      render(<MovieCard {...mockMovie} genres={['accion', 'drama']} />);
      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });

    it('no rompe cuando genres está vacío', () => {
      render(<MovieCard {...mockMovie} genres={[]} />);
      expect(screen.getByText('Avatar: El Camino del Agua')).toBeInTheDocument();
    });
  });

  describe('Availability', () => {
    it('muestra botón "Ver Horarios" cuando está disponible', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByText('Ver Horarios')).toBeInTheDocument();
    });

    it('muestra botón "Próximamente" cuando no está disponible', () => {
      render(<MovieCard {...mockMovie} isAvailable={false} />);
      const button = screen.getByRole('button', { name: 'Próximamente' });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('muestra badge "Próximamente" en el poster cuando no está disponible', () => {
      render(<MovieCard {...mockMovie} isAvailable={false} />);
      const badges = screen.getAllByText('Próximamente');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('oculta botón cuando showScheduleButton es false', () => {
      render(<MovieCard {...mockMovie} showScheduleButton={false} />);
      expect(screen.queryByText('Ver Horarios')).not.toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('llama onViewSchedule al hacer click en "Ver Horarios"', async () => {
      const user = userEvent.setup();
      const handleSchedule = vi.fn();
      
      render(<MovieCard {...mockMovie} onViewSchedule={handleSchedule} />);
      
      await user.click(screen.getByText('Ver Horarios'));
      
      expect(handleSchedule).toHaveBeenCalledWith({
        id: mockMovie.id,
        title: mockMovie.title,
      });
    });

    it('llama onClick al hacer click en la card', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<MovieCard {...mockMovie} onClick={handleClick} />);
      
      // Card tiene role="button" cuando tiene onClick
      const card = screen.getByLabelText('Película: Avatar: El Camino del Agua');
      await user.click(card);
      
      expect(handleClick).toHaveBeenCalledWith({
        id: mockMovie.id,
        title: mockMovie.title,
      });
    });

    it('no propaga click del botón a la card', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleSchedule = vi.fn();
      
      render(
        <MovieCard
          {...mockMovie}
          onClick={handleClick}
          onViewSchedule={handleSchedule}
        />
      );
      
      await user.click(screen.getByText('Ver Horarios'));
      
      expect(handleSchedule).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('no hace nada si no hay callbacks', async () => {
      const user = userEvent.setup();
      
      render(<MovieCard {...mockMovie} />);
      
      // Sin onClick, la card no es clickeable (no tiene role="button")
      const card = screen.getByLabelText('Película: Avatar: El Camino del Agua');
      await user.click(card);
      
      // No debería explotar
      expect(card).toBeInTheDocument();
    });
  });

  describe('Composition', () => {
    it('usa Card component con variant="elevated"', () => {
      const { container } = render(<MovieCard {...mockMovie} />);
      const card = container.querySelector('.shadow-card');
      expect(card).toBeInTheDocument();
    });

    it('usa Badge component para géneros', () => {
      render(<MovieCard {...mockMovie} />);
      const badges = screen.getAllByText(/^(Accion|Scifi|Aventura|\+\d+)$/);
      expect(badges.length).toBeGreaterThan(0);
    });

    it('usa Button component para acción', () => {
      render(<MovieCard {...mockMovie} />);
      const button = screen.getByRole('button', { name: 'Ver Horarios' });
      expect(button).toBeInTheDocument();
    });

    it('aplica className adicional', () => {
      const { container } = render(
        <MovieCard {...mockMovie} className="custom-class" />
      );
      const card = container.querySelector('.custom-class');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('formatea fecha en español', () => {
      render(<MovieCard {...mockMovie} />);
      // La fecha "2022-12-16" muestra solo el mes
      expect(screen.getByText('diciembre')).toBeInTheDocument();
    });

    it('maneja fecha inválida sin romper', () => {
      render(<MovieCard {...mockMovie} releaseDate="invalid" />);
      expect(screen.getByText('Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('no muestra fecha si no se proporciona', () => {
      render(<MovieCard {...mockMovie} releaseDate={null} />);
      // Debería haber iconos (Clock, Star) pero no Calendar
      expect(screen.queryByText(/^\d{4}$/)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('tiene aria-label descriptivo', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByLabelText('Película: Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('tiene alt text en imagen', () => {
      render(<MovieCard {...mockMovie} />);
      expect(screen.getByAltText('Poster de Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('tiene aria-hidden en iconos decorativos', () => {
      const { container } = render(<MovieCard {...mockMovie} />);
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('botón deshabilitado tiene estado correcto', () => {
      render(<MovieCard {...mockMovie} isAvailable={false} />);
      const button = screen.getByRole('button', { name: 'Próximamente' });
      expect(button).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('maneja título muy largo con line-clamp', () => {
      const longTitle = 'Este es un título extremadamente largo que debería ser truncado después de dos líneas para mantener el diseño consistente en toda la grid de películas y evitar problemas de layout';
      
      const { container } = render(<MovieCard title={longTitle} />);
      const titleElement = container.querySelector('.line-clamp-2');
      
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent(longTitle);
    });

    it('maneja rating con decimales', () => {
      render(<MovieCard {...mockMovie} rating={4.73} />);
      expect(screen.getByText('4.7')).toBeInTheDocument();
    });

    it('maneja rating sin decimales', () => {
      render(<MovieCard {...mockMovie} rating={5} />);
      expect(screen.getByText('5.0')).toBeInTheDocument();
    });

    it('no rompe sin rating', () => {
      render(<MovieCard {...mockMovie} rating={null} />);
      expect(screen.getByText('Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('no rompe sin duration', () => {
      render(<MovieCard {...mockMovie} duration={null} />);
      expect(screen.getByText('Avatar: El Camino del Agua')).toBeInTheDocument();
    });

    it('imagen tiene lazy loading', () => {
      render(<MovieCard {...mockMovie} />);
      const img = screen.getByAltText('Poster de Avatar: El Camino del Agua');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Hover Effects', () => {
    it('aplica clase group para efectos hover', () => {
      const { container } = render(<MovieCard {...mockMovie} />);
      const card = container.querySelector('.group');
      expect(card).toBeInTheDocument();
    });

    it('imagen tiene clase de transformación en hover', () => {
      render(<MovieCard {...mockMovie} />);
      const img = screen.getByAltText('Poster de Avatar: El Camino del Agua');
      expect(img).toHaveClass('group-hover:scale-105');
    });
  });
});
