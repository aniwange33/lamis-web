CREATE OR REPLACE FUNCTION fixsequences() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec_id BIGINT;
    BEGIN
        FOR rec IN SELECT table_name, column_name, replace(replace(column_default, E'nextval(\'',''), E'\'::regclass)', '') as seq
			FROM information_schema.columns
			WHERE column_default ILIKE 'nextval%' AND column_name = 'id' ORDER BY 1
        LOOP
            EXECUTE FORMAT('SELECT COALESCE(MAX(id), 0) + 1 FROM %s', rec.table_name) INTO rec_id;
			EXECUTE FORMAT('SELECT setval(''%s''::regclass, %s, true)', rec.seq, rec_id);
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select fixsequences();
