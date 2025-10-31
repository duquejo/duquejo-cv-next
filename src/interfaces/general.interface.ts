import type { Pathnames } from '@/i18n/routing';
import { LucideIcon } from 'lucide-react';

export interface PageEventParams {
  slug: string;
  lang: string;
}

export type EventType =
  | 'CreateEvent'
  | 'PullRequestEvent'
  | 'PushEvent'
  | 'WatchEvent'
  | 'PullRequestReviewEvent'
  | 'BlogPostEvent';

export interface ExperienceType {
  start_date: string;
  enterprise: string;
  isRecent: boolean;
  project: string;
  role: string;
  additional_info: string[];
  url?: string;
  resume?: string[];
  end_date?: string;
  screenshot?: string;
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

export interface Skill {
  name: string;
  value: string;
}
