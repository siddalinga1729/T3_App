import { useState, useEffect } from "react";

// Employee interface to type the employee data
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });

  // Fetch employees data when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employee data from API
  const fetchEmployees = async () => {
    const res = await fetch("/api/employee");
    const data: Employee[] = await res.json();
    setEmployees(data);
  };

  // Handle form submission to add new employee
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchEmployees(); // Refresh the employee list
    setForm({ firstName: "", lastName: "", email: "", position: "" }); // Clear form fields
  };

  // Handle delete employee action
  const handleDelete = async (id: number) => {
    await fetch("/api/employee", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deleteId: id }),
    });
    fetchEmployees(); // Refresh the employee list after deletion
  };

  return (
    <div className="container mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Employee Management
      </h1>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="lastName" className="text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Position */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="position" className="text-gray-700">
                Position
              </label>
              <input
                id="position"
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Add Employee
          </button>
        </form>
      </div>

      {/* Employee List Section */}
      <div className="overflow-x-auto shadow-xl rounded-lg p-4 bg-white">
        <table className="table-auto w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                {/* Name */}
                <td className="border px-6 py-4">
                  {employee.firstName} {employee.lastName}
                </td>
                {/* Email */}
                <td className="border px-6 py-4">{employee.email}</td>
                {/* Position */}
                <td className="border px-6 py-4">{employee.position}</td>
                {/* Actions */}
                <td className="border px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;
