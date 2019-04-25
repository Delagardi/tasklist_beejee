import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrentPageAction } from '../../actions';
import { Link } from 'react-router-dom';

import './pagination.css';

const Pagintaion = ({ renderPageNumbers, changeCurrentPage, currentPage, totalPages }) => {
  return (
    <nav className="pagination-wrapper" aria-label="pagination">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link 
            className="page-link" 
            onClick={() => changeCurrentPage(currentPage-1, totalPages)}
            to="">Previous</Link>
        </li>
          {renderPageNumbers}
        <li className="page-item">
          <Link 
            className="page-link" 
            onClick={() => changeCurrentPage(currentPage+1, totalPages)}
            to="">Next</Link>
        </li>
      </ul>
    </nav>
  );
}

class PaginationContainer extends Component {
  
  render() {
    const ITEMS_COUNT_PER_PAGE = 3;
    const { 
      totalTaskCount, 
      currentPage,
      changeCurrentPage
    } = this.props;
    
    const totalPages = Math.ceil(totalTaskCount/ITEMS_COUNT_PER_PAGE);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li 
          className="page-item"
          key={number}
          id={number}>
          <Link 
            className="page-link" 
            to={`/${number}`}
            onClick={() => changeCurrentPage(number)}>{number}</Link>
        </li>
      );
    });
    
    return (
      <Pagintaion
        renderPageNumbers={renderPageNumbers}
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );
  }
}

const mapStateToProps = ({ totalTaskCount, currentPage }) => {
  return {
    totalTaskCount,
    currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (newPage, maxPages) => dispatch(changeCurrentPageAction(newPage, maxPages))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer);

