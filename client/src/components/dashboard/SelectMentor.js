import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";

function SelectMentor() {
  const [allMentors, setAllMentors] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllMentors = async () => {
      try {
        const response = await fetch("http://localhost/mentors", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const jsonData = await response.json();
        setAllMentors(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllMentors();
    if (setAllMentors.length === 0) {
      toast("There are no signed up mentors available !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-error-message",
      });
      // Go to the Plans page
      navigate("/plans", {
        state: { username: location.state.username },
        replace: true,
      });
    }
  }, [location.state.username, navigate]);


}

export default SelectMentor;
