using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Data.SqlClient;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDal _dal;

        public RegistrationController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("Registration")]

        public Response Registration(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.Registration(registration, connection);
            return response;
        }

    }
}
