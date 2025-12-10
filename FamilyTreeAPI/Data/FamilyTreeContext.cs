using Microsoft.EntityFrameworkCore;
using FamilyTreeAPI.Models;

namespace FamilyTreeAPI.Data
{
    public class FamilyTreeContext : DbContext
    {
        public FamilyTreeContext(DbContextOptions<FamilyTreeContext> options)
            : base(options)
        {
        }

        public DbSet<FamilyMember> FamilyMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<FamilyMember>()
                .HasIndex(m => m.FatherId);

            modelBuilder.Entity<FamilyMember>()
                .HasIndex(m => m.MotherId);

            modelBuilder.Entity<FamilyMember>()
                .HasIndex(m => m.SpouseId);

            // Seed initial data
            modelBuilder.Entity<FamilyMember>().HasData(
                new FamilyMember
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Gender = "Male",
                    DateOfBirth = new DateTime(1950, 1, 15),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new FamilyMember
                {
                    Id = 2,
                    FirstName = "Jane",
                    LastName = "Doe",
                    Gender = "Female",
                    DateOfBirth = new DateTime(1952, 3, 20),
                    SpouseId = 1,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new FamilyMember
                {
                    Id = 3,
                    FirstName = "Michael",
                    LastName = "Doe",
                    Gender = "Male",
                    DateOfBirth = new DateTime(1975, 5, 10),
                    FatherId = 1,
                    MotherId = 2,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
