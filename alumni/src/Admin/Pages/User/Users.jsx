import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { CSVLink } from "react-csv";
import { FaUserSlash } from "react-icons/fa";

export default function Users() {
  const [user, setUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ status: "", city: "" });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/GetUser`
      );
      setUser(res.data.user || []);
      setFilteredData(res.data.user || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUser([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    console.log("Deleted user with ID:", userId);
  };

  const applyFilters = () => {
    let filtered = user;

    if (filters.status) {
      filtered = filtered.filter(
        (user) => user.status === parseInt(filters.status)
      );
    }

    if (filters.city) {
      filtered = filtered.filter((user) =>
        user.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilters({ status: "", city: "" });
    setFilteredData(user);
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${row.photo}`}
          className="avatar avatar-sm me-3"
          alt={row.firstname}
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => (
        <div>
          <h6 className="mb-0 text-sm font-weight-bold">{row.firstname}</h6>
          <p className="text-xs text-secondary mb-0">{row.email}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge badge-sm ${
            row.status === 1 ? "bg-gradient-success" : "bg-gradient-secondary"
          }`}
        >
          {row.status === 1 ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-link text-danger text-gradient px-3 mb-0"
            onClick={() => deleteUser(row.user_id)}
            style={{ fontSize: "20px", padding: "5px" }}
          >
            <MdDelete />
          </button>
          <Link
            to={`/adduser/${row.user_id}`}
            className="btn btn-link text-dark text-gradient px-3 mb-0"
            style={{ fontSize: "20px", padding: "5px" }}
          >
            <BiPencil />
          </Link>
        </div>
      ),
      width: "120px",
    },
  ];

  const tableData = filteredData?.map((user) => ({ ...user })) || [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-gray-100">
        <Header />
        <div
          style={{
            marginTop: "50px",
            marginLeft: "290px",
            marginRight: "20px",
          }}
        >
          <div className="row">
            <div className="col-12">
              <div className="card mb-4 shadow-lg">
                <div className="card-header d-flex justify-content-between align-items-center bg-white text-primary rounded-t-lg">
                  <h2 className="text-2xl font-semibold">User Table</h2>
                  <Link
                    className="btn btn-outline-primary btn-sm"
                    to="/adduser"
                  >
                    Add User
                  </Link>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600">Loading users...</p>
                    </div>
                  ) : tableData.length > 0 ? (
                    <div className="table-responsive p-0">
                      <DataTable
                        columns={columns}
                        data={tableData}
                        pagination
                        paginationPerPage={10}
                        selectableRows
                        fixedHeader
                        highlightOnHover
                        dense
                        subHeader
                        subHeaderComponent={
                          <div className="w-full flex justify-between items-center p-2">
                            <input
                              type="text"
                              placeholder="Search users..."
                              className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <div className="flex space-x-2">
                              {/* Export Button */}
                              <CSVLink
                                data={filteredData}
                                filename={"users.csv"}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Export
                              </CSVLink>

                              {/* Filter Button */}
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => applyFilters()}
                              >
                                Filter
                              </button>

                              {/* Reset Filters Button */}
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={resetFilters}
                              >
                                Reset Filters
                              </button>
                            </div>
                          </div>
                        }
                        customStyles={{
                          headCells: {
                            style: {
                              backgroundColor: "#f5f5f5",
                              fontWeight: "bold",
                              fontSize: "14px",
                            },
                          },
                          cells: {
                            style: {
                              padding: "12px 16px",
                            },
                          },
                          pagination: {
                            style: {
                              display: "flex",
                              justifyContent: "flex-end",
                              padding: "10px 20px",
                            },
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                      <FaUserSlash className="text-5xl text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">
                        No Users Exist !
                      </h3>
                      <p className="text-gray-500 max-w-md text-center">
                        There are currently no users in the system. Try adding
                        some users or check your filters.
                      </p>
                      {/* Optional: Add a button to refresh or add users */}
                      <button
                        onClick={getUser}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Refresh
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
