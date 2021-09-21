import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';


function* fetchProductsSaga(action){

    try {
        const posts = yield call(api.fetchProducts);
        yield put(actions.getProducts.getProductsSuccess(posts.data));
      } catch (err) {
        console.error(err);
        yield put(actions.getProducts.getProductsFailure(err));
      }


}

function* mySaga(){
yield takeLatest(actions.getProducts.getProductsRequest, fetchProductsSaga)

}



export default mySaga;