using Microsoft.EntityFrameworkCore;
using RestSample.Models;

namespace RestSample.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }
        public DbSet<Student> Students { get; set; }
    }
}