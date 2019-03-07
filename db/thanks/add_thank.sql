INSERT INTO thanks (u_id, name)
VALUES (${u_id}, ${name});

SELECT th.id, th.u_id, th.name, u.username
FROM thanks th
JOIN users u
ON th.u_id = u.id 
ORDER BY th.id DESC