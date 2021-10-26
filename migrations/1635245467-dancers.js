exports.up = async function up(sql) {
  await sql`
	CREATE TABLE dancers (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(40) NOT NULL,
		role_id integer references roles (id),
		match_id integer references dancers (id)
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE dancers;
	`;
};