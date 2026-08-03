export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
}
