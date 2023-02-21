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
        private readonly IDal _dal;

        public EditProfilePasswordController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("EditProfilePassword")]

        public Response EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.EditProfilePassword(editProfilePassword, connection);
            return response;
        }

       
    }
}
