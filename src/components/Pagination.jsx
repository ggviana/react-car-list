import Paginator from 'paginator'
import theme     from 'components/Pagination.css'

const Pagination = ({children, perPage, currentPage, texts, onPageChange}) => {
  const totalItemsCount = children.length
  const pages = range(1, Math.ceil(totalItemsCount / perPage))
  const paginator = Paginator(perPage, pages).build(totalItemsCount, currentPage)

  return (
    <div className={theme['paginator']}>
      
      <ul>

        {paginator.has_previous_page && (
          <li
            onClick={() => onPageChange(currentPage - 1)}>
            {texts.previous}
          </li>
        )}

        {pages.map(page => (
          <li
            key={page}
            className={`${currentPage === page && theme['current-page']}`}
            onClick={() => onPageChange(page)}>
            {page}
          </li>
        ))}

        {paginator.has_next_page && (
          <li
            onClick={() => onPageChange(currentPage + 1)}>
            {texts.next}
          </li>
        )}
      </ul>

    </div>
  )
}

Pagination.defaultProps = {
  perPage: 5,
  currentPage: 1,
  texts: {
    previous: <span>&#171;</span>,
    next: <span>&#187;</span>
  },
  onChangePage: () => {}
}

function range (start, end) {
  return Array.from({
      length: end - start + 1
    }, (x, i) => i + start)
}

export default Pagination