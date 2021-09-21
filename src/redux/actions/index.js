import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
  };

export const getProducts = createActions({
    getProductsRequest : undefined,
    getProductsSuccess : (payload)=> payload,
    getProductsFailure : (err) => err,
})