import React, { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getPeopleById,
  IPerson,
  selectPeopleById,
  updatePeopleById
} from '../PeoplePage/peopleSlice';
import styles from './PeronPage.module.css';

const getFieldsProps = (hero: IPerson) => [
  [
    {
      field: 'Name',
      name: 'name',
      control: Form.Control,
      type: 'text',
      placeholder: 'Enter name',
      defaultValue: hero.name
    },
    {
      field: 'gender',
      name: 'gender',
      control: Form.Select,
      options: ['male', 'female', 'n/a'],
      ariaLabel: 'Hero gender select',
      defaultValue: hero.gender
    }
  ],
  [
    {
      field: 'Height',
      name: 'height',
      control: Form.Control,
      type: 'number',
      placeholder: 'Enter Height',
      defaultValue: hero.height
    },
    {
      field: 'Weight',
      name: 'mass',
      control: Form.Control,
      type: 'number',
      placeholder: 'Enter Weight',
      defaultValue: hero.mass
    }
  ],
  [
    {
      field: 'hairColor',
      name: 'hair_color',
      control: Form.Control,
      type: 'text',
      placeholder: 'Enter hair color',
      defaultValue: hero.hair_color
    },
    {
      field: 'skinColor',
      name: 'skin_color',
      control: Form.Control,
      type: 'text',
      placeholder: 'Enter skin color',
      defaultValue: hero.skin_color
    }
  ],
  [
    {
      field: 'eyeColor',
      name: 'eye_color',
      control: Form.Control,
      type: 'text',
      placeholder: 'Enter eye color',
      defaultValue: hero.eye_color
    },
    {
      field: 'birthYear',
      name: 'birth_year',
      control: Form.Control,
      type: 'text',
      placeholder: 'Enter birth year',
      defaultValue: hero.birth_year
    }
  ]
];
const HeroPage = () => {
  const { peopleId = '' } = useParams();
  const dispatch = useAppDispatch();
  const [isHeroUpdating, setIsHeroUpdating] = useState(false);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [error, setError] = useState(false);
  const hero = useAppSelector((state) =>
    selectPeopleById(state, peopleId)
  ) as IPerson;

  useEffect(() => {
    const loadHero = async () => {
      setIsHeroLoading(true);

      try {
        await dispatch(getPeopleById(peopleId)).unwrap();
      } catch (err) {
        setError(true);
      }

      setIsHeroLoading(false);
    };

    loadHero();
  }, [peopleId]);
  const handleUpdateHero = async (e: FormEvent<HTMLFormElement>) => {
    setIsHeroUpdating(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch(
      updatePeopleById({
        id: peopleId,
        changes: Object.fromEntries(formData)
      })
    );
    setIsHeroUpdating(false);
  };

  if (isHeroLoading) {
    return (
      <Container className={styles.pageLoading}>
        <Spinner className={styles.spinner} />
      </Container>
    );
  }

  if (error) {
    return <Container>Something went wrong!</Container>;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleUpdateHero}>
            {getFieldsProps(hero).map((rows, i) => (
              <Row key={i}>
                {rows.map((formGroup, i) => {
                  return (
                    <Col key={i} xl={6} lg={6} md={6} sm={6}>
                      <Form.Group key={i} className='mb-3'>
                        <Form.Label>{formGroup.field}</Form.Label>
                        {formGroup.control === Form.Control ? (
                          <Form.Control
                            type={formGroup.type}
                            id={formGroup.field}
                            name={formGroup.name}
                            placeholder={formGroup.placeholder}
                            defaultValue={formGroup.defaultValue}
                          />
                        ) : (
                          <Form.Select
                            aria-label={formGroup.ariaLabel}
                            id={formGroup.field}
                            name={formGroup.name}
                            defaultValue={formGroup.defaultValue}
                          >
                            {formGroup.options?.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      </Form.Group>
                    </Col>
                  );
                })}
              </Row>
            ))}
            <Row>
              <Col xl={12} lg={12} md={12} sm={12}>
                <Button
                  type={'submit'}
                  variant='primary'
                  className={'ml-3'}
                  disabled={isHeroUpdating}
                >
                  {isHeroUpdating ? 'Saving' : 'Update'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HeroPage;
