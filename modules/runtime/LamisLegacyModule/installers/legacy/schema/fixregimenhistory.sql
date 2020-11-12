CREATE OR REPLACE FUNCTION fixregimenhistory() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE regimen_history ADD COLUMN regimen_type_id BIGINT;
        ALTER TABLE regimen_history ADD COLUMN regimen_id BIGINT;
        EXECUTE 'UPDATE regimen_history c SET regimen_type_id = (SELECT r.id FROM regimen_type r WHERE TRIM(description) = TRIM(c.regimentype) LIMIT 1)';
        EXECUTE 'UPDATE regimen_history c SET regimen_id = (SELECT id FROM regimen r WHERE TRIM(description) = TRIM(c.regimen) LIMIT 1)';
        ALTER TABLE regimen_history DROP COLUMN regimentype CASCADE;
        ALTER TABLE regimen_history DROP COLUMN regimen CASCADE;

        DELETE FROM regimen_history WHERE regimen_type_id IS NULL OR regimen_id IS NULL;
        ALTER TABLE regimen_history ALTER COLUMN regimen_type_id SET NOT NULL;
        ALTER TABLE regimen_history ALTER COLUMN regimen_id SET NOT NULL;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixregimenhistory();
