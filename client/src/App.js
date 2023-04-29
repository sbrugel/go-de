import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navingbar } from './Navbar';
import { UserPage } from './UserPage';
function App() {
  return (
    <div className='App'>
	  <Navingbar></Navingbar>
      <UserPage></UserPage>
    </div>
  );
}

export default App;
