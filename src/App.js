import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes.jsx";
import "react-datetime/css/react-datetime.css";
import { Toaster } from 'react-hot-toast';





function App() {

 
  return (
    <>
    <Toaster position="top-right" 
      reverseOrder={false}
      gutter={8}
      toastOptions={{
      className: '',
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },

      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
       
        }

      }
    
    }

    />
    <Router>
      <Routes />
    </Router>
    </>
   
  );
}

export default App;
