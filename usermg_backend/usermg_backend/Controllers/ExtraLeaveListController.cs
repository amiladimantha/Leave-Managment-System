using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ExtraLeaveListController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ExtraLeaveListController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpGet]
        [Route("ExtraLeaveList")]

        public Response ExtraLeaveList()
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.ExtraLeaveList(connection);
            return response;

        }            
    }
}

