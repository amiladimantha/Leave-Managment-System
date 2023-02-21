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
        public RegistrationController(IConfiguration configuration) 
        {
            _configuration= configuration;
        }

        [HttpPost]
        [Route("Registration")]

        public Response Registration(Registration registration) 
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.Registration(registration,connection);
            return response;
        }


        [HttpPost]
        [Route("Login")]

        public Response Login(Login login)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.Login(login, connection);
            return response;
        }


        [HttpPost]
        [Route("StaffRegistration")]

        public Response StaffRegistration(Staff staff)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.StaffRegistration(staff, connection);
            return response;
        }

       

        //[HttpPost]
        //[Route("RegistrationList")]

        //public Response RegistrationList(Registration registration)
        //{
        //    Response response = new Response();
        //    SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
        //    Dal dal = new Dal();
        //    response = dal.RegistrationList(registration, connection);
        //    return response;
        //}



    }
}
