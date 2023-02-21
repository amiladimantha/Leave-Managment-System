﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using usermg_backend.Controllers.Helpers;
using usermg_backend.Models;

namespace usermg_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RejectExtraLeaveController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public RejectExtraLeaveController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("RejectExtraLeave")]
        

        public Response RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            Dal dal = new Dal();
            response = dal.RejectExtraLeave(rejectExtraLeave, connection);
            return response;
        }

       
    }
}
