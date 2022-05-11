import { call, put, takeEvery } from "redux-saga/effects";
import {
  getDataPending,
  getDataFulfilled,
  getDataRejected,
  deleteItem
} from "./redux/actionCreators";

import { ACTION_TYPE } from "./redux/constants";
import { productApi } from "./api";

function* getDataSaga(action: any) {
  try {
    yield put(getDataPending(action.payload));
    if (action.payload) {
      const response = yield call(productApi, action?.payload?.page);

      if (response.data.length >= 1) {
        yield put(getDataFulfilled(response));
      } else {
        yield put(getDataRejected("No Data To display", action.payload));
      }
    }
  } catch (error) {
    yield put(getDataRejected(error, action.payload));
  }
}
export function* watcherSaga() {
  yield takeEvery(ACTION_TYPE.GET_MAIN_DATA, getDataSaga);
}
