import { cloneDeep } from "lodash";

export const ReadListActions = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

export const readListReducer = (state, action) => {
  switch (action.type) {
    case ReadListActions.ADD: {
      return { readLists: [...state.readLists, action.readList] };
    }
    case ReadListActions.TOGGLE: {
      let newReadLists = cloneDeep(state.readLists);
      const updatedReadList = newReadLists.find(
        (x) => x.title === action.readList.title
      );
      updatedReadList.isComplete = !updatedReadList.isComplete;
      return {
        readLists: newReadLists,
      };
    }
    case ReadListActions.DELETE: {
      let newReadLists = cloneDeep(state.readLists);
      const updatedReadList = newReadLists.find(
        (x) => x.title === action.readList.title
      );
      newReadLists.splice(newReadLists.indexOf(updatedReadList));
      return {
        readLists: newReadLists,
      };
    }
  }
};
