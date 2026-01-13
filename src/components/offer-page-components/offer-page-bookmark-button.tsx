import classNames from 'classnames';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { addFavorite } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/user.selector';
import React from 'react';

type OfferBookmarkButtonProps = {
  offerId: string;
  isFavorite?: boolean;
};

function OfferBookmarkButton({ offerId, isFavorite }: OfferBookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = useCallback(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(addFavorite({ offerId: offerId, isFavorite: isFavorite }));
    }
  }, [dispatch, isFavorite, offerId, authStatus, navigate]);

  return (
    <button
      className={classNames(
        'offer__bookmark-button',
        { 'offer__bookmark-button--active': isFavorite },
        'button')}
      type='button'
      onClick={handleFavoriteClick}
    >
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

const MemoizedOfferBookmarkButton = React.memo(OfferBookmarkButton);
MemoizedOfferBookmarkButton.displayName = 'OfferBookmarkButton';

export default MemoizedOfferBookmarkButton;
