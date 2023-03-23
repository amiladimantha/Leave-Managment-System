namespace LMS.Library
{
    public class MyExtraLeaveList
    {
        public int? ID { get; set; }
        public int CreatorID { get; set; }
        public string? CreatorName { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public int? NoofDays { get; set; }
        public string? Reason { get; set; }
        public int? IsApproved { get; set; }

    }
}
