using LMS.Library;
using System.Data;
using System.Security.AccessControl;

namespace LMS.Data
{
    public abstract class Data
    {
        private string connectionString=string.Empty;
        private string databaseName=string.Empty;

        public Data()
        {

        }
        public Data(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public string ConnectionString
        {
            get { return connectionString; }
            set { connectionString = value; }
        }
        public string DatabaseName
        {
            get { return databaseName; }
            set { databaseName = value; }
        }
        public virtual bool Registration(Registration registration)
        {
            return false;
        }
        public virtual DataTable RegistrationList()
        {
            return null;
        }
        public virtual DataTable RegistrationListManager()
        {
            return null;
        }
        public virtual bool ActivateUser(ActivateUser activateUser)
        {
            return false;
        }

        public virtual bool AddUser(AddUser addUser)
        {
            return false;
        }
        public virtual bool EditProfileImage(int id, byte[] image)
        {
            return false;
        }

        public virtual bool ApproveUser(ApproveUser approveUser)
        {
            return false;
        }
        public virtual bool BlockUser(BlockUser blockUser)
        {
            return false;
        }
        public virtual bool DeleteUser(DeleteUser deleteUser)
        {
            return false;
        }
        public virtual bool EditUser(EditUser editUser)
        {
            return false;
        }
        public virtual DataRow[] Login (Login login)
        {
            return null;
        }

        public virtual DataTable LeaveList()
        {
            return null;
        }

        public virtual DataTable MyLeaveList(MyLeaveList myLeaveList)
        {
            return null;
        }

        public virtual DataTable ExtraLeaveList()
        {
            return null;
        }

        public virtual DataTable MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {
            return null;
        }
        public virtual bool ApplyLeave(ApplyLeave applyLeave)
        {
            return false;
        }
        public virtual bool ApproveLeave(ApproveLeave approveLeave)
        {
            return false;
        }
        public virtual bool RejectLeave(RejectLeave rejectLeave)
        {
            return false;
        }
        public virtual bool DeleteLeave(DeleteLeave deleteLeave)
        {
            return false;
        }
        public virtual bool EditLeave(EditLeave editLeave)
        {
            return false;
        }

        public virtual bool ApplyExtraLeave(ApplyExtraLeave applyExtraLeave)
        {
            return false;
        }
        public virtual bool ApproveExtraLeave(ApproveExtraLeave approveExtraLeave)
        {
            return false;
        }
        public virtual bool RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
        {
            return false;
        }
        public virtual bool DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave)
        {
            return false;
        }
        public virtual bool EditExtraLeave(EditExtraLeave editExtraLeave)
        {
            return false;
        }
        public virtual bool EditProfile(EditProfile editProfile)
        {
            return false;
        }
        public virtual bool EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            return false;
        }
        public virtual bool EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            return false;
        }
    }
}