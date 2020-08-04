import React, { Component } from "react";
import Axios from "axios";

class Home extends Component {
  state = {
    employees: [],
    //       {
    //         id: 1,
    //         employee_name: "Nick Mitchell",
    //         employee_salary: 100000,
    //         employee_age: 22,
    //         profile_image: "",
    //       },
    //       {
    //         id: 2,
    //         employee_name: "Joe Louis",
    //         employee_salary: 75000,
    //         employee_age: 43,
    //         profile_image: "",
    //       },
    //     ],
  };
  componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=50").then((result) => {
      const employees = result.data.results;
      employees.forEach((o, i) => (o.key = i + 1));
      employees.forEach(
        (o, i) => (o.employee_name = o.name.first + " " + o.name.last)
      );
      this.setState({ employees: employees });
      console.log(this.state.employees);
    });
  }

  sortEmployeesByAge = () => {
    function compare(a, b) {
      if (a.dob.age > b.dob.age) return 1;
      if (b.dob.age > a.dob.age) return -1;

      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);
    // console.log(sortedEmployees);
    this.setState({
      employees: sortedEmployees,
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <span className="navbar-brand">Employee Directory</span>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Employee Name"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 float-right"
                type="submit"
              >
                Search By Name
              </button>
            </form>
          </nav>
          <br />
          <br />
          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Email</th>
                    <th scope="col">
                      <button className="btn" onClick={this.sortEmployeesByAge} style={{all:"unset"}}>
                        Age
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee) => (
                    <tr>
                      <th scope="row">{employee.key}</th>
                      <td>{employee.employee_name}</td>
                      <td>{employee.location.country}</td>
                      <td>{employee.email}</td>
                      <td>{employee.dob.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
