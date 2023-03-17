namespace LMS.Library
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public Registration Registration { get; set; }
        public List<RegistrationList> listRegistration { get; set; }
        public List<RegistrationListManager> listRegistrationManager { get; set; }
        public List<LeaveList> listLeave { get; set; }
        public List<ExtraLeaveList> listExtraLeave { get; set; }
        public List<MyLeaveList> listMyLeave { get; set; }
        public List<MyExtraLeaveList> listMyExtraLeave { get; set; }
    }
}
