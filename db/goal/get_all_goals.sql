SELECT sg.g_id, sg.name, sg.complete
FROM sub_goal sg
JOIN goal g
ON sg.g_id = g.id
ORDER BY sg.id ASC;

SELECT g.id, g.u_id, g.name, g.date, u.username 
FROM goal g 
JOIN users u
ON g.u_id = u.id 
ORDER BY g.date ASC;