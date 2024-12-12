import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentManagement from './pages/StudentManagement';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {



  return (

    <div>



      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/StudentManagement' element={<StudentManagement />}></Route>
         

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
