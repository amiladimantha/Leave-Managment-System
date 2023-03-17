using LMS.Library;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : BaseController
    {
        public ProfileController(IConfiguration configuration) : base(configuration)
        {
        }


        [HttpPost]
        [Route("EditProfile")]
        public Response EditProfile(EditProfile editProfile)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfile(editProfile);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Profile Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Profile Editing Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditProfileEmail")]
        public Response EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfileEmail(editProfileEmail);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Email Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Email Editing Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditProfilePassword")]
        public Response EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfilePassword(editProfilePassword);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Password Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Password Editing Failed!";
            }
            return response;
        }
    }
}
