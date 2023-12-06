import React ,{ useState } from "react";
import "../../../styles/members.css"
const data = [
  {
    employeeId: '01',
    name: 'John Doe',
    email: 'johndoe@email.com',
    position: 'Frontend Developer',
  },
  {
    employeeId: '02',
    name: 'Sara',
    email: 'sara@email.com',
    position: 'HR Executive',
  },
  {
    employeeId: '03',
    name: 'Mike',
    email: 'mike@email.com',
    position: 'Backend Developer',
  },
]

const Members = () => {
  const [employeeData, setEmployeeData] = useState(data)

  const onChange = (e, employeeId) => {
    const { name, value } = e.target

    const editData = employeeData.map((item) =>
      item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    )

    setEmployeeData(editData)
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ employeeId, name, email, position }) => (
            <tr key={employeeId}>
              <td>
                <input
                  name="name"
                  value={name}
                  type="text"
                  onChange={(e) => onChange(e, employeeId)}
                  placeholder="Type Name"
                />
              </td>
              <td>
                <input
                  name="email"
                  value={email}
                  type="email"
                  onChange={(e) => onChange(e, employeeId)}
                  placeholder="Type Email"
                />
              </td>
              <td>
                <input
                  name="position"
                  type="text"
                  value={position}
                  onChange={(e) => onChange(e, employeeId)}
                  placeholder="Type Position"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Members