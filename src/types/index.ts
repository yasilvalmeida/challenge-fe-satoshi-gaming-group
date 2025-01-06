export type ProjectDto = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectManager: string;
  favorite?: boolean;
};
