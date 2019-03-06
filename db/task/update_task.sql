UPDATE task
SET time = ${time}
WHERE id = ${id};

UPDATE task
SET name = ${name}
WHERE id = ${id};

SELECT t.id, t.u_id, t.name, t.time, u.username
FROM task t
JOIN users u
ON t.u_id = u.id
ORDER BY t.time ASC