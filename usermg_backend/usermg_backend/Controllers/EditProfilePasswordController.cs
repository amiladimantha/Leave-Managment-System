using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditProfilePasswordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EditProfilePasswordController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("EditProfilePassword")]

        public Response EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.EditProfilePassword(editProfilePassword, connection);
            return response;
        }

       
    }
}
