export interface ConditionData {
  id: string;
  name: CarCondition;
}

export enum CarCondition {
  Mint = 'Mint',
  Restored = 'Restored',
  Original = 'Original',
  Classic = 'Classic',
  Collector = 'Collector',
  Project = 'Project',
  BarnFind = 'Barn Find',
  DailyDriver = 'Daily Driver',
  Concours = 'Concours',
  Excellent = 'Excellent',
}
