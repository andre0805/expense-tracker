import styles from './Auth.module.css';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../providers/AuthProvider';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Loading } from '../../components';

interface AuthFormData {
  email: string;
  password: string;
}

export const Auth = () => {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Retrieve the location from where the user was redirected
  const location = useLocation();
  const from = location.state.from.location.pathname || '/';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<AuthFormData>();

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    try {
      if (isLogin) {
        await auth.login(data.email, data.password);
      } else {
        await auth.signup(data.email, data.password);
      }
      navigate(from);
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.googleLogin();
      navigate(from);
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };

  // gledati pisati arrow funkcije za sve

  function handleError(error: any) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        setError('email', { type: 'manual', message: 'Invalid email' });
      } else if (errorCode === 'auth/user-not-found') {
        setError('email', { type: 'manual', message: 'User not found' });
      } else if (errorCode === 'auth/invalid-credential') {
        setError('root', { type: 'manual', message: 'Invalid credentials' });
      } else if (errorCode === 'auth/email-already-in-use') {
        setError('email', { type: 'manual', message: 'Email already in use' });
      } else if (errorCode === 'auth/popup-closed-by-user') {
        setError('root', { type: 'manual', message: 'Popup closed by user' });
      } else {
        setError('root', { type: 'manual', message: error.message });
      }
    } else {
      setError('root', { type: 'manual', message: 'Something went wrong' });
    }
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>{isLogin ? 'Login' : 'Sign up'}</p>
      <div className={styles.input}>
        <TextInput
          {...register('email', {
            required: isLogin ? false : 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email',
            },
          })}
          className={styles.email}
          placeholder="E-mail"
          error={errors.email?.message}
        />
        <PasswordInput
          {...register('password', {
            required: 'Password is required',
            validate: (value) => {
              // ova funkcija bi se trebala izvuci odvojeno pa onda ovdje samo pozvati, nikada se ne pisu funkcije citave unutar komponente
              if (isLogin) {
                return true;
              }

              if (value.length < 8) {
                return 'Password should contain at least 8 characters';
              }

              if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
                return 'Password should contain letters and numbers';
              }

              return true;
            },
          })}
          className={styles.password}
          placeholder="Password"
          error={errors.password?.message}
        />

        <div className={styles.error}>{errors.root?.message}</div>
      </div>

      <div className={styles.buttons}>
        <div className={styles.loginButtons}>
          <Button className={styles.loginButton} type="submit" disabled={isSubmitting || isLoading}>
            {isLogin ? 'Login' : 'Sign up'}
          </Button>

          {isLogin && (
            <Button
              className={styles.googleButton}
              type="button"
              disabled={isSubmitting || isLoading}
              onClick={handleGoogleLogin}
            >
              Google login
            </Button>
          )}
        </div>

        <div className={styles.signupContainer}>
          <p className={styles.noAccount}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            className={styles.signupButton}
            type="button"
            disabled={isSubmitting || isLoading}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </form>
  );
};
