'use client';
import styles from './loginPage.module.scss';
import Link from 'next/link';
import { useFormCustom } from '../../hooks/hooks/useFormCustom';
import { loginFormData } from '../../hooks/types/loginFormData';
import { loginSchema } from '../../hooks/schemas/loginSchema';
import { Login } from '../../services/login';
import { FormEvent } from 'react';
import 'dotenv/config';

import { useState } from 'react';

export default function LoginPage() {
  const { handleSubmit, register, errors } = useFormCustom<loginFormData>(loginSchema, {
    email: '',
    password: '',
  });


  const { userLogin, message } = Login();
  const [loading, setLoading] = useState(false); // Estado para controlar o status de carregamento

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    await userLogin(data);
    setLoading(false); 
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.content}>
        <h1>Entre com sua conta</h1>
        <div className={styles.mainContainer}>
          <form onSubmit={handleFormSubmit} className={styles.formRegisterContainer}>
            <input {...register('email')} type='email' placeholder='Digite seu email' />
            {errors.email && <span className='error'>{errors.email.message}</span>}
            <input {...register('password')} type='password' placeholder='Digite sua senha' />
            {errors.password && <span className='error'>{errors.password.message}</span>}
            {loading && <span className='error'>Carregando...</span>}
            {message && !loading && <span className='error'>{message}</span>}
            <button type='submit' disabled={loading}>
              ENTRAR
            </button>
          </form>
        </div>
        <span className='recoverLink'>
          <Link href='/send-confirmation-code'>Recuperar senha</Link>
        </span>
        <span className='registerLink'>
          <Link href='/'>Cadastre-se</Link>
        </span>
      </div>
    </main>
  );
}
