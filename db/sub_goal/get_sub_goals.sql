SELECT sg.g_id, sg.name, sg.complete
FROM sub_goal sg
JOIN goal g
ON sg.g_id = g.id
ORDER BY sg.id ASC;