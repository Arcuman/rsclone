export interface Rout {
  name: string;
  path: string;
  action: () => HTMLElement;
}

export type Routes = Rout[];
