import { IPerson } from './peopleSlice';
import { Card } from 'react-bootstrap';
import styles from './PeoplePage.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const HeroCard = ({ hero }: { hero: IPerson }) => {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>{hero.name}</Card.Title>
        <Card.Text as={'div'}>
          <ul>
            <li>Height: {hero.height}</li>
            <li>Weight: {hero.mass}</li>
            <li>Hair color: {hero.hair_color}</li>
            <li>Skin color: {hero.skin_color}</li>
            <li>Eyes color: {hero.eye_color}</li>
            <li>Birth year: {hero.birth_year}</li>
            <li>Gender: {hero.gender}</li>
          </ul>
        </Card.Text>
        <Link
          className='btn btn-outline-primary'
          role='button'
          to={`/people/${hero.id}`}
        >
          View profile
        </Link>
      </Card.Body>
    </Card>
  );
};

export default HeroCard;
