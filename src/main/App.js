import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'
import Navbar from '../components/navbar'
import '../custom.css'

class App extends React.Component {
  render(){
    return(
      <>
        <Navbar />
          <div className="container">
            <Rotas />
          </div>
        <Navbar />
      </>
    )
  }
}

export default App;
