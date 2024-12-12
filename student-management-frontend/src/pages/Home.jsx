import { Link } from "react-router-dom";
import background from '../assets/home.jpg';
import second from '../assets/second.jpg';
import third from '../assets/third.jpg';
import four from '../assets/four.jpg';
import five from '../assets/five.jpg';

function Home() {
    return (
        <div>
        <div className="font-serif bg-blue-950 ">
            <nav className=" p-3 shadow-xl text-white">
                <p className="p-3 m-5 font-bold  text-3xl text-center">WELCOME TO THE STUDENT MANAGEMENT SYSTEM</p>
                <p className="p-2 m-15 text-center">Are you tired of stacks of paperwork? Or hunting down student info like Sherlock Holmes? 🕵️‍♂️ Worry no more! </p>
                <p className="text-center">Our Student Management System is here to make everything easy-peasy..!😉</p>
            </nav>
            <div className="flex gap-5 justify-end p-5">
                <button className="bg-yellow-300 rounded p-2 text-blue-950 hover:translate-y-2"><Link to={"/Register"} className="underline">Register</Link></button>
                <button className="bg-yellow-300 rounded p-2 text-blue-950 hover:translate-y-2"><Link to={"/Login"} className="underline">Login</Link></button>

            </div>
        </div>
        <div className="flex flex-row gap-5 bg-blue-950">
            <img src={background} alt="Student" className="rounded-lg shadow-lg w-64 h-64 hover:translate-x-2"></img>
            <img src={second} alt="Student" className="rounded-lg shadow-lg w-64 h-64 hover:translate-x-2"></img>
            <img src={third} alt="Student" className="rounded-lg shadow-lg w-64 h-64 hover:translate-x-2"></img>
            <img src={four} alt="Student" className="rounded-lg shadow-lg w-64 h-64 hover:translate-x-2"></img>
            <img src={five} alt="Student" className="rounded-lg shadow-lg w-64 h-64 hover:translate-x-2"></img>

        </div>
            <marquee behavior="scroll" direction="left" scrollamount="10" className="text-white bg-blue-950 p-10">Are you tired of stacks of paperwork? Or hunting down student info like Sherlock Holmes? 🕵️‍♂️ Worry no more!Our Student Management System is here to make everything easy-peasy..!😉</marquee>
        
        </div>
    )
}

export default Home