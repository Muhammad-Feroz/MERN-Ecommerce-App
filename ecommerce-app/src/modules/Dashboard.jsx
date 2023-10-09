import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import SectionHeading from '../components/SectionHeading'
import StatsCard from '../components/StatsCard'

const stats = [
  { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]

export default function Dashboard() {
  return (
    <div>
      <SectionHeading heading={'Dashboard'} />
      <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatsCard key={item.id} item={item} />
        ))}
      </dl>
      <div className='h-[600px] w-full bg-gray-100 rounded-lg mt-16'></div>
    </div>
  )
}
