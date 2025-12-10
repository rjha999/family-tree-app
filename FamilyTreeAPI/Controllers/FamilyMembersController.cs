using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FamilyTreeAPI.Data;
using FamilyTreeAPI.Models;

namespace FamilyTreeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyMembersController : ControllerBase
    {
        private readonly FamilyTreeContext _context;

        public FamilyMembersController(FamilyTreeContext context)
        {
            _context = context;
        }

        // GET: api/FamilyMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FamilyMember>>> GetFamilyMembers()
        {
            return await _context.FamilyMembers.ToListAsync();
        }

        // GET: api/FamilyMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FamilyMember>> GetFamilyMember(int id)
        {
            var familyMember = await _context.FamilyMembers.FindAsync(id);

            if (familyMember == null)
            {
                return NotFound();
            }

            return familyMember;
        }

        // GET: api/FamilyMembers/tree
        [HttpGet("tree")]
        public async Task<ActionResult<IEnumerable<object>>> GetFamilyTree()
        {
            var members = await _context.FamilyMembers.ToListAsync();
            
            var tree = members.Select(m => new
            {
                m.Id,
                m.FirstName,
                m.LastName,
                m.Gender,
                m.DateOfBirth,
                m.DateOfDeath,
                m.FatherId,
                m.MotherId,
                m.SpouseId,
                m.PhotoUrl,
                Age = m.DateOfBirth.HasValue 
                    ? (m.DateOfDeath ?? DateTime.Now).Year - m.DateOfBirth.Value.Year 
                    : (int?)null
            }).ToList();

            return Ok(tree);
        }

        // PUT: api/FamilyMembers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFamilyMember(int id, FamilyMember familyMember)
        {
            if (id != familyMember.Id)
            {
                return BadRequest();
            }

            familyMember.UpdatedAt = DateTime.UtcNow;
            _context.Entry(familyMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamilyMemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FamilyMembers
        [HttpPost]
        public async Task<ActionResult<FamilyMember>> PostFamilyMember(FamilyMember familyMember)
        {
            familyMember.CreatedAt = DateTime.UtcNow;
            familyMember.UpdatedAt = DateTime.UtcNow;
            
            _context.FamilyMembers.Add(familyMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFamilyMember), new { id = familyMember.Id }, familyMember);
        }

        // DELETE: api/FamilyMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFamilyMember(int id)
        {
            var familyMember = await _context.FamilyMembers.FindAsync(id);
            if (familyMember == null)
            {
                return NotFound();
            }

            // Check if this member is referenced by others
            var hasChildren = await _context.FamilyMembers
                .AnyAsync(m => m.FatherId == id || m.MotherId == id);
            
            var hasSpouse = await _context.FamilyMembers
                .AnyAsync(m => m.SpouseId == id);

            if (hasChildren || hasSpouse)
            {
                return BadRequest(new { message = "Cannot delete member who has relationships. Please remove relationships first." });
            }

            _context.FamilyMembers.Remove(familyMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FamilyMemberExists(int id)
        {
            return _context.FamilyMembers.Any(e => e.Id == id);
        }
    }
}
