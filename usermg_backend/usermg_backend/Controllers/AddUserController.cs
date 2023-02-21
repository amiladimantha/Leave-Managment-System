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
        private readonly IDal _dal;

        public AddUserController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("AddUser")]

        public Response AddUser(AddUser addUser) 
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());            
            response = _dal.AddUser(addUser, connection);
            return response;
        }
    }
}
