using LMS.Library;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Data
{
    public class XMLData:Data
    {

        string xmlFileName = "..\\..\\Executables\\LMSDB.xml";
        string connectionString=String.Empty;
        public XMLData()
        {

        }
        public XMLData(string connectionString)
        {
            this.xmlFileName = connectionString;
        }

        public override DataRow[] Login(Login login)
        {
            DataRow[]? rowFiltered = null;
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Count > 0)
                {
                    DataTable dt = dataSet.Tables["registration"];

                    if (dt!=null)
                    {
                        rowFiltered = dt.Select("Email = '" + login.Email + "' AND Password = '" + login.Password + "'");
                    }
                }
            }
            
            return rowFiltered;
        }

        public override DataTable LeaveList()
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Count > 0)
                {
                    dt = dataSet.Tables["leaves"];

                }
            }

            return dt;
        }
        public override DataTable ExtraLeaveList()
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Count > 0)
                {
                    dt = dataSet.Tables["extraleaves"];

                }
            }

            return dt;
        }
        public override DataTable MyLeaveList(MyLeaveList myLeaveList)
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Contains("leaves"))
                {
                    DataView dv = dataSet.Tables["leaves"].DefaultView;
                    dv.RowFilter = "CreatorID = '" + myLeaveList.CreatorID + "'";
                    dt = dv.ToTable();
                }
            }
            return dt;
        }
        public override DataTable MyExtraLeaveList(MyExtraLeaveList myExtraLeaveList)
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Contains("extraleaves"))
                {
                    DataView dv = dataSet.Tables["extraleaves"].DefaultView;
                    dv.RowFilter = "CreatorID = '" + myExtraLeaveList.CreatorID + "'";
                    dt = dv.ToTable();
                }
            }
            return dt;
        }


        public override DataTable RegistrationList()
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Count > 0)
                {
                    dt = dataSet.Tables["registration"];

                }
            }

            return dt;
        }
        public override DataTable RegistrationListManager()
        {
            DataTable dt = new DataTable();
            DataSet dataSet = new DataSet();
            if (File.Exists(xmlFileName))
            {
                dataSet.ReadXml(xmlFileName, XmlReadMode.InferSchema);
                if (dataSet.Tables.Contains("registration"))
                {
                    DataView dv = dataSet.Tables["registration"].DefaultView;
                    dv.RowFilter = "accountType <> 1 AND accountType <> 0";
                    dt = dv.ToTable();
                }
            }
            return dt;
        }

        public override bool Registration(Registration registration)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                int maxID = 0;
                foreach (DataRow row in dataSet.Tables["registration"].Rows)
                {
                    int id = Convert.ToInt32(row["ID"]);
                    if (id > maxID)
                    {
                        maxID = id;
                    }
                }

                DataRow newRow = dataSet.Tables["registration"].NewRow();
                newRow["ID"] = maxID + 1;
                newRow["Name"] = registration.Name;
                newRow["Email"] = registration.Email;
                newRow["Password"] = registration.Password;
                newRow["Phone"] = registration.Phone;
                newRow["IsActive"] = 1;
                newRow["IsApproved"] = 0;
                newRow["AccountType"] = registration.AccountType;

                dataSet.Tables["registration"].Rows.Add(newRow);
                dataSet.WriteXml(xmlFileName);

                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }


        public override bool ActivateUser(ActivateUser activateUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["registration"].Select("ID = " + activateUser.ID);
                if (rows.Length > 0)
                {
                    rows[0]["IsActive"] = 1;
                    dataSet.AcceptChanges();
                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool BlockUser(BlockUser blockUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["registration"].Select("ID = " + blockUser.ID);
                if (rows.Length > 0)
                {
                    rows[0]["IsActive"] = 0;
                    dataSet.AcceptChanges();
                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool AddUser(AddUser addUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                int lastID = 0;
                if (dataSet.Tables["registration"].Rows.Count > 0)
                {
                    lastID = Convert.ToInt32(dataSet.Tables["registration"].Rows[dataSet.Tables["registration"].Rows.Count - 1]["ID"]);
                }

                DataRow newRow = dataSet.Tables["registration"].NewRow();
                newRow["ID"] = lastID + 1; // Set the new ID to the last ID + 1
                newRow["Name"] = addUser.Name;
                newRow["Email"] = addUser.Email;
                newRow["Password"] = addUser.Password;
                newRow["Phone"] = addUser.Phone;
                newRow["IsActive"] = 1;
                newRow["IsApproved"] = addUser.IsApproved;
                newRow["AccountType"] = addUser.AccountType;
                newRow["Birthday"] = addUser.Birthday;
                newRow["Address"] = addUser.Address;

                dataSet.Tables["registration"].Rows.Add(newRow);
                dataSet.WriteXml(xmlFileName);

                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool ApproveUser(ApproveUser approveUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["registration"].Select("ID = '" + approveUser.ID + "' AND IsActive = 1");
                rows[0]["IsApproved"] = 1;
                dataSet.WriteXml(xmlFileName);

                result = true;
            }
            catch (Exception ex)
            {               
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool DeleteUser(DeleteUser deleteUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["registration"].Select("ID = '" + deleteUser.ID + "'");
                if (rows.Length > 0)
                {
                    rows[0].Delete();
                    dataSet.WriteXml(xmlFileName);

                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool EditUser(EditUser editUser)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["Registration"].Select("ID = " + editUser.ID);
                if (rows.Length > 0)
                {
                    rows[0]["Name"] = editUser.Name;
                    rows[0]["Email"] = editUser.Email;
                    rows[0]["Password"] = editUser.Password;
                    rows[0]["Phone"] = editUser.Phone;
                    rows[0]["Birthday"] = editUser.Birthday;
                    rows[0]["Address"] = editUser.Address;

                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool ApplyLeave(ApplyLeave applyLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                int lastID = 0;
                if (dataSet.Tables["leaves"].Rows.Count > 0)
                {
                    lastID = Convert.ToInt32(dataSet.Tables["leaves"].Rows[dataSet.Tables["leaves"].Rows.Count - 1]["ID"]);
                }

                DataRow newRow = dataSet.Tables["leaves"].NewRow();
                newRow["ID"] = lastID + 1; // Set the new ID to the last ID + 1
                newRow["CreatorID"] = applyLeave.CreatorID;
                newRow["CreatorName"] = applyLeave.CreatorName;
                newRow["FromDate"] = applyLeave.FromDate;
                newRow["ToDate"] = applyLeave.ToDate;
                newRow["NoofDays"] = applyLeave.NoofDays;
                newRow["IsApproved"] = 0;
                newRow["LeaveType"] = applyLeave.LeaveType;

                dataSet.Tables["leaves"].Rows.Add(newRow);

                dataSet.WriteXml(xmlFileName);

                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool ApproveLeave(ApproveLeave approveLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["leaves"].Select("ID = " + approveLeave.ID);
                rows[0]["IsApproved"] = 1;
                dataSet.WriteXml(xmlFileName);
                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool RejectLeave(RejectLeave rejectLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["leaves"].Select("ID = " + rejectLeave.ID);
                rows[0]["IsApproved"] = 2;
                dataSet.WriteXml(xmlFileName);
                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool DeleteLeave(DeleteLeave deleteLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["leaves"].Select("ID = '" + deleteLeave.ID + "'");
                if (rows.Length > 0)
                {
                    rows[0].Delete();
                    dataSet.WriteXml(xmlFileName);

                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool ApplyExtraLeave(ApplyExtraLeave applyExtraLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                int lastID = 0;
                if (dataSet.Tables["extraleaves"].Rows.Count > 0)
                {
                    lastID = Convert.ToInt32(dataSet.Tables["extraleaves"].Rows[dataSet.Tables["extraleaves"].Rows.Count - 1]["ID"]);
                }

                DataRow newRow = dataSet.Tables["extraleaves"].NewRow();
                newRow["ID"] = lastID + 1; // Set the new ID to the last ID + 1
                newRow["CreatorID"] = applyExtraLeave.CreatorID;
                newRow["CreatorName"] = applyExtraLeave.CreatorName;
                newRow["FromDate"] = applyExtraLeave.FromDate;
                newRow["ToDate"] = applyExtraLeave.ToDate;
                newRow["NoofDays"] = applyExtraLeave.NoofDays;
                newRow["IsApproved"] = 0;
                newRow["Reason"] = applyExtraLeave.Reason;

                dataSet.Tables["extraleaves"].Rows.Add(newRow);

                dataSet.WriteXml(xmlFileName);

                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool ApproveExtraLeave(ApproveExtraLeave approveExtraLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["extraleaves"].Select("ID = " + approveExtraLeave.ID);
                rows[0]["IsApproved"] = 1;
                dataSet.WriteXml(xmlFileName);
                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool RejectExtraLeave(RejectExtraLeave rejectExtraLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["extraleaves"].Select("ID = " + rejectExtraLeave.ID);
                rows[0]["IsApproved"] = 2;
                dataSet.WriteXml(xmlFileName);
                result = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool DeleteExtraLeave(DeleteExtraLeave deleteExtraLeave)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);
                DataRow[] rows = dataSet.Tables["extraleaves"].Select("ID = '" + deleteExtraLeave.ID + "'");
                if (rows.Length > 0)
                {
                    rows[0].Delete();
                    dataSet.WriteXml(xmlFileName);

                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool EditProfile(EditProfile editProfile)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["Registration"].Select("ID = " + editProfile.ID);
                if (rows.Length > 0)
                {
                    DataRow row = rows[0];
                    row["Name"] = editProfile.Name;
                    row["Phone"] = editProfile.Phone;
                    row["Birthday"] = editProfile.Birthday;
                    row["Address"] = editProfile.Address;
                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }

        public override bool EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["Registration"].Select("ID = " + editProfileEmail.ID);
                if (rows.Length > 0)
                {
                    DataRow row = rows[0];
                    row["Email"] = editProfileEmail.Email;
                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        public override bool EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            bool result = false;

            try
            {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(xmlFileName);

                DataRow[] rows = dataSet.Tables["Registration"].Select("ID = " + editProfilePassword.ID);
                if (rows.Length > 0)
                {
                    DataRow row = rows[0];
                    row["Password"] = editProfilePassword.Password;
                    dataSet.WriteXml(xmlFileName);
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }


    }
}
