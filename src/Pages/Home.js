import { useRef} from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect } from 'react';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectSort, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';


export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
	const {sortProperty} = useSelector(selectSort)
	const {items, status} = useSelector(selectPizzaData);
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	

  const onChangeCategory = (id) => {
	dispatch(setCategoryId(id))
  };

  const onChangePage = number => {
	dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    const sortBy = sortProperty.replace('-', '');
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

dispatch(
  fetchPizzas({
    sortBy,
    order,
    category,
    search,
    currentPage,
  }),
);



  }


  useEffect(() => {
	if (
    window.location.search &&
    window.location.search !== '?sortProperty=rating&categoryId=0&currentPage=1'
  ) {
    const params = qs.parse(window.location.search.substring(1));

    const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

    dispatch(
      setFilters({
        ...params,
        sort,
      }),
    );

    isSearch.current = true;
  }
  }, [])




  useEffect(() => {
   if (!isSearch.current) {
		getPizzas();
	} 
	isSearch.current = false

  }, [categoryId, sortProperty, searchValue, currentPage]);





  useEffect(() => {
	if (isMounted.current) {
		const queryString = qs.stringify({
      sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
	}
	isMounted.current = true
  }, [categoryId, sortProperty, currentPage, navigate]);

  const pizzas = items.map((item) => (
    <Link key={item.id} to={`/pizza/${item.id}`}>
      <PizzaBlock {...item} />
    </Link>
  ));

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Ошибка <span>😕</span>
          </h2>
          <p>Не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};


