using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditProfileEmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EditProfileEmailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("EditProfileEmail")]

        public Response EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.EditProfileEmail(editProfileEmail, connection);
            return response;
        }

       
    }
}
