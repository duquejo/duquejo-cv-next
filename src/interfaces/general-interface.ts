import type { Pathnames } from '@/i18n/routing';
import { LucideIcon } from 'lucide-react';

export type EventType =
  | 'CreateEvent'
  | 'PullRequestEvent'
  | 'PushEvent'
  | 'WatchEvent'
  | 'PullRequestReviewEvent';

export interface ExperienceType {
  start_date: string;
  enterprise: string;
  isRecent: boolean;
  project: string;
  role: string;
  url?: string;
  resume?: string[];
  end_date?: string;
  screenshot?: string;
  additional_info?: string[];
}

export interface KnowledgeType {
  name: string;
  type: 'soft' | 'hard';
}

export interface LanguageType {
  title: string;
  subtitle: string;
}

export interface MainLanguageType {
  color: string;
  tag: string;
  value: number;
}

export interface MenuItem {
  title: string;
  url: Pathnames;
}

export type MetadataTypes =
  | 'General'
  | 'Blog'
  | 'Experience'
  | 'Services'
  | 'Contact'
  | 'GamesDevelopment'
  | 'MusicProduction';

export interface ServicesType {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
}

export interface Social {
  name: string;
  fullName: string;
  link: string;
  icon: LucideIcon;
  isVisibleInFooter: boolean;
}
