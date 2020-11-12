CREATE OR REPLACE FUNCTION dropviews() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT matviewname AS view_name
            FROM pg_matviews
        LOOP
            EXECUTE FORMAT('DROP MATERIALIZED VIEW %s ', rec.view_name);
        END LOOP;

        FOR rec IN SELECT table_name AS view_name
            FROM information_schema.views
            WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
        LOOP
            IF(EXISTS(SELECT table_name FROM information_schema.views WHERE table_name = rec.view_name))
                THEN EXECUTE FORMAT('DROP VIEW %s CASCADE', rec.view_name);
            END IF;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select dropviews();
