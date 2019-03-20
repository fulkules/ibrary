INSERT INTO goal (u_id, name, date)
VALUES (${u_id}, ${name}, ${date});

-- SELECT g.id, g.u_id, g.name, g.date, u.username 
-- FROM goal g 
-- JOIN users u
-- ON g.u_id = u.id 
-- ORDER BY g.date ASC