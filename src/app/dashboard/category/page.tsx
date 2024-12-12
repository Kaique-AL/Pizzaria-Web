import styles from './styles.module.scss'
import { Button } from '@/app/dashboard/components/button'
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'
import { api } from '@/services/api'

export default function Category() {

async function handleRegisterCategory(formData: FormData) {
    "use server"

    const name =  await formData.get('name')

    if(name === '') {
      console.log('Preencha todos os campos')
      return;
    }

    const data = {
        name
    }

     await api.post("/category", data, {
        headers: {
            Authorization: `Bearer ${await getCookieServer()}`
        }
    })
    .catch((error) => {
        console.log(error)
        return;
    })

    redirect('/dashboard')

}

    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form 
            className={styles.form}
                action={handleRegisterCategory}
            >
                <input 
                type="text" 
                name="name"
                placeholder="Nome da categoria" 
                required
                className={styles.input}
                />

                <Button name='Cadastrar'/>
            </form>
        </main>
    )
}