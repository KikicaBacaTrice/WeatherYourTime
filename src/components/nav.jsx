import { useEffect } from "react";

function Nav({cityValue}) {
    function addNavLink(){
        var nav = document.getElementsByClassName("nav-links")[0];
        nav.classList.toggle("add-nav-links");
        sendvic.classList.toggle("open"); 
    }
    useEffect(()=>{
      if(cityValue !== ""){
        document.getElementById('navigation').classList.add("into-anim-navbar");
      }
    }, [cityValue])

  return (
    <nav id="navigation">
      <a href=""><h3>WeatherYourTime</h3></a>
      <div className="nav-links">
        <a href=""><p>Your Time</p></a>
        <a href=""><p>Global Weather</p></a>
      </div>
      <div id="sendvic" onClick={addNavLink}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
    </nav>
  );
}

export default Nav;