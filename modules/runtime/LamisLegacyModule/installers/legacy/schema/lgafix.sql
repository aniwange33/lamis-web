CREATE OR REPLACE FUNCTION setlga() RETURNS VOID AS $$
    BEGIN
        EXECUTE 'UPDATE patient p SET lga_id = (SELECT l.id FROM lga l WHERE TRIM(name) = TRIM(p.lga) LIMIT 1)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE  'Exception caught';
    END;
$$
LANGUAGE PLPGSQL;

SELECT setlga();
