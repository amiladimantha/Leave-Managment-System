using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class RegistrationListController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDal _dal;

        public RegistrationListController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpGet]
        [Route("RegistrationList")]

        public Response RegistrationList()
        {

            Response response = new Response();           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.RegistrationList(connection);
            return response;

        }

        [HttpGet]
        [Route("RegistrationListManager")]

        public Response RegistrationListManager()
        {

            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.RegistrationListManager(connection);
            return response;

        }
    }
}

