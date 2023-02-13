using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MyLeaveListController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MyLeaveListController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpPost]
        [Route("MyLeaveList")]

        public Response MyLeaveList(MyLeaveList myLeaveList)
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.MyLeaveList(myLeaveList, connection);
            return response;

        }

    }
}

