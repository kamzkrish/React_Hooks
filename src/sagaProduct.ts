import { call, put, takeEvery } from "redux-saga/effects";
import {
  getDropdownDataPending,
  getDropdownFulfilled,
  getDropdownRejected,
  sentDropdownResponse
} from "./redux/actionCreators";

import { ACTION_TYPE } from "./redux/constants";
import { productList } from "./api";

function* getDropdownDataSaga(action: any) {
  try {
    yield put(getDropdownDataPending(action.payload));
    const response: any = yield call(productList, action.payload);
    //yield put(sentDropdownResponse(response));
  } catch (error) {
    yield put(getDropdownRejected(error, action.payload));
  }
}
export function* watcherProductSaga() {
  yield takeEvery(ACTION_TYPE.GET_DROPDOWN_DATA, getDropdownDataSaga);
}
