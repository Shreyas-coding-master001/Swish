import { useEffect, useState } from "react";
import axios from "axios";
import PeopleCard from "./PeopleCard";
import "./People.css";

function People() {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => { 
    const fetchPeoples = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/users",
          { withCredentials: true }
        );
        setPeoples(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeoples();
  }, []);

  const faculty = peoples.filter(p => p.role === "faculty");
  const alumni = peoples.filter(p => p.role === "alumni");
  const students = peoples.filter(p => p.role === "student");

  return (
    <div className="people-container">

      <div className="top-section-people">
        <div>
          <input
            placeholder="Search peoples around you"
            className="search-bar-people"
          />
          <button className="search-button-people">Search</button>
        </div>
        <select>
          <option>Faculty</option>
          <option>Alumni</option>
          <option>Student</option>
        </select>
      </div>

      <div className="faculty-section-people">
        <p className="faculty-label-people">Faculty</p>
        <hr />
        <div className="faculty-container-people">
          {faculty.map(user => (
            <PeopleCard key={user._id} user={user} />
          ))}
        </div>
      </div>

      <div className="alumni-section-people">
        <p className="alumni-label-people">Alumni</p>
        <hr />
        <div className="alumni-container-people">
          {alumni.map(user => (
            <PeopleCard key={user._id} user={user} />
          ))}
        </div>
      </div>

      <div className="students-section-people">
        <p className="students-label-people">Students</p>
        <hr />
        <div className="students-container-people">
          {students.map(user => (
            <PeopleCard key={user._id} user={user} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default People;
