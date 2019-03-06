DELETE FROM sub_task
WHERE id = ${id};

SELECT st.t_id, st.name, st.complete
FROM sub_task st
JOIN task t
ON st.t_id = t.id
ORDER BY st.id ASC;