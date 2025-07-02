import logo from '../assets/img-logo-v1_300x78.png'

interface LogoProps {
  width?: number | string
  height?: number | string
  className?: string
  showText?: boolean // opcional, exibe o nome junto se quiser
}

export default function Logo({
  width = 180,
  height = 48,
  className = '',
  showText = false,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Paradigma Business Solution"
        width={width}
        height={height}
        className="object-contain select-none"
        draggable={false}
        loading="lazy"
      />
      {showText && (
        <span className="font-bold text-xl tracking-tight text-blue-700">
          Paradigma
        </span>
      )}
    </div>
  )
}
