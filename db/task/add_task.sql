INSERT INTO task
(u_id, name, time, date)
-- VALUES ('2', 'send yeasty codpieces to the brig', '12:00H', 'Mar 6');
VALUES (${u_id}, ${name}, ${time}, ${date});

SELECT t.id, t.u_id, t.name, t.time, u.username 
FROM task t
JOIN users u
ON t.u_id = u.id 
ORDER BY t.time ASC