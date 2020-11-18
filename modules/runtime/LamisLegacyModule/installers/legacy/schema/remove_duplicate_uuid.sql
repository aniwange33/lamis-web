CREATE OR REPLACE FUNCTION remove_duplicate_uuid() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
		rec1 RECORD;
	BEGIN
	    DELETE FROM patient WHERE uuid IS NULL OR uuid = '';
	    delete from biometric where patient_id not in (select uuid from patient);

		FOR rec IN SELECT uuid FROM (
			SELECT uuid, count(*) FROM patient GROUP BY 1 HAVING COUNT(*) > 1
		) u
		LOOP
			FOR rec1 IN SELECT id FROM patient WHERE uuid = rec.uuid
			LOOP
				--RAISE NOTICE 'IDs %', a;
				DELETE FROM patient WHERE id = rec1.id and id not in (
					select distinct patient_id from pharmacy
					union select distinct patient_id from clinic
					union select distinct patient_id from laboratory
					union select distinct patient_id from status_history
					union select distinct patient_id from regimen_history
					union select distinct patient_id from anc
				);
			END LOOP;
		END LOOP;
 		EXCEPTION WHEN OTHERS THEN
             RAISE NOTICE  'Exception caught deleting record';
    END;
$$
LANGUAGE PLPGSQL;

SELECT remove_duplicate_uuid();
