'use client'
import { Check, X } from 'lucide-react'
import styles from './styles.module.scss'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculeTotal } from '@/lib/total'
import Image from 'next/image'



export function ModalOrder() {
    const {onRequestClose, order, finishOrder} = use(OrderContext)

    async function handleFinishOrder() {
        await finishOrder(order[0].order.id)

    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.close}>
                    <X size={40} color="#ff3f4b"
                        onClick={onRequestClose}
                    />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa: <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order.name && (
                        <span className={styles.name}>
                            Cliente: <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map((item) => (
                            <section
                            className={styles.orderItem}
                            key={item.id}>
                            <Image
                                src={item.product.banner}
                                alt={item.product.name}
                                width={100}
                                height={100}
                                className={styles.imageItem}
                             />

                            <span>
                                Qtd: {item.amount} - <b> {item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount }
                                </span>
                            <span
                            className={styles.description}>
                                {item.product.description}
                            </span>
                        </section>
                    ))}


                    <h3 className={styles.total}>Total do pedido: R$ {calculeTotal(order)}</h3>

                    <button className={styles.buttonOrder}
                    onClick={handleFinishOrder}
                    >
                        <div>
                        <Check size={25}
                        className={styles.icon}
                        />
                        </div>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}

function finishOrder(id: string) {
    throw new Error('Function not implemented.')
}
