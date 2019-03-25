SELECT v.id, v.u_id, v.text, v.img, u.username 
FROM vision v 
JOIN users u
ON v.u_id = u.id 
WHERE u.id = ${id}
ORDER BY v.id DESC