import {useState} from 'react'

export function Categories () {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const onClickCategory = (index) => {
		setActiveIndex(index)
	}
	return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li key={value} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}


