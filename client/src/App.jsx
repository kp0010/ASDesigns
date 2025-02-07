import { Carousel } from './Components/Carousel/Carousel'
import { Category } from './Components/Category/Category'
import { Footer } from './Components/Footer/Footer'
import { Navbar } from './Components/Navbar/Navbar'

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Category />
        <Footer />
      </div>
    </>
  )
}

export default App
