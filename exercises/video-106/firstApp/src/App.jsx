import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Card from './components/Card'

function App() {

  return (
    <>
      <Navbar/>
      <div className="cards">
        <Card title='Card 1' description='This is card 1'/>
        <Card title='Card 2' description='This is card 2'/>
        <Card title='Card 3' description='This is card 3'/>
        <Card title='Card 4' description='This is card 4'/>
      </div>
      <Footer/>
    </>
  )
}

export default App
