import React, { useEffect } from 'react';
import GiftItem from '../GiftItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_GIFTS} from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_GIFTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function GiftList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_GIFTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_GIFTS,
        gifts: data.gifts,
      });
      data.gifts.forEach((gift) => {
        idbPromise('gifts', 'put', gift);
      });
    } else if (!loading) {
      idbPromise('gifts', 'get').then((gifts) => {
        dispatch({
          type: UPDATE_GIFTS,
          gifts: gifts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterGifts() {
    if (!currentCategory) {
      return state.gifts;
    }

    return state.gifts.filter(
      (gift) => gift.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Gifts:</h2>
      {state.gifts.length ? (
        <div className="flex-row">
          {filterGifts().map((gift) => (
            <GiftItem
              key={gift._id}
              _id={gift._id}
              image={gift.image}
              name={gift.name}
              price={gift.price}
              quantity={gift.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any gifts yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default GiftList;
