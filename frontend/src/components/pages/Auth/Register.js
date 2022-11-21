import { useState, useContext } from 'react'
import styles from '../../form/Form.module.css'
import Input from '../../form/Input'
import { UserContext } from '../../../context/UserContext'

const Register = () => {
    const [ user, setUser ] = useState({})

    const { register } = useContext(UserContext)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    multiple={false}
                />
                <Input
                    type="text"
                    text="Telefone"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    multiple={false}
                />
                <Input
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    multiple={false}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                    multiple={false}
                />
                <Input
                    type="password"
                    text="Confirme a senha"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                    multiple={false}
                />
                <input type="submit" value="Cadastrar" />
            </form>
        </section>
    )
}

export default Register