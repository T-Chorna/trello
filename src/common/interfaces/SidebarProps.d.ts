export interface SidebarProps {
  isSidebarVisible: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  styles: {
    borderColor: string;
    backgroundImg: string;
    textColor: string;
    listColor: string; 
  };
  lists: ListData[];
  updateBoardData: ()=>void,
  toggleSidebar: ()=>void
}