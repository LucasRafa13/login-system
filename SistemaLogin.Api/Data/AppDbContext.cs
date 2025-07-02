using Microsoft.EntityFrameworkCore;
using SistemaLogin.Api.Models;

namespace SistemaLogin.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
    }
}
