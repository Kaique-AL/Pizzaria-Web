import styles from "./page.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { Button } from "./dashboard/components/button";


export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get('email')
    const password = formData.get('password')

    if(email === '' || password === '') {
      toast.error('Preencha todos os campos')
      return;
    }

    try {
    const response =  await api.post('/login', {
      email,
      password
    })

    if(!response.data.token) {
      return;
    }
    

    console.log(response.data)

    const expressTime = 60 * 60 * 24 * 30 * 1000 // 30 dias

    const cookiesStore = await cookies()

    cookiesStore.set('login', response.data.token, {
      maxAge: expressTime,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production'
    })

    } catch (error) {
      console.log(error)
      return;
    }

    redirect('/dashboard')
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="logo da pizzaria"
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input type="email" 
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            
            />

            <input type="password" 
              required
              name="password"
              placeholder="************"
              className={styles.input}
            />
            
            <button type="submit">Entrar</button>
          </form>

          <Link href="/signup" className={styles.register}>Não possui uma conta? Cadastre-se</Link>
        </section>

      </div>

    </>
  );
}