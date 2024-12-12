"use client"

import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '../../../../../public/logo.svg'
import { LogOut } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Header() {
    const router = useRouter()

     function handleLogout() {
        deleteCookie('login', { path: '/' })
        toast.success('Logout realizado com sucesso!')

        router.replace('/')
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/dashboard'}>
                    <Image
                        src={logoImg}
                        alt="Logo Pizzaria Nota 10"
                       width={190}
                       height={60}
                       priority={true}
                       quality={100}
                    />
                
                </Link>

                <nav>
                    <Link href={'/dashboard'}>Pedidos</Link>
                    <Link href={'/dashboard/category'}>Categoria</Link>
                    <Link href={'/dashboard/product'}>Produto</Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOut size={24} color='#fff'/>
                        </button>
                    </form>
                </nav>
            </div>
            
        </header>
    )
}