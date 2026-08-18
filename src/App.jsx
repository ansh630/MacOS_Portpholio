gsap.registerPlugin(Draggable);
import gsap from "gsap";
import {Draggable } from "gsap/Draggable";

import Doc from "#Components/Doc.jsx"
import Navbar from "#Components/Navbar.jsx"
import Welcome from "#Components/Welcome.jsx"
import { Terminal } from "#windows";

const App = () => {
  return (
   <main> 
    <Navbar />
    <Welcome />
    <Doc />
    <Terminal />
   </main>
  )
}

export default App
