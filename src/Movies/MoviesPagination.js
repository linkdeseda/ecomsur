import '../App.css';
import React from 'react';

const MoviesPagination = (props) =>{

  let numberPage = 5; //Indica el numero de paginas que seran visibles y con el que se hara el filtro.

  const pageCount = Math.ceil(props.currentPage/numberPage);

  const pageTotal  = (pageCount * numberPage);

  const startPagination = (pageCount * numberPage) - numberPage +1;
  let endPagination;

  if(startPagination + (numberPage-1) > props.totalPage){
     endPagination = props.totalPage;
  } else {
     endPagination = startPagination + (numberPage -1);
  }

        const  pageSelected = (event) => {
          props.updatemovies('');
          props.changePage(event.target.text);
        }

        const pageBack = (event) =>{
          let Pagefilter = (event -numberPage)
          props.updatemovies('');
          props.changePage(Pagefilter);
        }

        const pageNext = (event) =>{
          let Pagefilter = (event + numberPage)
          props.updatemovies('');
          props.changePage(Pagefilter);
        }
        
        const Pagination = [];
        
        for (var i = startPagination; i <= endPagination; i++) {

          if(i === startPagination && startPagination > 1) {
            Pagination.push(<li key={'back'}><a onClick={() => pageBack(startPagination)} className="">«</a></li>);
          }

          if(props.currentPage == i){
            Pagination.push( <li key={i} ><a className="active">{i}</a></li>);
          } else {
            Pagination.push( <li key={i}><a  onClick={pageSelected}>{i}</a></li>);
          }

          if(i === pageTotal && pageTotal < props.totalPage){
            Pagination.push(<li key={'next'}><a onClick={() => pageNext(startPagination)} className="">»</a></li>);
          }
      }

    return(
        <div className="MoviesPagination">
            
        <ul id="pagination">
          {Pagination}
        </ul> 

        </div>
    );
}

export default MoviesPagination;
