/**
 * Timeline data for professional experience
 */

import type { EnhancedTimelineItem } from '@/app/types';

export const TIMELINE_DATA: EnhancedTimelineItem[] = [
  {
    id: 'career-2016',
    year: '2016',
    title: 'Start bij 9292',
    description: 'Gestart als C# Developer bij 9292, werken aan reisplanner-API\'s en backend-systemen voor openbaar vervoer.',
    status: 'completed',
    company: '9292',
    location: 'Utrecht, Nederland',
    skills: ['C#', '.NET', 'API Development', 'SQL Server'],
    achievements: [
      'Ontwikkeling van robuuste API-endpoints voor reisplanning',
      'Optimalisatie van database-queries voor betere performance',
      'Implementatie van geautomatiseerde tests voor API-validatie'
    ],
    icon: '🚀',
    color: '#3B82F6',
  },
  {
    id: 'career-2018',
    year: '2018',
    title: 'API Lead',
    description: 'Verantwoordelijk voor de architectuur van nieuwe backend-systemen en leiding geven aan API-ontwikkeling.',
    status: 'completed',
    company: '9292',
    location: 'Utrecht, Nederland',
    skills: ['System Architecture', 'Team Leadership', 'Microservices', 'Docker'],
    achievements: [
      'Design en implementatie van microservices-architectuur',
      'Mentoring van junior developers',
      'Verbetering van API-response times met 40%'
    ],
    icon: '👨‍💼',
    color: '#10B981',
  },
  {
    id: 'career-2021',
    year: '2021',
    title: 'Realtime Data',
    description: 'Implementatie van real-time OV-data in de reisplanner voor actuele reisinformatie.',
    status: 'completed',
    company: '9292',
    location: 'Utrecht, Nederland',
    skills: ['Real-time Systems', 'Event Streaming', 'Kafka', 'Redis'],
    achievements: [
      'Integratie van live OV-data voor 100+ vervoerders',
      'Ontwikkeling van event-driven architectuur',
      'Verbetering van data-accuraatheid naar 99.7%'
    ],
    icon: '⚡',
    color: '#F59E0B',
  },
  {
    id: 'career-2025',
    year: '2025',
    title: 'Senior Developer',
    description: 'Leiden van een team en werken aan innovatieve mobiliteitsoplossingen voor de toekomst.',
    status: 'in-progress',
    company: '9292',
    location: 'Utrecht, Nederland',
    skills: ['Team Leadership', 'Innovation', 'AI/ML', 'React', 'TypeScript'],
    achievements: [
      'Opzetten van cross-functioneel development team',
      'Implementatie van AI-gedreven reisadviezen',
      'Modernisering van legacy-systemen naar cloud-native architectuur'
    ],
    icon: '🎯',
    color: '#8B5CF6',
  },
];
