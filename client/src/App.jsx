import { Carousel } from './Components/Carousel/Carousel'
import { Category } from './Components/Category/Category'
import { Footer } from './Components/Footer/Footer'
import { Item } from './Components/Item/Item'
import { Navbar } from './Components/Navbar/Navbar'
import './App.css';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Category />
        <Item />
        <Footer />
      </div>
    </>
  )
}

export default App
