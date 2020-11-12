CREATE OR REPLACE FUNCTION fixadr() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        arr VARCHAR[];
		m VARCHAR;
    BEGIN
        FOR rec IN SELECT id, adr_ids
            FROM clinic
            WHERE adr_ids IS NOT NULL AND adr_ids != ''
        LOOP
            arr = regexp_split_to_array(rec.adr_ids, E',');
			FOREACH m SLICE 0 IN ARRAY arr
			LOOP
                 IF(SELECT isint(m))
                    THEN
                        INSERT INTO clinic_adr (clinic_id, adr_id) VALUES(rec.id, m::INT);
                 END IF;
			END LOOP;
        END LOOP;

        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE  'Exception caught';
    END;
$$
LANGUAGE PLPGSQL;

select fixadr();

CREATE OR REPLACE FUNCTION fixadherence() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        arr VARCHAR[];
		m VARCHAR;
    BEGIN
        FOR rec IN SELECT id, adhere_ids
            FROM clinic
            WHERE adhere_ids IS NOT NULL AND adhere_ids != ''
        LOOP
            arr = regexp_split_to_array(rec.adhere_ids, E',');
			FOREACH m SLICE 0 IN ARRAY arr
			LOOP
                IF(SELECT isint(m))
                    THEN
				        INSERT INTO clinic_adherence (clinic_id, adherence_id) VALUES(rec.id, m::INT);
				END IF;
			END LOOP;
        END LOOP;

        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE  'Exception caught';
    END;
$$
LANGUAGE PLPGSQL;

select fixadherence();

CREATE OR REPLACE FUNCTION fixoi() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        arr VARCHAR[];
		m VARCHAR;
    BEGIN
        FOR rec IN SELECT id, oi_ids
            FROM clinic
            WHERE oi_ids IS NOT NULL AND oi_ids != ''
        LOOP
            arr = regexp_split_to_array(rec.oi_ids, E',');
			FOREACH m SLICE 0 IN ARRAY arr
			LOOP
                IF(SELECT isint(m))
                    THEN
				        INSERT INTO clinic_oi (clinic_id, oi_id) VALUES(rec.id, m::INT);
				END IF;
			END LOOP;
        END LOOP;

        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE  'Exception caught';
    END;
$$
LANGUAGE PLPGSQL;

select fixoi();

CREATE OR REPLACE FUNCTION fixfk() RETURNS VOID AS $$
    BEGIN
        DELETE FROM clinic_adherence WHERE adherence_id NOT IN (SELECT adhere_id FROM adhere);
        DELETE FROM clinic_adr WHERE adr_id NOT IN (SELECT adr_id FROM adr);
        DELETE FROM clinic_oi WHERE oi_id NOT IN (SELECT oi_id FROM oi);

        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE  'Exception caught';
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixfk();

CREATE FUNCTION soft_delete() RETURNS trigger AS $$
    DECLARE
        command text := ' SET last_modified = current_timestamp, archived = true WHERE id = $1';
    BEGIN
        EXECUTE 'UPDATE ' || TG_TABLE_NAME || command USING OLD.id;
    RETURN NULL;
END;
$$
LANGUAGE PLPGSQL;

CREATE TRIGGER soft_delete_clinic_adhere
    BEFORE DELETE ON clinic_adhere
    FOR EACH ROW EXECUTE PROCEDURE soft_delete();

CREATE TRIGGER soft_delete_clinic_adhere
    BEFORE DELETE ON clinic_opportunistic_infection
    FOR EACH ROW EXECUTE PROCEDURE soft_delete();
