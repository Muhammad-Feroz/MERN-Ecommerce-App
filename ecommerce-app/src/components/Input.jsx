const Input = ({
  name = '',
  type = 'text',
  required = true,
  className = '',
  labelClassName= '',
  label = '',
  placeholder = '',
  onChange = () => { },
  value = '',
}) => {
  return (
    <>
      {
        label &&
        <label htmlFor={name} className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}>
          {label}
        </label>
      }
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4 ${className}`}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Input