'use client';
import { motion } from 'framer-motion';

const timelineData = [
	{
		year: '2016',
		title: 'Start bij 9292',
		description: 'Gestart als C# Developer bij 9292, werken aan reisplanner-API’s.',
	},
	{
		year: '2018',
		title: 'API Lead',
		description: 'Verantwoordelijk voor de architectuur van nieuwe backend-systemen.',
	},
	{
		year: '2021',
		title: 'Realtime Data',
		description: 'Implementatie van real-time OV-data in de reisplanner.',
	},
	{
		year: '2025',
		title: 'Senior Developer',
		description: 'Leiden van een team en werken aan innovatieve mobiliteitsoplossingen.',
	},
];

export default function Timeline() {
	return (
		<div className="my-12">
			<h3 className="text-xl font-bold mb-6">Career Timeline</h3>
			<div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-6">
				{timelineData.map((item, idx) => (
					<motion.div
						key={item.year}
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.2 }}
						viewport={{ once: true }}
						className="mb-10"
					>
						<div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
						<div className="ml-4">
							<div className="font-semibold text-blue-600 dark:text-blue-400">
								{item.year}
							</div>
							<div className="font-bold text-lg">{item.title}</div>
							<div className="text-gray-700 dark:text-gray-300">
								{item.description}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
