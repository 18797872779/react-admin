import React from 'react'
import Layout from './layout/main/index'
import { BrowserRouter } from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout/>
        </BrowserRouter>
    );
  }
}

export default App