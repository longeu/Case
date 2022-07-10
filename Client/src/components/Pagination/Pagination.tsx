import React from "react";
import ReactPaginate from "react-paginate";
interface PaginationProps {
  pageCount: number;
  onChange: (currentPage: number) => void;
}
function Pagination(props: PaginationProps) {
  const handleOnPageChange = (selectedItem: { selected: number }) => {
    props.onChange(selectedItem.selected);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Sau"
      pageRangeDisplayed={5}
      pageCount={props.pageCount}
      containerClassName="pagination justify-content-end mb-0"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      previousLabel="Trước"
      activeClassName="active"
      marginPagesDisplayed={1}
      onPageChange={handleOnPageChange}
    />
  );
}

export default Pagination;
