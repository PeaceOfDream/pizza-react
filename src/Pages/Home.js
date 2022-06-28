import { useContext, useRef} from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../Pagination';
import { searchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';


export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { categoryId, currentPage } = useSelector((state) => state.filter);
	const isSearch = useRef(false)
	const sortProperty = useSelector((state) => state.filter.sort.sortProperty);
	const isMounted = useRef(false)

	

	const {searchValue} = useContext(searchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
	dispatch(setCategoryId(id))
  };

  const onChangePage = number => {
	dispatch(setCurrentPage(number));
  }

  const fetchPizzas = () => {
		setIsLoading(true);

    const sortBy = sortProperty.replace('-', '');
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62b20abe20cad3685c886056.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

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
		fetchPizzas();
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

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};


