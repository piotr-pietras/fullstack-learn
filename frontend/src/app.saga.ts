import { debounce, fork, put, select } from "redux-saga/effects";
import { AppActions, selectSearchValue } from "./app.slice";
import { PostBoardActions } from "./features/PostBoard/post-board.store";
import { env } from "./services/env";

const SearchInputUpdatedSaga = function* () {
    yield debounce(500, AppActions.searchInputUpdated, function* () {
      yield put(AppActions.categorySelected());
      const contains: string = yield select(selectSearchValue);
      yield put(
        PostBoardActions.dataFetched({
          method: "POST",
          url: `${env.backendURL}posts?quantity=20&contains=${contains}`,
        })
      );
    });
  };
  
  export function* AppSaga() {
    yield fork(SearchInputUpdatedSaga);
  }
  