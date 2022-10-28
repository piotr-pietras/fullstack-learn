import { createSelector } from "@reduxjs/toolkit";
import { State } from "./store";

export const selectIsAppLoading = createSelector(
  (state: State) => state.request,
  (requests) => {
    return Object.values(requests).some(
      (request) => (request as any)?.request?.status === "pending"
    );
  }
);
