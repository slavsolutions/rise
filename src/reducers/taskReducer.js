import {produce} from "immer";

const initialState = {
  jwt: null,
  tasks: [],
  assetTypes: [],
  models: [],
  assetBrands: [],
  usersList: [],
  activeSidebarButton: "Dashboard",
  activeTab: 'Dashboard'
};

const taskReducer = produce((draft, action) => {
  switch (action.type) {
    case 'DATA_UPDATE':
      //console.log('data update: ', action.data, action.payload)
      draft[action.data] = action.payload;
      break;

    case 'DELETE_TASK':
      draft.tasks = draft.tasks.filter(task => task.id !== action.payload);
      break;

    default:
      break;
  }
}, initialState);

export default taskReducer;
