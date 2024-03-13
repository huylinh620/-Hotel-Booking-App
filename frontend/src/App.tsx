import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import {Register, SignIn, AddHotel, MyHotels, EditHotel, Search, Detail, Booking } from './pages/';
import { useAppContext } from "./contexts/AppContext";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
            path="/"
            element={
              <Layout>
                <p>Home page</p>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route
            path="/detail/:hotelId"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register/>
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
          }
          />
          {isLoggedIn && (
            <>
              <Route
                path="/hotel/:hotelId/booking"
                element={
                  <Layout>
                    <Booking />
                  </Layout>
                }
              />
              <Route
                path="/add-hotel"
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              />
              <Route
                path="/my-hotels"
                element={
                  <Layout>
                    <MyHotels />
                  </Layout>
                }
              />
              <Route
                path="/edit-hotel/:hotelId"
                element={
                  <Layout>
                    <EditHotel />
                  </Layout>
                }
              />
          </>
          )}
      </Routes>
    </Router>
  )
}

export default App
