﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchoolAs.DAL
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SchoolAsEntities : DbContext
    {
        public SchoolAsEntities()
            : base("name=SchoolAsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AssignmentFile> AssignmentFile { get; set; }
        public virtual DbSet<Class> Class { get; set; }
        public virtual DbSet<ClassSubject> ClassSubject { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<School> School { get; set; }
        public virtual DbSet<SubjectAssignment> SubjectAssignment { get; set; }
    }
}
