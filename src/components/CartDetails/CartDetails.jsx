import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseItem, decreaseItem, getInputValue, removeItem,
} from '../../store/reducer/cartSlice';
import Confirm from '../UI/ConfirmModal/ConfirmModal';
import Counter from '../UI/Counter/Couner';

function CartDetails(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const { item, index } = props;

  const increaseButtonHandler = () => {
    dispatch(increaseItem(item));
  };

  const decreaseButtonHandler = () => {
    dispatch(decreaseItem(item));
  };

  const inputChangeHandler = (e) => {
    dispatch(getInputValue([item, +e.target.value]));
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const cancelHandler = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const confirmHandler = () => {
    dispatch(removeItem(item));
  };

  return (
    <>
      {showConfirm && <Confirm confirmText="確定要刪除此商品嗎？" onCancel={cancelHandler} onConfirm={confirmHandler} />}
      <div className="flex p-2.5 border-b border-inherit bg-white">
        <div className="w-40 mb:w-52 mr-4">
          <Link to={`/shop/product/${item.id}`}>
            <img
              className="w-full"
              src={item.attributes.imgSrc}
              alt={item.attributes.title}
            />
          </Link>
        </div>
        <div className="flex-auto">
          <div className="text-basic md:mt-2">{item.attributes.title}</div>
          <div className="flex md:mt-6 justify-between flex-col md:flex-row pr-2 md:pr-6">
            <div className="before:content-['NT$'] font-bold my-3 md:my-0">
              {cart.cartItems[index].subtotal.toLocaleString('en-US')}
            </div>
            <Counter
              index={index}
              onIncrease={increaseButtonHandler}
              onDecrease={decreaseButtonHandler}
              onInputChange={inputChangeHandler}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-gray-500"
            onClick={showConfirmHandler}
            onKeyDown={showConfirmHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDetails;
