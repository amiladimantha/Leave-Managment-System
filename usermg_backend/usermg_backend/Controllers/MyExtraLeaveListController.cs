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
        private readonly IDal _dal;

        public MyExtraLeaveListController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("MyExtraLeaveList")]

        public Response MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.MyExtraLeaveList(myExtraLeaveList, connection);
            return response;

        }            
    }
}

