import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_GIFTS,
} from '../utils/actions';
import { QUERY_GIFTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentGift, setCurrentGift] = useState({});

  const { loading, data } = useQuery(QUERY_GIFTS);

  const { gifts, cart } = state;

  useEffect(() => {
    // already in global store
    if (gifts.length) {
      setCurrentGifts(gifts.find((gift) => gift._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_GIFTS,
        gifts: data.gifts,
      });

      data.gifts.forEach((gift) => {
        idbPromise('gifts', 'put', gift);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('gifts', 'get').then((indexedGifts) => {
        dispatch({
          type: UPDATE_GIFTS,
          gifts: indexedGifts,
        });
      });
    }
  }, [gifts, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        gift: { ...currentGift, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentGift, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentGift._id,
    });

    idbPromise('cart', 'delete', { ...currentGift });
  };

  return (
    <>
      {currentGift && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to gifts</Link>

          <h2>{currentGift.name}</h2>

          <p>{currentGift.description}</p>

          <p>
            <strong>Price:</strong>${currentGift.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentGift._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentGift.image}`}
            alt={currentGift.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
