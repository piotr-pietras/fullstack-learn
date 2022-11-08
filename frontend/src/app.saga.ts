import { debounce, fork, put, select } from "redux-saga/effects";
import { AppActions, selectSearchValue } from "./app.slice";
import { PostGetActions } from "./features/PostBoard/post-get.store";
import { Backend } from "./services/backend";

const SearchInputUpdatedSaga = function* () {
    yield debounce(500, AppActions.searchInputUpdated, function* () {
      yield put(AppActions.categorySelected());
      const title: string = yield select(selectSearchValue);
      yield put(
        PostGetActions.dataFetched(Backend.getPostsByTitle(title))
      );
    });
  };
  
  export function* AppSaga() {
    yield fork(SearchInputUpdatedSaga);
  }
  