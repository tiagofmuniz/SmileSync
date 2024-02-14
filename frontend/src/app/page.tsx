"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import { useFormCustom } from "../hooks/hooks/useFormCustom";
import { registerFormData, registerSchema } from "../hooks/types/registerFormData";
import { RegisterAndLogin } from "../services/registerAndLogin";
import { FormEvent } from "react";

export default function HomePage() {

  const { handleSubmit, register, errors } = useFormCustom<registerFormData>(registerSchema, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createUser, output, message } = RegisterAndLogin();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    await createUser(data);
  };


  return (
    <main className={styles.homePage}>
      <div className={styles.homeContainer}>
        <section className={styles.welcome}>
          <h1>SmileSync</h1>
          <span className={styles.slogan}>Seu sorriso, nossa paixão.</span>
          <h2>Bem-vindo de volta</h2>
          <div>
            <p>Acesse sua conta</p>
            <Link className={styles.btnToEnter} href="/login">
              ENTRAR
            </Link>
            <div className={styles.forgotPassword} data-target="redirect_forgot">
              <Link href="/send-confirmation-code">Esqueci minha senha</Link>
            </div>
          </div>
        </section>
        {/* <FormRegister /> */}
        <div className={styles.registerForm}>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleFormSubmit} className={styles.formRegisterContainer}>
            {output && <span className="success">{`✔${output} ${message}`}</span>}
            {output && !output && <span className="error">{`🦷 ${output}`}</span>}

            <input {...register("name")} type="text" placeholder="Digite seu nome"></input>
            {errors.name && <span className="error">{errors.name.message}</span>}

            <input {...register("email")} type="email" placeholder="Digite seu email"></input>
            {errors.email && <span className="error">{errors.email.message}</span>}

            <input {...register("password")} type="password" placeholder="Digite a senha"></input>
            {errors.password && <span className="error">{errors.password.message}</span>}

            <input {...register("confirmPassword")} type="password" placeholder="Confirme a senha"></input>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
            <button type="submit">REGISTRAR</button>
          </form>
        </div>
      </div>
    </main>
  );
}
