import React, { useState, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { Card, Divider } from 'antd';
import cn from 'classnames';

import Dots from '../../components/Dots';
import styles from './styles.css';

/**
 * Recipe detail.
 */
const Recipe = ({ recipe }) => {
  const {
    title,
    subtitle,
    description,
    ingredients,
    directions,
    pictures,
    preparationTime,
    cookTime,
  } = recipe;

  const [picIndex, setPicIndex] = useState(0);

  return (
    <Card
      title={<Title title={title} subtitle={subtitle} />}
      cover={
        !isEmpty(pictures) && (
          <img src={pictures[picIndex]} alt={title} loading={'lazy'} />
        )
      }
      data-testid={'Recipe'}
    >
      {!isEmpty(pictures) && (
        <Dots elements={pictures} selected={picIndex} onChange={setPicIndex} />
      )}

      <p>{description}</p>
      <Times preparationTime={preparationTime} cookTime={cookTime} />

      <List
        className={styles.list}
        header={'Ingredients'}
        elements={ingredients}
      />
      <List
        className={styles.list}
        header={'Directions'}
        elements={directions}
        ordered
      />
    </Card>
  );
};

const Title = ({ title, subtitle }) => {
  return (
    <div className={styles.titles}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

const Times = ({ preparationTime, cookTime }) => {
  return preparationTime || cookTime ? (
    <div className={styles.times}>
      {preparationTime && (
        <Fragment>
          <div>
            <div className={styles.timeHeader}>Prep</div>
            <div>{preparationTime} mins</div>
          </div>
          <Divider className={styles.divider} type={'vertical'} />
        </Fragment>
      )}
      {cookTime && (
        <Fragment>
          <div>
            <div className={styles.timeHeader}>Cooking</div>
            <div>{cookTime} mins</div>
          </div>
          <Divider className={styles.divider} type={'vertical'} />
        </Fragment>
      )}
      <div>
        <div className={styles.timeHeader}>Total</div>
        <div>{cookTime + preparationTime} mins</div>
      </div>
    </div>
  ) : null;
};

const List = ({ className, header, elements, ordered }) => {
  const listedElements = elements.map((element, index) => (
    <li key={index}>{element}</li>
  ));

  return (
    <div className={className}>
      <h3> {header} </h3>
      {ordered ? <ol>{listedElements}</ol> : <ul>{listedElements}</ul>}
    </div>
  );
};

export default Recipe;
