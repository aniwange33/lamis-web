CREATE OR REPLACE FUNCTION migrate_pharmacy_lines() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM pharmacy WHERE lines IS NULL ORDER BY 1 DESC LIMIT 1000
        LOOP
			UPDATE pharmacy p SET lines = (
				SELECT array_to_json(array_agg(row_to_json(t)))::text
    				FROM (
      					SELECT  morning, afternoon, duration, regimen_id, regimen_type_id, regimen_drug_id
							FROM pharmacy_line WHERE pharmacy_id = rec.id AND
							(archived = FALSE OR (archived = true AND rec.archived = true))
    				) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION migrate_laboratory_lines() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM laboratory WHERE lines IS NULL ORDER BY 1 DESC LIMIT 1000
        LOOP
			UPDATE laboratory p SET lines = (
				SELECT array_to_json(array_agg(row_to_json(t)))::text
    				FROM (
      					select result, comment, indication, lab_test_id from (
							select *, rank() over(partition by lab_test_id order by uuid desc) _rank from laboratory_line
							where laboratory_id = rec.id and (archived = false or (archived = true and rec.archived = true))
						) l where _rank = 1
    				) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;
