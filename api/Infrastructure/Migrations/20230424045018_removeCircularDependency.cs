using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class removeCircularDependency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Habits_HabitLists_HabitListId",
                table: "Habits");

            migrationBuilder.AlterColumn<int>(
                name: "HabitListId",
                table: "Habits",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Habits_HabitLists_HabitListId",
                table: "Habits",
                column: "HabitListId",
                principalTable: "HabitLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Habits_HabitLists_HabitListId",
                table: "Habits");

            migrationBuilder.AlterColumn<int>(
                name: "HabitListId",
                table: "Habits",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Habits_HabitLists_HabitListId",
                table: "Habits",
                column: "HabitListId",
                principalTable: "HabitLists",
                principalColumn: "Id");
        }
    }
}
