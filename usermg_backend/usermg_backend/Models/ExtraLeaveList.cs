namespace usermg_backend.Models
{
    public class ExtraLeaveList
    {
        public int ID { get; set; }
        public int CreatorID { get; set; }
        public string CreatorName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int NoofDays { get; set; }
        public string Reason { get; set; }
        public int IsApproved { get; set; }

    }
}
