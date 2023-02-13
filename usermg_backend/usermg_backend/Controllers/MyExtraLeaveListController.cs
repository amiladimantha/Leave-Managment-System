using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MyExtraLeaveListController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MyExtraLeaveListController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpPost]
        [Route("MyExtraLeaveList")]

        public Response MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.MyExtraLeaveList(myExtraLeaveList, connection);
            return response;

        }            
    }
}

