using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using System.Data.OleDb;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController
    {
        protected LMS.Data.Data dataAccess;
        private readonly IConfiguration _configuration;
        public BaseController(IConfiguration configuration)
        {
            _configuration = configuration;


            //if (dataAccess == null)
            //    dataAccess = new XMLData(connectionString: configuration.GetConnectionString("database"));

            //if (dataAccess == null)
            //    dataAccess = new AccessData(connectionString: configuration.GetConnectionString("database"));


            if (dataAccess == null)
                dataAccess = new SQLData(connectionString: configuration.GetConnectionString("database"));


        }
    }
}
