using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class LeaveListController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LeaveListController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpGet]
        [Route("LeaveList")]

        public Response LeaveList()
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.LeaveList(connection);
            return response;

        }            
    }
}

