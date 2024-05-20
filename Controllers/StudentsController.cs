using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestSample.Data;
using RestSample.Models;

namespace RestSample.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController:ControllerBase
    {
        // AppDbContext = _context 
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
                _context = context;
        }

        // table.student 
        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();

            return students;
        }

        [HttpPost]
        // รับข้อมูล ( stundent ) ถ้า valid addข้อมูล save => return OK
        // !isvalid badRequest
        public async Task<IActionResult> Create(Student student)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);

            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                return Ok("add student success");
            }

            return BadRequest();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            
            if(student is null) return NotFound("Not Id Student");

            return Ok(student);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if(student is null) return NotFound(); 
            _context.Remove(student); 

            var result = await _context.SaveChangesAsync();
            if(result > 0)
                return Ok("Student Deleted");
                
            return BadRequest("Unable to delted student");
        }

        [HttpPut("{id:int}")]
        // รับ id , ข้อมูลที่จะแก้ไข เพือแก้ไขข้อมูล
        public async Task<IActionResult> EditStudent(int id, Student student)
        {
            // หาข้อมูลจากฐานข้อมูล โดยใช้ id ที่รับเข้ามา
            // ไม่มีข้อมูล ให้ res.message
            var studentFromDb = await _context.Students.FindAsync(id);

            if(studentFromDb is null)
            {
                return BadRequest("Student Not found");
            }

            // เอาข้อมูลที่รับเข้ามา แทนที่ studentFromDb ที่ค้นหาโดย id 
            studentFromDb.Name = student.Name;
            studentFromDb.Address = student.Address;
            studentFromDb.PhoneNumber = student.PhoneNumber;
            studentFromDb.Email = student.Email;

            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                return Ok("Student Sucessfully updated");
            }

            return BadRequest("Unable to updated data");
        }
    }
}