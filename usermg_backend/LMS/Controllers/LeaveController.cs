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
    public class LeaveController:BaseController
    {
        public LeaveController(IConfiguration configuration) : base(configuration)
        {
        }


        [HttpGet]
        [Route("LeaveList")]
        public Response LeaveList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.LeaveList();

            List<LeaveList> lstLeave = new List<LeaveList>();
            if (dt !=null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    LeaveList leave = new LeaveList();
                    leave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    leave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                    leave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                    leave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                    leave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                    leave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                    leave.LeaveType = Convert.ToInt32(dt.Rows[i]["LeaveType"]);
                    leave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    lstLeave.Add(leave);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listLeave = lstLeave;


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listLeave = null;

            }
            return response;

        }

        [HttpPost]
        [Route("MyLeaveList")]
        public Response MyLeaveList(MyLeaveList myLeaveList)
        {

            Response response = new Response();
            DataTable dt = dataAccess.MyLeaveList(myLeaveList);

            List<MyLeaveList> lstMyLeave = new List<MyLeaveList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    MyLeaveList myleave = new MyLeaveList();
                    myleave.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    myleave.CreatorID = Convert.ToInt32(dt.Rows[i]["CreatorID"]);
                    myleave.CreatorName = Convert.ToString(dt.Rows[i]["CreatorName"]);
                    myleave.FromDate = Convert.ToString(dt.Rows[i]["FromDate"]);
                    myleave.ToDate = Convert.ToString(dt.Rows[i]["ToDate"]);
                    myleave.NoofDays = Convert.ToInt32(dt.Rows[i]["NoofDays"]);
                    myleave.LeaveType = Convert.ToInt32(dt.Rows[i]["LeaveType"]);
                    myleave.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    lstMyLeave.Add(myleave);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listMyLeave = lstMyLeave;


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listMyLeave = null;

            }
            return response;

        }


        [HttpPost]
        [Route("ApplyLeave")]
        public Response ApplyLeave(ApplyLeave applyLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.ApplyLeave(applyLeave);

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
        [Route("ApproveLeave")]
        public Response ApproveLeave(ApproveLeave approveLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.ApproveLeave(approveLeave);

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
        [Route("RejectLeave")]
        public Response RejectLeave(RejectLeave rejectLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.RejectLeave(rejectLeave);

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
        [Route("DeleteLeave")]
        public Response DeleteLeave(DeleteLeave deleteLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.DeleteLeave(deleteLeave);

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
        [Route("EditLeave")]
        public Response EditLeave(EditLeave editLeave)
        {

            Response response = new Response();
            bool ret = dataAccess.EditLeave(editLeave);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Leave Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Leave Editing Failed!";
            }
            return response;

        }

    }
}
