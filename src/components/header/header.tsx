import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavoriteOffers, fetchOffersAction, logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user/user.selector';
import { getFavoritesOffers } from '../../store/offers/offers.selector';
import './header.css';
import LinkRoot from './link-root';

type HeaderProps = {
  isLoginPage?: boolean;
};

function Header({ isLoginPage }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers = useAppSelector(getFavoritesOffers);
  const favoriteCount = favoriteOffers.length;
  const user = useAppSelector(getUserData);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  const handleLogoutButtonClick = async () => {
    await dispatch(logoutAction());
    dispatch(fetchOffersAction());
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LinkRoot />
          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{user?.email}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button className="header__nav-link header__signout-button" onClick={() => void handleLogoutButtonClick()}>
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = React.memo(Header);
MemoizedHeader.displayName = 'Header';

export default MemoizedHeader;
