using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class EditProfileImageController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public EditProfileImageController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("EditProfileImage")]
    public async Task<IActionResult> Upload(IFormFile file, [FromForm] string ID)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file selected");

        int id;
        if (!int.TryParse(ID, out id))
            return BadRequest("Invalid user ID");

        using (var connection = new SqlConnection(_configuration.GetConnectionString("usermg")))
        {
            await connection.OpenAsync();

            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    var imageData = new byte[file.Length];
                    using (var stream = new MemoryStream(imageData))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var command = new SqlCommand(
                        "UPDATE registration SET Image = @ImageData WHERE ID = @id",
                        connection,
                        transaction
                    );
                    command.Parameters.AddWithValue("@ImageData", imageData);
                    command.Parameters.AddWithValue("@id", id);
                    await command.ExecuteNonQueryAsync();

                    transaction.Commit();
                    return Ok();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }
}
