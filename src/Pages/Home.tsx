import { useCallback, useRef} from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { SortPopup, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect } from 'react';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../Pagination';
import { useSelector } from 'react-redux';

import { UseAppDispatch } from '../redux/store';
import { selectFilter, selectSort } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';


export const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = UseAppDispatch();
	const { categoryId, currentPage, sort, searchValue } = useSelector(selectFilter);
	const {sortProperty} = useSelector(selectSort)
	const {items, status} = useSelector(selectPizzaData);
	const isSearch = useRef(false)
	const isMounted = useRef(false)


  const onChangeCategory = useCallback((id: number) => {
	dispatch(setCategoryId(id))
  },[])

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
    window.location.search
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
    
      <PizzaBlock key={item.id} {...item} />
  
  ));

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

	

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort}/>
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


