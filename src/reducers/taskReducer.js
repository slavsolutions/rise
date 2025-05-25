const initialState = {
    tasks: [],
    assetTypes: [],
    models: [],
    assetBrands: [],
    activeSidebarButton: "Dashboard",
    activeTab: 'Dashboard'
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_ASSETLIST_FROM_SERVER':
        return{
          ...state,
          assetTypes: action.payload
        }

      case 'UPDATE_MODELLIST_FROM_SERVER':
        return {
          ...state,
          models: action.payload
        };

        case 'DATA_UPDATE':
        return {
          ...state,
          [action.data]: action.payload
        };

      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        };
        
      default:
        return state;



    }
  };
  
  export default taskReducer;