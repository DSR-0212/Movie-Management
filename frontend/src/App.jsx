import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import MovieDetailPage from "./pages/MovieDetailPage"
import UpcomingPage from "./pages/UpcomingPage";
import EditPage from "./pages/EditPage";
import BookTicketPage from "./pages/BookTicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";

const App = () => {
  return (
    <div data-theme="forest" className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
            [background:radial-gradient (125%_125%_at_50%_10%,#000_60%, #00FF9D40_100%)]' >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/book/:id" element={<BookTicketPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
      </Routes>
    </div>
     </div>
  )
}
export default App