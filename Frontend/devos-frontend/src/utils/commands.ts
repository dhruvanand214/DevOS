export interface Command {
  id: string;
  label: string;
  action: () => void;
  group?: string;
}
