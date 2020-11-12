CREATE OR REPLACE FUNCTION fixduplicatepatients() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        EXECUTE 'ALTER TABLE patient SET WITH OIDS';
        FOR rec IN SELECT id, count(*) AS cnt
            FROM patient
            GROUP BY 1
            HAVING COUNT(*) > 1
        LOOP
            FOR rec2 IN SELECT oid
                FROM patient
                WHERE id = rec.id
			    OFFSET 1
            LOOP
                DELETE FROM patient WHERE oid = rec2.oid;
            END LOOP;
        END LOOP;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE  'Exception caught set OID';
    END;
$$
LANGUAGE PLPGSQL;

select fixduplicatepatients();
