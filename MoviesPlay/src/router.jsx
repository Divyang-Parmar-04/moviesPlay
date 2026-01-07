import { createBrowserRouter, createRoutesFromElements, Router, Route } from 'react-router'
import Home from './pages/Home'
import App from './App'
import MoreShow from './pages/MoreShow'
import MovieDetails from './pages/MovieDetailes'
import ShowResult from './pages/ShowResult'
import About from './components/About'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/more/:type" element={<MoreShow/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/show/media/type/:type/:id" element={<MovieDetails/>}/>
            <Route path="/search/results" element = {<ShowResult/>}/>
        </Route>
    )
)

export default router