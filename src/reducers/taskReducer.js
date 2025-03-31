const initialState = {
    tasks: [],
    assetTypes: [],
    activeSidebarButton: "Dashboard",
    activeTab: 'Dashboard'
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_DATA_FROM_SERVER':
        console.log('redux', action.payload)
        return{
          ...state,
          assetTypes: action.payload
        }


      case 'ADD_TASK':
        return {
          ...state,
          tasks: [...state.tasks, action.payload]
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