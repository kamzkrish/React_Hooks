import { combineReducers } from "redux";
import { ACTION_TYPE } from "./constants";

export const viewData = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.GET_MAIN_DATA_FULFILLED: {
      return {
        ...state,
        data: action.payload
      };
    }
    case ACTION_TYPE.GET_DROPDOWN_DATA: {
      console.log("reducer code", state);
      console.log("reducer code", state, action.payload);
      const arr = [action.payload].concat(state?.data?.data);
      console.log("arr", arr);
      return {
        ...state,
        data: {
          data: arr,
          page: state.data.page,
          total_pages: state?.data?.total_pages + 1,
          total: state?.data?.total + 1
        }
      };
    }
    case ACTION_TYPE.DELETE_ITEM: {
      console.log("reducer code delete", state);
      console.log("reducer code delete state", state?.data?.data);
      console.log(
        "reducer code delete action.payload",
        action.payload?.result?.id
      );
      const arr = state?.data?.data?.filter(
        (item: any) => item.id !== action.payload?.result?.id
      );
      console.log("arr", arr);
      return {
        ...state,
        data: {
          data: arr,
          page: state.data.page,
          total_pages: state?.data?.total_pages - 1,
          total: state?.data?.total - 1
        }
      };
    }
    default:
      return state;
  }
};
// export const filteredData = (state = {}, action: any) => {
//   switch (action.type) {
//     case ACTION_TYPE.DELETE_ITEM: {
//       return {
//         ...state,
//         data: action.payload
//       };
//     }
//     default:
//       return state;
//   }
// };

export const rootReducer = () =>
  combineReducers({
    viewData
    //viewDropdownData,
    //filteredData
  });
