const people = [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
]

export default function CheckBox({
  people = people,
  label = '',
  className = '',
  onChange = () => {},
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">{label}</legend>
      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        {people.map((person, personIdx) => (
          <div key={personIdx} className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={`person-${person.id}`} className="select-none font-medium text-gray-900">
                {person.name}
              </label>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id={`person-${person.id}`}
                name={`person-${person.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={(event) => onChange(person, event.target.checked)}
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
