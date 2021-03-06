import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  addIllustCommentSuccess,
  addIllustCommentFailure,
} from '../actions/addIllustComment';
import { addError } from '../actions/error';
import pixiv from '../helpers/apiClient';
import { ADD_ILLUST_COMMENT } from '../constants/actionTypes';

export function* handleAddIllustComment(action) {
  const { illustId, comment } = action.payload;
  try {
    yield apply(pixiv, pixiv.illustAddComment, [illustId, comment]);
    yield put(addIllustCommentSuccess(illustId));
  } catch (err) {
    yield put(addIllustCommentFailure(illustId));
    yield put(addError(err));
  }
}

export function* watchAddIllustComment() {
  yield takeEvery(ADD_ILLUST_COMMENT.ADD, handleAddIllustComment);
}
