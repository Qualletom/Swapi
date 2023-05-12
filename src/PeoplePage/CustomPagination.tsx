import React from 'react';
import { IPagination } from './peopleSlice';
import ReactPaginate from 'react-paginate';

interface CustomPagination {
  pagination: IPagination;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination = ({ pagination, onPageChange }: CustomPagination) => {
  const handleClickPageChange = (e: { selected: number }) => {
    onPageChange(e.selected + 1);
  };

  return (
    <ReactPaginate
      nextLabel='next >'
      onPageChange={handleClickPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pagination.pages}
      previousLabel='< previous'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakLabel='...'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination'
      activeClassName='active'
      renderOnZeroPageCount={null}
    />
  );
};

export default CustomPagination;
