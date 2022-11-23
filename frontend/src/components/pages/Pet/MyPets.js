import { useState } from 'react'
import { Link } from 'react-router-dom'

const MyPets = (req, res) => {
    const [ pets, setPets ] = useState([])

    return (
        <section>
            <div>
                <h1>Meus Pets</h1>
                <Link to='/pet/add'>Cadastrar Pet</Link>
            </div>
            <div>
                {pets.length > 0 && (
                    <p>Pets...</p>
                )}
                {pets.length === 0 && (
                    <p>Nenhum pet cadastrado!</p>
                )}
            </div>
        </section>
    )

}

export default MyPets