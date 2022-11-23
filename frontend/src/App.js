import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

// Contexts
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/pet/mypets' element={<MyPets />} />
            <Route path='/pet/add' element={<AddPet />} />
            <Route path='/pet/edit/:id' element={<EditPet />} />
            <Route path='/pet/:id' element={<PetDetails />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
