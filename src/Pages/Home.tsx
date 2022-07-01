import { useRef} from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { SortPopup, sortList, SortListItem } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect } from 'react';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../Pagination';
import { useSelector } from 'react-redux';
import { selectFilter, selectSort, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { UseAppDispatch } from '../redux/store';


export const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = UseAppDispatch();
	const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
	const {sortProperty} = useSelector(selectSort)
	const {items, status} = useSelector(selectPizzaData);
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	

  const onChangeCategory = (id: number) => {
	dispatch(setCategoryId(id))
  };

  const onChangePage = (page:number) => {
	dispatch(setCurrentPage(page));
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
    currentPage: String(currentPage),
  }),
);



  }


  useEffect(() => {
	if (
    window.location.search &&
    window.location.search !== '?sortProperty=rating&categoryId=0&currentPage=1'
  ) {
    const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

    const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

	

    dispatch(
      setFilters({
			searchValue: params.search,
			categoryId: +params.category,
			currentPage: +params.currentPage,
			sort: sort || sortList[0]

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

  const pizzas = items.map((item: any) => (
    <Link key={item.id} to={`/pizza/${item.id}`}>
      <PizzaBlock {...item} />
    </Link>
  ));

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
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


