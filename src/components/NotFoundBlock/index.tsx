import React from 'react'
import { Link } from 'react-router-dom';
import styles from './NotFoundBlock.module.scss'


export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h2>

      <Link className="button button--outline button--add go-back-btn" to="/">
        <span>Вернуться на главную</span>
      </Link>
    </div>
  );
}
