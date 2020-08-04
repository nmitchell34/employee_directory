import React, { Component } from "react";
import Axios from "axios";
// Class is defined for whole project essentially.
// State added, sortFlip will allow user to sort by asc or desc in Age column.
class Home extends Component {
  state = {
    sortFlip: true,
    employees: [],
    searchName: "",
  };
  //   At start, random individuals are generated from this axios call.
  // A key (id) is added and the employees first and last name is combined for later use.
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
  // on change of the search bar, the searchName state is updated.
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      searchName: value,
    });
  };

  // On submit of the employee name input, the employees array is filtered by
  //   name to see if it includes what the user input to the search bar.
  handleFormSubmit = (event) => {
    event.preventDefault();
    const currentSearchName = this.state.searchName;
    const filteredEmployees = this.state.employees.filter((employee) =>
      employee.employee_name
        .toLowerCase()
        .includes(currentSearchName.toLowerCase())
    );
    this.setState({
      employees: filteredEmployees,
    });
  };
  // sort employees by age checks the state of sortFlip and will sort by asc or desc depending on that.
  sortEmployeesByAge = () => {
    function sortAsc(a, b) {
      if (a.dob.age > b.dob.age) return 1;
      if (b.dob.age > a.dob.age) return -1;

      return 0;
    }
    function sortDesc(a, b) {
      if (a.dob.age > b.dob.age) return -1;
      if (b.dob.age > a.dob.age) return 1;

      return 0;
    }
    if (this.state.sortFlip) {
      const sortedEmployees = this.state.employees.sort(sortAsc);
      // console.log(sortedEmployees);
      this.setState({
        employees: sortedEmployees,
        sortFlip: false,
      });
    } else {
      const sortedEmployees = this.state.employees.sort(sortDesc);
      // console.log(sortedEmployees);
      this.setState({
        employees: sortedEmployees,
        sortFlip: true,
      });
    }
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
                id="searchBtn"
                placeholder="Employee Name"
                aria-label="Search"
                onChange={this.handleInputChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 float-right"
                type="submit"
                onClick={this.handleFormSubmit}
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
                    <th scope="col">Employee Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Email</th>
                    <th scope="col">
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          this.sortEmployeesByAge();
                        }}
                      >
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
