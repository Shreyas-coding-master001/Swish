import "./Discuss.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Discuss(){
    const [communityData, setComData] = useState([]);

    useEffect(function(){
        try{
            axios.get("http://localhost:3000/community",{withCredentials: true})
            .then(res => {
                console.log(res.data);
                
                setComData(res.data);
            });
        }catch(err) {
            alert("error Occured")
            console.error(err.message);
        }

    },[])

    
    function handleChat(){
        console.log("Hello");
    }

    return (
    <div className="DiscussSection">
         <h3>Your Communities:</h3>
         <br />
        {communityData?.map(function(ele, idx){
            return(
                <div className="community-chat" onClick={handleChat} key={idx}>
                    <div className="profilelogo">
                        <img src={`http://localhost:3000${ele.profileImage}`} alt="Community Logo"/>
                    </div>
                    <h2>{ele.Community}</h2>
                </div>
            )
        })}
    </div>
    );
}

export default Discuss;