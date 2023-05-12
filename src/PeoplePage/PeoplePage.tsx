import React, { useEffect, useState } from 'react';
import styles from './PeoplePage.module.css';
import { Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useDebounce } from '../app/hooks';
import { getAllPeopleAsync, IPerson, selectAllPeople } from './peopleSlice';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from './CustomPagination';
import classNames from 'classnames';
import HeroCard from './HeroCard';
const PeoplePage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pagination = useAppSelector((state) => state.people.pagination);
  const heroes = useAppSelector((state) => selectAllPeople(state)) as IPerson[];
  const status = useAppSelector((state) => state.people.status);
  const [searchFilterValue, setSearchFilterValue] = useState('');

  const debouncedSurnameFilterValue = useDebounce(searchFilterValue);

  const handleChangePage = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(pageNumber));

      return prev;
    });
  };

  useEffect(() => {
    setSearchParams((prev) => {
      if (!debouncedSurnameFilterValue && prev.has('search')) {
        prev.delete('search');
        prev.set('page', '1');
      } else if (debouncedSurnameFilterValue) {
        prev.set('search', debouncedSurnameFilterValue);
        prev.set('page', '1');
      }


      return prev;
    });
  }, [debouncedSurnameFilterValue]);

  useEffect(() => {
    const promise = dispatch(
      getAllPeopleAsync(Object.fromEntries(searchParams.entries()))
    );

    return () => {
      promise.abort();
    };
  }, [searchParams]);

  let content;

  if (status === 'loading') {
    content = <Spinner variant={'secondary'} className={styles.spinner} />;
  } else if (status === 'failed') {
    content = 'Something went wrong!';
  } else {
    if (!heroes.length) {
      content = 'No results found';
    } else {
      content = heroes.map((hero) => {
        return <HeroCard key={hero.name} hero={hero} />;
      });
    }
  }

  return (
    <div className={styles.page}>
      <Form.Control
        type='text'
        placeholder='search by name'
        className={styles.searchControl}
        value={searchFilterValue}
        onChange={(e) => setSearchFilterValue(e.target.value)}
      />
      <div
        className={classNames(styles.cardsContainer, {
          [styles.loading]: status === 'loading'
        })}
      >
        {content}
      </div>
      <div className={styles.paginationWrapper}>
        <CustomPagination
          pagination={pagination}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
};
export default PeoplePage;
