using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AddUserController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpPost]
        [Route("AddUser")]

        public Response AddUser(AddUser addUser) 
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.AddUser(addUser, connection);
            return response;
        }
    }
}
