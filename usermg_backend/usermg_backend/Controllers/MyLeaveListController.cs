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
        private readonly IDal _dal;

        public MyLeaveListController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("MyLeaveList")]

        public Response MyLeaveList(MyLeaveList myLeaveList)
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.MyLeaveList(myLeaveList, connection);
            return response;

        }

    }
}

