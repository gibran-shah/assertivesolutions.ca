import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.paramUsed = false;

    this.state = { currentPage: 1 };
  }

    /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <div className="pagination-container">
          { pages.map((page, index) => {

            if (page === LEFT_PAGE) return (
              <div className="pagination-button" key={index}>
                <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </div>
            );

            if (page === RIGHT_PAGE) return (
              <div className="pagination-button" key={index}>
                <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            );

            return (
              <div className={`pagination-button ${page == currentPage ? 'pagination-active' : ''}`} key={index}>
                <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
              </div>
            );

          }) }
        </div>
      </Fragment>
    );
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(1, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
  }

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
  }

  scrollToPost() {
    const idParam = new URLSearchParams(window.location.search).get('id');
    const postIds = this.props.postIds;

    window.history.replaceState({}, 'no-id-param', '/blog');

    this.gotoPage(this.getPageByPostId(postIds, idParam));
    const post = document.querySelector(`[name="${idParam}"]`);
    if (post) {
      post.scrollIntoView({behavior: 'smooth'});
      // see if you can do this in a scroll end handler
      setTimeout(() => {
        this.props.readMoreLessClicked(idParam, this.props.that);
      }, 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.pageLimit = typeof nextProps.pageLimit === 'number' ? nextProps.pageLimit : 30;
    this.totalRecords = typeof nextProps.totalRecords === 'number' ? nextProps.totalRecords : 0;
    this.pageNeighbours = typeof nextProps.pageNeighbours === 'number'
      ? Math.max(0, Math.min(nextProps.pageNeighbours, 2))
      : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  }

  getPageByPostId(postIds, postId) {
    const index = postIds.indexOf(postId);
    let pageNum = Math.floor((index + 1) / this.pageLimit);
    pageNum += ((index + 1) % this.pageLimit) ? 1 : 0;
    return pageNum;
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;

// Taken from:
// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react#:~:text=%20How%20To%20Build%20Custom%20Pagination%20with%20React,you%20can%20use%20them%20in%20your...%20More%20