import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);

  const [sortType, setSortType] = useState({
	name: 'популярности',
	sortProperty: 'rating'
  });

  useEffect(() => {
        setIsLoading(true);

		  const sortBy = sortType.sortProperty.replace('-', '')
		  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		  const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://62b20abe20cad3685c886056.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
		  	value={categoryId} 
			onChangeCategory={(id) => setCategoryId(id)} 
			/>
        <Sort 
		  	value={sortType}
			onChangeSort={(id) => setSortType(id)}
		  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

// export default Home;
