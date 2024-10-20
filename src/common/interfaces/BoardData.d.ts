import { StyleSettings } from "./StyleSettings";
import { User } from "./UserData";
import { List } from "./ListData";

export interface BoardData {
  id?: number;
  title: string;
  custom: {
    styles:StyleSettings
  };
  users: User[];
  lists: List[];
}


