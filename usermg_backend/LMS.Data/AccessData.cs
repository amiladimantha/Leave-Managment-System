using LMS.Data;
using System.Data.OleDb;
using System.Data;
using LMS.Library;
using System.Globalization;

public class AccessData : Data
{
    OleDbConnection connection;
    public AccessData()
    {

    }
    public AccessData(string connectionString)
    {
        base.ConnectionString = connectionString;
        if (connection == null)
        {
            connection = new OleDbConnection(connectionString);
        }

    }

    public override DataRow[] Login(Login login)
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM Registration WHERE Email = '" + login.Email + "' AND Password = '" + login.Password + "'", connection);
        da.Fill(dt);
        return dt.Select();
    }
    public override bool Registration(Registration registration)
    {
        try
        {
            OleDbCommand cmd = new OleDbCommand("INSERT INTO Registration(Name, Email, [Password], Phone, IsActive, IsApproved, AccountType) VALUES (@Name, @Email, @Password, @Phone, 1, 0, @AccountType)", connection);
            cmd.Parameters.AddWithValue("@Name", registration.Name);
            cmd.Parameters.AddWithValue("@Email", registration.Email);
            cmd.Parameters.AddWithValue("@Password", registration.Password);
            cmd.Parameters.AddWithValue("@Phone", registration.Phone);
            cmd.Parameters.AddWithValue("@AccountType", registration.AccountType);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
                return true;
            return false;
        }
        catch (OleDbException ex)
        {
            // Log the exception message, stack trace, and inner exceptions
            Console.WriteLine("Error Message: " + ex.Message);
            Console.WriteLine("Stack Trace: " + ex.StackTrace);
            Console.WriteLine("Inner Exception: " + ex.InnerException);

            // Rethrow the exception to propagate it to the caller
            throw;
        }



    }




    public override DataTable RegistrationList()
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM Registration WHERE AccountType <> 0", connection);
        da.Fill(dt);
        return dt;
    }

    public override DataTable RegistrationListManager()
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM Registration WHERE AccountType <> 0 AND AccountType <> 1", connection);
        da.Fill(dt);
        return dt;
    }

    public override bool ActivateUser(ActivateUser activateUser)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Registration SET IsActive = 1 WHERE ID = " + activateUser.ID, connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool AddUser(AddUser addUser)
    {
        OleDbCommand cmd = new OleDbCommand("INSERT INTO Registration(Name, Email, [Password], Phone, IsActive, IsApproved, AccountType, Birthday, Address) VALUES (@Name, @Email, @Password, @Phone, 1,@IsApproved, @AccountType, @Birthday  ,@Address)", connection);
        cmd.Parameters.AddWithValue("@Name", addUser.Name);
        cmd.Parameters.AddWithValue("@Email", addUser.Email);
        cmd.Parameters.AddWithValue("@Password", addUser.Password);
        cmd.Parameters.AddWithValue("@Phone", addUser.Phone);
        cmd.Parameters.AddWithValue("@IsApproved", addUser.IsApproved);
        cmd.Parameters.AddWithValue("@AccountType", addUser.AccountType);
        cmd.Parameters.AddWithValue("@Birthday", addUser.Birthday);
        cmd.Parameters.AddWithValue("@Address", addUser.Address);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool ApproveUser(ApproveUser approveUser)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Registration SET IsApproved = 1 WHERE ID = @ID AND IsActive = 1", connection);
        cmd.Parameters.AddWithValue("@ID", approveUser.ID); 
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool BlockUser(BlockUser blockUser)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Registration SET IsActive = 0 WHERE ID = " + blockUser.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool DeleteUser(DeleteUser deleteUser)
    {
        OleDbCommand cmd = new OleDbCommand("DELETE FROM Registration WHERE ID = " + deleteUser.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool EditUser(EditUser editUser)
    {
      try 
        {
            // Convert the string representation of the date and time to a DateTime object
            //DateTime birthday = DateTime.ParseExact(editUser.Birthday, "yyyy-MM-ddTHH:mm:ss.fffZ", CultureInfo.InvariantCulture);

            OleDbCommand cmd = new OleDbCommand("UPDATE [Registration] SET [Name] = @Name, [Phone] = @Phone, [Birthday] = @Birthday, [Address] = @Address, [Email] = @Email, [Password] = @Password WHERE [ID] = @ID", connection);
            cmd.Parameters.AddWithValue("@Name", editUser.Name);
            cmd.Parameters.AddWithValue("@Phone", editUser.Phone);
            cmd.Parameters.AddWithValue("@Birthday", editUser.Birthday);
            cmd.Parameters.AddWithValue("@Address", editUser.Address);
            cmd.Parameters.AddWithValue("@Email", editUser.Email);
            cmd.Parameters.AddWithValue("@Password", editUser.Password);
            cmd.Parameters.AddWithValue("@ID", editUser.ID);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;


        }
        catch (OleDbException ex)
        {
            // Log the exception message, stack trace, and inner exceptions
            Console.WriteLine("Error Message: " + ex.Message);
            Console.WriteLine("Stack Trace: " + ex.StackTrace);
            Console.WriteLine("Inner Exception: " + ex.InnerException);

            // Rethrow the exception to propagate it to the caller
            throw;
        }

    }

    public override bool ApplyLeave(ApplyLeave applyLeave)
    {
        OleDbCommand cmd = new OleDbCommand("INSERT INTO Leaves(CreatorID, CreatorName, FromDate, ToDate, NoofDays, IsApproved, LeaveType) VALUES (@CreatorID, @CreatorName, @FromDate, @ToDate, @NoofDays, 0, @LeaveType)", connection);
        cmd.Parameters.AddWithValue("@CreatorID", applyLeave.CreatorID);
        cmd.Parameters.AddWithValue("@CreatorName", applyLeave.CreatorName);
        cmd.Parameters.AddWithValue("@FromDate", applyLeave.FromDate);
        cmd.Parameters.AddWithValue("@ToDate", applyLeave.ToDate);
        cmd.Parameters.AddWithValue("@NoofDays", applyLeave.NoofDays);
        cmd.Parameters.AddWithValue("@LeaveType", applyLeave.LeaveType);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool ApproveLeave(ApproveLeave approveLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Leaves SET IsApproved = 1 WHERE ID = " + approveLeave.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool RejectLeave(RejectLeave rejectLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Leaves SET IsApproved = 2 WHERE ID = " + rejectLeave.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool EditLeave(EditLeave editLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Leaves SET FromDate = @FromDate, ToDate = @ToDate, NoofDays = @NoofDays, LeaveType = @LeaveType WHERE ID = @ID", connection);
        cmd.Parameters.AddWithValue("@FromDate", editLeave.FromDate);
        cmd.Parameters.AddWithValue("@ToDate", editLeave.ToDate);
        cmd.Parameters.AddWithValue("@NoofDays", editLeave.NoofDays);
        cmd.Parameters.AddWithValue("@LeaveType", editLeave.LeaveType);
        cmd.Parameters.AddWithValue("@ID", editLeave.ID);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool DeleteLeave(DeleteLeave deleteLeave)
    {
        OleDbCommand cmd = new OleDbCommand("DELETE FROM Leaves WHERE ID = " + deleteLeave.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool ApplyExtraLeave(ApplyExtraLeave applyExtraLeave)
    {
        OleDbCommand cmd = new OleDbCommand("INSERT INTO ExtraLeaves(CreatorID, CreatorName, FromDate, ToDate, NoofDays, IsApproved, Reason) VALUES (@CreatorID, @CreatorName, @FromDate, @ToDate, @NoofDays, 0, @Reason)", connection);
        cmd.Parameters.AddWithValue("@CreatorID", applyExtraLeave.CreatorID);
        cmd.Parameters.AddWithValue("@CreatorName", applyExtraLeave.CreatorName);
        cmd.Parameters.AddWithValue("@FromDate", applyExtraLeave.FromDate);
        cmd.Parameters.AddWithValue("@ToDate", applyExtraLeave.ToDate);
        cmd.Parameters.AddWithValue("@NoofDays", applyExtraLeave.NoofDays);
        cmd.Parameters.AddWithValue("@Reason", applyExtraLeave.Reason);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool ApproveExtraLeave(ApproveExtraLeave approveExtraLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE ExtraLeaves SET IsApproved = 1 WHERE ID = " + approveExtraLeave.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE ExtraLeaves SET IsApproved = 2 WHERE ID = " + rejectExtraLeave.ID , connection);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;
    }

    public override bool EditExtraLeave(EditExtraLeave editExtraLeave)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE ExtraLeaves SET FromDate = @FromDate, ToDate = @ToDate, NoofDays = @NoofDays, Reason = @Reason WHERE ID = @ID", connection);
        cmd.Parameters.AddWithValue("@FromDate", editExtraLeave.FromDate);
        cmd.Parameters.AddWithValue("@ToDate", editExtraLeave.ToDate);
        cmd.Parameters.AddWithValue("@NoofDays", editExtraLeave.NoofDays);
        cmd.Parameters.AddWithValue("@Reason", editExtraLeave.Reason);
        cmd.Parameters.AddWithValue("@ID", editExtraLeave.ID);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave)
    {
        OleDbCommand cmd = new OleDbCommand("DELETE FROM ExtraLeaves WHERE ID = " + deleteExtraLeave.ID , connection);
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
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM Leaves", connection);
        da.Fill(dt);
        return dt;
    }

    public override DataTable MyLeaveList(MyLeaveList myLeaveList)
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM Leaves WHERE CreatorID = " + myLeaveList.CreatorID , connection);
        da.Fill(dt);
        return dt;
    }

    public override DataTable ExtraLeaveList()
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM ExtraLeaves", connection);
        da.Fill(dt);
        return dt;
    }

    public override DataTable MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
    {
        DataTable dt = new DataTable();
        OleDbDataAdapter da = new OleDbDataAdapter("SELECT * FROM ExtraLeaves WHERE CreatorID = " + myExtraLeaveList.CreatorID, connection);
        da.Fill(dt);
        return dt;
    }

    public override bool EditProfile(EditProfile editProfile)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Registration SET Name = @Name, Phone = @Phone, Birthday = @Birthday, Address = @Address WHERE ID = @ID AND IsActive = 1", connection);
        cmd.Parameters.AddWithValue("@Name", editProfile.Name);
        cmd.Parameters.AddWithValue("@Phone", editProfile.Phone);
        cmd.Parameters.AddWithValue("@Birthday", editProfile.Birthday);
        cmd.Parameters.AddWithValue("@Address", editProfile.Address);
        cmd.Parameters.AddWithValue("@ID", editProfile.ID);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool EditProfileEmail(EditProfileEmail editProfileEmail)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE Registration SET Email = @Email WHERE ID = @ID AND IsActive = 1", connection);
        cmd.Parameters.AddWithValue("@Email", editProfileEmail.Email);
        cmd.Parameters.AddWithValue("@ID", editProfileEmail.ID);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }

    public override bool EditProfilePassword(EditProfilePassword editProfilePassword)
    {
        OleDbCommand cmd = new OleDbCommand("UPDATE [Registration] SET [Password] = @Password WHERE [ID] = @ID AND [IsActive] = 1", connection);
        cmd.Parameters.AddWithValue("@Password", editProfilePassword.Password);
        cmd.Parameters.AddWithValue("@ID", editProfilePassword.ID);
        connection.Open();
        int i = cmd.ExecuteNonQuery();
        connection.Close();
        if (i > 0)
            return true;
        return false;

    }




}
