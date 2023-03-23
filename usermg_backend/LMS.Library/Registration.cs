using System.Reflection.PortableExecutable;

namespace LMS.Library
{
    public class Registration
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string? Address { get; set; }
        public string? Birthday { get; set; }
        public int IsActive { get; set; }
        public int IsApproved { get; set; }
        public int AccountType { get; set; }
    }
}
