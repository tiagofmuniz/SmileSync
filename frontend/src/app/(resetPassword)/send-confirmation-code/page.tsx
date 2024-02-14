// import { FormConfirmResetCode } from "@/components/FormConfirmResetCode/FormConfirmResetCode";
"use client";
import styles from "./sendConfirmationCode.module.scss";
import { recoverFormData, recoverSchema } from "@/hooks/types/recoverFormData";
import { useFormCustom } from "@/hooks/hooks/useFormCustom";
import { useEmailSender } from "@/services/sendEmail";
import { FormEvent } from "react";

export default function RecoverPage(data: any) {
  const { handleSubmit, register, errors } = useFormCustom<recoverFormData>(recoverSchema, { email: "" });
  const { sendEmail, recoverCode, emailSend, message, isCodeValid, enteredCode, setEnteredCode, verifyCode } = useEmailSender();
  

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string
    };
    await sendEmail(data);
  };



  return (
    <main className={styles.formRecoverContainer}>
      <form onSubmit={handleFormSubmit}>
        {!recoverCode && (
          <>
            <input {...register("email")} type="email" placeholder="Digite seu email"></input>
            {errors.email && <span className="error">{errors.email.message}</span>}
            <button type="submit">ENVIAR CÓDIGO</button>
          </>
        )}

        {recoverCode && emailSend && (
          <>
            <input
              type="text"
              placeholder="Digite o código recebido"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
            />
            {!isCodeValid && <span className="error">O código digitado é inválido</span>}
            <button className="verifyCode" type="button" onClick={() => verifyCode()}>
              VERIFICAR CÓDIGO
            </button>
          </>
        )}
        {recoverCode && <span className="error">{recoverCode}</span>}
      </form>
    </main>
  );
}
