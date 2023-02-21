using System.Data.SqlClient;

namespace usermg_backend.Models
{
    public interface IDal
    {
        Response ActivateUser(ActivateUser activateUser, SqlConnection connection);
        Response AddUser(AddUser addUser, SqlConnection connection);
        Response ApplyLeave(ApplyLeave applyLeave, SqlConnection connection);
        Response ApproveExtraLeave(ApproveExtraLeave approveExtraLeave, SqlConnection connection);
        Response ApproveLeave(ApproveLeave approveLeave, SqlConnection connection);
        Response ApproveUser(ApproveUser approveUser, SqlConnection connection);
        Response BlockUser(BlockUser blockUser, SqlConnection connection);
        Response DeleteLeave(DeleteLeave deleteLeave, SqlConnection connection);
        Response DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave, SqlConnection connection);
        Response DeleteUser(DeleteUser deleteUser, SqlConnection connection);
        Response EditProfile(EditProfile editProfile, SqlConnection connection);
       // Response EditProfileImage(EditProfileImage editProfileImage, SqlConnection connection);
        Response EditProfileEmail(EditProfileEmail editProfileEmail, SqlConnection connection);
        Response EditProfilePassword(EditProfilePassword editProfilePassword, SqlConnection connection);
        Response ExtraLeave(ExtraLeave extraLeave, SqlConnection connection);
        Response ExtraLeaveList(SqlConnection connection);
        Response LeaveList(SqlConnection connection);
        Response Login(Login login, SqlConnection connection);
        Response MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList, SqlConnection connection);
        Response MyLeaveList(MyLeaveList myLeaveList, SqlConnection connection);
        Response Registration(Registration registration, SqlConnection connection);
        Response RegistrationList(SqlConnection connection);
        Response RegistrationListManager(SqlConnection connection);
        Response RejectExtraLeave(RejectExtraLeave rejectExtraLeave, SqlConnection connection);
        Response RejectLeave(RejectLeave rejectLeave, SqlConnection connection);
    }
}
