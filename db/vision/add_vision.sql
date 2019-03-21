INSERT INTO vision (u_id, text, img)
VALUES (${u_id}, ${text}, ${img});

SELECT v.id, v.u_id, v.text, v.img, u.username 
FROM vision v 
JOIN users u
ON v.u_id = u.id 
ORDER BY v.id DESC