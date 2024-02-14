"use client";
import styles from "./authenticated.module.scss";
import Link from "next/link";
import Cookie from "js-cookie";

export default function System() {
  function handleLogout() {
    Cookie.remove("auth_token");
  }
  return (
    <main className={styles.pageContainer}>
      <h1>BEM-VINDO A SMILESYNC</h1>
      <Link href="/" onClick={handleLogout} className={styles.closed}>
        SAIR
      </Link>
    </main>
  );
}
