INSERT INTO task
(u_id, name, time, date)
VALUES (${u_id}, ${name}, ${time}, ${date});

SELECT t.id, t.u_id, t.name, t.time, u.username 
FROM task t
JOIN users u
ON t.u_id = u.id 
ORDER BY t.time ASC