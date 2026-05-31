using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class mig1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alinacaklars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    isim = table.Column<string>(type: "TEXT", nullable: false),
                    soyisim = table.Column<string>(type: "TEXT", nullable: true),
                    BorcMiktari = table.Column<int>(type: "INTEGER", nullable: false),
                    BorcunVerildiğiTarih = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alinacaklars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlinmisAlinacaklars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    AlinacaklarId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Isim = table.Column<string>(type: "TEXT", nullable: false),
                    OdenenMiktar = table.Column<int>(type: "INTEGER", nullable: false),
                    ToplamBorc = table.Column<int>(type: "INTEGER", nullable: false),
                    OdemeTarihi = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlinmisAlinacaklars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Verileceklers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    isim = table.Column<string>(type: "TEXT", nullable: false),
                    soyisim = table.Column<string>(type: "TEXT", nullable: true),
                    BorcMiktari = table.Column<int>(type: "INTEGER", nullable: false),
                    BorcunVerildiğiTarih = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Verileceklers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VerilmisVerileceklers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    VerileceklerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Isim = table.Column<string>(type: "TEXT", nullable: false),
                    OdenenMiktar = table.Column<int>(type: "INTEGER", nullable: false),
                    ToplamVerilecek = table.Column<int>(type: "INTEGER", nullable: false),
                    OdemeTarihi = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerilmisVerileceklers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alinacaklars");

            migrationBuilder.DropTable(
                name: "AlinmisAlinacaklars");

            migrationBuilder.DropTable(
                name: "Verileceklers");

            migrationBuilder.DropTable(
                name: "VerilmisVerileceklers");
        }
    }
}
