import { useScrollCompact } from '../hooks/useScrollCompact';

export default function Header({ onAdminClick }) {
  const compact = useScrollCompact();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-center gap-4 bg-[#003366] text-[#FFD700] shadow-md transition-all duration-300 ${
        compact ? 'py-1 px-4 shadow-lg' : 'py-3 px-6'
      }`}
    >
      <img
        src="assets/logo.png"
        alt="Logo Esplai El Casalot"
        onClick={onAdminClick}
        className={`logo-img cursor-pointer transition-all duration-300 ${
          compact ? 'opacity-0 scale-75 pointer-events-none w-0' : 'h-[70px]'
        }`}
      />
      <h1
        className={`flex-1 text-center font-bold transition-all duration-300 ${
          compact ? 'text-2xl' : 'text-3xl md:text-4xl'
        }`}
      >
        El Casalot
      </h1>
    </header>
  );
}
