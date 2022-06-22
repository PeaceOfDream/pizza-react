

export const Categories = ({ value, onChangeCategory }) => {
  const categories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
};
