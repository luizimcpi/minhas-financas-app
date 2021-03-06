import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'
import React from 'react'
import Rotas from './rotas'

class App extends React.Component {
  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar />
          <div className="container">
            <Rotas />
          </div>
        <Navbar />
      </ProvedorAutenticacao>
    )
  }
}

export default App;
