using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDal _dal;

        public LoginController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("Login")]

        public Response Login(Login login)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.Login(login, connection);
            return response;
        }

       
    }
}
