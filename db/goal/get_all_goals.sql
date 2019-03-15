
-- SELECT g.id, g.u_id, g.name, g.date, u.username 
-- FROM goal g 
-- JOIN users u
-- ON g.u_id = u.id 
-- ORDER BY g.date ASC;

-- select row_to_json(g)
-- from (
--     select  g.id, g.u_id, g.name, g.date,
--     (
--         select array_to_json(array_agg(row_to_json(g)))
--         from sub_goal
--     )
--     from goal g
-- )g

select id, name, date,
    (
        select json_agg(sg)
        from (
            select id, name, complete
            from sub_goal
            where g_id = goal.id
        )sg
    ) sub_goal
from goal
where u_id = ${id}