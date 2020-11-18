CREATE OR REPLACE FUNCTION fixpatientstartstatus() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT id, facility_id, date_started, status_at_registration
            FROM patient p WHERE NOT EXISTS(
                SELECT id FROM status_history WHERE patient_id = p.id AND date_status = date_started
                AND status = status_at_registration)
            AND date_started IS NOT NULL AND status_at_registration IS NOT NULL
        LOOP
            INSERT INTO status_history (patient_id, facility_id, status, date_status)
                VALUES (rec.id, rec.facility_id, rec.status_at_registration, rec.date_started);
        END LOOP;
    END
$$
LANGUAGE PLPGSQL;

SELECT fixpatientstartstatus();

CREATE OR REPLACE FUNCTION fixpatientdatestart() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT * FROM (
	        SELECT id, facility_id, (SELECT date_visit FROM pharmacy ph, jsonb_array_elements(lines) with ordinality a(l)
		        WHERE jsonb_extract_path_text(l,'regimen_type_id')::int in (1,2,3,4,14) AND ph.patient_id = p.id AND date_visit >= date_registration AND ph.archived = false
			    ORDER BY date_visit LIMIT 1)
  	    FROM patient p WHERE date_started IS NULL
        ) pl
        WHERE date_visit IS NOT NULL
        LOOP
            UPDATE patient SET date_started = rec.date_visit, last_modified = current_timestamp WHERE id = rec.id;
        END LOOP;
    END
$$
LANGUAGE PLPGSQL;

SELECT fixpatientdatestart();


CREATE OR REPLACE FUNCTION fixpatientartstart() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT * FROM (
	        SELECT id, facility_id, date_started, status_at_registration,(SELECT date_visit FROM pharmacy ph, jsonb_array_elements(lines) with ordinality a(l)
		        WHERE jsonb_extract_path_text(l,'regimen_type_id')::int in (1,2,3,4,14) AND ph.patient_id = p.id AND date_visit >= date_started AND ph.archived = false
			    ORDER BY date_visit LIMIT 1)
  	    FROM patient p WHERE date_started IS NOT NULL AND status_at_registration = 'HIV_PLUS_NON_ART'
        ) pl
        WHERE NOT EXISTS(
    	    SELECT id FROM status_history WHERE patient_id = pl.id AND date_status = date_visit
                AND status = 'ART_START') AND date_visit IS NOT NULL
        LOOP
            INSERT INTO status_history (patient_id, facility_id, status, date_status)
                VALUES (rec.id, rec.facility_id, 'ART_START', rec.date_visit);
        END LOOP;
    END
$$
LANGUAGE PLPGSQL;

SELECT fixpatientartstart();

CREATE OR REPLACE FUNCTION fixpatientarttransferin() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT * FROM (
	         SELECT id, facility_id, date_started, status_at_registration,(SELECT date_visit FROM pharmacy ph, jsonb_array_elements(lines) with ordinality a(l)
		        WHERE jsonb_extract_path_text(l,'regimen_type_id')::int in (1,2,3,4,14) AND ph.patient_id = p.id AND date_visit >= date_started AND ph.archived = false
			    ORDER BY date_visit LIMIT 1)
  	    FROM patient p WHERE date_started IS NOT NULL AND status_at_registration = 'ART_TRANSFER_IN'
        ) pl
        WHERE NOT EXISTS(
    	    SELECT id FROM status_history WHERE patient_id = pl.id AND date_status = date_visit
                AND status = 'ART_TRANSFER_IN') AND date_visit IS NOT NULL
        LOOP
            INSERT INTO status_history (patient_id, facility_id, status, date_status)
                VALUES (rec.id, rec.facility_id, 'ART_TRANSFER_IN', rec.date_visit);
        END LOOP;
    END
$$
LANGUAGE PLPGSQL;

SELECT fixpatientarttransferin();
