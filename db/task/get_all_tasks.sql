SELECT st.t_id, st.name, st.complete
FROM sub_task st
JOIN task t
ON st.t_id = t.id
ORDER BY st.id ASC;

SELECT t.id, t.u_id, t.name, t.time, t.date, u.username
FROM task t
JOIN users u
ON t.u_id = u.id
ORDER BY t.time ASC;