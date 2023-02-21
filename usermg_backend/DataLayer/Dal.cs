using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace usermg_backend.Models
{
    public class Dal : IDal
    {
        public Response Registration(Registration registration, SqlConnection connection)
        {
            Response response= new Response();
            
            SqlCommand cmd = new SqlCommand("INSERT INTO Registration(Name,Email,Password,Phone,IsActive,IsApproved,AccountType) VALUES ('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.Phone + "',1,0, '" + registration.AccountType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if ( i > 0)
                {
                    response.StatusCode= 200;
                    response.StatusMessage = "Registration Successful!";
                }
            else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Registration Failed!";
                }
            return response;
        }

        public Response Login(Login login, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE Email = '"+login.Email+"' AND Password = '"+login.Password+"'", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            if (dt.Rows.Count > 0) 
            {
                response.StatusCode = 200;
                response.StatusMessage = "Login Successful!";
                Registration reg = new Registration();
                reg.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                reg.Phone = Convert.ToString(dt.Rows[0]["Phone"]);
                reg.Address = Convert.ToString(dt.Rows[0]["Address"]);
                reg.Birthday = Convert.ToString(dt.Rows[0]["Birthday"]);
                reg.AccountType = Convert.ToInt32(dt.Rows[0]["AccountType"]);
                reg.IsActive = Convert.ToInt32(dt.Rows[0]["IsActive"]);
                reg.IsApproved = Convert.ToInt32(dt.Rows[0]["IsApproved"]);
                response.Registration = reg;    
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login Failed!";
                response.Registration = null;
            }

            return response;
        }

        public Response ApproveUser(ApproveUser approveUser, SqlConnection connection) 
        {
            
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsApproved = 1 WHERE ID = '" + approveUser.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Approved!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Approval Failed!";
            }
            return response;
        }

        public Response ApproveLeave(ApproveLeave approveLeave, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Leaves SET IsApproved = 1 WHERE ID = '" + approveLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Approved!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Approval Failed!";
            }
            return response;
        }

        public Response ApproveExtraLeave(ApproveExtraLeave approveExtraLeave, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE ExtraLeaves SET IsApproved = 1 WHERE ID = '" + approveExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Approved!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Approval Failed!";
            }
            return response;
        }

        public Response RejectExtraLeave(RejectExtraLeave rejectExtraLeave, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE ExtraLeaves SET IsApproved = 2 WHERE ID = '" + rejectExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Rejected!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Rejection Failed!";
            }
            return response;
        }

        public Response RejectLeave(RejectLeave rejectLeave, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Leaves SET IsApproved = 2 WHERE ID = '" + rejectLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Rejected!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Rejection Failed!";
            }
            return response;
        }

        public Response BlockUser(BlockUser blockUser, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsActive = 0 WHERE ID = '" + blockUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Blocked!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User BLocking Failed!";
            }
            return response;
        }

        public Response ActivateUser(ActivateUser activateUser, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsActive = 1 WHERE ID = '" + activateUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Activated!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Activating Failed!";
            }
            return response;
        }

        public Response AddUser(AddUser addUser, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("INSERT INTO Registration(Name,Email,Password,Phone,IsActive,IsApproved,AccountType,Birthday,Address) VALUES ('" + addUser.Name + "','" + addUser.Email + "','" + addUser.Password + "','" + addUser.Phone + "',1,'"+ addUser.IsApproved + "', '" + addUser.AccountType + "', '"+ addUser.Birthday + "', '" + addUser.Address + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Addition Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Addition Failed!";
            }
            return response;
        }

        public Response StaffRegistration(Staff staff, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("INSERT INTO Staff(Name,Email,Password,IsActive) VALUES ('" + staff.Name + "','" + staff.Email + "','" + staff.Password + "',1)");
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff Registration Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff Registration Failed!";
            }
            return response;
        }

        public Response DeleteUser(DeleteUser deleteUser, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("DELETE FROM Registration WHERE ID = '" + deleteUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Deletion Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Deletion Failed!";
            }
            return response;
        }

        public Response DeleteLeave(DeleteLeave deleteLeave, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("DELETE FROM Leaves WHERE ID = '" + deleteLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Record Deletion Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Record Deletion Failed!";
            }
            return response;
        }

        public Response DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("DELETE FROM ExtraLeaves WHERE ID = '" + deleteExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Record Deletion Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Record Deletion Failed!";
            }
            return response;
        }

        public Response RegistrationList(SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration where AccountType != 0", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<RegistrationList> lstRegistration = new List<RegistrationList>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        RegistrationList reg = new RegistrationList();
                        reg.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                        reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                        reg.Password = Convert.ToString(dt.Rows[i]["Password"]);
                        reg.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                        reg.Birthday = Convert.ToString(dt.Rows[i]["Birthday"]);
                        reg.Address = Convert.ToString(dt.Rows[i]["Address"]);
                        reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                        reg.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        reg.AccountType = Convert.ToInt32(dt.Rows[i]["AccountType"]);
                        lstRegistration.Add(reg);

                    }
                    
                        response.StatusCode = 200;
                        response.StatusMessage = "Records Retrieved Successful!";
                        response.listRegistration = lstRegistration;
                                       
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listRegistration = null;
                }
                return response;
            }
            catch
            {
                throw (new Exception());
                
            }
            
        }

        public Response RegistrationListManager(SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration where AccountType != 0 AND accountType != 1", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<RegistrationListManager> lstRegistrationM = new List<RegistrationListManager>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        RegistrationListManager reg = new RegistrationListManager();
                        reg.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                        reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                        reg.Password = Convert.ToString(dt.Rows[i]["Password"]);
                        reg.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                        reg.Birthday = Convert.ToString(dt.Rows[i]["Birthday"]);
                        reg.Address = Convert.ToString(dt.Rows[i]["Address"]);
                        reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                        reg.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        reg.AccountType = Convert.ToInt32(dt.Rows[i]["AccountType"]);
                        lstRegistrationM.Add(reg);

                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Records Retrieved Successful!";
                    response.listRegistrationManager = lstRegistrationM;

                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listRegistrationManager = null;
                }
                return response;
            }
            catch
            {
                throw (new Exception());

            }

        }

        public Response ApplyLeave(ApplyLeave applyLeave, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("INSERT INTO Leaves(CreatorID,CreatorName,FromDate,ToDate,NoofDays,IsApproved,LeaveType) VALUES ('" + applyLeave.CreatorID + "','" + applyLeave.CreatorName + "','" + applyLeave.FromDate + "','" + applyLeave.ToDate + "','" + applyLeave.NoofDays + "', 0, '" + applyLeave.LeaveType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Application Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Application Failed!";
            }
            return response;
        }

        public Response ExtraLeave(ExtraLeave extraLeave, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("INSERT INTO ExtraLeaves(CreatorID,CreatorName,FromDate,ToDate,NoofDays,IsApproved,Reason) VALUES ('" + extraLeave.CreatorID + "','" + extraLeave.CreatorName + "','" + extraLeave.FromDate + "','" + extraLeave.ToDate + "','" + extraLeave.NoofDays + "', 0, '" + extraLeave.Reason + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Application Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Application Failed!";
            }
            return response;
        }

        public Response EditProfile(EditProfile editProfile, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Name = '"+ editProfile.Name +"', Phone = '"+ editProfile.Phone +"', Birthday = '"+ editProfile.Birthday +"', Address = '"+ editProfile.Address +"' WHERE ID = '" + editProfile.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Updated!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Update Failed!";
            }
            return response;
        }

        public Response EditProfilePassword(EditProfilePassword editProfilePassword, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Password = '" + editProfilePassword.Password +"' WHERE ID = '" + editProfilePassword.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Password Updated!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Password Update Failed!";
            }
            return response;
        }

        public Response EditProfileEmail(EditProfileEmail editProfileEmail, SqlConnection connection)
        {

            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Email = '" + editProfileEmail.Email + "' WHERE ID = '" + editProfileEmail.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Email Updated!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Email Update Failed!";
            }
            return response;
        }

 //       public Response EditProfileImage(IFormFile editProfileImage, int ID, SqlConnection connection)
 //       {
 //           Response response = new Response();
 //           try
 //           {
                // Save the image file to the server
//                var filePath = Path.Combine("path/to/save/image", editProfileImage.FileName);
//                using (var stream = new FileStream(filePath, FileMode.Create))
//                {
//                //    await editProfileImage.CopyToAsync(stream);
//                }
//
 //               connection.Open();
 //               SqlCommand cmd = new SqlCommand("UPDATE Registration SET Image = '" + editProfileImage.FileName + "' WHERE ID = '" + ID + "' AND IsActive = 1", connection);
 //               cmd.ExecuteNonQuery();
 //               response.StatusCode = 200;
 //               response.StatusMessage = "Profile Image Updated Successfully";
 //           }
 //           catch (Exception ex)
 //           {
 //               response.StatusCode = 100;
 //               response.StatusMessage = ex.Message;
 //           }
 //           finally
 //           {
 //               connection.Close();
 //           }
//            return response;
//        }
//
//        private byte[] ConvertImageToBinary(IFormFile image)
//        {
//            using (var ms = new MemoryStream())
//            {
//                image.CopyTo(ms);
//                return ms.ToArray();
//            }
//        }
  



        public Response LeaveList(SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Leaves", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<LeaveList> lstLeave = new List<LeaveList>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        LeaveList leave = new LeaveList();
                        leave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        leave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                        leave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                        leave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                        leave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                        leave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                        leave.LeaveType = Convert.ToInt32(dt.Rows[i]["LeaveType"]);
                        leave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        lstLeave.Add(leave);

                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Records Retrieved Successful!";
                    response.listLeave = lstLeave;


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listLeave = null;

                }
                return response;
            }
            catch
            {
                throw (new Exception());

            }

        }

        public Response ExtraLeaveList(SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM ExtraLeaves", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<ExtraLeaveList> lstExtraLeave = new List<ExtraLeaveList>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        ExtraLeaveList exleave = new ExtraLeaveList();
                        exleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        exleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                        exleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                        exleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                        exleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                        exleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                        exleave.Reason = Convert.ToString(dt.Rows[i]["Reason"]);
                        exleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        lstExtraLeave.Add(exleave);

                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Records Retrieved Successful!";
                    response.listExtraLeave = lstExtraLeave;


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listExtraLeave = null;

                }
                return response;
            }
            catch
            {
                throw (new Exception());

            }

        }

        public Response MyLeaveList(MyLeaveList myLeaveList, SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Leaves WHERE CreatorID = '" + myLeaveList.CreatorID + "' ", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<MyLeaveList> lstMyLeave = new List<MyLeaveList>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        MyLeaveList myleave = new MyLeaveList();
                        myleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        myleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                        myleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                        myleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                        myleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                        myleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                        myleave.LeaveType = Convert.ToInt32(dt.Rows[i]["LeaveType"]);
                        myleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        lstMyLeave.Add(myleave);

                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Records Retrieved Successful!";
                    response.listMyLeave = lstMyLeave;


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listMyLeave = null;

                }
                return response;
            }
            catch
            {
                throw (new Exception());

            }

        }

        public Response MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList, SqlConnection connection)
        {
            try
            {

                Response response = new Response();
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM ExtraLeaves WHERE CreatorID = '" + myExtraLeaveList.CreatorID + "' ", connection);
                DataTable dt = new DataTable();
                da.Fill(dt);
                List<MyExtraLeaveList> lstMyExtraLeave = new List<MyExtraLeaveList>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        MyExtraLeaveList myextraleave = new MyExtraLeaveList();
                        myextraleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        myextraleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                        myextraleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                        myextraleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                        myextraleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                        myextraleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                        myextraleave.Reason = Convert.ToString(dt.Rows[i]["Reason"]);
                        myextraleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                        lstMyExtraLeave.Add(myextraleave);

                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Records Retrieved Successful!";
                    response.listMyExtraLeave = lstMyExtraLeave;


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No records!";
                    response.listMyExtraLeave = null;

                }
                return response;
            }
            catch
            {
                throw (new Exception());

            }

        }
    }
}
