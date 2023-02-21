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
    public class DeleteUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDal _dal;

        public DeleteUserController(IConfiguration configuration, IDal dal)
        {
            _configuration = configuration;
            _dal = dal;
        }

        [HttpPost]
        [Route("DeleteUser")]
        

        public Response DeleteUser(DeleteUser deleteUser)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("usermgdatabase").ToString());
            response = _dal.DeleteUser(deleteUser, connection);
            return response;
        }

       
    }
}
