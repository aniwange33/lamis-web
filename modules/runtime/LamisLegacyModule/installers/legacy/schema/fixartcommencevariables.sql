CREATE OR REPLACE FUNCTION fixartcommencevariables() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE clinic ADD COLUMN regimen_type_id BIGINT;
        ALTER TABLE clinic ADD COLUMN regimen_id BIGINT;
        EXECUTE 'UPDATE clinic c SET regimen_type_id = (SELECT r.id FROM regimen_type r WHERE TRIM(description) = TRIM(c.regimentype) LIMIT 1)';
        EXECUTE 'UPDATE clinic c SET regimen_id = (SELECT id FROM regimen r WHERE TRIM(description) = TRIM(c.regimen) LIMIT 1)';
        ALTER TABLE clinic DROP COLUMN regimentype CASCADE;
        ALTER TABLE clinic DROP COLUMN regimen CASCADE;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixartcommencevariables();
