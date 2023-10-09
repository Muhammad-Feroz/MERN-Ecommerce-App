export default function SectionHeading({
  heading,
  subheading,
  className
}) {
  return (
    <div className={`mb-16 ${className}`}>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{heading}</h1>
      <p className="mt-4 text-base text-gray-500">
        {subheading}
      </p>
    </div>
  )
}
