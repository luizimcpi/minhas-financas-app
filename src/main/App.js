import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import Navbar from '../components/navbar'
import React from 'react';
import Rotas from './rotas'

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
