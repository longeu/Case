import React, { useState } from "react";
import { SortState } from "../types";
import { changeSort } from "reducers/sortProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
interface SortProps {
  values?: SortState;
}
function Sort(props: SortProps) {
  const { sort, order } = useSelector(
    (state: RootState) => state.sortProductReducer
  );
  const [currentOrder, setCurrentOrder] = useState("asc");

  const dispatch = useDispatch();

  const handleOnSort = () => {
    currentOrder === "asc" ? setCurrentOrder("desc") : setCurrentOrder("asc");
    const action = changeSort({
      sort: props.values?.sort,
      order: currentOrder,
    });
    dispatch(action);
  };
  return (
    <span
      className="ml-3"
      onClick={() => {
        handleOnSort();
      }}
      style={{ cursor: "pointer" }}
    >
      <i
        className={
          order === "asc" && props.values?.sort === sort
            ? "fas fa-arrow-up mr-1 sort-icon"
            : "fas fa-arrow-up mr-1 sort-icon sort-disable"
        }
      ></i>
      <i
        className={
          order === "desc" && props.values?.sort === sort
            ? "fas fa-arrow-down sort-icon "
            : "fas fa-arrow-down sort-icon sort-disable"
        }
      ></i>
    </span>
  );
}

export default Sort;
