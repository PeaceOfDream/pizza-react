import React, { memo } from "react";


interface CategoriesProps {
  value: number;
  onChangeCategory: (i: number) => void
}




const categories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {

	
  return (
    <div className="categories">
      <ul>
        {categories.map((CategoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {CategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})
