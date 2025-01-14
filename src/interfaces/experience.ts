export interface ExperienceType {
  start_date: string;
  end_date: string;
  enterprise: string;
  isRecent: boolean;
  project: string;
  role: string;
  resume?: string[];
  additional_info?: string;
}

export type Sizes = 'small' | 'large' | 'medium';
