import Image from "next/image"
import Link from "next/link"
import style from '../page.module.scss'
import logoImg from "../../../public/logo.svg"
import { api } from '@/services/api'
import { redirect } from "next/navigation"


export default function SignUp() {

  async function handleRegister(formData: FormData) {
    "use server"

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if(name === '' || email === '' || password === '') {
      console.log('Preencha todos os campos')
      return;

    }

    try {
      await api.post('/users', {
        name,
        email,
        password
      })
    } catch (error) {
      console.log('Erro ao cadastrar')
      console.log(error)
    }

    redirect('/')
  }

    return (
        <div className={style.containerCenter}>
        <Image
          src={logoImg}
          alt="logo da pizzaria"
        />

        <section className={style.login}>
            <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input type="text" 
              required
              name="name"
              placeholder="Digite seu nome"
              className={style.input}
            
            />

            <input type="email" 
              required
              name="email"
              placeholder="Digite seu email"
              className={style.input}
            
            />

            <input type="password" 
              required
              name="password"
              placeholder="************"
              className={style.input}
            />

            <button type="submit">Cadastrar</button>
          </form>

          <Link href="/" className={style.register}>Já possui uma conta? Faça login</Link>
        </section>

      </div>
    )
}