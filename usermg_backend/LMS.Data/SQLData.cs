using LMS.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using LMS.Library;
using Microsoft.VisualBasic;
using System.Net;
using System.Numerics;
using System.Xml.Linq;

namespace LMS.Data
{
    public class SQLData : Data
    {
        SqlConnection connection;
       public SQLData()
        {

        }
        public SQLData (string connectionString)
        {
            base.ConnectionString = connectionString;
            if (connection==null)
            {
                connection = new SqlConnection(connectionString);
            }
            
        }

        public override DataRow[] Login(Login login)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE Email = '" + login.Email + "' AND Password = '" + login.Password + "'", connection);
            da.Fill(dt);
            return dt.Select();
        }

        public override bool Registration(Registration registration)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Registration(Name,Email,Password,Phone,IsActive,IsApproved,AccountType) VALUES ('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.Phone + "',1,0, '" + registration.AccountType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override DataTable RegistrationList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration where AccountType != 0", connection);
            da.Fill(dt);
            return dt;
        }
        public override DataTable RegistrationListManager()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration where AccountType != 0 AND accountType != 1", connection);
            da.Fill(dt);
            return dt;
        }
        public override bool ActivateUser(ActivateUser activateUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsActive = 1 WHERE ID = '" + activateUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool AddUser(AddUser addUser)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Registration(Name,Email,Password,Phone,IsActive,IsApproved,AccountType,Birthday,Address) VALUES ('" + addUser.Name + "','" + addUser.Email + "','" + addUser.Password + "','" + addUser.Phone + "',1,'" + addUser.IsApproved + "', '" + addUser.AccountType + "', '" + addUser.Birthday + "', '" + addUser.Address + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        //public override bool EditUser(EditUser editUser)
        //{
        //    SqlCommand cmd = new SqlCommand("Update Registration SET(Name,Email,Password,Phone,IsActive,IsApproved,AccountType,Birthday,Address) VALUES ('" + editUser.Name + "','" + editUser.Email + "','" + editUser.Password + "','" + editUser.Phone + "',1,'" + editUser.IsApproved + "', '" + editUser.AccountType + "', '" + editUser.Birthday + "', '" + editUser.Address + "')", connection);
        //    connection.Open();
        //    int i = cmd.ExecuteNonQuery();
        //    connection.Close();
        //    if (i > 0)
        //        return true;
        //    return false;
        //}
        public override bool ApproveUser(ApproveUser approveUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsApproved = 1 WHERE ID = '" + approveUser.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool BlockUser(BlockUser blockUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsActive = 0 WHERE ID = '" + blockUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool DeleteUser(DeleteUser deleteUser)
        {
            SqlCommand cmd = new SqlCommand("DELETE FROM Registration WHERE ID = '" + deleteUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditUser(EditUser editUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Name = '" + editUser.Name + "', Phone = '" + editUser.Phone + "', Birthday = '" + editUser.Birthday + "', Address = '" + editUser.Address + "',Email = '" + editUser.Email + "',Password = '"+ editUser.Password + "'  WHERE ID = '" + editUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override bool ApplyLeave(ApplyLeave applyLeave)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Leaves(CreatorID,CreatorName,FromDate,ToDate,NoofDays,IsApproved,LeaveType) VALUES ('" + applyLeave.CreatorID + "','" + applyLeave.CreatorName + "','" + applyLeave.FromDate + "','" + applyLeave.ToDate + "','" + applyLeave.NoofDays + "', 0, '" + applyLeave.LeaveType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool ApproveLeave(ApproveLeave approveLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Leaves SET IsApproved = 1 WHERE ID = '" + approveLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool RejectLeave(RejectLeave rejectLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Leaves SET IsApproved = 2 WHERE ID = '" + rejectLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditLeave(EditLeave editLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Leaves SET FromDate = '" + editLeave.FromDate + "', ToDate = '" + editLeave.ToDate + "', NoofDays = '" + editLeave.NoofDays + "', LeaveType = '" + editLeave.LeaveType + "'  WHERE ID = '" + editLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        
        public override bool DeleteLeave(DeleteLeave deleteLeave)
        {
            SqlCommand cmd = new SqlCommand("DELETE FROM Leaves WHERE ID = '" + deleteLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool ApplyExtraLeave(ApplyExtraLeave applyExtraLeave)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO ExtraLeaves(CreatorID,CreatorName,FromDate,ToDate,NoofDays,IsApproved,Reason) VALUES ('" + applyExtraLeave.CreatorID + "','" + applyExtraLeave.CreatorName + "','" + applyExtraLeave.FromDate + "','" + applyExtraLeave.ToDate + "','" + applyExtraLeave.NoofDays + "', 0, '" + applyExtraLeave.Reason + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool ApproveExtraLeave(ApproveExtraLeave approveExtraLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE ExtraLeaves SET IsApproved = 1 WHERE ID = '" + approveExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE ExtraLeaves SET IsApproved = 2 WHERE ID = '" + rejectExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditExtraLeave(EditExtraLeave editExtraLeave)
        {
            SqlCommand cmd = new SqlCommand("UPDATE ExtraLeaves SET FromDate = '" + editExtraLeave.FromDate + "', ToDate = '" + editExtraLeave.ToDate + "', NoofDays = '" + editExtraLeave.NoofDays + "',Reason = '" + editExtraLeave.Reason + "'  WHERE ID = '" + editExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave)
        {
            SqlCommand cmd = new SqlCommand("DELETE FROM ExtraLeaves WHERE ID = '" + deleteExtraLeave.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override DataTable LeaveList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Leaves", connection);
            da.Fill(dt);
            return dt;
        }

        public override DataTable MyLeaveList(MyLeaveList myLeaveList)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Leaves WHERE CreatorID = '" + myLeaveList.CreatorID + "' ", connection);
            da.Fill(dt);
            return dt;
        }

        public override DataTable ExtraLeaveList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM ExtraLeaves", connection);
            da.Fill(dt);
            return dt;
        }
        public override DataTable MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM ExtraLeaves WHERE CreatorID = '" + myExtraLeaveList.CreatorID + "' ", connection);
            da.Fill(dt);
            return dt;
        }
        public override bool EditProfile(EditProfile editProfile)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Name = '" + editProfile.Name + "', Phone = '" + editProfile.Phone + "', Birthday = '" + editProfile.Birthday + "', Address = '" + editProfile.Address + "' WHERE ID = '" + editProfile.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Email = '" + editProfileEmail.Email + "' WHERE ID = '" + editProfileEmail.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET Password = '" + editProfilePassword.Password + "' WHERE ID = '" + editProfilePassword.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
    }
}
