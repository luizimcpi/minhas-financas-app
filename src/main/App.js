import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'
import '../custom.css'

class App extends React.Component {
  render(){
    return(
      <div>
        <Rotas />
      </div>
    )
  }
}

export default App;
