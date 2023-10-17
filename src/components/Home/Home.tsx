import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div
        className="card"
        style={{ margin: "5% 30%", padding: "5% 0px", textAlign: "center" }}
      >
        <div className="center flex-column">
          <img
            src={
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjc2ZDMyODk3ODk5MzhlOWNlYTUyYjRmNmM2NGQyNzAxYjJjNGViOCZjdD1n/9oHZQ2gEez8ti/giphy.gif"
            }
            alt="Atom Icon"
            style={{ height: "200px", width: "200px", margin: "20px 0px" }}
          />
          <h4>Please log in!</h4>
          <div className="d-flex justify-content-evenly">
            <Link to="/login">
              <button
                className="btn btn-primary"
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  padding: "5px 20px",
                  borderRadius: "10px",
                }}
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
