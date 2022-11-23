import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
    const { authenticated, logout } = useContext(UserContext)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>
                {
                    authenticated ? (
                        <>
                            <li><Link to="/user/profile">Perfil</Link></li>
                            <li onClick={logout}>Sair</li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Registrar</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar