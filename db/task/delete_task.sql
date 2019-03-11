DELETE FROM sub_task st
WHERE t_id = ${id};

DELETE FROM task
WHERE id = ${id};

SELECT t.id, t.u_id, t.name, t.time, t.date, u.username
FROM task t
JOIN users u
ON t.u_id = u.id
ORDER BY t.time ASC;