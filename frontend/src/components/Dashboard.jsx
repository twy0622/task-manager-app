import Header from '../Header'
import Footer from '../Footer'
import Navbar from "./NavBar";
import TaskChart from './TaskChart';

function Dashboard() {
    return (
        <>
            <Header/>
            <Navbar/>
            {/* doughnut/pie chart */}
            <TaskChart/>
            <Footer/>
        </>
    )
}       

export default Dashboard
