using Microsoft.IdentityModel.Tokens;

namespace usermg_backend.Controllers.Helpers
{
    public static class Constants
    {
        public const string Audience = "https://localhost:7068";
        public const string Issuer = "https://localhost:7068";
        public const string Secret = "the-Secret-key-Phrase-for-The-security-Key";
    }
}
