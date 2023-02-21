using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtraLeaveController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ExtraLeaveController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("ExtraLeave")]

        public Response ExtraLeave(ExtraLeave extraLeave)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.ExtraLeave(extraLeave, connection);
            return response;
        }

       
    }
}
