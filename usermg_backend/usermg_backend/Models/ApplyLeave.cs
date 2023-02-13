﻿namespace usermg_backend.Models
{
    public class ApplyLeave
    {
        public int ID { get; set; }
        public int CreatorID { get; set; }
        public string CreatorName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int NoofDays { get; set; }
        public int LeaveType { get; set; }
        public int IsApproved { get; set; }

    }
}
