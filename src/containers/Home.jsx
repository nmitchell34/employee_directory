import React, { Component } from "react";

class Home extends Component {
  state = {
    employees: [
      {
        id: 1,
        employee_name: "Nick Mitchell",
        employee_salary: 100000,
        employee_age: 22,
        profile_image: "",
      },
      {
        id: 2,
        employee_name: "Joe Louis",
        employee_salary: 75000,
        employee_age: 43,
        profile_image: "",
      },
    ],
  };
  componentDidMount() {
    // this.sortEmployees();
  }

  sortEmployees = () => {
    function compare(a, b) {
      if (a.employee_name > b.employee_name) return 1;
      if (b.employee_name > a.employee_name) return -1;

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
          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee) => {
                    <tr>
                      <th scope="row">{employee.id}</th>
                      <td>{employee.name}</td>
                      <td>{employee.salary}</td>
                      <td>{employee.age}</td>
                    </tr>;
                  })}
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
