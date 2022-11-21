import { useState, useEffect } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

const Message = () => {
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('')
    const [ visible, setVisible ] = useState(false)

    useEffect(() => {
        bus.addListener("flash", ({ message, type }) => {
            setVisible(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisible(false)
            }, 4000)
        })
    }, []);

    return visible && (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
}

export default Message