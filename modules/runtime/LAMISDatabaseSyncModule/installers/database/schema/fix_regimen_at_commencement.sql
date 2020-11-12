CREATE OR REPLACE FUNCTION fix_regimen_at_commencement() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
		rec3 RECORD;
    BEGIN
        FOR rec IN select id from patient where id not in (select distinct patient_id from clinic where commence = true)
        LOOP
            FOR rec2 IN SELECT id
            FROM clinic
            WHERE patient_id = rec.id
            ORDER BY date_visit
            LIMIT 1
            LOOP
                FOR rec3 IN select regimen_id, regimen_type_id from pharmacy p join pharmacy_line l on p.id = pharmacy_id where p.patient_id = rec.id
					and regimen_type_id IN (1, 2, 3, 4)  order by date_visit limit 1
				LOOP
					UPDATE clinic SET regimen_id = rec3.regimen_id, regimen_type_id = rec3.regimen_type_id where id = rec2.id;
				END LOOP;
            END LOOP;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select fix_regimen_at_commencement();
