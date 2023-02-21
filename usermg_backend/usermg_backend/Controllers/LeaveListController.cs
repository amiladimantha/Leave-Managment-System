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
        private readonly IDal _dal;

        public LeaveListController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpGet]
        [Route("LeaveList")]

        public Response LeaveList()
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.LeaveList(connection);
            return response;

        }            
    }
}

