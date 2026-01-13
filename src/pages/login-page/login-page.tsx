import React from 'react';
import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchOffersAction, loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/user.selector';

const LoginLocation = React.memo(() => (
  <section className="locations locations--login locations--current">
    <div className="locations__item">
      <Link className="locations__item-link" to={AppRoute.Root}>
        <span>Paris</span>
      </Link>
    </div>
  </section>
));

LoginLocation.displayName = 'LoginLocation';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const resultAction = await dispatch(loginAction({ login: email, password }));
    dispatch(fetchOffersAction());
    if (loginAction.fulfilled.match(resultAction)) {
      navigate(AppRoute.Root);
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{'6 cities — login'}</title>
      </Helmet>

      <Header isLoginPage />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" method="post" onSubmit={(e) => void handleFormSubmit(e)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <LoginLocation />
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
