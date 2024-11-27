export type Participants = {
  id: number;
  name: string;
  title: string;
}

export type ActivityForm = {
  id: number;
  activityName: string;
  description: string;
  participants: string;
  status: 'new'| 'on progress'|'completed';
  notes: string;
}

export type DateActivity = {
  id: number;
  activityName: string;
  description: string;
  participants: string;
  status: 'new'| 'on progress'|'completed';
  notes: string;
}