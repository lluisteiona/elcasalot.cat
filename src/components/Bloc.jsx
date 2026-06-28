export default function Bloc({ children, id, className = '', style }) {
  return (
    <section
      id={id}
      style={style}
      className={`bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:shadow-lg 
        transition-all duration-300 animate-fadeInUp ${className}`}
    >
      {children}
    </section>
  );
}
