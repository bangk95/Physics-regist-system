import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  username: string;
  password: string;
  name: string;
  nameEng: string;
}

const Users = () => {
  let count = 1;
  const [users, setUsers] = useState<Props[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="container">
      <div
        className="card"
        style={{
          margin: "5% 0% 0% 0%",
          padding: "5% 10px 0% 10px",
          textAlign: "center",
        }}
      >
        <div
          className="card"
          style={{
            margin: "5px 1% 5px 1%",
            padding: "10px 0% 10px 0%",
          }}
        >
          <h3 className="m-3">Users</h3>
          <hr />
          <div
            className="table-responsive"
            style={{ textAlign: "left", display: "flex" }}
          >
            <table
              className="table table-bordered"
              style={{ margin: "1% 3% 1% 3%", fontSize: "14px" }}
            >
              <thead>
                <tr>
                  <th className="c">#</th>
                  <th className="c">Username</th>
                  <th className="c">Password</th>
                  <th className="c">Name</th>
                  <th className="c">NameEng</th>
                  <td
                    style={{
                      textAlign: "center",
                      margin: "0 5px 0 5px",
                      padding: "3px 0 3px 0",
                      fontSize: "12px",
                    }}
                  ></td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="c">{count++}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.name}</td>
                    <td>{user.nameEng}</td>
                    <td
                      className="d-flex justify-content-evenly"
                      style={{
                        textAlign: "center",
                        margin: "0 0px 0 0px",
                        padding: "3px 5px 3px 5px",
                        fontSize: "12px",
                      }}
                    >
                      <Link to={`/admin/users/update/${user.id}`}>
                        <button
                          style={{
                            fontSize: "12px",
                          }}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
