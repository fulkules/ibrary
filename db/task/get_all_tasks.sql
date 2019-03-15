-- SELECT t.id, t.u_id, t.name, t.time, t.date, u.username
-- FROM task t
-- JOIN users u
-- ON t.u_id = u.id
-- ORDER BY t.time ASC;

select id, name, time,
    (
        select json_agg(st)
        from (
            select id, name, complete
            from sub_task
            where t_id = task.id
        )st
    ) sub_task
from task
where u_id = ${id}
order by task.time asc;
