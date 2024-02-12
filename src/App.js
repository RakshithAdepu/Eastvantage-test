import React from "react";
import axios from "axios";
import "./App.css"

const App = () => {
  const [data, setData] = React.useState({
    title: "",
    first: "",
    last: "",
    email: "",
  });

  const fetchData = async () => {
    try {

      // Note : I have used axios npm package to fetch the data as mentioned.
      const response = await axios.get("https://randomuser.me/api");
      const info = response.data.results[0];
      const infoData = {
        title: info.name.title,
        first: info.name.first,
        last: info.name.last,
        email: info.email,
      };

      setData(infoData);
// Note: Storing the data in the localStorage
      localStorage.setItem("infoDataKey", JSON.stringify(infoData));
    } catch (error) {
      console.log("error: ", error);
    }
  };
// Note: I have used useMemo hook to pre render the fetch.
  React.useMemo(() => {
    console.log("effect triggered");
// Note: getting the stored data in the local
    const storageData = JSON.parse(localStorage.getItem("infoDataKey"));
    if (storageData) {
      setData(storageData);
    } else {
      fetchData();
    }

    fetchData();
  }, []);

  return (
    <div>
      <center>
        <nav className="nav">
          <h1>Eastvantage test</h1>
        </nav>
        <br/>
        <div className="box">
          <h1 style={{textDecoration: "underLine"}}>User Details</h1>
        <h2>
          Full name: {data.title} {data.first} {data.last}
        </h2>
        <h2>Email address: {data.email}</h2>
        </div>
        <br/>
        <button className="button" onClick={fetchData}>Refresh</button>
       
      </center>
    </div>
  );
};

export default App;
