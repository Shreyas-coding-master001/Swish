import "./HomePage.css";

function HomePage(){
    return( <div className="HomeSection">
        <nav id="Main_Navigation"> 
            <div className="One">
                <a href="/home"><img src="" alt="Logo" /></a>
                <h2>Swish</h2>
            </div>
            <div className="One">
                <label for=""><i><i class="ri-search-line"></i></i></label>
                <input type="text" placeholder="Serach"/>
            </div>
        </nav>
        <nav id="SectionChanging">
            <h3 onClick={()=>alert("working")}>Some</h3>
            <h3 onClick={()=>alert("working")}>Some</h3>
            <h3 onClick={()=>alert("working")}>Some</h3>
            <h3 onClick={()=>alert("working")}>Some</h3>
        </nav>
        <div className="target"></div>
    </div>);
}

export default HomePage;