import React, { useContext, useState } from 'react';
import { Button } from 'antd';

import UserContext from '../../contexts/UserContext';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

const RecipeWalkthrough = ({ className, match, history, setDocumentTitle }) => {
  const {
    params: { id },
  } = match;
  const { findRecipe } = useContext(UserContext);
  const { title, directions } = findRecipe(id);

  const [index, setIndex] = useState(0);

  const handleNextStep = () => {
    if (index < directions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePreviousStep = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const step = index + 1;

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.following}>Following</div>
        <h1>{title}</h1>
      </div>

      <div className={styles.step}>
        <b>Current: </b>
        <h2>{`${step}. ${directions[index]}`}</h2>
      </div>

      {index < directions.length - 1 && (
        <div className={styles.nextStep}>
          <b>Next: </b>
          <h2>{`${step + 1}. ${directions[index + 1]}`}</h2>
        </div>
      )}

      <div className={styles.buttons}>
        {step === 1 ? (
          <Button type="primary" onClick={() => history.push('/profile')}>
            Quit
          </Button>
        ) : (
          <Button type="primary" onClick={handlePreviousStep}>
            Back
          </Button>
        )}
        {step === directions.length ? (
          <Button type="primary" onClick={() => history.push('/profile')}>
            Finish
          </Button>
        ) : (
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecipeWalkthrough;
