import Component from "./Component/index";
import { useEffect, useState } from "react";
import "./app.css";
import Pages from "./pages/index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  useEffect(() => {
  const storedAccountType = localStorage.getItem("accountType");
  console.log('storedAccountType:', storedAccountType);
  setAccountType(storedAccountType);
}, []);


  const [accountType, setAccountType] = useState();

  const ProtectedRoute = ({ element, allowedTypes }) => {
    console.log('accountType:', accountType);
    console.log('allowedTypes:', allowedTypes);
    const isAllowed = allowedTypes.includes(Number(accountType));
    console.log('isAllowed:', isAllowed);
    return isAllowed ? element : <Navigate to="/" />;
  };
  

  return (
    <>
      <Router>
        {/**************** topbar *****************/}

        {/* {accountType === 2 && (
          <Routes>
            <Route path="/users/staff/*" element={<Component.Topbar />} />
          </Routes>
        )}

        {accountType === 1 && (
          <Routes>
            <Route
              path="/users/manager/*"
              element={<Component.ManagerTopbar />}
            />
          </Routes>
        )}

        {accountType === 0 && (
          <Routes>
            <Route path="/users/admin/*" element={<Component.AdminTopbar />} />
          </Routes>
        )} */}
        {/* <Routes>
          <Route path="/users/staff/*" element={<Component.Topbar />} />
        </Routes> */}
        <Routes>
          <Route
            path="/users/manager/*"
            element={<Component.ManagerTopbar />}
          />
        </Routes>
        <Routes>
          <Route path="/users/admin/*" element={<Component.AdminTopbar />} />
        </Routes>

        <div className="container">
          {/* *************** sidebar ****************  */}
          {/* {accountType === 2 && (
            <Routes>
              <Route path="/users/staff/*" element={<Component.Sidebar />} />
            </Routes>
          )}

          {accountType === 1 && (
            <Routes>
              <Route
                path="/users/manager/*"
                element={<Component.ManagerSidebar />}
              />
            </Routes>
          )}

          {accountType === 0 && (
            <Routes>
              <Route
                path="/users/admin/*"
                element={<Component.AdminSidebar />}
              />
            </Routes>
          )} */}

          {/* <Routes>
            <Route path="/users/staff/*" element={<Component.Sidebar />} />
          </Routes> */}
          <Routes>
            <Route
              path="/users/manager/*"
              element={<Component.ManagerSidebar />}
            />
          </Routes>
          <Routes>
            <Route path="/users/admin/*" element={<Component.AdminSidebar />} />
          </Routes>

          <div className="others">
            {/**************** login and registration *****************/}
            <Routes>
              <Route path="/" element={<Component.Login />} />
            </Routes>
            <Routes>
              <Route path="/register" element={<Component.Register />} />
            </Routes>

            {/* *************** admin **************** */}
            <Routes>
              <Route
                path="/users/admin"
                element={
                  <ProtectedRoute element={<Pages.Home />} allowedTypes={[0]} />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/users"
                element={
                  <ProtectedRoute
                    element={<Pages.UserList />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/adduser"
                element={
                  <ProtectedRoute
                    element={<Pages.AddUser />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/leaves"
                element={
                  <ProtectedRoute
                    element={<Pages.Leaves />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/extraleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ExtraLeaves />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/myleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.MyLeaves />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/applyleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ApplyLeaves />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/applyextraleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ApplyExtraLeaves />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/edituser"
                element={
                  <ProtectedRoute
                    element={<Pages.EditUser />}
                    allowedTypes={[0]}
                  />
                }
              />
            </Routes>

            {/* *************** manager **************** */}

            <Routes>
              <Route
                path="/users/manager"
                element={
                  <ProtectedRoute element={<Pages.Home />} allowedTypes={[1]} />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/users"
                element={
                  <ProtectedRoute
                    element={<Pages.UserList />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/leaves"
                element={
                  <ProtectedRoute
                    element={<Pages.Leaves />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/extraleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ExtraLeaves />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/myleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.MyLeaves />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/applyleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ApplyLeaves />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/applyextraleaves"
                element={
                  <ProtectedRoute
                    element={<Pages.ApplyExtraLeaves />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/edituser"
                element={
                  <ProtectedRoute
                    element={<Pages.EditUser />}
                    allowedTypes={[1]}
                  />
                }
              />
            </Routes>

            {/* *************** staff **************** */}
            <Routes>
              <Route
                path="/users/staff"
                element={
                  <ProtectedRoute 
                  element={<>
                    <Component.Topbar />
                    <div className="container"><Component.Sidebar /><div className="others"><Pages.Home /></div></div>
                  </>} 
                  allowedTypes={[2]} />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/myleaves"
                element={
                  <ProtectedRoute
                    element={<><Component.Topbar /><div className="container"><Component.Sidebar /><div className="others"><Pages.MyLeaves /></div></div></>}
                    allowedTypes={[2]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/applyleaves"
                element={
                  <ProtectedRoute
                    element={<><Component.Topbar /><div className="container"><Component.Sidebar /><div className="others"><Pages.ApplyLeaves /></div></div></>}
                    allowedTypes={[2]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/extraleaves"
                element={
                  <ProtectedRoute
                    element={<><Component.Topbar /><div className="container"><Component.Sidebar /><div className="others"><Pages.ExtraLeaves /></div></div></>}
                    allowedTypes={[2]}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/edituser"
                element={
                  <ProtectedRoute
                    element={<><Component.Topbar /><div className="container"><Component.Sidebar /><div className="others"><Pages.EditUser /></div></div></>}
                    allowedTypes={[2]}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
  console.log(accountType);
}

export default App;
