// import { FormResetPassword } from "@/components/FormResetPassword/FormResetPassword";
'use client';
import Cookies from 'js-cookie';
import styles from './reset.module.scss';
import { useFormCustom } from '../../../hooks/hooks/useFormCustom';
import { resetFormData, resetPasswordSchema } from '../../../hooks/types/resetFormData';
import { UseResetPassword } from '../../../services/resetPassword';
import React, { FormEvent } from 'react';

export default function ResetPage() {
  const email = Cookies.get('resetEmail');
  console.log(email);
  const { resetPassword, errorMessage, success } = UseResetPassword();
  const { register, errors } = useFormCustom<resetFormData>(resetPasswordSchema, {});
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    await resetPassword({ email, password, confirmPassword });
  };
  return (
    <main className={styles.formRecoverContainer}>
      <form onSubmit={handleSubmit}>
        {success && <span className='success'>{success}</span>}
        {errorMessage && <span className='error'>{errorMessage}</span>}
        <input {...register('email')} type='email' value={email} />
        {errors.email && <span className='error'>{errors.email.message}</span>}
        <input {...register('password')} type='password' placeholder='Digite a nova senha' />
        {errors.password && <span className='error'>{errors.password.message}</span>}
        <input {...register('confirmPassword')} type='password' placeholder='Confirme a senha' />
        {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}
        <button type='submit'>CONFIRMAR</button>
      </form>
    </main>
  );
}
