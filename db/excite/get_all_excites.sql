SELECT e.id, e.u_id, e.name, u.username
FROM excite e 
JOIN users u 
ON e.u_id = u.id 
ORDER BY e.id DESC;