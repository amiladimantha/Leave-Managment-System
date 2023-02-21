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
        private readonly IDal _dal;

        public ExtraLeaveListController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpGet]
        [Route("ExtraLeaveList")]

        public Response ExtraLeaveList()
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.ExtraLeaveList(connection);
            return response;

        }            
    }
}

