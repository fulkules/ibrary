UPDATE goal
SET date = ${date}
WHERE id = ${id};

UPDATE goal 
SET name = ${name}
WHERE id = ${id};

SELECT g.id, g.u_id, g.name, g.date, u.username
FROM goal g
JOIN users u
ON g.u_id = u.id
ORDER BY g.date ASC