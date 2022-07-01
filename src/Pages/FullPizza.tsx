import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


interface FullPizzaInt {
  imageUrl: string;
  title: string;
  price: string;
}


export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<FullPizzaInt>();

  const { id } = useParams();
	const navigate = useNavigate()
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62b20abe20cad3685c886056.mockapi.io/items/${id}`);
        console.log(data);
        setPizza(data);
      } catch (error) {
        console.log(error);
		  navigate('/')
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>
	 	Загрузка...
	 </>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <div className="pizza-title">
        <div>
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
        </div>

        <Link className="button button--outline button--add go-back-btn" to="/">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
