export default function Acordio({
  etiqueta, seccions, isOpen, onToggle,
  onSeccioClick, isAdmin, onAfegirSeccio, onEditarSeccio,
}) {
  return (
    <div className="bg-gray-50 rounded-xl mb-3 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Títol */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-[#003366] text-[#FFD700] font-bold text-base hover:bg-[#002244] active:scale-[0.98] transition-all duration-200"
      >
        <span>{etiqueta}</span>
        <span className={`fletxa ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Contingut */}
      <div className={`acordio-contingut flex flex-col gap-2 bg-white px-3 ${isOpen ? 'open py-3' : ''}`}>
        {Object.entries(seccions).map(([key, { nom }]) => (
          <button
            key={key}
            onClick={() => isAdmin ? onEditarSeccio(etiqueta, key) : onSeccioClick(key)}
            className="seccio-btn w-full py-3 px-4 bg-[#FFD700] text-[#003366] font-semibold rounded-lg
              hover:bg-[#ffc700] hover:-translate-y-0.5 hover:shadow-sm
              active:translate-y-0 transition-all duration-200 text-left"
          >
            {nom}
          </button>
        ))}
      </div>

      {/* Botó admin afegir secció */}
      {isAdmin && (
        <button
          onClick={() => onAfegirSeccio(etiqueta)}
          className="block mx-auto my-2 w-9 h-9 rounded-full bg-[#003366] text-[#FFD700] text-xl font-bold
            hover:scale-110 hover:rotate-90 active:scale-95 transition-all duration-200 shadow-sm"
          title="Afegir secció"
        >
          +
        </button>
      )}
    </div>
  );
}
