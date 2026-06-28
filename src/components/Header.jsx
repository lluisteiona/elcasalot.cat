import { useStickyHeader } from "../hooks/useStickyHeader";

export default function Header({ onAdminClick }) {
  const isCompact = useStickyHeader();

  return (
    <header className={`logo${isCompact ? " compacte" : ""}`}>
      <img
        src="assets/logo.png"
        alt="Logo Esplai El Casalot"
        onClick={onAdminClick}
        style={{ cursor: "pointer" }}
      />
      <h1>El Casalot</h1>
    </header>
  );
}
