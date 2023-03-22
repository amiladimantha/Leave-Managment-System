using LMS.Library;
using LMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtraLeaveController : BaseController
    {
        public ExtraLeaveController(IConfiguration configuration) : base(configuration)
        {
        }


        [HttpGet]
        [Route("ExtraLeaveList")]
        public Response ExtraLeaveList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.ExtraLeaveList();

            List<ExtraLeaveList> lstExtraLeave = new List<ExtraLeaveList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ExtraLeaveList exleave = new ExtraLeaveList();
                    exleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    exleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                    exleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                    exleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                    exleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                    exleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                    exleave.Reason = Convert.ToString(dt.Rows[i]["Reason"]);
                    exleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    lstExtraLeave.Add(exleave);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listExtraLeave = lstExtraLeave;


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listExtraLeave = null;

            }
            return response;

        }

        [HttpPost]
        [Route("MyExtraLeaveList")]
        public Response MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {

            Response response = new Response();
            DataTable dt = dataAccess.MyExtraLeaveList(myExtraLeaveList);

            List<MyExtraLeaveList> lstMyExtraLeave = new List<MyExtraLeaveList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    MyExtraLeaveList myextraleave = new MyExtraLeaveList();
                    myextraleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    myextraleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                    myextraleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                    myextraleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                    myextraleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                    myextraleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                    myextraleave.Reason = Convert.ToString(dt.Rows[i]["Reason"]);
                    myextraleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    lstMyExtraLeave.Add(myextraleave);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listMyExtraLeave = lstMyExtraLeave;


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listMyExtraLeave = null;

            }
            return response;

        }

        [HttpPost]
        [Route("ApplyExtraLeave")]
        public Response ApplyExtraLeave(ApplyExtraLeave applyExtraLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.ApplyExtraLeave(applyExtraLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Application Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Application Failed!";
            }
            return response;

        }

        [HttpPost]
        [Route("ApproveExtraLeave")]
        public Response ApproveExtraLeave(ApproveExtraLeave approveExtraLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.ApproveExtraLeave(approveExtraLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Approval Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Approval Failed!";
            }
            return response;

        }

        [HttpPost]
        [Route("RejectExtraLeave")]
        public Response RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.RejectExtraLeave(rejectExtraLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Rejection Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Rejection Failed!";
            }
            return response;

        }

        [HttpPost]
        [Route("DeleteExtraLeave")]
        public Response DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.DeleteExtraLeave(deleteExtraLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Deleted Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Deletion Failed!";
            }
            return response;

        }

        [HttpPost]
        [Route("EditExtraLeave")]
        public Response EditExtraLeave(EditExtraLeave editExtraLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.EditExtraLeave(editExtraLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Extra Leave Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Extra Leave Editing Failed!";
            }
            return response;

        }

    }
}
