CREATE OR REPLACE FUNCTION dropsymtriggers() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
	BEGIN
        FOR rec IN SELECT proname FROM pg_proc WHERE proname ILIKE 'fsym%'
		LOOP
			EXECUTE FORMAT('DROP FUNCTION %s CASCADE', rec.proname);
		END LOOP;
	END;
$$
LANGUAGE PLPGSQL;

SELECT dropsymtriggers();
