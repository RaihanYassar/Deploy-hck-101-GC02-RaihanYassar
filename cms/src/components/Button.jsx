
function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  className = ''
}) {
  const variants = {
    primary: 'bg-[#171714] text-white hover:bg-[#33332d]',
    secondary: 'border border-[#c5a46d] text-[#9b7b46] hover:bg-[#c5a46d] hover:text-white',
    danger: 'bg-red-700 text-white hover:bg-red-800'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2.5
        text-sm font-medium
        tracking-wide
        transition duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
